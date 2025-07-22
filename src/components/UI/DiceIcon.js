import React from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { getDiceIconIndex } from '../../utils/diceUtils';

const DiceIcon = ({ value, isRolling = false, className = "w-8 h-8" }) => {
  const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
  const iconIndex = getDiceIconIndex(value);
  const IconComponent = diceIcons[iconIndex];
  
  return (
    <IconComponent 
      className={`${className} ${isRolling ? 'animate-spin' : ''} text-white`} 
    />
  );
};

export default DiceIcon;