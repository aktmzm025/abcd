export const monsters = [
  { 
    name: '고블린', 
    attack: 1, // 가장 약한 몬스터
    hp: 20, 
    luck: 5, 
    element: 'fire',
    description: '작고 교활한 몬스터'
  },
  { 
    name: '스켈레톤', 
    attack: 2, 
    hp: 25, 
    luck: 3, 
    element: 'water',
    description: '뼈만 남은 언데드'
  },
  { 
    name: '오크', 
    attack: 3, 
    hp: 30, 
    luck: 8, 
    element: 'grass',
    description: '강인한 전사 몬스터'
  },
  { 
    name: '트롤', 
    attack: 4, 
    hp: 35, 
    luck: 6, 
    element: 'fire',
    description: '거대하고 강력한 몬스터'
  },
  { 
    name: '늑대', 
    attack: 2, 
    hp: 22, 
    luck: 12, 
    element: 'none',
    description: '빠르고 민첩한 야생동물'
  },
  { 
    name: '거미', 
    attack: 1, 
    hp: 18, 
    luck: 8, 
    element: 'grass',
    description: '독을 가진 작은 몬스터'
  }
];

export const bosses = {
  5: { 
    name: '중간 보스 - 화염 정령', 
    attack: 5, // 강한 보스
    hp: 80, 
    luck: 12, 
    element: 'fire', 
    special: 'damage_reduction',
    description: '불타는 정령의 힘을 가진 보스'
  },
  10: { 
    name: '최종 보스 - 고대 드래곤', 
    attack: 6, // 가장 강한 보스
    hp: 120, 
    luck: 15, 
    element: 'water', 
    special: 'form_change',
    description: '고대의 힘을 가진 거대한 드래곤'
  }
};