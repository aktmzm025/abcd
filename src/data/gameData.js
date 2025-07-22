export const classes = {
  warrior: { 
    name: '전사', 
    baseAttack: 15, 
    baseHp: 100, 
    baseLuck: 10, 
    element: 'none',
    description: '강력한 근접 공격과 높은 체력을 가진 전사'
  },
  rogue: { 
    name: '도적', 
    baseAttack: 12, 
    baseHp: 80, 
    baseLuck: 20, 
    element: 'none',
    description: '빠르고 운이 좋은 암살자'
  },
  mage: { 
    name: '마법사', 
    baseAttack: 18, 
    baseHp: 70, 
    baseLuck: 15, 
    element: 'none',
    description: '강력한 마법 공격을 구사하는 마법사'
  }
};

export const gameConstants = {
  STAGES_PER_LAYER: 10,
  MINI_BOSS_STAGE: 5,
  FINAL_BOSS_STAGE: 10,
  BASE_HP: 100,
  DAMAGE_SCALE: 6,
  DICE_SIDES: 12,
  COMBAT_PROBABILITY: 0.7,
  ELEMENTAL_DAMAGE_MULTIPLIER: 1.5,
  ELEMENTAL_DAMAGE_REDUCTION: 0.75,
  DEFAULT_DEFENSE_REDUCTION: 0.2,
  
  // 회피율 관련 상수 (새로 업데이트)
  BASE_DODGE_RATE: 5,           // 최소 회피율 5%
  MAX_DODGE_RATE: 50,           // 최대 회피율 50% (기존 95%에서 변경)
  DICE_DODGE_MULTIPLIER: 2,     // 주사위 결과 * 2 (기존 3에서 변경)
  LUCK_DODGE_DIVISOR: 2,        // 행운 / 2 (새로 추가)
  
  // 카드 보상 관련 상수
  TURNS_FOR_CARD_REWARD: 3      // 3턴마다 카드 보상 (새로 추가)
};