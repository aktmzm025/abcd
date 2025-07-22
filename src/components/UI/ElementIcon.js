import React from 'react';
import { elements } from '../../data/elements';

const ElementIcon = ({ element, className = "w-4 h-4", showName = false }) => {
  if (!elements[element]) {
    console.warn(`Unknown element: ${element}`);
    return null;
  }

  const { icon: IconComponent, color, name } = elements[element];
  
  return (
    <div className="flex items-center space-x-1">
      <IconComponent className={`${className} ${color}`} />
      {showName && <span className={`text-sm ${color}`}>{name}</span>}
    </div>
  );
};

export default ElementIcon;