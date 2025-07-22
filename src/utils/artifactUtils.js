// 아티펙트 타입 정의
export const ARTIFACT_TYPES = {
  PASSIVE: 'passive',        // 지속 효과
  TRIGGER: 'trigger',        // 특정 조건에서 발동
  COMBAT: 'combat',          // 전투 관련
  PERMANENT: 'permanent'     // 영구 효과
};

// 아티펙트 희귀도
export const ARTIFACT_RARITY = {
  COMMON: 'common',
  UNCOMMON: 'uncommon', 
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary'
};

// 전사 전용 아티펙트 (15개)
export const warriorArtifacts = [
  {
    id: 'w_giant_belt',
    name: '거인의 벨트',
    description: '매턴 공격력 1증가 (스테이지 클리어마다 초기화)',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: 'warrior',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { attackPerTurn: 1, resetOnStageComplete: true }
  },
  {
    id: 'w_rage_heart',
    name: '분노의 심장',
    description: '공격력 +3',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'warrior',
    type: ARTIFACT_TYPES.PERMANENT,
    effects: { attackBonus: 3 }
  },
  {
    id: 'w_hero_shield',
    name: '용사의 방패',
    description: '피해 시 20% 확률로 반사',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: 'warrior',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { reflectChance: 0.2, triggerOn: 'takeDamage' }
  },
  {
    id: 'w_unyielding_gauntlet',
    name: '불굴의 건틀릿',
    description: '공격 시 30% 확률 기절 추가',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'warrior',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { stunChance: 0.3, triggerOn: 'attack' }
  },
  {
    id: 'w_war_banner',
    name: '전쟁의 깃발',
    description: '광역 공격 데미지 +2',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'warrior',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { aoeAttackBonus: 2 }
  },
  {
    id: 'w_blood_oath',
    name: '피의 서약',
    description: '처형 성공 시 체력 15% 회복',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: 'warrior',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { executeHealPercent: 0.15, triggerOn: 'executeSuccess' }
  },
  {
    id: 'w_ruler_helmet',
    name: '지배자의 투구',
    description: '상대방의 회피율 10% 무시',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'warrior',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { dodgeIgnore: 0.1 }
  },
  {
    id: 'w_destroyer_hammer',
    name: '파괴자의 망치',
    description: '고정 공격 데미지 +3',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: 'warrior',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { flatDamageBonus: 3 }
  },
  {
    id: 'w_regen_armor',
    name: '재생의 갑옷',
    description: '턴당 체력 10% 재생',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: 'warrior',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { healthRegenPercent: 0.1 }
  },
  {
    id: 'w_berserker_bracelet',
    name: '광전사의 팔찌',
    description: '체력 50% 이하 시 공격력 1.5배 증가',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: 'warrior',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { lowHealthAttackMultiplier: 1.5, healthThreshold: 0.5, triggerOn: 'lowHealth' }
  },
  {
    id: 'w_hero_oath',
    name: '영웅의 맹세',
    description: '가장 강한 스킬 데미지 30% 증가',
    rarity: ARTIFACT_RARITY.EPIC,
    classRestriction: 'warrior',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { strongestSkillBonus: 0.3 }
  },
  {
    id: 'w_ironwall_guard',
    name: '철벽 수호',
    description: '받는 피해감소 2',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: 'warrior',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { damageReduction: 2 }
  },
  {
    id: 'w_battle_cry',
    name: '전투의 함성',
    description: '전투 시작 시 아군 공격력 +1',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: 'warrior',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { combatStartAttackBonus: 1, triggerOn: 'combatStart' }
  },
  {
    id: 'w_earthquake_device',
    name: '지진 생성기',
    description: '3턴마다 상대방 기절',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: 'warrior',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { turnInterval: 3, stunTarget: true, triggerOn: 'turnInterval' }
  },
  {
    id: 'w_crushing_gloves',
    name: '분쇄의 장갑',
    description: '연속 카드 마지막 데미지 2배',
    rarity: ARTIFACT_RARITY.EPIC,
    classRestriction: 'warrior',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { lastHitMultiplier: 2, triggerOn: 'multiHitLast' }
  }
];

// 마법사 전용 아티펙트 (15개)
export const mageArtifacts = [
  {
    id: 'm_sun_rod',
    name: '태양의 홀',
    description: '화염 계열 데미지 +2',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: 'mage',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { elementDamageBonus: { fire: 2 } }
  },
  {
    id: 'm_moon_scroll',
    name: '달의 두루마리',
    description: '상태 이상 지속시간 +1턴',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'mage',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { statusDurationBonus: 1 }
  },
  {
    id: 'm_star_cloak',
    name: '별의 망토',
    description: '보호막 효과 50% 강화',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: 'mage',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { shieldBonus: 0.5 }
  },
  {
    id: 'm_chaos_orb',
    name: '혼돈의 구슬',
    description: '광역 마법 25% 확률 추가 타격',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: 'mage',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { aoeExtraHitChance: 0.25, triggerOn: 'aoeAttack' }
  },
  {
    id: 'm_time_hourglass',
    name: '시간의 모래시계',
    description: '20% 확률 유틸리티 카드 복원',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: 'mage',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { utilityRestoreChance: 0.2, triggerOn: 'useUtility' }
  },
  {
    id: 'm_soul_lantern',
    name: '영혼의 등불',
    description: '정신 공격 시 공격력 감소 2',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'mage',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { psychicAttackDebuff: 2, triggerOn: 'psychicAttack' }
  },
  {
    id: 'm_freeze_crown',
    name: '빙결의 왕관',
    description: '빙결 적 공격 시 데미지 +4',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'mage',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { frozenTargetBonus: 4, triggerOn: 'attackFrozen' }
  },
  {
    id: 'm_elemental_core',
    name: '원소의 핵심',
    description: '모든 디버프 1턴 증가',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: 'mage',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { debuffDurationBonus: 1 }
  },
  {
    id: 'm_cosmic_map',
    name: '우주의 지도',
    description: '카드 드로우 시 10% 확률 희귀 카드',
    rarity: ARTIFACT_RARITY.EPIC,
    classRestriction: 'mage',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { rareCardChance: 0.1, triggerOn: 'cardDraw' }
  },
  {
    id: 'm_storm_staff',
    name: '폭풍의 지팡이',
    description: '번개 계열 치명타 확률 +25%',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'mage',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { elementCritBonus: { lightning: 0.25 } }
  },
  {
    id: 'm_mystic_mirror',
    name: '신비의 거울',
    description: '받은 디버프 30% 확률 반사',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: 'mage',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { debuffReflectChance: 0.3, triggerOn: 'receiveDebuff' }
  },
  {
    id: 'm_void_ring',
    name: '소멸의 고리',
    description: '적 처치 시 체력 10% 회복',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'mage',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { killHealPercent: 0.1, triggerOn: 'enemyKill' }
  },
  {
    id: 'm_void_eye',
    name: '공허의 눈동자',
    description: '암흑 계열 공격 시 체력 흡수 +50%',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: 'mage',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { elementLifestealBonus: { dark: 0.5 } }
  },
  {
    id: 'm_life_spring',
    name: '생명의 샘',
    description: '체력 회복량 +40%',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'mage',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { healingBonus: 0.4 }
  },
  {
    id: 'm_knowledge_orb',
    name: '지식의 보주',
    description: '전투 시작 시 보상카드 2개 증가',
    rarity: ARTIFACT_RARITY.EPIC,
    classRestriction: 'mage',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { extraRewardCards: 2, triggerOn: 'combatStart' }
  }
];

// 도적 전용 아티펙트 (15개)
export const rogueArtifacts = [
  {
    id: 'r_shadow_gloves',
    name: '그림자 장갑',
    description: '치명타 확률 +40%',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: 'rogue',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { critChanceBonus: 0.4 }
  },
  {
    id: 'r_viper_fangs',
    name: '독사의 이빨',
    description: '중독/출혈 데미지 +50%',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'rogue',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { dotDamageBonus: 0.5 }
  },
  {
    id: 'r_revenge_mark',
    name: '복수의 표식',
    description: '피해 시 다음 공격 데미지 +1 (최대 +5)',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: 'rogue',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { damageStackBonus: 1, maxStacks: 5, triggerOn: 'takeDamage' }
  },
  {
    id: 'r_thief_cloak',
    name: '도적군주의 망토',
    description: '1턴 적공격 회피',
    rarity: ARTIFACT_RARITY.EPIC,
    classRestriction: 'rogue',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { dodgeNextAttack: true, cooldown: 5, triggerOn: 'manual' }
  },
  {
    id: 'r_assassin_dagger',
    name: '암살자의 단검',
    description: '스테이지 시작 첫 공격 데미지 100% 증가',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: 'rogue',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { firstAttackMultiplier: 2, triggerOn: 'stageStart' }
  },
  {
    id: 'r_cunning_mask',
    name: '교활한 가면',
    description: '치명타 시 상대 방어력 50% 무시',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: 'rogue',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { critArmorIgnore: 0.5, triggerOn: 'criticalHit' }
  },
  {
    id: 'r_silent_bow',
    name: '무음 활',
    description: '원거리 공격 데미지 +3',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: 'rogue',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { rangedAttackBonus: 3 }
  },
  {
    id: 'r_fake_dice',
    name: '위조된 주사위',
    description: '카드 사용 시 15% 확률로 행운 증가',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'rogue',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { luckBoostChance: 0.15, luckBoostAmount: 2, triggerOn: 'useCard' }
  },
  {
    id: 'r_escape_kit',
    name: '탈출 장비',
    description: '생명력 20% 이하 시 회피율 +10%',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'rogue',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { lowHealthDodgeBonus: 0.1, healthThreshold: 0.2, triggerOn: 'lowHealth' }
  },
  {
    id: 'r_poison_kit',
    name: '독 제조 키트',
    description: '독 카드 지속시간 +2턴',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: 'rogue',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { poisonDurationBonus: 2 }
  },
  {
    id: 'r_shadow_clone',
    name: '그림자 분신',
    description: '1회 데미지 무효',
    rarity: ARTIFACT_RARITY.EPIC,
    classRestriction: 'rogue',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { damageImmunity: 1, triggerOn: 'takeDamage' }
  },
  {
    id: 'r_precision_scope',
    name: '정밀 조준경',
    description: '치명타 데미지 +50%',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'rogue',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { critDamageBonus: 0.5 }
  },
  {
    id: 'r_tomb_tools',
    name: '도굴꾼 도구',
    description: '함정 해제 시 카드 드로우',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'rogue',
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { drawCardOnTrapDisarm: 1, triggerOn: 'disarmTrap' }
  },
  {
    id: 'r_sharp_claws',
    name: '날카로운 발톱',
    description: '연속 타격 횟수 +1',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: 'rogue',
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { multiHitBonus: 1 }
  }
];

