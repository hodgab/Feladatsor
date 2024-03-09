import React, { useState, useEffect } from 'react';
import './savedGame.css';

interface SavedGame {
  id: number;
  name: string;
  board: string;
}

interface CardProps {
  savedGame: SavedGame;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newName: string) => void;
}

const Card: React.FC<CardProps> = ({ savedGame, onDelete, onUpdate }) => {
  const [newName, setNewName] = useState<string>('');

  const handleUpdate = () => {
    onUpdate(savedGame.id, newName);
    setNewName('');
  };

  return (
    <div className="card">
      <h3>{savedGame.name}</h3>
      <p>{savedGame.board}</p>
      <button className="delete-button" onClick={() => onDelete(savedGame.id)}>
        Delete
      </button>
      <input
        type="text"
        value={newName}
        onChange={e => setNewName(e.target.value)}
        placeholder="New name"
      />
      <button className="update-button" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

const SavedGames = () => {
  const [savedGames, setSavedGames] = useState<SavedGame[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/boards')
      .then(response => response.json())
      .then(data => setSavedGames(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:5000/boards/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const updatedGames = savedGames.filter(game => game.id !== id);
          setSavedGames(updatedGames);
        } else {
          console.error('Delete request failed', id);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleUpdate = (id: number, newName: string) => {
    fetch(`http://localhost:5000/boards/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Update successful:', data);
        // Frissítjük az állapotot a módosított névvel
        const updatedGames = savedGames.map(game =>
          game.id === id ? { ...game, name: newName } : game
        );
        setSavedGames(updatedGames);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Mentett játékok</h2>
      <div className="card-container">
        {savedGames.map(savedGame => (
          <Card
            key={savedGame.id}
            savedGame={savedGame}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedGames;
