export const commonSkills = [
  { 
    id: 1, 
    name: '기본 공격', 
    damage: 6, 
    target: 'enemy',
    description: '기본적인 공격'
  },
  { 
    id: 2, 
    name: '강타', 
    damage: 9, 
    target: 'enemy',
    description: '강력한 일격'
  },
  { 
    id: 3, 
    name: '연속 공격', 
    damage: 4, 
    target: 'enemy', 
    hits: 2,
    description: '2번 연속 공격'
  },
  { 
    id: 4, 
    name: '치유', 
    damage: -8, 
    target: 'self',
    description: '체력을 회복'
  }
];

export const classSkills = {
  warrior: [
    { 
      id: 101, 
      name: '검격', 
      damage: 10, 
      target: 'enemy',
      description: '날카로운 검 공격'
    },
    { 
      id: 102, 
      name: '방패 밀치기', 
      damage: 5, 
      target: 'enemy', 
      stun: true,
      description: '방패로 밀쳐서 기절시킴'
    }
  ],
  rogue: [
    { 
      id: 201, 
      name: '독침', 
      damage: 6, 
      target: 'enemy', 
      poison: true,
      description: '독이 묻은 침으로 공격'
    },
    { 
      id: 202, 
      name: '기습', 
      damage: 12, 
      target: 'enemy', 
      critChance: 0.3,
      description: '은밀한 기습 공격'
    }
  ],
  mage: [
    { 
      id: 301, 
      name: '화염구', 
      damage: 11, 
      target: 'enemy',
      description: '불타는 화염구를 발사'
    },
    { 
      id: 302, 
      name: '얼음 창', 
      damage: 8, 
      target: 'enemy', 
      slow: true,
      description: '차가운 얼음 창으로 공격'
    }
  ]
};