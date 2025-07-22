import { elements } from '../data/elements';
import { gameConstants } from '../data/gameData';

/**
 * 속성 상성에 따른 피해량 계산
 * @param {string} attackerElement - 공격자 속성
 * @param {string} defenderElement - 방어자 속성
 * @param {number} baseDamage - 기본 피해량
 * @returns {number} 최종 피해량
 */
export const calculateElementalDamage = (attackerElement, defenderElement, baseDamage) => {
  // 무속성은 항상 1.0배 피해 (공격자나 방어자 중 하나라도 무속성이면)
  if (attackerElement === 'none' || defenderElement === 'none') {
    return baseDamage;
  }
  
  // 속성이 정의되지 않은 경우 기본 피해량 반환
  if (!elements[attackerElement] || !elements[defenderElement]) {
    return baseDamage;
  }
  
  // 유리한 속성 상성 (1.5배 피해)
  if (elements[attackerElement].strength === defenderElement) {
    return Math.floor(baseDamage * gameConstants.ELEMENTAL_DAMAGE_MULTIPLIER);
  }
  
  // 불리한 속성 상성 (0.75배 피해)
  if (elements[attackerElement].weakness === defenderElement) {
    return Math.floor(baseDamage * gameConstants.ELEMENTAL_DAMAGE_REDUCTION);
  }
  
  // 같은 속성이거나 중립적인 경우 기본 피해량
  return baseDamage;
};

/**
 * 공격력 보너스 계산
 * @param {number} baseAttack - 기본 공격력
 * @returns {number} 추가 피해량
 */
export const calculateAttackBonus = (baseAttack) => {
  return Math.floor(baseAttack / 10);
};

/**
 * 방어력 적용 후 피해량 계산
 * @param {number} damage - 기본 피해량
 * @param {number} defenseReduction - 방어력 감소율 (0-1)
 * @returns {number} 최종 피해량
 */
export const applyDefense = (damage, defenseReduction = gameConstants.DEFAULT_DEFENSE_REDUCTION) => {
  return Math.floor(damage * (1 - defenseReduction));
};

/**
 * 최종 피해량 계산 (최소 1)
 * @param {number} damage - 계산된 피해량
 * @returns {number} 최종 피해량 (최소 1)
 */
export const getFinalDamage = (damage) => {
  return Math.max(1, damage);
};

/**
 * 골드 보상 계산
 * @param {number} enemyLevel - 적 레벨 (기본값: 1)
 * @param {boolean} isBoss - 보스 여부
 * @returns {number} 골드 보상
 */
export const calculateGoldReward = (enemyLevel = 1, isBoss = false) => {
  const baseGold = Math.floor(Math.random() * 20) + 10;
  const levelBonus = enemyLevel * 5;
  const bossBonus = isBoss ? 50 : 0;
  
  return baseGold + levelBonus + bossBonus;
};

/**
 * 아티펙트 효과를 적용한 피해량 계산
 * @param {number} baseDamage - 기본 피해량
 * @param {Object} skill - 사용된 스킬
 * @param {Array} artifacts - 보유한 아티펙트들
 * @param {Object} target - 공격 대상
 * @returns {number} 아티펙트 효과가 적용된 피해량
 */
export const calculateDamageWithArtifacts = (baseDamage, skill, artifacts = [], target = null) => {
  if (!artifacts || artifacts.length === 0) {
    return baseDamage;
  }

  let modifiedDamage = baseDamage;

  artifacts.forEach(artifact => {
    const effects = artifact.effects || {};

    // 고정 공격 데미지 보너스
    if (effects.flatDamageBonus) {
      modifiedDamage += effects.flatDamageBonus;
    }

    // 공격력 보너스
    if (effects.attackBonus) {
      modifiedDamage += effects.attackBonus;
    }

    // 모든 데미지 보너스
    if (effects.allDamageBonus) {
      modifiedDamage += effects.allDamageBonus;
    }

    // 속성별 데미지 보너스
    if (effects.elementDamageBonus && skill.element) {
      const elementBonus = effects.elementDamageBonus[skill.element];
      if (elementBonus) {
        modifiedDamage += elementBonus;
      }
    }

    // 보스 데미지 보너스
    if (effects.bossDamageBonus && target && target.name.includes('보스')) {
      modifiedDamage = Math.floor(modifiedDamage * (1 + effects.bossDamageBonus));
    }

    // 광역 공격 보너스
    if (effects.aoeAttackBonus && skill.target === 'all_enemies') {
      modifiedDamage += effects.aoeAttackBonus;
    }

    // 원거리 공격 보너스
    if (effects.rangedAttackBonus && skill.type === 'ranged') {
      modifiedDamage += effects.rangedAttackBonus;
    }
  });

  return Math.max(1, modifiedDamage);
};

/**
 * 아티펙트 효과를 적용한 방어력 계산
 * @param {number} incomingDamage - 받을 피해량
 * @param {Array} artifacts - 보유한 아티펙트들
 * @returns {number} 아티펙트 방어 효과가 적용된 피해량
 */
export const calculateDefenseWithArtifacts = (incomingDamage, artifacts = []) => {
  if (!artifacts || artifacts.length === 0) {
    // 기본 방어력만 적용
    return applyDefense(incomingDamage);
  }

  let modifiedDamage = incomingDamage;
  let totalDamageReduction = 0;

  artifacts.forEach(artifact => {
    const effects = artifact.effects || {};

    // 고정 피해 감소
    if (effects.damageReduction) {
      modifiedDamage = Math.max(1, modifiedDamage - effects.damageReduction);
    }

    // 속성 저항
    if (effects.elementalResistance) {
      totalDamageReduction += effects.elementalResistance;
    }

    // 치명타 피해 감소
    if (effects.critDamageReduction) {
      // 치명타 여부는 별도로 판정해야 하므로 여기서는 기본 적용
      modifiedDamage = Math.floor(modifiedDamage * (1 - effects.critDamageReduction * 0.3));
    }
  });

  // 기본 방어력 + 아티펙트 저항 적용
  const totalDefense = gameConstants.DEFAULT_DEFENSE_REDUCTION + Math.min(0.5, totalDamageReduction);
  modifiedDamage = Math.floor(modifiedDamage * (1 - totalDefense));

  return Math.max(1, modifiedDamage);
};