// 공용 아티펙트 (21개)
export const commonArtifacts = [
  {
    id: 'c_life_necklace',
    name: '생명의 목걸이',
    description: '최대 체력 +10',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.PERMANENT,
    effects: { maxHealthBonus: 10 }
  },
  {
    id: 'c_courage_medal',
    name: '용기의 메달',
    description: '공격력 +1',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.PERMANENT,
    effects: { attackBonus: 1 }
  },
  {
    id: 'c_regen_ring',
    name: '재생의 반지',
    description: '턴당 체력 2 회복',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { healthRegen: 2 }
  },
  {
    id: 'c_luck_totem',
    name: '행운의 토템',
    description: '보상방에서 추가 선택할 확률 25%',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { extraRewardChance: 0.25, triggerOn: 'rewardRoom' }
  },
  {
    id: 'c_immortal_bracelet',
    name: '불사의 팔찌',
    description: '치명타 피해 30% 감소',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { critDamageReduction: 0.3 }
  },
  {
    id: 'c_combat_manual',
    name: '전투 교본',
    description: '층계마다 공격력 0.5 증가',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { attackPerLayer: 0.5 }
  },
  {
    id: 'c_healing_spring',
    name: '치유의 샘물',
    description: '회복 효과 +30%',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { healingBonus: 0.3 }
  },
  {
    id: 'c_steel_will',
    name: '강철 의지',
    description: '상태 이상 저항 +20%',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { statusResistance: 0.2 }
  },
  {
    id: 'c_eagle_eye',
    name: '매의 눈',
    description: '치명타 확률 +10%',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { critChanceBonus: 0.1 }
  },
  {
    id: 'c_war_horn',
    name: '전투의 뿔피리',
    description: '턴 시작 시 공격력 3 증가',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { turnStartAttackBonus: 3, triggerOn: 'turnStart' }
  },
  {
    id: 'c_elemental_ring',
    name: '원소 반지',
    description: '속성 저항 +15%',
    rarity: ARTIFACT_RARITY.UNCOMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { elementalResistance: 0.15 }
  },
  {
    id: 'c_dragonslayer_badge',
    name: '용사살의 증표',
    description: '보스 데미지 +20%',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: null,
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { bossDamageBonus: 0.2 }
  },
  {
    id: 'c_eternal_potion',
    name: '영생의 물약',
    description: '체력 50% 이하 시 회복력 +50%',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: null,
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { lowHealthHealBonus: 0.5, healthThreshold: 0.5, triggerOn: 'lowHealth' }
  },
  {
    id: 'c_revival_feather',
    name: '부활의 깃털',
    description: '사망 시 1회 부활 (체력 20%)',
    rarity: ARTIFACT_RARITY.LEGENDARY,
    classRestriction: null,
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { reviveOnDeath: true, reviveHealthPercent: 0.2, triggerOn: 'death' }
  },
  {
    id: 'c_guardian_angel',
    name: '수호 천사',
    description: '치명타 받을 확률 -20%',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: null,
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { critReceiveReduction: 0.2 }
  },
  {
    id: 'c_ancient_relic',
    name: '고대 유물',
    description: '모든 데미지 +0.5',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { allDamageBonus: 0.5 }
  },
  {
    id: 'c_chaos_crystal',
    name: '혼돈의 결정',
    description: '무작위 속성 공격 부여',
    rarity: ARTIFACT_RARITY.RARE,
    classRestriction: null,
    type: ARTIFACT_TYPES.TRIGGER,
    effects: { randomElementAttack: true, triggerOn: 'attack' }
  },
  {
    id: 'c_fire_necklace',
    name: '화염의 목걸이',
    description: '화염 스킬 데미지 2 증가',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { elementDamageBonus: { fire: 2 } }
  },
  {
    id: 'c_ice_earrings',
    name: '얼음의 귀걸이',
    description: '얼음 속성 데미지 2 증가',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { elementDamageBonus: { water: 2 } }
  },
  {
    id: 'c_nature_ring',
    name: '초목의 반지',
    description: '풀 속성 데미지 2 증가',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { elementDamageBonus: { grass: 2 } }
  },
  {
    id: 'c_void_badge',
    name: '허무의 뱃지',
    description: '무속성 데미지 2 증가',
    rarity: ARTIFACT_RARITY.COMMON,
    classRestriction: null,
    type: ARTIFACT_TYPES.PASSIVE,
    effects: { elementDamageBonus: { none: 2 } }
  }
];

// 모든 아티펙트를 하나의 배열로 통합
export const allArtifacts = [
  ...warriorArtifacts,
  ...mageArtifacts,
  ...rogueArtifacts,
  ...commonArtifacts
];

// 직업별 아티펙트 매핑
export const artifactsByClass = {
  warrior: [...warriorArtifacts, ...commonArtifacts],
  mage: [...mageArtifacts, ...commonArtifacts],
  rogue: [...rogueArtifacts, ...commonArtifacts],
  common: commonArtifacts
};

// 희귀도별 아티펙트 필터링 함수
export const getArtifactsByRarity = (rarity) => {
  return allArtifacts.filter(artifact => artifact.rarity === rarity);
};

// 직업별 아티펙트 필터링 함수
export const getArtifactsByClass = (playerClass) => {
  return artifactsByClass[playerClass] || commonArtifacts;
};

// 아티펙트 ID로 찾기 함수
export const getArtifactById = (id) => {
  return allArtifacts.find(artifact => artifact.id === id);
};

// 무작위 아티펙트 선택 (보상용)
export const getRandomArtifacts = (playerClass, excludeIds = [], count = 3) => {
  const availableArtifacts = getArtifactsByClass(playerClass)
    .filter(artifact => !excludeIds.includes(artifact.id));

  const shuffled = [...availableArtifacts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};