import React from 'react';
import Button from '../UI/Button';

const MainMenu = ({ 
  onStartGame, 
  gold, 
  onChangeCharacter,
  onOpenSkillInventory,
  onOpenArtifactInventory,
  selectedClass,
  player,
  skillInventory = [],
  equippedSkills = [],
  artifacts = []
}) => {
  return (
    <div className="min-h-screen bg-gradient-purple flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-8 text-yellow-400">
          로그라이크 다이스 RPG
        </h1>
        <p className="text-xl mb-8">
          주사위와 함께하는 모험
        </p>
        
        <div className="space-y-4 mb-8">
          <Button
            onClick={onStartGame}
            variant="warning"
            size="xl"
          >
            게임 시작
          </Button>
          
          {selectedClass && (
            <Button
              onClick={onChangeCharacter}
              variant="secondary"
              size="lg"
            >
              캐릭터 변경
            </Button>
          )}
        </div>

        {/* 인벤토리 관리 섹션 */}
        {selectedClass && (
          <div className="space-y-3 mb-6">
            <Button
              onClick={onOpenSkillInventory}
              variant="primary"
              size="md"
            >
              🎒 스킬 인벤토리 ({skillInventory.length})
            </Button>
            
            <Button
              onClick={onOpenArtifactInventory}
              variant="primary"
              size="md"
            >
              ✨ 아티펙트 컬렉션 ({artifacts.length})
            </Button>
          </div>
        )}
        
        <div className="mt-6 text-lg">
          <p>보유 골드: <span className="text-yellow-400">{gold}</span></p>
          {selectedClass && (
            <div className="mt-2 text-sm text-gray-300">
              <p>선택된 직업: <span className="text-green-400 font-bold">{selectedClass}</span></p>
              <p>장착된 스킬: <span className="text-blue-400">{equippedSkills.length}/4</span></p>
              <p>보유 아티펙트: <span className="text-purple-400">{artifacts.length}</span></p>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-gray-300 text-sm">
          <p>- 속성 상성을 활용하여 전투하세요</p>
          <p>- 주사위 운이 승부를 좌우합니다</p>
          <p>- 10스테이지마다 강력한 보스가 등장합니다</p>
          <p>- 카드를 모아 강력한 스킬을 구성하세요</p>
          <p>- 아티펙트로 영구적인 능력 향상을 얻으세요</p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;