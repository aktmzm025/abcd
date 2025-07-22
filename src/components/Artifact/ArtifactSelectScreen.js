import React, { useState } from 'react';
import Button from '../UI/Button';

const ArtifactSelectScreen = ({ 
  artifactRewards, 
  onSelectArtifact, 
  onSkip,
  isStartSelection = false // 게임 시작시 선택인지 여부
}) => {
  const [selectedArtifact, setSelectedArtifact] = useState(null);

  const handleArtifactClick = (artifact) => {
    setSelectedArtifact(artifact);
  };

  const handleConfirmSelection = () => {
    if (selectedArtifact) {
      onSelectArtifact(selectedArtifact);
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-50';
      case 'uncommon': return 'border-green-400 bg-green-50';
      case 'rare': return 'border-blue-400 bg-blue-50';
      case 'epic': return 'border-purple-400 bg-purple-50';
      case 'legendary': return 'border-yellow-400 bg-yellow-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const getRarityIcon = (rarity) => {
    switch (rarity) {
      case 'common': return '⚪';
      case 'uncommon': return '🟢';
      case 'rare': return '🔵';
      case 'epic': return '🟣';
      case 'legendary': return '🟡';
      default: return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-game p-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="bg-purple-600 text-white px-4 py-2 rounded-lg inline-block mb-4">
            ✨ 아티펙트 {isStartSelection ? '선택' : '획득'}! ✨
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {isStartSelection ? '시작 아티펙트 선택' : '새로운 아티펙트 획득'}
          </h2>
          <p className="text-gray-300">
            {isStartSelection 
              ? '모험을 시작할 아티펙트를 선택하세요.' 
              : '강력한 아티펙트를 하나 선택하세요.'
            }
          </p>
        </div>

        {/* 아티펙트 선택 영역 */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex justify-center space-x-6 mb-6">
            {artifactRewards.map((artifact, index) => (
              <div key={artifact.id} className="text-center">
                <div
                  className={`
                    relative cursor-pointer transition-all duration-200 rounded-lg p-4 border-2 min-h-40 w-64
                    ${getRarityColor(artifact.rarity)}
                    ${selectedArtifact?.id === artifact.id ? 'ring-2 ring-yellow-400 transform scale-105' : ''}
                    hover:transform hover:scale-102 hover:shadow-md
                  `}
                  onClick={() => handleArtifactClick(artifact)}
                >
                  {/* 아티펙트 헤더 */}
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-lg">{getRarityIcon(artifact.rarity)}</span>
                    <div className="text-xs text-black bg-gray-200 px-2 py-1 rounded">
                      {artifact.classRestriction || '공용'}
                    </div>
                  </div>

                  {/* 아티펙트 이름 - 검은색으로 변경 */}
                  <div className="text-lg font-bold text-black mb-3 leading-tight">
                    {artifact.name}
                  </div>

                  {/* 아티펙트 설명 - 검은색으로 변경 */}
                  <div className="text-sm text-black mb-3 leading-tight">
                    {artifact.description}
                  </div>

                  {/* 희귀도 표시 */}
                  <div className="absolute bottom-2 right-2 text-xs opacity-70 capitalize text-black">
                    {artifact.rarity}
                  </div>
                </div>
                <div className="text-white text-sm mt-2">
                  선택지 {index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* 선택된 아티펙트 정보 */}
          {selectedArtifact && (
            <div className="bg-gray-700 rounded-lg p-4 mb-4">
              <h3 className="text-white font-bold mb-2">선택된 아티펙트:</h3>
              <div className="text-yellow-400 text-lg font-bold">{selectedArtifact.name}</div>
              <div className="text-gray-300 text-sm mb-2">{selectedArtifact.description}</div>
              
              {/* 아티펙트 효과 상세 정보 */}
              <div className="mt-2 text-xs text-gray-400">
                <div>• 타입: {selectedArtifact.type}</div>
                <div>• 희귀도: {selectedArtifact.rarity}</div>
                {selectedArtifact.classRestriction && (
                  <div>• 제한: {selectedArtifact.classRestriction} 전용</div>
                )}
              </div>
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleConfirmSelection}
              disabled={!selectedArtifact}
              variant="success"
              size="lg"
            >
              {selectedArtifact ? `${selectedArtifact.name} 선택` : '아티펙트를 선택하세요'}
            </Button>
            
            {!isStartSelection && (
              <Button
                onClick={onSkip}
                variant="secondary"
                size="lg"
              >
                건너뛰기
              </Button>
            )}
          </div>
        </div>

        {/* 도움말 */}
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <h4 className="text-white font-bold mb-2">💡 아티펙트 시스템</h4>
          <div className="text-gray-300 text-sm space-y-1">
            <p>• 아티펙트는 영구적인 능력 향상을 제공합니다</p>
            <p>• 희귀도가 높을수록 더 강력한 효과를 가집니다</p>
            <p>• 몬스터 처치시 10% 확률로 새로운 아티펙트를 획득할 수 있습니다</p>
            <p>• 보스 처치시 반드시 아티펙트 선택 기회가 주어집니다</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactSelectScreen;