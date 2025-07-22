import { useState } from 'react';
import { 
  calculateElementalDamage, 
  calculateAttackBonus, 
  applyDefense, 
  getFinalDamage,
  calculateGoldReward 
} from '../utils/combatUtils';
import { 
  calculateDodgeRate, 
  isAttackDodged 
} from '../utils/diceUtils';
import { 
  generateRandomMonster, 
  generateBoss, 
  getStageType 
} from '../utils/gameUtils';

export const useCombat = () => {
  const [currentEnemy, setCurrentEnemy] = useState(null);
  const [combatLog, setCombatLog] = useState([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const startCombat = (stage) => {
    const stageType = getStageType(stage);
    let enemy;

    if (stageType === 'boss' || stageType === 'mini_boss') {
      enemy = generateBoss(stage);
    } else {
      enemy = generateRandomMonster();
    }

    setCurrentEnemy(enemy);
    setCombatLog([`${enemy.name}과(와) 전투를 시작합니다!`]);
    setIsPlayerTurn(true);
  };

  const executeAttack = (attacker, defender, skill) => {
    const dodgeRate = calculateDodgeRate(defender.luck || defender.baseLuck);
    
    if (isAttackDodged(dodgeRate)) {
      return {
        hit: false,
        damage: 0,
        message: `${defender.name || '플레이어'}가 공격을 회피했습니다! (회피율: ${dodgeRate}%)`
      };
    }

    let damage = skill.damage;
    
    // 공격력 보너스 적용 (플레이어만)
    if (attacker.baseAttack) {
      damage += calculateAttackBonus(attacker.baseAttack);
    }
    
    // 속성 상성 적용
    damage = calculateElementalDamage(
      attacker.element, 
      defender.element || defender.baseElement, 
      damage
    );
    
    // 방어력 적용 (플레이어만)
    if (defender.defense && !attacker.baseAttack) {
      damage = applyDefense(damage, defender.defense.reduction);
    }
    
    damage = getFinalDamage(damage);
    
    return {
      hit: true,
      damage,
      message: `${skill.name}으로 ${damage} 피해를 입혔습니다!`
    };
  };

  const playerAttack = (player, skill, onComplete) => {
    if (!currentEnemy || !isPlayerTurn) return;

    const result = executeAttack(player, currentEnemy, skill);
    const newLog = [...combatLog, result.message];

    if (result.hit) {
      const newEnemyHp = Math.max(0, currentEnemy.currentHp - result.damage);
      setCurrentEnemy(prev => ({ ...prev, currentHp: newEnemyHp }));

      if (newEnemyHp <= 0) {
        const goldReward = calculateGoldReward(1, getStageType(1) !== 'normal');
        newLog.push(`${currentEnemy.name}을(를) 처치했습니다!`);
        newLog.push(`${goldReward} 골드를 획득했습니다!`);
        
        setCombatLog(newLog);
        
        setTimeout(() => {
          if (onComplete) onComplete(true, goldReward);
        }, 2000);
        return;
      }
    }

    setCombatLog(newLog);
    setIsPlayerTurn(false);

    // AI 턴
    setTimeout(() => {
      enemyAttack(player);
    }, 1500);
  };

  const enemyAttack = (player) => {
    if (!currentEnemy || currentEnemy.currentHp <= 0) return;

    const enemySkill = { name: '공격', damage: currentEnemy.attack };
    const result = executeAttack(currentEnemy, player, enemySkill);
    
    const newLog = [...combatLog, result.message];
    setCombatLog(newLog);

    if (result.hit && result.damage > 0) {
      // 플레이어 피해는 부모 컴포넌트에서 처리
      return result.damage;
    }

    setIsPlayerTurn(true);
    return 0;
  };

  const endCombat = () => {
    setCurrentEnemy(null);
    setCombatLog([]);
    setIsPlayerTurn(true);
  };

  const addCombatLog = (message) => {
    setCombatLog(prev => [...prev, message]);
  };

  return {
    // State
    currentEnemy,
    combatLog,
    isPlayerTurn,
    
    // Actions
    startCombat,
    playerAttack,
    enemyAttack,
    endCombat,
    addCombatLog,
    
    // Setters
    setIsPlayerTurn
  };
};