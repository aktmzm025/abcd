# 🎮 로그라이크 다이스 RPG

주사위와 함께하는 한국어 로그라이크 RPG 게임입니다. React로 제작되었으며, 직업별 특성과 속성 상성을 활용한 전략적 전투 시스템을 제공합니다.

## 🌟 주요 기능

### 캐릭터 시스템
- **3개 직업**: 전사(불), 도적(물), 마법사(풀)
- **속성 상성**: 물 → 불 → 풀 → 물 (1.5배 피해)
- **스탯 시스템**: 공격력, 체력(100), 행운

### 카드 시스템 🎴
- **직업별 카드**: 각 직업마다 40장의 고유 카드
- **카드 희귀도**: 일반(⚪), 고급(🟢), 희귀(🔵), 전설(🟣)
- **카드 타입**: 공격, 방어, 버프, 디버프, 유틸리티, 특수
- **카드 보상**: 몬스터 3마리 처치 시 3장 중 1장 선택
- **스킬 인벤토리**: 획득한 카드 보관 및 관리
- **스킬 장착**: 최대 4개의 스킬 동시 장착 가능

### 전투 시스템
- **주사위 기반**: 1d12 주사위로 회피율 결정
- **회피 공식**: (주사위 × 5) + 행운(%)
- **피해량 스케일**: 6 단위 (평균 15회 공격으로 처치)
- **카드 효과**: 다중 공격, 상태 이상, 버프/디버프 등

### 게임 진행
- **계층 시스템**: 1계층 = 10스테이지
- **보스 전투**: 5스테이지(중간보스), 10스테이지(최종보스)
- **이벤트 시스템**: 회복, 함정, 보물 등
- **진행 추적**: 처치 횟수 및 카드 보상 진행률 표시

## 🚀 설치 및 실행

### 1. 사전 요구사항
- Node.js (v16 이상)
- npm 또는 yarn

### 2. 프로젝트 설치
```bash
# 새 React 프로젝트 생성
npx create-react-app roguelike-dice-rpg
cd roguelike-dice-rpg

# 필요한 패키지 설치
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. 파일 구조 생성
다음 폴더들을 `src/` 내에 생성하세요:
```
src/
├── components/
│   ├── Menu/
│   ├── Character/
│   ├── Game/
│   ├── Combat/
│   ├── UI/
│   └── Events/
├── data/
├── hooks/
├── utils/
├── context/
└── styles/
```

### 4. 코드 복사
제공된 모든 코드 파일들을 해당 위치에 복사하세요.

### 5. 개발 서버 실행
```bash
npm start
```

브라우저에서 `http://localhost:3000`으로 접속하여 게임을 즐기세요!

## 🎯 게임 플레이 가이드

### 캐릭터 선택
1. **전사**: 높은 공격력과 체력, 불 속성
2. **도적**: 높은 행운으로 회피에 특화, 물 속성  
3. **마법사**: 강력한 마법 공격, 풀 속성

### 전투 시스템
1. **스킬 선택**: 4개의 스킬 중 하나 선택
2. **주사위 굴리기**: 자동으로 회피율 계산
3. **속성 상성 활용**: 유리한 속성으로 1.5배 피해
4. **방어 활용**: 플레이어는 기본 20% 피해 감소

### 이벤트
- **회복의 샘**: 체력 회복
- **함정**: 주사위 6 이상으로 회피 가능
- **보물 상자**: 골드 획득

## 📁 프로젝트 구조

```
src/
├── components/              # React 컴포넌트들
│   ├── Menu/               # 메뉴 관련
│   ├── Character/          # 캐릭터 선택
│   ├── Game/              # 게임 진행
│   ├── Combat/            # 전투 시스템
│   ├── UI/                # 공통 UI 컴포넌트
│   ├── Events/            # 이벤트 화면
│   └── GameManager.js     # 게임 전체 관리
├── data/                   # 게임 데이터
│   ├── elements.js        # 속성 정보
│   ├── skills.js          # 스킬 데이터
│   ├── monsters.js        # 몬스터 데이터
│   └── gameData.js        # 기본 게임 설정
├── hooks/                  # 커스텀 훅들
│   ├── useDice.js         # 주사위 관리
│   ├── useGameState.js    # 게임 상태
│   └── usePlayer.js       # 플레이어 관리
├── utils/                  # 유틸리티 함수들
│   ├── diceUtils.js       # 주사위 계산
│   ├── combatUtils.js     # 전투 계산
│   └── gameUtils.js       # 게임 로직
├── context/               # 전역 상태 관리
│   └── GameContext.js     # 게임 컨텍스트
└── styles/               # 스타일 파일
    └── globals.css       # 전역 CSS
```

## 🔧 커스터마이징

### 새 몬스터 추가
`src/data/monsters.js`에서 몬스터 배열에 추가:
```javascript
{
  name: '새 몬스터',
  attack: 10,
  hp: 30,
  luck: 5,
  element: 'fire',
  description: '설명'
}
```

### 새 스킬 추가
`src/data/skills.js`에서 해당 직업 스킬 배열에 추가:
```javascript
{
  id: 999,
  name: '새 스킬',
  damage: 8,
  target: 'enemy',
  description: '스킬 설명'
}
```

### 게임 밸런스 조정
`src/data/gameData.js`의 `gameConstants`에서 수정:
- `ELEMENTAL_DAMAGE_MULTIPLIER`: 속성 상성 배율
- `DEFAULT_DEFENSE_REDUCTION`: 기본 방어력
- `COMBAT_PROBABILITY`: 전투 확률

## 🐛 문제 해결

### 자주 발생하는 문제

**1. Tailwind CSS가 적용되지 않음**
```bash
npm run build
npm start
```

**2. 모듈을 찾을 수 없음**
```bash
rm -rf node_modules package-lock.json
npm install
```

**3. 포트 충돌**
```bash
PORT=3001 npm start
```

**4. 빌드 오류**
- 모든 파일이 올바른 위치에 있는지 확인
- import/export 구문 확인
- 오타 확인

## 🎮 게임 스크린샷

### 메인 메뉴
- 세련된 그라디언트 배경
- 골드 표시
- 게임 안내

### 캐릭터 선택
- 3개 직업 소개
- 스탯 비교
- 속성 상성 가이드

### 게임 진행
- 현재 위치 표시
- 플레이어 상태
- 스킬 목록

### 전투 화면
- 실시간 전투 로그
- 주사위 애니메이션
- 속성 상성 표시

## 🔮 향후 계획

### 우선순위 높음
- [ ] Firebase 연동 (회원가입/로그인)
- [ ] 데이터베이스 연동 (진행 상황 저장)
- [ ] 가챠 시스템 (스킨/스킬)

### 우선순위 중간
- [ ] 더 많은 몬스터와 스킬
- [ ] 아이템 시스템
- [ ] 사운드 효과

### 우선순위 낮음
- [ ] 멀티플레이어
- [ ] 모바일 앱 버전
- [ ] 3D 그래픽

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. Node.js 버전 (v16 이상)
2. 모든 패키지가 설치되었는지
3. 파일 경로가 올바른지
4. 브라우저 콘솔의 에러 메시지

## 🎉 즐거운 게임되세요!

이 게임은 학습 목적으로 제작되었습니다. 피드백과 개선 제안은 언제나 환영합니다!