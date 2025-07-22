import React, { useState } from 'react';
import Card from './Card';
import Button from '../UI/Button';

const CardRewardScreen = ({ 
  cardRewards, 
  onSelectCard, 
  onSkip,
  totalTurns // killCount 대신 totalTurns 사용
}) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleConfirmSelection = () => {
    if (selectedCard) {
      onSelectCard(selectedCard);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-game p-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg inline-block mb-4">
            🎉 카드 보상! 🎉
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            새로운 스킬 획득
          </h2>
          <p className="text-gray-300">
            턴 {totalTurns}회 달성! 아래 카드 중 하나를 선택하세요.
          </p>
          <p className="text-yellow-400 text-sm mt-1">
            (이전: 몬스터 처치 기반 → 현재: 턴 기반 보상)
          </p>
        </div>

        {/* 카드 선택 영역 */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex justify-center space-x-6 mb-6">
            {cardRewards.map((card, index) => (
              <div key={card.id} className="text-center">
                <Card
                  card={card}
                  onClick={() => handleCardClick(card)}
                  isSelected={selectedCard?.id === card.id}
                  showDetails={true}
                  forceBlackText={true} // 검정 글씨 강제 적용
                />
                <div className="text-white text-sm mt-2">
                  선택지 {index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* 선택된 카드 정보 */}
          {selectedCard && (
            <div className="bg-gray-700 rounded-lg p-4 mb-4">
              <h3 className="text-white font-bold mb-2">선택된 카드:</h3>
              <div className="text-yellow-400 text-lg font-bold">{selectedCard.name}</div>
              <div className="text-gray-300 text-sm mb-2">{selectedCard.description}</div>
              
              {/* 카드 효과 상세 정보 */}
              <div className="mt-2 text-xs text-gray-400">
                <div>• 타입: {selectedCard.type}</div>
                <div>• 희귀도: {selectedCard.rarity}</div>
                {selectedCard.damage !== 0 && (
                  <div>• 피해/회복: {selectedCard.damage > 0 ? `${selectedCard.damage} 피해` : `${Math.abs(selectedCard.damage)} 회복`}</div>
                )}
                {selectedCard.hits && selectedCard.hits > 1 && (
                  <div className="text-yellow-300 font-bold">• 연속 공격: {selectedCard.hits}회 (총 피해: {selectedCard.damage * selectedCard.hits})</div>
                )}
                {selectedCard.element && selectedCard.element !== 'none' && (
                  <div>• 속성: {selectedCard.element}</div>
                )}
              </div>
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleConfirmSelection}
              disabled={!selectedCard}
              variant="success"
              size="lg"
            >
              {selectedCard ? `${selectedCard.name} 선택` : '카드를 선택하세요'}
            </Button>
            
            <Button
              onClick={onSkip}
              variant="secondary"
              size="lg"
            >
              건너뛰기
            </Button>
          </div>
        </div>

        {/* 도움말 */}
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <h4 className="text-white font-bold mb-2">💡 새로운 카드 보상 시스템</h4>
          <div className="text-gray-300 text-sm space-y-1">
            <p>• <span className="text-yellow-400 font-bold">변경사항:</span> 몬스터 3마리 처치 → 턴 3회 진행시 보상</p>
            <p>• 선택한 카드는 스킬 인벤토리에 추가됩니다</p>
            <p>• 스킬 인벤토리에서 4개의 스킬을 선택해 장착할 수 있습니다</p>
            <p>• 턴 3회를 진행할 때마다 새로운 카드를 얻을 수 있습니다</p>
            <p>• 희귀도가 높을수록 더 강력한 효과를 가집니다</p>
            <p>• <span className="text-red-400">회피율이 최대 50%로 제한됩니다</span></p>
            <p>• <span className="text-green-400 font-bold">연속 공격:</span> "2회 공격" 카드는 피해를 2번 적용합니다</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRewardScreen;