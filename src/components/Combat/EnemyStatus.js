import React, { useEffect, useState } from 'react';
import ElementIcon from '../UI/ElementIcon';
import StatusBar from '../UI/StatusBar';

const EnemyStatus = ({ enemy, statusEffects = {} }) => {
  const [animatedHp, setAnimatedHp] = useState(enemy?.currentHp || 0);

  // 체력 변화 애니메이션
  useEffect(() => {
    if (enemy?.currentHp !== undefined) {
      setAnimatedHp(enemy.currentHp);
    }
  }, [enemy?.currentHp]);

  if (!enemy) return null;

  const getBossIndicator = () => {
    if (enemy.name.includes('보스')) {
      return (
        <div className="text-xs bg-red-600 text-white px-3 py-1 rounded-full mb-3 animate-pulse">
          👑 BOSS
        </div>
      );
    }
    return <div className="bg-red-600 px-2 py-1 rounded text-xs mb-3">적</div>;
  };

  const getStatusEffectDisplay = () => {
    const effects = [];
    if (statusEffects.stun > 0) {
      effects.push(`💫 기절 (${statusEffects.stun}턴)`);
    }
    if (statusEffects.freeze > 0) {
      effects.push(`🧊 빙결 (${statusEffects.freeze}턴)`);
    }
    if (statusEffects.poison > 0) {
      effects.push(`☠️ 중독 (${statusEffects.poison}턴)`);
    }
    return effects;
  };

  const getHealthStatus = () => {
    const percentage = (animatedHp / enemy.hp) * 100;
    if (percentage >= 70) return { color: 'text-red-400', status: '건강함' };
    if (percentage >= 40) return { color: 'text-orange-400', status: '부상' };
    if (percentage >= 20) return { color: 'text-yellow-400', status: '위험' };
    return { color: 'text-green-400', status: '치명상' };
  };

  const healthStatus = getHealthStatus();
  const activeEffects = getStatusEffectDisplay();

  return (
    <div className="bg-red-800 rounded-lg p-6 border-2 border-red-600">
      <div className="text-center text-white">
        {getBossIndicator()}
        
        <div className="flex items-center justify-center space-x-2 mb-4">
          <ElementIcon element={enemy.element} className="w-8 h-8" />
          <h3 className="text-2xl font-bold">{enemy.name}</h3>
        </div>

        {/* 체력 상태 표시 */}
        <div className={`text-sm font-medium mb-2 ${healthStatus.color}`}>
          {healthStatus.status}
        </div>
        
        {/* 적 체력바 - 실시간 업데이트 */}
        <div className="mb-4">
          <StatusBar
            current={animatedHp}
            max={enemy.hp}
            label="💀 적 체력"
            height="h-8"
            textColor="text-white"
            className="w-full"
            key={`enemy-hp-${animatedHp}`} // 강제 리렌더링을 위한 key
          />
        </div>

        {/* 상태효과 표시 */}
        {activeEffects.length > 0 && (
          <div className="mb-4 p-2 bg-red-900 rounded">
            <div className="text-xs text-white font-bold mb-1">상태효과:</div>
            <div className="flex flex-wrap gap-1 justify-center">
              {activeEffects.map((effect, index) => (
                <span key={index} className="text-xs bg-purple-600 px-2 py-1 rounded text-white animate-pulse">
                  {effect}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3 text-sm bg-red-900 p-4 rounded">
          <div className="flex justify-between">
            <span>⚔️ 공격력:</span>
            <span className="text-red-400 font-bold">{enemy.attack}</span>
          </div>
          <div className="flex justify-between">
            <span>🍀 행운:</span>
            <span className="text-yellow-400 font-bold">{enemy.luck}</span>
          </div>
          <div className="flex justify-between">
            <span>🔥 속성:</span>
            <ElementIcon element={enemy.element} showName={true} />
          </div>
          {enemy.special && (
            <div className="flex justify-between col-span-2">
              <span>✨ 특수능력:</span>
              <span className="text-purple-400 font-bold text-xs">
                {enemy.special.replace('_', ' ')}
              </span>
            </div>
          )}
        </div>

        {/* 실시간 체력 수치 */}
        <div className="mt-3 text-center">
          <div className={`text-lg font-bold ${healthStatus.color}`}>
            {animatedHp} / {enemy.hp} HP
          </div>
          <div className="text-xs text-gray-300">
            ({Math.round((animatedHp / enemy.hp) * 100)}%)
          </div>
        </div>
        
        {enemy.description && (
          <p className="text-gray-300 text-xs mt-3 border-t border-red-600 pt-3">
            {enemy.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default EnemyStatus;