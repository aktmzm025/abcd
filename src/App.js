import React from 'react';
import { GameProvider } from './context/GameContext';
import GameManager from './components/Gamemanager';
import './styles/globals.css';

function App() {
  return (
    <GameProvider>
      <div className="App">
        <GameManager />
      </div>
    </GameProvider>
  );
}

export default App;