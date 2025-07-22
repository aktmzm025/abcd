import React from 'react';
import Button from '../UI/Button';

const ArtifactInventoryScreen = ({ 
  artifacts, 
  onGoBack,
  onGoToMenu 
}) => {
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

  const getTypeDisplayName = (type) => {
    const names = {
      passive: '지속 효과',
      trigger: '발동형',
      combat: '전투형',
      permanent: '영구형'
    };
    return names[type] || type;
  };

  const getTypeIcon = (type) => {
    const icons = {
      passive: '🔄',
      trigger: '⚡',
      combat: '⚔️',
      permanent: '💎'
    };
    return icons[type] || '❓';
  };

  const getArtifactsByType = () => {
    const typeOrder = ['permanent', 'passive', 'trigger', 'combat'];
    const grouped = {};
    
    artifacts.forEach(artifact => {
      if (!grouped[artifact.type]) {
        grouped[artifact.type] = [];
      }
      grouped[artifact.type].push(artifact);
    });
    
    return typeOrder.map(type => ({
      type,
      artifacts: grouped[type] || []
    })).filter(group => group.artifacts.length > 0);
  };

  const getArtifactsByRarity = () => {
    const counts = {
      common: 0,
      uncommon: 0,
      rare: 0,
      epic: 0,
      legendary: 0
    };
    
    artifacts.forEach(artifact => {
      if (counts[artifact.rarity] !== undefined) {
        counts[artifact.rarity]++;
      }
    });
    
    return counts;
  };

  const rarityCounts = getArtifactsByRarity();

  return (
    <div className="min-h-screen bg-gradient-purple p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={onGoBack}
            variant="secondary"
            size="md"
          >
            🔙 뒤로가기
          </Button>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              ✨ 아티펙트 컬렉션
            </h2>
            <p className="text-gray-300">
              보유한 아티펙트: {artifacts.length}개
            </p>
          </div>
          
          <Button
            onClick={onGoToMenu}
            variant="secondary"
            size="md"
          >
            🏠 메인으로
          </Button>
        </div>

        {/* 아티펙트 통계 */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h3 className="text-white font-bold mb-3 text-center">📊 희귀도별 보유 현황</h3>
          <div className="grid grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl">⚪</div>
              <div className="text-white font-bold">{rarityCounts.common}</div>
              <div className="text-xs text-gray-400">일반</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">🟢</div>
              <div className="text-white font-bold">{rarityCounts.uncommon}</div>
              <div className="text-xs text-gray-400">고급</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">🔵</div>
              <div className="text-white font-bold">{rarityCounts.rare}</div>
              <div className="text-xs text-gray-400">희귀</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">🟣</div>
              <div className="text-white font-bold">{rarityCounts.epic}</div>
              <div className="text-xs text-gray-400">영웅</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">🟡</div>
              <div className="text-white font-bold">{rarityCounts.legendary}</div>
              <div className="text-xs text-gray-400">전설</div>
            </div>
          </div>
        </div>

        {/* 아티펙트 목록 */}
        {artifacts.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-white mb-2">
              아티펙트가 없습니다
            </h3>
            <p className="text-gray-400">
              몬스터를 처치하거나 보스를 물리쳐 아티펙트를 획득하세요!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {getArtifactsByType().map(({ type, artifacts }) => (
              <div key={type} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">{getTypeIcon(type)}</span>
                  <h3 className="text-xl font-bold text-white">
                    {getTypeDisplayName(type)} ({artifacts.length})
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {artifacts.map((artifact) => (
                    <div key={artifact.id} className="relative">
                      <div
                        className={`
                          rounded-lg p-4 border-2 min-h-32 w-full
                          ${getRarityColor(artifact.rarity)}
                          transition-all duration-200 hover:transform hover:scale-102 hover:shadow-md
                        `}
                      >
                        {/* 아티펙트 헤더 */}
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-lg">{getRarityIcon(artifact.rarity)}</span>
                          <div className="text-xs text-black bg-gray-200 px-2 py-1 rounded">
                            {artifact.classRestriction || '공용'}
                          </div>
                        </div>

                        {/* 아티펙트 이름 - 검정색으로 변경 */}
                        <div className="text-sm font-bold text-black mb-2 leading-tight">
                          {artifact.name}
                        </div>

                        {/* 아티펙트 설명 - 검정색으로 변경 */}
                        <div className="text-xs text-black leading-tight">
                          {artifact.description}
                        </div>

                        {/* 희귀도 표시 - 검정색으로 변경 */}
                        <div className="absolute bottom-1 right-1 text-xs opacity-70 capitalize text-black">
                          {artifact.rarity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 도움말 */}
        <div className="bg-gray-800 rounded-lg p-4 mt-6">
          <h4 className="text-white font-bold mb-2">💡 아티펙트 가이드</h4>
          <div className="text-gray-300 text-sm space-y-1">
            <p>• 💎 영구형: 게임 시작부터 적용되는 영구적인 능력 향상</p>
            <p>• 🔄 지속 효과: 특정 조건 하에서 지속적으로 발동하는 효과</p>
            <p>• ⚡ 발동형: 특정 상황에서 확률적으로 발동하는 강력한 효과</p>
            <p>• ⚔️ 전투형: 전투 중에만 효과를 발휘하는 아티펙트</p>
            <p>• 희귀도가 높을수록 더 강력하고 독특한 효과를 가집니다</p>
            <p>• <span className="text-yellow-400 font-bold">개선사항:</span> 아티펙트 텍스트가 더 읽기 쉬워졌습니다</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactInventoryScreen;