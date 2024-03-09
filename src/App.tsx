import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TicTacToe from '../src/components/TicTacToe/TicTacToe';
import SavedGames from '../src/components/SavedGames/SavedGames';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Tic Tac Toe Játék</h1>
          {/* Útvonalak meghatározása a különböző lapokhoz.*/}
          <Routes>
            <Route path="/" Component={TicTacToe}/>
            <Route path="/saved-games" Component={SavedGames} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
