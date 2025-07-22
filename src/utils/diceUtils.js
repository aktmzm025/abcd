import { gameConstants } from '../data/gameData';

/**
 * 주사위 굴리기 함수
 * @param {number} sides - 주사위 면 수 (기본값: 12)
 * @returns {number} 1부터 sides까지의 랜덤한 숫자
 */
export const rollDice = (sides = gameConstants.DICE_SIDES) => {
  return Math.floor(Math.random() * sides) + 1;
};

/**
 * 회피율 계산 함수 (최대 50%로 제한)
 * @param {number} luck - 행운 스탯
 * @returns {number} 회피율 (%) - 최대 50%
 */
export const calculateDodgeRate = (luck) => {
  const diceRoll = rollDice(); // 1-12
  
  // 새로운 회피율 공식: (주사위 * 2) + (행운 / 2)
  // 최대값: (12 * 2) + (20 / 2) = 24 + 10 = 34%
  // 평균값: (6.5 * 2) + (15 / 2) = 13 + 7.5 = 20.5%
  const baseRate = (diceRoll * 2) + Math.floor(luck / 2);
  
  // 최대 50%로 제한
  return Math.min(50, Math.max(5, baseRate)); // 최소 5%, 최대 50%
};

/**
 * 회피 성공 여부 판정
 * @param {number} dodgeRate - 회피율
 * @returns {boolean} 회피 성공 여부
 */
export const isAttackDodged = (dodgeRate) => {
  const dodgeRoll = Math.floor(Math.random() * 100) + 1;
  return dodgeRoll <= dodgeRate;
};

/**
 * 주사위 결과에 따른 아이콘 인덱스 반환
 * @param {number} value - 주사위 값
 * @returns {number} 아이콘 배열 인덱스 (0-5)
 */
export const getDiceIconIndex = (value) => {
  return Math.min(value - 1, 5);
};