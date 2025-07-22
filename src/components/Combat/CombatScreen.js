import React from 'react';
import PlayerStatus from './PlayerStatus';
import EnemyStatus from './EnemyStatus';
import SkillPanel from './SkillPanel';
import CombatLog from './CombatLog';
import Button from '../UI/Button';

const CombatScreen = ({ 
  player, 
  enemy, 
  combatLog, 
  onSkillSelect, 
  onGoToMenu,
  isPlayerTurn,
  diceResult,
  DiceComponent,
  isRolling,
  currentTurn = 1,
  playerStatusEffects = {},
  enemyStatusEffects = {}
}) => {
  const getTurnIndicator = () => {
    if (isPlayerTurn) {
      const hasDebuff = playerStatusEffects.stun > 0 || playerStatusEffects.freeze > 0;
      return (
        <div className={`text-center ${hasDebuff ? 'text-red-400' : 'text-green-400'}`}>
          👤 당신의 턴입니다 {hasDebuff && '(상태효과로 행동 불가)'}
        </div>
      );
    } else {
      const hasDebuff = enemyStatusEffects.stun > 0 || enemyStatusEffects.freeze > 0;
      return (
        <div className={`text-center ${hasDebuff ? 'text-purple-400' : 'text-red-400'}`}>
          👹 적의 턴입니다 {hasDebuff && '(상태효과로 행동 불가)'}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-red p-4">
      <div className="max-w-6xl mx-auto">
        {/* 전투 헤더 */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">⚔️ 전투 중 ⚔️</h2>
          
          {/* 턴 정보 */}
          <div className="bg-gray-800 rounded-lg p-3 mb-4">
            <div className="text-white text-lg font-bold mb-2">
              🎲 턴 {currentTurn}
            </div>
            <div className="flex justify-center items-center space-x-4">
              {getTurnIndicator()}
              <Button
                onClick={onGoToMenu}
                variant="secondary"
                size="sm"
                disabled={isRolling}
              >
                🏃 도망가기
              </Button>
            </div>
          </div>
        </div>

        {/* 전투 상태 표시 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PlayerStatus 
            player={player} 
            statusEffects={playerStatusEffects}
          />
          <EnemyStatus 
            enemy={enemy} 
            statusEffects={enemyStatusEffects}
          />
        </div>

        {/* 메인 전투 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 스킬 패널 */}
          <div className="order-2 lg:order-1">
            <SkillPanel
              skills={player?.skills || []}
              onSkillSelect={onSkillSelect}
              onGoToMenu={onGoToMenu}
              disabled={isRolling || (playerStatusEffects.stun > 0 || playerStatusEffects.freeze > 0)}
              isPlayerTurn={isPlayerTurn}
            />
          </div>

          {/* 전투 로그 */}
          <div className="order-1 lg:order-2">
            <CombatLog logs={combatLog} />
          </div>
        </div>

        {/* 주사위 결과 표시 */}
        {diceResult && DiceComponent && (
          <div className="bg-gray-800 rounded-lg p-6 mt-6 text-center">
            <div className="text-white mb-3 text-lg">🎲 주사위 결과</div>
            <div className="flex justify-center mb-3">
              {DiceComponent}
            </div>
            <div className="text-white text-2xl font-bold">{diceResult}</div>
            {isRolling && (
              <div className="text-gray-400 text-sm mt-2">
                주사위가 굴러가고 있습니다...
              </div>
            )}
          </div>
        )}

        {/* 상태효과 안내 */}
        <div className="bg-gray-800 rounded-lg p-4 mt-6">
          <div className="text-white text-sm space-y-1">
            <div className="font-bold mb-2">💡 전투 및 상태효과 정보:</div>
            <div>• 💫 기절: 해당 턴에 행동할 수 없습니다</div>
            <div>• 🧊 빙결: 해당 턴에 행동할 수 없습니다</div>
            <div>• ☠️ 중독: 매 턴마다 피해를 받습니다</div>
            <div>• 속성 상성을 활용하여 1.5배 피해를 주세요</div>
            <div>• 주사위 운이 회피율을 결정합니다 (기본 10% + 주사위 결과)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombatScreen;