import { useState } from 'react';
import { gameConstants } from '../data/gameData';

export const useGameState = () => {
  const [gameState, setGameState] = useState('menu'); // menu, character_select, game, combat, event
  const [currentStage, setCurrentStage] = useState(1);
  const [currentLayer, setCurrentLayer] = useState(1);
  const [gold, setGold] = useState(100);

  const nextStage = () => {
    if (currentStage === gameConstants.STAGES_PER_LAYER) {
      // 계층 클리어
      setCurrentLayer(prev => prev + 1);
      setCurrentStage(1);
    } else {
      setCurrentStage(prev => prev + 1);
    }
  };

  const addGold = (amount) => {
    setGold(prev => prev + amount);
  };

  const spendGold = (amount) => {
    setGold(prev => Math.max(0, prev - amount));
    return gold >= amount;
  };

  const resetGame = () => {
    setGameState('menu');
    setCurrentStage(1);
    setCurrentLayer(1);
    setGold(100);
  };

  const goToCharacterSelect = () => {
    setGameState('character_select');
  };

  const startGame = () => {
    setGameState('game');
  };

  const startCombat = () => {
    setGameState('combat');
  };

  const startEvent = () => {
    setGameState('event');
  };

  return {
    // State
    gameState,
    currentStage,
    currentLayer,
    gold,
    
    // Actions
    setGameState,
    nextStage,
    addGold,
    spendGold,
    resetGame,
    goToCharacterSelect,
    startGame,
    startCombat,
    startEvent
  };
};