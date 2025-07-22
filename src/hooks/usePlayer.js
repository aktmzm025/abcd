import { useState } from 'react';
import { createPlayer } from '../utils/gameUtils';
import { classes } from '../data/gameData';

export const usePlayer = () => {
  const [player, setPlayer] = useState(null);

  const createNewPlayer = (classType) => {
    const classData = classes[classType];
    const newPlayer = createPlayer(classType, classData);
    setPlayer(newPlayer);
    return newPlayer;
  };

  const updatePlayerHp = (newHp) => {
    setPlayer(prev => ({
      ...prev,
      currentHp: Math.max(0, Math.min(prev.baseHp, newHp))
    }));
  };

  const healPlayer = (amount) => {
    setPlayer(prev => ({
      ...prev,
      currentHp: Math.min(prev.baseHp, prev.currentHp + amount)
    }));
  };

  const damagePlayer = (amount) => {
    setPlayer(prev => ({
      ...prev,
      currentHp: Math.max(0, prev.currentHp - amount)
    }));
  };

  const fullHealPlayer = () => {
    setPlayer(prev => ({
      ...prev,
      currentHp: prev.baseHp
    }));
  };

  const isPlayerAlive = () => {
    return player && player.currentHp > 0;
  };

  const getPlayerHealthPercentage = () => {
    if (!player) return 0;
    return (player.currentHp / player.baseHp) * 100;
  };

  const updatePlayerPosition = (stage, layer) => {
    setPlayer(prev => ({
      ...prev,
      position: { stage, layer }
    }));
  };

  return {
    // State
    player,
    
    // Actions
    createNewPlayer,
    updatePlayerHp,
    healPlayer,
    damagePlayer,
    fullHealPlayer,
    updatePlayerPosition,
    
    // Getters
    isPlayerAlive,
    getPlayerHealthPercentage
  };
};