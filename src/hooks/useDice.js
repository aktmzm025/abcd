import { useState } from 'react';
import { rollDice } from '../utils/diceUtils';

export const useDice = () => {
  const [diceResult, setDiceResult] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  const animateRoll = (callback) => {
    setIsRolling(true);
    let count = 0;
    
    const interval = setInterval(() => {
      setDiceResult(Math.floor(Math.random() * 12) + 1);
      count++;
      
      if (count > 10) {
        clearInterval(interval);
        const finalResult = rollDice();
        setDiceResult(finalResult);
        setIsRolling(false);
        
        if (callback) {
          setTimeout(() => callback(finalResult), 500);
        }
      }
    }, 100);
  };

  const resetDice = () => {
    setDiceResult(null);
    setIsRolling(false);
  };

  return {
    diceResult,
    isRolling,
    animateRoll,
    resetDice
  };
};