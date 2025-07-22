import { monsters, bosses } from '../data/monsters';
import { commonSkills, classSkills } from '../data/skills';
import { gameConstants } from '../data/gameData';
import { getArtifactsByClass, getRandomArtifacts } from '../data/artifacts'; // 파일명 수정됨

/**
 * 랜덤 몬스터 생성
 * @returns {Object} 생성된 몬스터 객체
 */
export const generateRandomMonster = () => {
  const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
  const hpVariation = Math.floor(Math.random() * 10) - 5; // ±5 랜덤
  
  return {
    ...randomMonster,
    hp: Math.max(1, randomMonster.hp + hpVariation),
    currentHp: Math.max(1, randomMonster.hp + hpVariation)
  };
};

/**
 * 보스 몬스터 생성
 * @param {number} stage - 현재 스테이지
 * @returns {Object} 생성된 보스 객체
 */
export const generateBoss = (stage) => {
  const boss = { ...bosses[stage] };
  boss.currentHp = boss.hp;
  return boss;
};

/**
 * 플레이어 캐릭터 생성
 * @param {string} classType - 직업 타입
 * @param {Object} classData - 직업 데이터
 * @returns {Object} 생성된 플레이어 객체
 */
export const createPlayer = (classType, classData) => {
  return {
    class: classType,
    ...classData,
    currentHp: classData.baseHp,
    skills: [], // 초기에는 스킬 없음 - 카드로 획득
    defense: { 
      name: '기본 방어', 
      reduction: gameConstants.DEFAULT_DEFENSE_REDUCTION 
    },
    position: { 
      stage: 1, 
      layer: 1 
    }
  };
};

/**
 * 전투 여부 결정
 * @returns {boolean} true면 전투, false면 이벤트
 */
export const shouldStartCombat = () => {
  return Math.random() < gameConstants.COMBAT_PROBABILITY;
};

/**
 * 스테이지 타입 확인
 * @param {number} stage - 현재 스테이지
 * @returns {string} 스테이지 타입 ('boss', 'mini_boss', 'normal')
 */
export const getStageType = (stage) => {
  if (stage === gameConstants.FINAL_BOSS_STAGE) return 'boss';
  if (stage === gameConstants.MINI_BOSS_STAGE) return 'mini_boss';
  return 'normal';
};

/**
 * 전투 난이도 계산
 * @param {number} stage - 현재 스테이지
 * @returns {string} 난이도 ('easy', 'normal', 'hard')
 */
export const getCombatDifficulty = (stage) => {
  if (stage >= 1 && stage <= 3) return 'easy';
  if (stage >= 4 && stage <= 7) return 'normal';
  if (stage >= 8 && stage <= 9) return 'hard';
  return 'normal';
};

/**
 * 이벤트 생성
 * @returns {Object} 랜덤 이벤트 객체
 */
export const generateRandomEvent = () => {
  const events = [
    { 
      type: 'heal', 
      name: '회복의 샘',
      text: '신비로운 샘을 발견했습니다!', 
      effect: 'heal',
      value: () => Math.floor(Math.random() * 20) + 15
    },
    { 
      type: 'trap', 
      name: '함정',
      text: '위험한 함정을 발견했습니다! 주사위를 굴려 회피하세요!', 
      effect: 'trap',
      value: () => Math.floor(Math.random() * 15) + 5
    },
    { 
      type: 'treasure', 
      name: '보물 상자',
      text: '반짝이는 보물 상자를 발견했습니다!', 
      effect: 'gold',
      value: () => Math.floor(Math.random() * 30) + 20
    }
  ];
  
  return events[Math.floor(Math.random() * events.length)];
};

/**
 * 아티펙트 드롭 확률 계산
 * @param {boolean} isBoss - 보스 여부
 * @returns {boolean} 드롭 여부
 */
export const shouldDropArtifact = (isBoss = false) => {
  if (isBoss) return true; // 보스는 100% 드롭
  return Math.random() < 0.1; // 일반 몬스터는 10% 확률
};

/**
 * 게임 시작시 직업별 아티펙트 선택지 생성
 * @param {string} playerClass - 플레이어 직업
 * @returns {Array} 3개의 아티펙트 선택지
 */
export const generateStartingArtifacts = (playerClass) => {
  try {
    // 해당 직업 전용 아티펙트만 필터링
    const classArtifacts = getArtifactsByClass(playerClass).filter(
      artifact => artifact.classRestriction === playerClass
    );
    
    if (classArtifacts.length < 3) {
      console.warn(`${playerClass} 클래스 전용 아티펙트가 3개 미만입니다.`);
      return classArtifacts;
    }
    
    // 랜덤하게 3개 선택
    const shuffled = [...classArtifacts].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  } catch (error) {
    console.error('Starting artifacts generation failed:', error);
    return [];
  }
};

/**
 * 몬스터 처치시 아티펙트 드롭 생성
 * @param {string} playerClass - 플레이어 직업
 * @param {Array} ownedArtifacts - 이미 보유한 아티펙트들
 * @param {boolean} isBoss - 보스 여부
 * @returns {Array} 선택 가능한 아티펙트들
 */
export const generateArtifactDrop = (playerClass, ownedArtifacts = [], isBoss = false) => {
  try {
    const ownedIds = ownedArtifacts.map(artifact => artifact.id);
    const count = isBoss ? 3 : 1; // 보스는 3개 선택지, 일반은 1개
    
    return getRandomArtifacts(playerClass, ownedIds, count);
  } catch (error) {
    console.error('Artifact drop generation failed:', error);
    return [];
  }
};