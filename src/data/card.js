// 카드 타입 정의
export const CARD_TYPES = {
  ATTACK: 'attack',
  DEFENSE: 'defense',
  BUFF: 'buff',
  DEBUFF: 'debuff',
  UTILITY: 'utility',
  SPECIAL: 'special'
};

// 카드 희귀도 정의
export const CARD_RARITY = {
  COMMON: 'common',
  UNCOMMON: 'uncommon',
  RARE: 'rare',
  EPIC: 'epic'
};

// 전사 카드 40장 (설명 개선)
export const warriorCards = [
  // 단일 대상 공격 (15장)
  { id: 'w001', name: '검의 일격', type: CARD_TYPES.ATTACK, damage: 4, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '4 피해를 주는 기본 검 공격' },
  { id: 'w002', name: '방패 강타', type: CARD_TYPES.ATTACK, damage: 3, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '3 피해 + 적을 1턴 기절시킴', stun: true },
  { id: 'w003', name: '분노의 주먹', type: CARD_TYPES.ATTACK, damage: 3, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'fire', description: '3 화염 피해를 주는 분노의 일격' },
  { id: 'w004', name: '돌진 찌르기', type: CARD_TYPES.ATTACK, damage: 5, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '5 피해를 주는 강력한 돌진 공격' },
  { id: 'w005', name: '참수', type: CARD_TYPES.ATTACK, damage: 6, target: 'enemy', rarity: CARD_RARITY.RARE, element: 'none', description: '6 피해 + 10% 확률로 즉시 처형', execute: 0.1 },
  { id: 'w006', name: '이단 베기', type: CARD_TYPES.ATTACK, damage: 3, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '3 피해를 2회 연속 공격 (총 6 피해)', hits: 2 },
  { id: 'w007', name: '지면 강타', type: CARD_TYPES.ATTACK, damage: 4, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'grass', description: '4 자연 피해를 주는 지면 공격' },
  { id: 'w008', name: '방패 던지기', type: CARD_TYPES.ATTACK, damage: 4, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '4 피해를 주는 원거리 방패 공격' },
  { id: 'w009', name: '광전사의 일격', type: CARD_TYPES.ATTACK, damage: 5, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'fire', description: '5 화염 피해 (자신도 2 피해 받음)', selfDamage: 2 },
  { id: 'w010', name: '철퇴 강타', type: CARD_TYPES.ATTACK, damage: 4, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '4 피해를 주는 둔기 공격' },
  { id: 'w011', name: '피의 갈망', type: CARD_TYPES.ATTACK, damage: 3, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'fire', description: '3 화염 피해 + 피해량만큼 체력 회복', lifeSteal: true },
  { id: 'w012', name: '심판의 검', type: CARD_TYPES.ATTACK, damage: 6, target: 'enemy', rarity: CARD_RARITY.RARE, element: 'fire', description: '6 신성한 화염 피해를 주는 강력한 일격' },
  { id: 'w013', name: '파괴의 주먹', type: CARD_TYPES.ATTACK, damage: 5, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'fire', description: '5 화염 피해를 주는 강력한 주먹' },
  { id: 'w014', name: '점프 슬래시', type: CARD_TYPES.ATTACK, damage: 4, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '4 피해를 주는 점프 베기 공격' },
  { id: 'w015', name: '꿰뚫기', type: CARD_TYPES.ATTACK, damage: 5, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '5 피해 관통 공격 (방어 무시)' },

  // 방어 및 생존 (10장)
  { id: 'w016', name: '철벽 방어', type: CARD_TYPES.DEFENSE, damage: 0, target: 'self', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '다음 받을 피해를 999만큼 방어', block: 999 },
  { id: 'w017', name: '방패의 결의', type: CARD_TYPES.DEFENSE, damage: 0, target: 'self', rarity: CARD_RARITY.COMMON, element: 'none', description: '5 피해 방어 + 다음 턴 공격력 +2', block: 5, buffAttack: 2 },
  { id: 'w018', name: '재생의 의지', type: CARD_TYPES.DEFENSE, damage: -3, target: 'self', rarity: CARD_RARITY.COMMON, element: 'none', description: '즉시 3 체력 회복 + 매턴 3씩 지속 회복', regen: 3 },
  { id: 'w019', name: '도발', type: CARD_TYPES.UTILITY, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '적이 다음 턴에 반드시 나를 공격하도록 강제', taunt: true },
  { id: 'w020', name: '생명력 흡수 공격', type: CARD_TYPES.ATTACK, damage: 3, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'fire', description: '3 화염 피해 + 피해량만큼 체력 회복', lifeSteal: true },
  { id: 'w021', name: '방패 갑옷', type: CARD_TYPES.DEFENSE, damage: 0, target: 'self', rarity: CARD_RARITY.COMMON, element: 'none', description: '방어력을 3만큼 영구 증가', armor: 3 },
  { id: 'w022', name: '굳건한 의지', type: CARD_TYPES.DEFENSE, damage: 0, target: 'self', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '모든 상태 이상에 면역이 됨', immunity: true },
  { id: 'w023', name: '전투의 함성', type: CARD_TYPES.BUFF, damage: 0, target: 'self', rarity: CARD_RARITY.COMMON, element: 'fire', description: '다음 턴까지 공격력 +2 증가', buffAttack: 2 },
  { id: 'w024', name: '분노의 외침', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'fire', description: '적의 공격력을 2만큼 감소시킨다', debuffAttack: 2 },
  { id: 'w025', name: '회복의 숨결', type: CARD_TYPES.DEFENSE, damage: -6, target: 'self', rarity: CARD_RARITY.COMMON, element: 'none', description: '즉시 6 체력을 회복한다' },

  // 분노 또는 버프 (10장)
  { id: 'w026', name: '분노 축적', type: CARD_TYPES.BUFF, damage: 0, target: 'self', rarity: CARD_RARITY.COMMON, element: 'fire', description: '분노 게이지를 2만큼 축적', rage: 2 },
  { id: 'w027', name: '분노 폭발', type: CARD_TYPES.ATTACK, damage: 6, target: 'enemy', rarity: CARD_RARITY.RARE, element: 'fire', description: '6 화염 피해 (분노 3 필요)', requiresRage: 3 },
  { id: 'w028', name: '무기 강화', type: CARD_TYPES.BUFF, damage: 0, target: 'self', rarity: CARD_RARITY.COMMON, element: 'none', description: '영구적으로 공격력 +3 증가', buffAttack: 3 },
  { id: 'w029', name: '돌진', type: CARD_TYPES.BUFF, damage: 0, target: 'self', rarity: CARD_RARITY.COMMON, element: 'none', description: '다음 공격의 피해를 3만큼 증가', nextAttackBonus: 3 },
  { id: 'w030', name: '격노', type: CARD_TYPES.BUFF, damage: 0, target: 'self', rarity: CARD_RARITY.UNCOMMON, element: 'fire', description: '공격 속도를 2만큼 증가', speed: 2 },
  { id: 'w031', name: '전투 태세', type: CARD_TYPES.BUFF, damage: 0, target: 'self', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '공격력 +2, 방어력 +2 동시 증가', buffAttack: 2, armor: 2 },
  { id: 'w032', name: '결의', type: CARD_TYPES.DEFENSE, damage: 0, target: 'self', rarity: CARD_RARITY.COMMON, element: 'none', description: '방어력 +2, 매턴 체력 2씩 회복', armor: 2, regen: 2 },
  { id: 'w033', name: '궁극의 일격', type: CARD_TYPES.ATTACK, damage: 7, target: 'enemy', rarity: CARD_RARITY.EPIC, element: 'fire', description: '7 화염 피해 (적 체력 30% 이하시 추가 피해)', executeThreshold: 0.3 },
  { id: 'w034', name: '무적', type: CARD_TYPES.DEFENSE, damage: 0, target: 'self', rarity: CARD_RARITY.RARE, element: 'none', description: '1턴간 모든 피해를 받지 않음', invincible: 1 },
  { id: 'w035', name: '성스러운 힘', type: CARD_TYPES.BUFF, damage: 0, target: 'self', rarity: CARD_RARITY.UNCOMMON, element: 'fire', description: '신성한 힘으로 공격력 +4 증가', buffAttack: 4 },

  // 특수 공격 (5장)
  { id: 'w036', name: '연속 베기', type: CARD_TYPES.ATTACK, damage: 2, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '2 피해를 3회 연속 공격 (총 6 피해)', hits: 3 },
  { id: 'w037', name: '방패 반사', type: CARD_TYPES.DEFENSE, damage: 0, target: 'self', rarity: CARD_RARITY.RARE, element: 'none', description: '받은 피해를 그대로 적에게 반사', reflect: true },
  { id: 'w038', name: '지진', type: CARD_TYPES.ATTACK, damage: 4, target: 'all_enemies', rarity: CARD_RARITY.RARE, element: 'grass', description: '모든 적에게 4 자연 피해 (광역 공격)', },
  { id: 'w039', name: '회전 베기', type: CARD_TYPES.ATTACK, damage: 3, target: 'all_enemies', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '모든 적에게 3 피해 (광역 공격)' },
  { id: 'w040', name: '영웅의 일격', type: CARD_TYPES.ATTACK, damage: 8, target: 'enemy', rarity: CARD_RARITY.EPIC, element: 'fire', description: '8 화염 피해 (사용 후 다음턴 행동 불가)', exhausted: true }
];

// 마법사 카드 40장 (설명 개선)
export const mageCards = [
  // 단일 대상 마법 (10장)
  { id: 'm001', name: '화염구', type: CARD_TYPES.ATTACK, damage: 5, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'fire', description: '5 화염 피해를 주는 기본 마법' },
  { id: 'm002', name: '얼음 창', type: CARD_TYPES.ATTACK, damage: 4, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'water', description: '4 물 피해 + 적을 1턴 빙결', freeze: true },
  { id: 'm003', name: '독액 화살', type: CARD_TYPES.ATTACK, damage: 2, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'grass', description: '2 자연 피해 + 3턴간 중독 상태', poison: true },
  { id: 'm004', name: '번개 화살', type: CARD_TYPES.ATTACK, damage: 6, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '6 번개 피해를 주는 강력한 마법' },
  { id: 'm005', name: '암흑의 손길', type: CARD_TYPES.ATTACK, damage: 3, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '3 암흑 피해 + 피해량만큼 체력 흡수', lifeSteal: true },
  { id: 'm006', name: '신성한 빛', type: CARD_TYPES.ATTACK, damage: 4, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '4 신성 피해 (언데드에게 추가 피해)', holyDamage: true },
  { id: 'm007', name: '마법 화살', type: CARD_TYPES.ATTACK, damage: 3, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '3 마법 피해 (100% 명중)', alwaysHit: true },
  { id: 'm008', name: '돌의 주먹', type: CARD_TYPES.ATTACK, damage: 4, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'grass', description: '4 자연 피해를 주는 바위 마법' },
  { id: 'm009', name: '정신 분열', type: CARD_TYPES.ATTACK, damage: 5, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '5 정신 피해 + 적을 혼란 상태로', confuse: true },
  { id: 'm010', name: '용암 덩어리', type: CARD_TYPES.ATTACK, damage: 4, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'fire', description: '4 화염 피해 + 3턴간 화상 상태', burn: true },

  // 광역 마법 (15장)
  { id: 'm011', name: '불의 비', type: CARD_TYPES.ATTACK, damage: 3, target: 'all_enemies', rarity: CARD_RARITY.UNCOMMON, element: 'fire', description: '모든 적에게 3 화염 피해' },
  { id: 'm012', name: '얼음 폭풍', type: CARD_TYPES.ATTACK, damage: 2, target: 'all_enemies', rarity: CARD_RARITY.UNCOMMON, element: 'water', description: '모든 적에게 2 물 피해 + 둔화', slow: true },
  { id: 'm013', name: '독구름', type: CARD_TYPES.ATTACK, damage: 1, target: 'all_enemies', rarity: CARD_RARITY.COMMON, element: 'grass', description: '모든 적에게 1 자연 피해 + 중독', poison: true },
  { id: 'm014', name: '번개 체인', type: CARD_TYPES.ATTACK, damage: 4, target: 'all_enemies', rarity: CARD_RARITY.RARE, element: 'none', description: '모든 적에게 4 번개 피해 (연쇄 번개)' },
  { id: 'm015', name: '지진', type: CARD_TYPES.ATTACK, damage: 4, target: 'all_enemies', rarity: CARD_RARITY.RARE, element: 'grass', description: '모든 적에게 4 지면 피해' },
  { id: 'm016', name: '용암 분출', type: CARD_TYPES.ATTACK, damage: 5, target: 'all_enemies', rarity: CARD_RARITY.RARE, element: 'fire', description: '모든 적에게 5 용암 피해' },
  { id: 'm017', name: '신성한 폭발', type: CARD_TYPES.ATTACK, damage: 3, target: 'all_enemies', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '모든 적에게 3 신성 피해 (언데드 추가 피해)', holyDamage: true },
  { id: 'm018', name: '어둠의 소용돌이', type: CARD_TYPES.ATTACK, damage: 3, target: 'all_enemies', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '모든 적을 끌어당기며 3 암흑 피해' },
  { id: 'm019', name: '바람의 칼날', type: CARD_TYPES.ATTACK, damage: 2, target: 'all_enemies', rarity: CARD_RARITY.COMMON, element: 'none', description: '모든 적에게 2 바람 피해' },
  { id: 'm020', name: '얼음 파편', type: CARD_TYPES.ATTACK, damage: 3, target: 'all_enemies', rarity: CARD_RARITY.COMMON, element: 'water', description: '모든 적에게 3 얼음 파편 피해' },
  { id: 'm021', name: '화염 파동', type: CARD_TYPES.ATTACK, damage: 4, target: 'all_enemies', rarity: CARD_RARITY.UNCOMMON, element: 'fire', description: '전방으로 4 화염 파동 발사' },
  { id: 'm022', name: '메테오', type: CARD_TYPES.ATTACK, damage: 6, target: 'all_enemies', rarity: CARD_RARITY.EPIC, element: 'fire', description: '모든 적에게 6 운석 피해 (시전시간 있음)' },
  { id: 'm023', name: '정신 파동', type: CARD_TYPES.ATTACK, damage: 3, target: 'all_enemies', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '모든 적에게 3 정신 피해 + 혼란', confuse: true },
  { id: 'm024', name: '해일', type: CARD_TYPES.ATTACK, damage: 4, target: 'all_enemies', rarity: CARD_RARITY.UNCOMMON, element: 'water', description: '모든 적에게 4 물 피해 (거대한 파도)' },
  { id: 'm025', name: '태풍', type: CARD_TYPES.ATTACK, damage: 3, target: 'all_enemies', rarity: CARD_RARITY.UNCOMMON, element: 'water', description: '모든 적을 밀어내며 3 바람 피해', knockback: true },

  // 상태 이상 및 지속 효과 (10장)
  { id: 'm026', name: '화상', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'fire', description: '적에게 3턴간 화상 상태 부여 (매턴 피해)', burn: true },
  { id: 'm027', name: '빙결', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'water', description: '적을 2턴간 빙결 (행동 불가)', freeze: true },
  { id: 'm028', name: '중독', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'grass', description: '적에게 3턴간 중독 상태 부여', poison: true },
  { id: 'm029', name: '마법 봉쇄', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '적의 마법 사용을 2턴간 봉쇄', silence: true },
  { id: 'm030', name: '약화', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '적의 공격력을 3만큼 감소', debuffAttack: 3 },
  { id: 'm031', name: '취약', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '적의 방어력을 3만큼 감소', debuffDefense: 3 },
  { id: 'm032', name: '혼란', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '적이 아군을 공격하게 만듦 (2턴)', confuse: true },
  { id: 'm033', name: '공포', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '적을 도망가게 만듦 (1턴)', fear: true },
  { id: 'm034', name: '수면', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '적을 2턴간 잠재움 (행동 불가)', sleep: true },
  { id: 'm035', name: '저주', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '적에게 지속 피해 2를 부여 (3턴)', curse: 2 },

  // 마법 보호막 및 유틸리티 (5장)
  { id: 'm036', name: '마법 보호막', type: CARD_TYPES.DEFENSE, damage: 0, target: 'self', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '8 피해를 흡수하는 마법 보호막 생성', shield: 8 },
  { id: 'm037', name: '투명화', type: CARD_TYPES.UTILITY, damage: 0, target: 'self', rarity: CARD_RARITY.RARE, element: 'none', description: '1턴간 은신 상태 (공격받지 않음)', invisibility: true },
  { id: 'm038', name: '순간 이동', type: CARD_TYPES.UTILITY, damage: 0, target: 'self', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '즉시 적의 공격을 회피', teleport: true },
  { id: 'm039', name: '마력 주입', type: CARD_TYPES.UTILITY, damage: 0, target: 'self', rarity: CARD_RARITY.COMMON, element: 'none', description: '마나를 3만큼 회복 (추가 카드 사용)', manaRestore: 3 },
  { id: 'm040', name: '시간 정지', type: CARD_TYPES.UTILITY, damage: 0, target: 'all_enemies', rarity: CARD_RARITY.EPIC, element: 'none', description: '모든 적의 행동을 1턴 정지', timeStop: true }
];

