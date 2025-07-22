import React, { createContext, useContext, useReducer } from 'react';

// 초기 상태
const initialState = {
  gameState: 'menu', // menu, character_select, game, combat, event, card_reward, skill_inventory, artifact_select, artifact_inventory
  player: null,
  selectedClass: null, // 선택된 직업 저장
  currentStage: 1,
  currentLayer: 1,
  gold: 100,
  currentEnemy: null,
  currentEvent: null,
  combatLog: [],
  isPlayerTurn: true,
  diceResult: null,
  isRolling: false,
  // 카드 시스템 관련
  killCount: 0, // 몬스터 처치 수 (통계용으로 유지)
  totalTurns: 0, // 전체 게임 행동 수 (전투/이벤트 완료시에만 증가)
  skillInventory: [], // 보유한 스킬 카드들
  equippedSkills: [], // 장착된 4개 스킬
  cardRewards: [], // 보상으로 받을 수 있는 카드들 (3장)
  // 아티펙트 시스템 관련
  artifacts: [], // 보유한 아티펙트들
  artifactRewards: [], // 선택 가능한 아티펙트들
  // 상태효과 시스템
  playerStatusEffects: {}, // 플레이어 상태효과 { stun: 0, poison: 0, ... }
  enemyStatusEffects: {}, // 적 상태효과
  // 턴 시스템
  currentTurn: 1, // 현재 전투 턴 번호 (전투 내에서만 사용)
  combatStartTime: null // 전투 시작 시간
};

// 액션 타입들
const actionTypes = {
  SET_GAME_STATE: 'SET_GAME_STATE',
  SET_PLAYER: 'SET_PLAYER',
  SET_SELECTED_CLASS: 'SET_SELECTED_CLASS',
  UPDATE_PLAYER_HP: 'UPDATE_PLAYER_HP',
  SET_STAGE: 'SET_STAGE',
  SET_LAYER: 'SET_LAYER',
  ADD_GOLD: 'ADD_GOLD',
  SPEND_GOLD: 'SPEND_GOLD',
  SET_ENEMY: 'SET_ENEMY',
  UPDATE_ENEMY_HP: 'UPDATE_ENEMY_HP',
  SET_EVENT: 'SET_EVENT',
  ADD_COMBAT_LOG: 'ADD_COMBAT_LOG',
  CLEAR_COMBAT_LOG: 'CLEAR_COMBAT_LOG',
  SET_PLAYER_TURN: 'SET_PLAYER_TURN',
  SET_DICE_RESULT: 'SET_DICE_RESULT',
  SET_IS_ROLLING: 'SET_IS_ROLLING',
  RESET_GAME: 'RESET_GAME',
  GO_TO_MENU: 'GO_TO_MENU',
  // 카드 시스템 관련
  INCREMENT_KILL_COUNT: 'INCREMENT_KILL_COUNT',
  INCREMENT_TOTAL_TURNS: 'INCREMENT_TOTAL_TURNS', // 행동 완료시에만 증가
  RESET_TOTAL_TURNS: 'RESET_TOTAL_TURNS', // 카드 보상 후 리셋
  ADD_TO_SKILL_INVENTORY: 'ADD_TO_SKILL_INVENTORY',
  REMOVE_FROM_SKILL_INVENTORY: 'REMOVE_FROM_SKILL_INVENTORY',
  SET_EQUIPPED_SKILLS: 'SET_EQUIPPED_SKILLS',
  SET_CARD_REWARDS: 'SET_CARD_REWARDS',
  RESET_KILL_COUNT: 'RESET_KILL_COUNT',
  // 아티펙트 시스템 관련
  ADD_ARTIFACT: 'ADD_ARTIFACT',
  REMOVE_ARTIFACT: 'REMOVE_ARTIFACT',
  SET_ARTIFACT_REWARDS: 'SET_ARTIFACT_REWARDS',
  CLEAR_ARTIFACT_REWARDS: 'CLEAR_ARTIFACT_REWARDS',
  // 상태효과 관련
  SET_PLAYER_STATUS_EFFECT: 'SET_PLAYER_STATUS_EFFECT',
  SET_ENEMY_STATUS_EFFECT: 'SET_ENEMY_STATUS_EFFECT',
  REDUCE_STATUS_EFFECTS: 'REDUCE_STATUS_EFFECTS',
  CLEAR_STATUS_EFFECTS: 'CLEAR_STATUS_EFFECTS',
  // 턴 시스템 (전투 내 턴과 전체 행동 분리)
  INCREMENT_TURN: 'INCREMENT_TURN', // 전투 내 턴만 증가
  RESET_TURN: 'RESET_TURN',
  START_COMBAT_TIMER: 'START_COMBAT_TIMER'
};

// 리듀서 함수
const gameReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_GAME_STATE:
      return { ...state, gameState: action.payload };

    case actionTypes.SET_PLAYER:
      return { ...state, player: action.payload };

    case actionTypes.UPDATE_PLAYER_HP:
      return {
        ...state,
        player: {
          ...state.player,
          currentHp: Math.max(0, Math.min(state.player.baseHp, action.payload))
        }
      };

    case actionTypes.SET_STAGE:
      return { ...state, currentStage: action.payload };

    case actionTypes.SET_LAYER:
      return { ...state, currentLayer: action.payload };

    case actionTypes.ADD_GOLD:
      return { ...state, gold: state.gold + action.payload };

    case actionTypes.SPEND_GOLD:
      return { ...state, gold: Math.max(0, state.gold - action.payload) };

    case actionTypes.SET_ENEMY:
      return { ...state, currentEnemy: action.payload };

    case actionTypes.UPDATE_ENEMY_HP:
      return {
        ...state,
        currentEnemy: {
          ...state.currentEnemy,
          currentHp: Math.max(0, action.payload)
        }
      };

    case actionTypes.SET_EVENT:
      return { ...state, currentEvent: action.payload };

    case actionTypes.ADD_COMBAT_LOG:
      return {
        ...state,
        combatLog: [...state.combatLog, action.payload]
      };

    case actionTypes.CLEAR_COMBAT_LOG:
      return { 
        ...state, 
        combatLog: [],
        currentTurn: 1,
        playerStatusEffects: {},
        enemyStatusEffects: {}
      };

    case actionTypes.SET_PLAYER_TURN:
      return { ...state, isPlayerTurn: action.payload };

    case actionTypes.SET_DICE_RESULT:
      return { ...state, diceResult: action.payload };

    case actionTypes.SET_IS_ROLLING:
      return { ...state, isRolling: action.payload };

    case actionTypes.SET_SELECTED_CLASS:
      return { ...state, selectedClass: action.payload };

    case actionTypes.INCREMENT_KILL_COUNT:
      return { ...state, killCount: state.killCount + 1 };

    case actionTypes.RESET_KILL_COUNT:
      return { ...state, killCount: 0 };

    // 전투/이벤트 완료시에만 행동 수 증가
    case actionTypes.INCREMENT_TOTAL_TURNS:
      return { ...state, totalTurns: state.totalTurns + 1 };

    case actionTypes.RESET_TOTAL_TURNS:
      return { ...state, totalTurns: 0 };

    case actionTypes.ADD_TO_SKILL_INVENTORY:
      return { 
        ...state, 
        skillInventory: [...state.skillInventory, action.payload] 
      };

    case actionTypes.REMOVE_FROM_SKILL_INVENTORY:
      return { 
        ...state, 
        skillInventory: state.skillInventory.filter(skill => skill.id !== action.payload) 
      };

    case actionTypes.SET_EQUIPPED_SKILLS:
      return { 
        ...state, 
        equippedSkills: action.payload,
        player: {
          ...state.player,
          skills: action.payload
        }
      };

    case actionTypes.SET_CARD_REWARDS:
      return { ...state, cardRewards: action.payload };

    // 아티펙트 시스템
    case actionTypes.ADD_ARTIFACT:
      return {
        ...state,
        artifacts: [...state.artifacts, action.payload]
      };

    case actionTypes.REMOVE_ARTIFACT:
      return {
        ...state,
        artifacts: state.artifacts.filter(artifact => artifact.id !== action.payload)
      };

    case actionTypes.SET_ARTIFACT_REWARDS:
      return { ...state, artifactRewards: action.payload };

    case actionTypes.CLEAR_ARTIFACT_REWARDS:
      return { ...state, artifactRewards: [] };

    // 상태효과 관련
    case actionTypes.SET_PLAYER_STATUS_EFFECT:
      return {
        ...state,
        playerStatusEffects: {
          ...state.playerStatusEffects,
          [action.payload.effect]: action.payload.duration
        }
      };

    case actionTypes.SET_ENEMY_STATUS_EFFECT:
      return {
        ...state,
        enemyStatusEffects: {
          ...state.enemyStatusEffects,
          [action.payload.effect]: action.payload.duration
        }
      };

    case actionTypes.REDUCE_STATUS_EFFECTS:
      const newPlayerEffects = {};
      const newEnemyEffects = {};
      
      // 플레이어 상태효과 감소
      Object.keys(state.playerStatusEffects).forEach(effect => {
        const duration = state.playerStatusEffects[effect] - 1;
        if (duration > 0) {
          newPlayerEffects[effect] = duration;
        }
      });
      
      // 적 상태효과 감소
      Object.keys(state.enemyStatusEffects).forEach(effect => {
        const duration = state.enemyStatusEffects[effect] - 1;
        if (duration > 0) {
          newEnemyEffects[effect] = duration;
        }
      });

      return {
        ...state,
        playerStatusEffects: newPlayerEffects,
        enemyStatusEffects: newEnemyEffects
      };

    case actionTypes.CLEAR_STATUS_EFFECTS:
      return {
        ...state,
        playerStatusEffects: {},
        enemyStatusEffects: {}
      };

    // ✅ 핵심 수정: 전투 내 턴만 증가, totalTurns는 별도 관리
    case actionTypes.INCREMENT_TURN:
      return { 
        ...state, 
        currentTurn: state.currentTurn + 1
        // totalTurns는 여기서 증가하지 않음!
      };

    case actionTypes.RESET_TURN:
      return { ...state, currentTurn: 1 };

    case actionTypes.START_COMBAT_TIMER:
      return { ...state, combatStartTime: Date.now() };

    case actionTypes.GO_TO_MENU:
      return {
        ...state,
        gameState: 'menu',
        currentStage: 1,
        currentLayer: 1,
        currentEnemy: null,
        currentEvent: null,
        combatLog: [],
        isPlayerTurn: true,
        diceResult: null,
        isRolling: false,
        cardRewards: [],
        artifactRewards: [],
        currentTurn: 1,
        playerStatusEffects: {},
        enemyStatusEffects: {}
        // player, selectedClass, skillInventory, equippedSkills, gold, killCount, totalTurns, artifacts는 유지
      };

    case actionTypes.RESET_GAME:
      return {
        ...initialState,
        gold: 100, // 골드는 유지
        selectedClass: state.selectedClass, // 선택된 직업 유지
        skillInventory: [], // 스킬 인벤토리 초기화
        equippedSkills: [], // 장착된 스킬 초기화
        artifacts: [] // 아티펙트 초기화
      };

    default:
      return state;
  }
};

