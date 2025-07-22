import React from 'react';
import ElementIcon from '../UI/ElementIcon';

const Card = ({ 
  card, 
  onClick, 
  isSelected = false, 
  isEquipped = false,
  showDetails = true,
  className = '',
  forceBlackText = false // 검정 글씨 강제 적용 옵션
}) => {
  if (!card) return null;

  const getRarityBorder = () => {
    switch (card.rarity) {
      case 'common': return 'border-gray-400 bg-gray-50';
      case 'uncommon': return 'border-green-400 bg-green-50';
      case 'rare': return 'border-blue-400 bg-blue-50';
      case 'epic': return 'border-purple-400 bg-purple-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const getTypeColor = () => {
    // 검정 글씨 강제 적용 시
    if (forceBlackText) {
      switch (card.type) {
        case 'attack': return 'text-red-800';
        case 'defense': return 'text-blue-800';
        case 'buff': return 'text-green-800';
        case 'debuff': return 'text-purple-800';
        case 'utility': return 'text-yellow-800';
        case 'special': return 'text-orange-800';
        default: return 'text-black';
      }
    }
    
    // 기본 색상
    switch (card.type) {
      case 'attack': return 'text-red-600';
      case 'defense': return 'text-blue-600';
      case 'buff': return 'text-green-600';
      case 'debuff': return 'text-purple-600';
      case 'utility': return 'text-yellow-600';
      case 'special': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = () => {
    switch (card.type) {
      case 'attack': return '⚔️';
      case 'defense': return '🛡️';
      case 'buff': return '⬆️';
      case 'debuff': return '⬇️';
      case 'utility': return '🔧';
      case 'special': return '✨';
      default: return '❓';
    }
  };

  const getRarityIcon = () => {
    switch (card.rarity) {
      case 'common': return '⚪';
      case 'uncommon': return '🟢';
      case 'rare': return '🔵';
      case 'epic': return '🟣';
      default: return '⚪';
    }
  };

  const getDamageDisplay = () => {
    if (card.damage === 0) return '';
    if (card.damage > 0) return `💥 ${card.damage}`;
    return `❤️ ${Math.abs(card.damage)}`;
  };

  const getEffectsList = () => {
    const effects = [];
    if (card.hits && card.hits > 1) effects.push(`${card.hits}회 공격`);
    if (card.stun) effects.push('기절');
    if (card.poison) effects.push('중독');
    if (card.freeze) effects.push('빙결');
    if (card.burn) effects.push('화상');
    if (card.lifeSteal) effects.push('생명력 흡수');
    if (card.block) effects.push(`방어 ${card.block}`);
    if (card.buffAttack) effects.push(`공격력 +${card.buffAttack}`);
    if (card.armor) effects.push(`방어구 +${card.armor}`);
    if (card.stealth) effects.push('은신');
    if (card.critChance) effects.push(`치명타 ${Math.round(card.critChance * 100)}%`);
    return effects;
  };

  // 텍스트 색상 결정
  const textColorClass = forceBlackText ? 'text-black' : 'text-gray-900';
  const descriptionColorClass = forceBlackText ? 'text-black' : 'text-gray-600';
  const effectsColorClass = forceBlackText ? 'text-black' : 'text-gray-500';

  return (
    <div 
      className={`
        relative cursor-pointer transition-all duration-200 rounded-lg p-3 border-2 min-h-32 w-40
        ${getRarityBorder()}
        ${isSelected ? 'ring-2 ring-yellow-400 transform scale-105' : ''}
        ${isEquipped ? 'ring-2 ring-green-400' : ''}
        ${onClick ? 'hover:transform hover:scale-102 hover:shadow-md' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* 카드 헤더 */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-1">
          <span className="text-sm">{getTypeIcon()}</span>
          <span className="text-xs">{getRarityIcon()}</span>
          {card.element && (
            <ElementIcon 
              element={card.element} 
              className="w-4 h-4" 
            />
          )}
        </div>
        {card.damage !== 0 && (
          <div className={`text-sm font-bold ${forceBlackText ? 'text-black' : ''}`}>
            {getDamageDisplay()}
          </div>
        )}
      </div>

      {/* 카드 이름 */}
      <div className={`text-sm font-bold ${textColorClass} mb-2 leading-tight`}>
        {card.name}
      </div>

      {/* 카드 타입 */}
      <div className={`text-xs ${getTypeColor()} mb-2 font-medium`}>
        {card.type.toUpperCase()}
      </div>

      {/* 카드 설명 - 항상 표시 */}
      {showDetails && card.description && (
        <div className={`text-xs ${descriptionColorClass} mb-2 leading-tight bg-white bg-opacity-60 p-1 rounded`}>
          {card.description}
        </div>
      )}

      {/* 효과 목록 */}
      {showDetails && getEffectsList().length > 0 && (
        <div className="text-xs space-y-1">
          {getEffectsList().map((effect, index) => (
            <div key={index} className={`${forceBlackText ? 'bg-gray-200' : 'bg-gray-100'} ${effectsColorClass} px-1 py-0.5 rounded text-center font-medium`}>
              {effect}
            </div>
          ))}
        </div>
      )}

      {/* 연속 공격 강조 표시 */}
      {card.hits && card.hits > 1 && (
        <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded font-bold">
          {card.hits}x
        </div>
      )}

      {/* 장착 상태 표시 */}
      {isEquipped && (
        <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded">
          장착됨
        </div>
      )}

      {/* 희귀도 표시 */}
      <div className={`absolute bottom-1 right-1 text-xs opacity-70 ${forceBlackText ? 'text-black' : ''}`}>
        {card.rarity}
      </div>
    </div>
  );
};

export default Card;