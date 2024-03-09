// TicTacToe.tsx

import React, { Component } from 'react';
import "./TicTacToe.css";
import SaveForm from '../saveForm/SaveForm';

interface TicTacToeState {
  boardSize: number;
  board: (string | null)[];
  xIsNext: boolean;
  winner: string | null;
}

class TicTacToe extends Component<{}, TicTacToeState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      boardSize: 3,
      board: Array(9).fill(null),
      xIsNext: true,
      winner: null
    };
  }

  handleClick(i: number) {
    const board = this.state.board.slice();
    if (board[i] || this.state.winner) return;

    board[i] = this.state.xIsNext ? 'X' : 'O';
    const winner = this.calculateWinner(board);

    this.setState({
      board: board,
      xIsNext: !this.state.xIsNext,
      winner: winner
    });
  }

  calculateWinner(board: (string | null)[]) {
    const lines = this.generateLines();
    const requiredCount = this.state.boardSize === 3 ? 3 : 4;
  
    for (const line of lines) {
      let currentSymbol = null;
      let count = 0;
  
      for (const index of line) {
        const symbol = board[index];
  
        if (symbol === currentSymbol && symbol !== null) {
          count++;
          if (count === requiredCount) {
            return currentSymbol;
          }
        } else {
          currentSymbol = symbol;
          count = symbol !== null ? 1 : 0; // Modifying this line to reset count for null symbols
        }
      }
    }
  
    return null;
  }
  
  
  
  
   
  

  generateLines() {
    const boardSize = this.state.boardSize;
    const lines: number[][] = [];
    // Rows
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j <= boardSize - 4; j++) {
        lines.push(Array.from({ length: 4 }, (_, k) => i * boardSize + j + k));
      }
    }
    // Columns
    for (let i = 0; i <= boardSize - 4; i++) {
      for (let j = 0; j < boardSize; j++) {
        lines.push(Array.from({ length: 4 }, (_, k) => (i + k) * boardSize + j));
      }
    }
    // Diagonals
    for (let i = 0; i <= boardSize - 4; i++) {
      for (let j = 0; j <= boardSize - 4; j++) {
        lines.push(Array.from({ length: 4 }, (_, k) => (i + k) * boardSize + j + k));
        lines.push(Array.from({ length: 4 }, (_, k) => (i + k) * boardSize + j + (3 - k)));
      }
    }
    return lines;
  }

  handleBoardSizeChange(size: number) {
    this.setState({
      boardSize: size,
      board: Array(size * size).fill(null),
      winner: null
    });
  }

  renderSquare(i: number) {
    const size = 50; // Méret: 50x50 pixel
    const style = {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: 'lightblue'
    };
  
    return (
      <div className="square" style={style} onClick={() => this.handleClick(i)}>
        {this.state.board[i]}
      </div>
    );
  }
  

  renderBoard() {
    const boardSize = this.state.boardSize;
    const board = [];
    for (let i = 0; i < boardSize; i++) {
      const row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push(this.renderSquare(i * boardSize + j));
      }
      board.push(<div className="board-row">{row}</div>);
    }
    return board;
  }

  render() {
    const boardSizeOptions = [3, 4, 5, 6, 7];
    const winner = this.state.winner;
    const status = winner ? `Winner: ${winner}` : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    const resetButton = winner ? <button onClick={() => this.handleReset()}>Újra</button> : null;
  
    return (
      <div className="board-wrapper">
        <div className="status">{status}</div>
        <div>
          Select board size:
          <select value={this.state.boardSize} onChange={(e) => this.handleBoardSizeChange(parseInt(e.target.value))}>
            {boardSizeOptions.map(size => <option value={size}>{size}x{size}</option>)}
          </select>
        </div>
        <div className="board-wrapper">
          <div className="board-container">
            <div className="board">
              {this.renderBoard()}
            </div>
          </div>
        </div>
        {resetButton}
        <SaveForm onSave={this.handleSave}/>
      </div>
    );
  }

  handleSave = (tableName: string) => {
    const { board, xIsNext, boardSize } = this.state;
    const boardString = board.map(square => square ? (square === 'X' ? '1' : '2') : '0').join('');
    const data = {
      name: tableName,
      board: boardString
    };
  
    fetch('http://localhost:5000/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Add itt kezeld a sikeres mentést, például jelentsd ki a felhasználónak
    })
    .catch((error) => {
      console.error('Error:', error);
      // Add itt kezeld a hibát, például jelentsd ki a felhasználónak
    });
  }
  
  
  handleReset() {
    this.setState({
      board: Array(this.state.boardSize * this.state.boardSize).fill(null),
      xIsNext: true,
      winner: null
    });
  }
  
  
}

export default TicTacToe;