// 도적 카드 40장 (설명 개선)
export const rogueCards = [
  // 다중 타격 공격 (15장)
  { id: 'r001', name: '이중 타격', type: CARD_TYPES.ATTACK, damage: 2, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '2 피해를 2회 공격 (총 4 피해)', hits: 2 },
  { id: 'r002', name: '삼연참', type: CARD_TYPES.ATTACK, damage: 1, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '1 피해를 3회 공격 (총 3 피해)', hits: 3 },
  { id: 'r003', name: '연속 칼던지기', type: CARD_TYPES.ATTACK, damage: 1, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '1 피해를 4회 던지기 (총 4 피해)', hits: 4 },
  { id: 'r004', name: '회전 칼날', type: CARD_TYPES.ATTACK, damage: 3, target: 'all_enemies', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '모든 적에게 3 피해 (회전 공격)' },
  { id: 'r005', name: '그림자 베기', type: CARD_TYPES.ATTACK, damage: 2, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '2 피해를 2회 빠른 공격 (총 4 피해)', hits: 2 },
  { id: 'r006', name: '연속 발차기', type: CARD_TYPES.ATTACK, damage: 1, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '1 피해를 5회 발차기 (총 5 피해)', hits: 5 },
  { id: 'r007', name: '쌍검 난무', type: CARD_TYPES.ATTACK, damage: 2, target: 'random', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '무작위 대상에 2 피해씩 3회 (총 6 피해)', hits: 3 },
  { id: 'r008', name: '뒤치기', type: CARD_TYPES.ATTACK, damage: 6, target: 'enemy', rarity: CARD_RARITY.RARE, element: 'none', description: '6 피해 (은신 상태에서만 사용 가능)', requiresStealth: true },
  { id: 'r009', name: '치명적 일격', type: CARD_TYPES.ATTACK, damage: 4, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '4 피해 + 50% 치명타 확률', critChance: 0.5 },
  { id: 'r010', name: '독 바르기', type: CARD_TYPES.UTILITY, damage: 0, target: 'self', rarity: CARD_RARITY.COMMON, element: 'grass', description: '다음 공격에 중독 효과 추가', poisonWeapon: true },
  { id: 'r011', name: '빠른 발', type: CARD_TYPES.UTILITY, damage: 0, target: 'self', rarity: CARD_RARITY.COMMON, element: 'none', description: '회피율을 20% 증가시킴', dodgeBonus: 20 },
  { id: 'r012', name: '은신', type: CARD_TYPES.UTILITY, damage: 0, target: 'self', rarity: CARD_RARITY.COMMON, element: 'none', description: '1턴간 은신 상태 (공격받지 않음)', stealth: true },
  { id: 'r013', name: '연막탄', type: CARD_TYPES.UTILITY, damage: 0, target: 'self', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '은신 진입 + 적들을 혼란 상태로', stealth: true, enemyConfuse: true },
  { id: 'r014', name: '교란', type: CARD_TYPES.UTILITY, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '적의 다음 공격을 빗나가게 함', distract: true },
  { id: 'r015', name: '속임수', type: CARD_TYPES.ATTACK, damage: 1, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '1 피해 + 다음 공격 피해 +3 증가', nextAttackBonus: 3 },

  // 상태 이상 (10장)
  { id: 'r016', name: '독액 투척', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'grass', description: '적에게 3턴간 중독 상태 부여', poison: true },
  { id: 'r017', name: '출혈 가르기', type: CARD_TYPES.ATTACK, damage: 2, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '2 피해 + 3턴간 출혈 상태', bleed: true },
  { id: 'r018', name: '실명 가루', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '적의 명중률을 크게 감소 (2턴)', blind: true },
  { id: 'r019', name: '마비 주사', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'grass', description: '적을 1턴간 마비 (행동 불가)', paralyze: true },
  { id: 'r020', name: '취약점 노리기', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '적의 방어력을 3만큼 감소', debuffDefense: 3 },
  { id: 'r021', name: '무기 파괴', type: CARD_TYPES.DEBUFF, damage: 0, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '적의 무기를 무력화 (공격력 감소)', disarm: true },
  { id: 'r022', name: '덫 설치', type: CARD_TYPES.UTILITY, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '적이 움직일 때 3 피해를 주는 덫 설치', trap: 3 },
  { id: 'r023', name: '연기 폭탄', type: CARD_TYPES.DEBUFF, damage: 0, target: 'all_enemies', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '모든 적을 실명 상태로 만듦', blind: true },
  { id: 'r024', name: '교활한 속임수', type: CARD_TYPES.UTILITY, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '적의 다음 공격을 100% 빗나가게 함', missNext: true },
  { id: 'r025', name: '독가스', type: CARD_TYPES.ATTACK, damage: 1, target: 'all_enemies', rarity: CARD_RARITY.UNCOMMON, element: 'grass', description: '모든 적에게 1 피해 + 중독', poison: true },

  // 은신 및 치명타 (10장)
  { id: 'r026', name: '그림자 속으로', type: CARD_TYPES.UTILITY, damage: 0, target: 'self', rarity: CARD_RARITY.COMMON, element: 'none', description: '1턴간 은신 상태 진입', stealth: true },
  { id: 'r027', name: '치명적인 은신', type: CARD_TYPES.UTILITY, damage: 0, target: 'self', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '은신 + 은신 중 치명타 확률 증가', stealthCrit: true },
  { id: 'r028', name: '은신 공격', type: CARD_TYPES.ATTACK, damage: 5, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '5 피해 (은신을 해제하며 공격)', breakStealth: true },
  { id: 'r029', name: '그림자 복사', type: CARD_TYPES.UTILITY, damage: 0, target: 'self', rarity: CARD_RARITY.RARE, element: 'none', description: '분신을 생성하여 추가 행동', shadowClone: true },
  { id: 'r030', name: '치명타 준비', type: CARD_TYPES.UTILITY, damage: 0, target: 'self', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '다음 공격이 반드시 치명타가 됨', guaranteedCrit: true },
  { id: 'r031', name: '치명적인 독', type: CARD_TYPES.UTILITY, damage: 0, target: 'self', rarity: CARD_RARITY.UNCOMMON, element: 'grass', description: '중독 피해를 2배로 증가시킴', poisonBonus: 2 },
  { id: 'r032', name: '속전속결', type: CARD_TYPES.ATTACK, damage: 3, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '3 피해 (적 체력 30% 이하시 치명타)', executeThreshold: 0.3 },
  { id: 'r033', name: '반사 신경', type: CARD_TYPES.UTILITY, damage: 0, target: 'self', rarity: CARD_RARITY.COMMON, element: 'none', description: '회피율을 15% 증가시킴', dodgeBonus: 15 },
  { id: 'r034', name: '죽음의 낙하', type: CARD_TYPES.ATTACK, damage: 4, target: 'enemy', rarity: CARD_RARITY.UNCOMMON, element: 'none', description: '4 피해 + 30% 치명타 확률', critChance: 0.3 },
  { id: 'r035', name: '정밀 타격', type: CARD_TYPES.ATTACK, damage: 4, target: 'enemy', rarity: CARD_RARITY.RARE, element: 'none', description: '4 피해 (반드시 치명타)', guaranteedCrit: true },

  // 함정 및 유틸리티 (5장)
  { id: 'r036', name: '덫', type: CARD_TYPES.UTILITY, damage: 3, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '즉시 3 피해 + 덫 설치', trap: 3 },
  { id: 'r037', name: '경계', type: CARD_TYPES.UTILITY, damage: 0, target: 'self', rarity: CARD_RARITY.COMMON, element: 'none', description: '덫과 은신한 적을 감지', detectTraps: true },
  { id: 'r038', name: '해제', type: CARD_TYPES.UTILITY, damage: 0, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'none', description: '적의 덫과 버프를 해제', disarmTraps: true },
  { id: 'r039', name: '재빠른 손놀림', type: CARD_TYPES.UTILITY, damage: 0, target: 'self', rarity: CARD_RARITY.COMMON, element: 'none', description: '추가 카드 1장을 뽑아 사용', drawCard: 1 },
  { id: 'r040', name: '물의 일격', type: CARD_TYPES.ATTACK, damage: 4, target: 'enemy', rarity: CARD_RARITY.COMMON, element: 'water', description: '4 물 피해 + 즉시 전투에서 탈출', escape: true }
];

// 직업별 카드 매핑
export const cardsByClass = {
  warrior: warriorCards,
  mage: mageCards,
  rogue: rogueCards
};