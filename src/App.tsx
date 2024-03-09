// App.tsx

import React from 'react';
import './App.css';
import TicTacToe from '../src/components/TicTacToe/TicTacToe';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe Game</h1>
        <TicTacToe />
      </header>
    </div>
  );
}

export default App;
