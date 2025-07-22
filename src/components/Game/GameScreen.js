import React from 'react';
import { Heart } from 'lucide-react';
import ElementIcon from '../UI/ElementIcon';
import Button from '../UI/Button';
import StatusBar from '../UI/StatusBar';
import { getStageType } from '../../utils/gameUtils';
import { classes } from '../../data/gameData';

const GameScreen = ({ 
  player, 
  currentStage, 
  currentLayer, 
  gold, 
  onProceedStage,
  onGoToMenu,
  onOpenSkillInventory,
  onOpenArtifactInventory,
  killCount,
  totalTurns = 0,
  artifacts = [], // 아티펙트 목록 추가
  diceResult,
  DiceComponent 
}) => {
  const stageType = getStageType(currentStage);
  
  const getStageDescription = () => {
    switch (stageType) {
      case 'boss':
        return '🐉 최종 보스 등장!';
      case 'mini_boss':
        return '⚔️ 중간 보스 등장!';
      default:
        return '다음 모험이 기다리고 있습니다...';
    }
  };

  const getStageColor = () => {
    switch (stageType) {
      case 'boss':
        return 'text-red-400';
      case 'mini_boss':
        return 'text-orange-400';
      default:
        return 'text-gray-300';
    }
  };

  // 아티펙트를 타입별로 분류
  const getArtifactSummary = () => {
    const summary = {
      total: artifacts.length,
      byRarity: {
        common: 0,
        uncommon: 0,
        rare: 0,
        epic: 0,
        legendary: 0
      },
      byType: {
        permanent: 0,
        passive: 0,
        trigger: 0,
        combat: 0
      }
    };

    artifacts.forEach(artifact => {
      if (summary.byRarity[artifact.rarity] !== undefined) {
        summary.byRarity[artifact.rarity]++;
      }
      if (summary.byType[artifact.type] !== undefined) {
        summary.byType[artifact.type]++;
      }
    });

    return summary;
  };

  const artifactSummary = getArtifactSummary();

  return (
    <div className="min-h-screen bg-gradient-blue p-4">
      <div className="max-w-4xl mx-auto">
        {/* 상단 플레이어 정보 */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center space-x-4">
              <ElementIcon element={player.element} className="w-6 h-6" />
              <span className="font-bold text-lg">{classes[player.class]?.name || '모험가'}</span>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>{player.currentHp}/{player.baseHp}</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-lg">🏰 계층 {currentLayer}</span>
              <span className="text-lg">🚩 스테이지 {currentStage}/10</span>
              <span className="text-yellow-400 font-bold">💰 골드: {gold}</span>
              <span className="text-red-400 font-bold">💀 처치: {killCount}</span>
              <span className="text-blue-400 font-bold">🎯 턴: {totalTurns}</span>
              <div className="flex space-x-2">
                <Button
                  onClick={onOpenSkillInventory}
                  variant="primary"
                  size="sm"
                >
                  🎒 스킬 ({player.skills?.length || 0}/4)
                </Button>
                <Button
                  onClick={onOpenArtifactInventory}
                  variant="primary"
                  size="sm"
                >
                  ✨ 아티펙트 ({artifacts.length})
                </Button>
                <Button
                  onClick={onGoToMenu}
                  variant="secondary"
                  size="sm"
                >
                  🏠 메인
                </Button>
              </div>
            </div>
          </div>
          
          {/* 체력바 */}
          <div className="mt-4">
            <StatusBar
              current={player.currentHp}
              max={player.baseHp}
              label="❤️ 체력"
              height="h-6"
              className="w-full"
            />
          </div>
        </div>

        {/* 스테이지 정보 */}
        <div className="bg-gray-800 rounded-lg p-6 mb-4">
          <h3 className="text-3xl font-bold text-white mb-4 text-center">
            🏰 {currentLayer}계층 {currentStage}스테이지
          </h3>
          
          <p className={`text-center mb-6 text-xl ${getStageColor()}`}>
            {getStageDescription()}
          </p>
          
          {/* 스테이지 진행 바 - 크고 명확하게 */}
          <div className="mb-6">
            <StatusBar
              current={currentStage}
              max={10}
              label={`🚩 계층 ${currentLayer} 진행 상황`}
              color="bg-blue-500"
              height="h-8"
              showPercentage={true}
              className="w-full"
            />
          </div>
          
          {/* 계층 전체 진행률 */}
          <div className="mb-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="text-white font-bold mb-3 text-center">🗺️ 전체 진행률</h4>
              <div className="text-center text-gray-300 mb-2">
                현재 위치: {currentLayer}계층 {currentStage}스테이지
              </div>
              <div className="text-center text-yellow-400 text-lg font-bold">
                총 {(currentLayer - 1) * 10 + currentStage}스테이지 진행
              </div>
            </div>
          </div>

          {/* 카드 보상 시스템 정보 - 턴 기반으로 변경 */}
          <div className="mb-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="text-white font-bold mb-3 text-center">🎴 카드 보상 시스템</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{totalTurns}</div>
                  <div className="text-sm text-gray-300">진행한 턴</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{3 - (totalTurns % 3)}</div>
                  <div className="text-sm text-gray-300">카드 보상까지</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{killCount}</div>
                  <div className="text-sm text-gray-300">처치한 몬스터</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${((totalTurns % 3) / 3) * 100}%` }}
                  />
                </div>
                <div className="text-center text-xs text-gray-400 mt-1">
                  턴 3회마다 카드 보상! (이전: 몬스터 3마리)
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <Button
              onClick={onProceedStage}
              variant={stageType === 'normal' ? 'success' : 'danger'}
              size="lg"
            >
              {stageType === 'normal' ? '⚔️ 다음으로 진행' : '👑 보스 도전하기'}
            </Button>
            
            <div className="flex justify-center space-x-4">
              <Button
                onClick={onGoToMenu}
                variant="secondary"
                size="md"
              >
                🏠 메인 메뉴로
              </Button>
            </div>
          </div>
        </div>

        {/* 플레이어 상세 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 스탯 정보 */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-bold mb-3">캐릭터 정보</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-white">
                <span>직업:</span>
                <span className="font-medium">{classes[player.class]?.name || '모험가'}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>속성:</span>
                <ElementIcon element={player.element} showName={true} />
              </div>
              <div className="flex justify-between text-white">
                <span>공격력:</span>
                <span className="text-red-400 font-bold">{player.baseAttack}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>행운:</span>
                <span className="text-yellow-400 font-bold">{player.baseLuck}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>방어력:</span>
                <span className="text-blue-400 font-bold">
                  {Math.round(player.defense.reduction * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* 스킬 목록 */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-white font-bold">🎯 장착된 스킬</h4>
              <Button
                onClick={onOpenSkillInventory}
                variant="primary"
                size="sm"
              >
                🎒 스킬 관리
              </Button>
            </div>
            <div className="space-y-2">
              {player.skills && player.skills.length > 0 ? (
                player.skills.map((skill, index) => (
                  <div 
                    key={skill.id || index} 
                    className="bg-gray-700 p-3 rounded text-white text-sm"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className={skill.damage > 0 ? 'text-red-400' : skill.damage < 0 ? 'text-green-400' : 'text-blue-400'}>
                          {skill.damage > 0 ? `💥 ${skill.damage}` : skill.damage < 0 ? `❤️ ${Math.abs(skill.damage)}` : '🔧 유틸리티'}
                        </span>
                        {skill.hits && skill.hits > 1 && (
                          <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded font-bold">
                            {skill.hits}x
                          </span>
                        )}
                      </div>
                    </div>
                    {skill.description && (
                      <p className="text-gray-400 text-xs mt-1">{skill.description}</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">
                  <p>장착된 스킬이 없습니다.</p>
                  <p className="text-sm mt-1">턴을 진행하여 카드를 획득하고 스킬을 장착하세요!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 아티펙트 정보 섹션 - 새로 추가 */}
        <div className="bg-gray-800 rounded-lg p-4 mt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-white font-bold">✨ 보유 아티펙트</h4>
            <Button
              onClick={onOpenArtifactInventory}
              variant="primary"
              size="sm"
            >
              🎒 아티펙트 관리
            </Button>
          </div>
          
          {artifacts.length > 0 ? (
            <div className="space-y-4">
              {/* 아티펙트 요약 정보 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div className="bg-gray-700 p-2 rounded">
                  <div className="text-lg font-bold text-white">{artifactSummary.total}</div>
                  <div className="text-xs text-gray-400">총 아티펙트</div>
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <div className="text-lg font-bold text-purple-400">{artifactSummary.byRarity.epic + artifactSummary.byRarity.legendary}</div>
                  <div className="text-xs text-gray-400">희귀 이상</div>
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <div className="text-lg font-bold text-yellow-400">{artifactSummary.byType.permanent}</div>
                  <div className="text-xs text-gray-400">영구 효과</div>
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <div className="text-lg font-bold text-green-400">{artifactSummary.byType.passive + artifactSummary.byType.trigger}</div>
                  <div className="text-xs text-gray-400">발동형</div>
                </div>
              </div>

              {/* 최근 획득한 아티펙트 미리보기 (최대 3개) */}
              <div>
                <h5 className="text-white font-medium mb-2">최근 획득한 아티펙트:</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {artifacts.slice(-3).map((artifact, index) => (
                    <div key={artifact.id} className="bg-gray-700 p-3 rounded text-white text-sm">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-xs">{artifact.name}</span>
                        <span className="text-xs">
                          {artifact.rarity === 'common' && '⚪'}
                          {artifact.rarity === 'uncommon' && '🟢'}
                          {artifact.rarity === 'rare' && '🔵'}
                          {artifact.rarity === 'epic' && '🟣'}
                          {artifact.rarity === 'legendary' && '🟡'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs leading-tight">{artifact.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-4">
              <p>보유한 아티펙트가 없습니다.</p>
              <p className="text-sm mt-1">몬스터를 처치하거나 보스를 물리쳐 아티펙트를 획득하세요!</p>
            </div>
          )}
        </div>

        {/* 게임 시스템 변경 안내 */}
        <div className="bg-gray-800 rounded-lg p-4 mt-6">
          <h4 className="text-white font-bold mb-2">🔄 게임 시스템 업데이트</h4>
          <div className="text-gray-300 text-sm space-y-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-yellow-400 font-bold">• 카드 보상 시스템 변경:</p>
                <p className="text-gray-400">이전: 몬스터 3마리 처치시</p>
                <p className="text-green-400">현재: 턴 3회 진행시</p>
              </div>
              <div>
                <p className="text-yellow-400 font-bold">• 회피율 시스템 개선:</p>
                <p className="text-gray-400">이전: 최대 95%</p>
                <p className="text-green-400">현재: 최대 50%</p>
              </div>
            </div>
            <p className="text-blue-400 mt-2">• 연속 공격이 올바르게 작동합니다</p>
            <p className="text-purple-400 mt-2">• 인게임에서 아티펙트를 쉽게 확인할 수 있습니다</p>
          </div>
        </div>

        {/* 주사위 표시 */}
        {diceResult && DiceComponent && (
          <div className="bg-gray-800 rounded-lg p-4 mt-4 text-center">
            <div className="text-white mb-2">주사위 결과</div>
            {DiceComponent}
            <div className="text-white mt-2 text-lg font-bold">{diceResult}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;