// 컨텍스트 생성
const GameContext = createContext();

// 커스텀 훅
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

// Provider 컴포넌트
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // 편의 함수들
  const nextStage = () => {
    if (state.currentStage === 10) {
      dispatch({ type: actionTypes.SET_LAYER, payload: state.currentLayer + 1 });
      dispatch({ type: actionTypes.SET_STAGE, payload: 1 });
    } else {
      dispatch({ type: actionTypes.SET_STAGE, payload: state.currentStage + 1 });
    }
  };

  const actions = {
    setGameState: (gameState) => 
      dispatch({ type: actionTypes.SET_GAME_STATE, payload: gameState }),

    setPlayer: (player) => 
      dispatch({ type: actionTypes.SET_PLAYER, payload: player }),

    updatePlayerHp: (hp) => 
      dispatch({ type: actionTypes.UPDATE_PLAYER_HP, payload: hp }),

    setStage: (stage) => 
      dispatch({ type: actionTypes.SET_STAGE, payload: stage }),

    setLayer: (layer) => 
      dispatch({ type: actionTypes.SET_LAYER, payload: layer }),

    nextStage,

    addGold: (amount) => 
      dispatch({ type: actionTypes.ADD_GOLD, payload: amount }),

    spendGold: (amount) => 
      dispatch({ type: actionTypes.SPEND_GOLD, payload: amount }),

    setEnemy: (enemy) => 
      dispatch({ type: actionTypes.SET_ENEMY, payload: enemy }),

    updateEnemyHp: (hp) => 
      dispatch({ type: actionTypes.UPDATE_ENEMY_HP, payload: hp }),

    setEvent: (event) => 
      dispatch({ type: actionTypes.SET_EVENT, payload: event }),

    addCombatLog: (message) => 
      dispatch({ type: actionTypes.ADD_COMBAT_LOG, payload: message }),

    clearCombatLog: () => 
      dispatch({ type: actionTypes.CLEAR_COMBAT_LOG }),

    setPlayerTurn: (isPlayerTurn) => 
      dispatch({ type: actionTypes.SET_PLAYER_TURN, payload: isPlayerTurn }),

    setDiceResult: (result) => 
      dispatch({ type: actionTypes.SET_DICE_RESULT, payload: result }),

    setIsRolling: (isRolling) => 
      dispatch({ type: actionTypes.SET_IS_ROLLING, payload: isRolling }),

    setSelectedClass: (classType) => 
      dispatch({ type: actionTypes.SET_SELECTED_CLASS, payload: classType }),

    goToMenu: () => 
      dispatch({ type: actionTypes.GO_TO_MENU }),

    resetGame: () => 
      dispatch({ type: actionTypes.RESET_GAME }),

    // 카드 시스템 관련
    incrementKillCount: () => 
      dispatch({ type: actionTypes.INCREMENT_KILL_COUNT }),

    resetKillCount: () => 
      dispatch({ type: actionTypes.RESET_KILL_COUNT }),

    // ✅ 행동(전투/이벤트) 완료시에만 증가하는 별도 액션
    incrementTotalTurns: () => 
      dispatch({ type: actionTypes.INCREMENT_TOTAL_TURNS }),

    resetTotalTurns: () => 
      dispatch({ type: actionTypes.RESET_TOTAL_TURNS }),

    addToSkillInventory: (skill) => 
      dispatch({ type: actionTypes.ADD_TO_SKILL_INVENTORY, payload: skill }),

    removeFromSkillInventory: (skillId) => 
      dispatch({ type: actionTypes.REMOVE_FROM_SKILL_INVENTORY, payload: skillId }),

    setEquippedSkills: (skills) => 
      dispatch({ type: actionTypes.SET_EQUIPPED_SKILLS, payload: skills }),

    setCardRewards: (cards) => 
      dispatch({ type: actionTypes.SET_CARD_REWARDS, payload: cards }),

    // 아티펙트 시스템 관련
    addArtifact: (artifact) =>
      dispatch({ type: actionTypes.ADD_ARTIFACT, payload: artifact }),

    removeArtifact: (artifactId) =>
      dispatch({ type: actionTypes.REMOVE_ARTIFACT, payload: artifactId }),

    setArtifactRewards: (artifacts) =>
      dispatch({ type: actionTypes.SET_ARTIFACT_REWARDS, payload: artifacts }),

    clearArtifactRewards: () =>
      dispatch({ type: actionTypes.CLEAR_ARTIFACT_REWARDS }),

    // 상태효과 관련
    setPlayerStatusEffect: (effect, duration) =>
      dispatch({ type: actionTypes.SET_PLAYER_STATUS_EFFECT, payload: { effect, duration } }),

    setEnemyStatusEffect: (effect, duration) =>
      dispatch({ type: actionTypes.SET_ENEMY_STATUS_EFFECT, payload: { effect, duration } }),

    reduceStatusEffects: () =>
      dispatch({ type: actionTypes.REDUCE_STATUS_EFFECTS }),

    clearStatusEffects: () =>
      dispatch({ type: actionTypes.CLEAR_STATUS_EFFECTS }),

    // ✅ 턴 시스템 (전투 내 턴만 증가)
    incrementTurn: () =>
      dispatch({ type: actionTypes.INCREMENT_TURN }),

    resetTurn: () =>
      dispatch({ type: actionTypes.RESET_TURN }),

    startCombatTimer: () =>
      dispatch({ type: actionTypes.START_COMBAT_TIMER })
  };

  return (
    <GameContext.Provider value={{ state, actions }}>
      {children}
    </GameContext.Provider>
  );
};