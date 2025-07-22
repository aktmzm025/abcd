import React, { useCallback, useMemo } from 'react';
import { useGameContext } from '../context/GameContext';
import { useDice } from '../hooks/useDice';

// 컴포넌트 임포트
import MainMenu from './Menu/MainMenu';
import CharacterSelect from './Character/CharacterSelect';
import GameScreen from './Game/GameScreen';
import CombatScreen from './Combat/CombatScreen';
import EventScreen from './Events/EventScreen';
import CardRewardScreen from './Card/CardRewardScreen';
import SkillInventoryScreen from './Card/SkillInventoryScreen';
import ArtifactSelectScreen from './Artifact/ArtifactSelectScreen';
import ArtifactInventoryScreen from './Artifact/ArtifactInventoryScreen';
import DiceIcon from './UI/DiceIcon';

// 유틸리티 임포트
import { createPlayer } from '../utils/gameUtils';
import { classes } from '../data/gameData';
import { cardsByClass } from '../data/card';
import {
  shouldStartCombat,
  generateRandomEvent,
  generateRandomMonster,
  generateBoss,
  getStageType,
  shouldDropArtifact,
  generateStartingArtifacts,
  generateArtifactDrop
} from '../utils/gameUtils';
import {
  calculateElementalDamage,
  calculateAttackBonus,
  applyDefense,
  getFinalDamage,
  calculateGoldReward,
  calculateDamageWithArtifacts,
  calculateDefenseWithArtifacts
} from '../utils/combatUtils';
import {
  calculateDodgeRate,
  isAttackDodged
} from '../utils/diceUtils';
import { gameConstants } from '../data/gameData';

const GameManager = () => {
  const { state, actions } = useGameContext();
  const { diceResult, isRolling, animateRoll, resetDice } = useDice();

  // 캐릭터 선택 핸들러
  const handleCharacterSelect = useCallback((classType) => {
    const classData = classes[classType];
    const newPlayer = {
      class: classType,
      ...classData,
      currentHp: classData.baseHp,
      skills: [], // 초기에는 스킬 없음
      defense: {
        name: '기본 방어',
        reduction: gameConstants.DEFAULT_DEFENSE_REDUCTION
      },
      position: {
        stage: 1,
        layer: 1
      }
    };

    // 기본 스킬 제공 (각 직업의 기본 카드 4장)
    const classCards = cardsByClass[classType];
    const basicSkills = classCards.filter(card => card.rarity === 'common').slice(0, 4);

    actions.setPlayer(newPlayer);
    actions.setSelectedClass(classType);

    // 기본 스킬을 인벤토리에 추가
    basicSkills.forEach(skill => {
      actions.addToSkillInventory(skill);
    });

    // 기본 스킬을 장착
    actions.setEquippedSkills(basicSkills);

    // 시작 아티펙트 선택지 생성
    const startingArtifacts = generateStartingArtifacts(classType);
    if (startingArtifacts.length > 0) {
      actions.setArtifactRewards(startingArtifacts);
      actions.setGameState('artifact_select');
    } else {
      actions.setGameState('game');
    }
  }, [actions]);

  // 캐릭터 변경 핸들러
  const handleChangeCharacter = useCallback(() => {
    actions.setGameState('character_select');
  }, [actions]);

  // 카드 보상 생성 함수
  const generateCardRewards = useCallback(() => {
    const selectedClass = state.selectedClass;
    if (!selectedClass) return [];

    const classCards = cardsByClass[selectedClass];
    const rewards = [];

    // 3장의 랜덤 카드 선택
    for (let i = 0; i < 3; i++) {
      let randomCard;
      let attempts = 0;

      // 중복 방지를 위한 루프
      do {
        randomCard = classCards[Math.floor(Math.random() * classCards.length)];
        attempts++;
      } while (
        rewards.some(card => card.id === randomCard.id) &&
        attempts < 50
      );

      rewards.push(randomCard);
    }

    return rewards;
  }, [state.selectedClass]);

  // 카드 선택 핸들러
  const handleCardSelect = useCallback((selectedCard) => {
    actions.addToSkillInventory(selectedCard);
    actions.resetTotalTurns(); // 카드 보상 후 totalTurns 리셋
    actions.setGameState('game');
  }, [actions]);

  // 카드 보상 건너뛰기 핸들러
  const handleSkipCardReward = useCallback(() => {
    actions.resetTotalTurns(); // 카드 보상 후 totalTurns 리셋
    actions.setGameState('game');
  }, [actions]);

  // 스킬 인벤토리 핸들러
  const handleOpenSkillInventory = useCallback(() => {
    actions.setGameState('skill_inventory');
  }, [actions]);

  // 스킬 장착 핸들러
  const handleEquipSkills = useCallback((skills) => {
    actions.setEquippedSkills(skills);
    actions.setGameState('game');
  }, [actions]);

  // 아티펙트 선택 핸들러
  const handleArtifactSelect = useCallback((selectedArtifact) => {
    actions.addArtifact(selectedArtifact);
    actions.clearArtifactRewards();
    
    // 게임 시작시 아티펙트 선택이었다면 게임 화면으로
    if (state.gameState === 'artifact_select' && state.currentStage === 1 && state.currentLayer === 1) {
      actions.setGameState('game');
    } else {
      // 일반 아티펙트 드롭이었다면 게임으로 돌아가기
      actions.setGameState('game');
    }
  }, [actions, state.gameState, state.currentStage, state.currentLayer]);

  // 아티펙트 선택 건너뛰기 핸들러
  const handleSkipArtifact = useCallback(() => {
    actions.clearArtifactRewards();
    actions.setGameState('game');
  }, [actions]);

  // 아티펙트 인벤토리 핸들러
  const handleOpenArtifactInventory = useCallback(() => {
    actions.setGameState('artifact_inventory');
  }, [actions]);

  // 메인으로 가기 핸들러
  const handleGoToMenu = useCallback(() => {
    if (window.confirm('정말로 메인 메뉴로 돌아가시겠습니까? 현재 진행사항은 저장되지 않습니다.')) {
      actions.goToMenu();
    }
  }, [actions]);

  // 스테이지 진행 핸들러
  const handleProceedStage = useCallback(() => {
    resetDice();

    if (shouldStartCombat()) {
      // 전투 시작
      const stageType = getStageType(state.currentStage);
      let enemy;

      if (stageType === 'boss' || stageType === 'mini_boss') {
        enemy = generateBoss(state.currentStage);
      } else {
        enemy = generateRandomMonster();
      }

      actions.setEnemy(enemy);
      actions.clearCombatLog();
      actions.startCombatTimer();
      actions.addCombatLog(`=== 전투 시작 ===`);
      actions.addCombatLog(`${enemy.name}과(와) 전투를 시작합니다!`);
      actions.setPlayerTurn(true);
      actions.setGameState('combat');
    } else {
      // 이벤트 시작
      const event = generateRandomEvent();
      actions.setEvent(event);
      actions.setGameState('event');
    }
  }, [state.currentStage, actions, resetDice]);

  // 상태효과 적용 함수
  const applyStatusEffects = useCallback((skill, isPlayerAttack) => {
    if (!skill.stun && !skill.poison && !skill.freeze) return;

    if (isPlayerAttack) {
      // 플레이어가 공격할 때 적에게 상태효과 적용
      if (skill.stun) {
        actions.setEnemyStatusEffect('stun', 1);
        actions.addCombatLog(`${state.currentEnemy.name}이(가) 기절했습니다! (1턴 행동 불가)`);
      }
      if (skill.poison) {
        actions.setEnemyStatusEffect('poison', 3);
        actions.addCombatLog(`${state.currentEnemy.name}이(가) 중독되었습니다! (3턴간 지속)`);
      }
      if (skill.freeze) {
        actions.setEnemyStatusEffect('freeze', 2);
        actions.addCombatLog(`${state.currentEnemy.name}이(가) 빙결되었습니다! (2턴간 행동 불가)`);
      }
    } else {
      // 적이 공격할 때 플레이어에게 상태효과 적용
      if (skill.stun) {
        actions.setPlayerStatusEffect('stun', 1);
        actions.addCombatLog(`플레이어가 기절했습니다! (1턴 행동 불가)`);
      }
    }
  }, [actions, state.currentEnemy]);

  // ✅ 수정된 전투 공격 처리 (연속 공격 지원)
  const executeAttack = useCallback((attacker, defender, skill, isPlayerAttack = true) => {
    const hitCount = skill.hits || 1; // 연속 공격 횟수 (기본값: 1)
    let totalDamage = 0;
    let totalHits = 0;
    let messages = [];

    // 각 공격마다 개별적으로 처리
    for (let hit = 1; hit <= hitCount; hit++) {
      const dodgeRate = calculateDodgeRate(defender.luck || defender.baseLuck);

      if (isAttackDodged(dodgeRate)) {
        messages.push(`공격 ${hit}/${hitCount}: ${defender.name || '플레이어'}가 회피했습니다!`);
        continue; // 이번 공격은 빗나감
      }

      // 공격이 명중
      totalHits++;
      let damage = skill.damage;

      // 아티펙트 효과 적용
      if (isPlayerAttack && state.artifacts) {
        damage = calculateDamageWithArtifacts(damage, skill, state.artifacts, defender);
      } else if (attacker.baseAttack) {
        damage += calculateAttackBonus(attacker.baseAttack);
      }

      // 속성 상성 적용
      const attackerElement = skill.element || attacker.element;
      const defenderElement = defender.element;
      const originalDamage = damage;
      damage = calculateElementalDamage(attackerElement, defenderElement, damage);

      // 방어력 적용
      if (defender.defense && !isPlayerAttack) {
        damage = calculateDefenseWithArtifacts(damage, state.artifacts);
      } else if (defender.defense && !attacker.baseAttack) {
        damage = applyDefense(damage, defender.defense.reduction);
      }

      damage = getFinalDamage(damage);
      totalDamage += damage;

      // 개별 공격 메시지
      let hitMessage = `공격 ${hit}/${hitCount}: ${damage} 피해`;
      if (damage > originalDamage) {
        hitMessage += " (효과는 굉장했다!)";
      } else if (damage < originalDamage) {
        hitMessage += " (효과는 별로였다...)";
      }
      messages.push(hitMessage);
    }

    // 상태효과 적용 (첫 번째 명중시에만)
    if (totalHits > 0) {
      applyStatusEffects(skill, isPlayerAttack);
    }

    // 최종 결과 메시지
    let finalMessage;
    if (totalHits === 0) {
      finalMessage = `${skill.name}: 모든 공격이 빗나갔습니다!`;
    } else if (hitCount > 1) {
      finalMessage = `${skill.name}: ${totalHits}/${hitCount} 명중, 총 ${totalDamage} 피해!`;
    } else {
      finalMessage = `${skill.name}: ${totalDamage} 피해!`;
    }

    return {
      hit: totalHits > 0,
      damage: totalDamage,
      hitCount: totalHits,
      maxHits: hitCount,
      message: finalMessage,
      detailedMessages: messages
    };
  }, [applyStatusEffects, state.artifacts]);

  // ✅ 스킬 선택 핸들러 - 연속 공격 로그 개선
  const handleSkillSelect = useCallback((skill) => {
    if (!state.isPlayerTurn || isRolling || !state.player || !state.currentEnemy) return;

    // 플레이어가 기절 상태인지 확인
    if (state.playerStatusEffects.stun > 0 || state.playerStatusEffects.freeze > 0) {
      actions.addCombatLog(`[턴 ${state.currentTurn}] 플레이어가 상태효과로 인해 행동할 수 없습니다!`);
      actions.setPlayerTurn(false);
      actions.incrementTurn();

      // 상태효과 감소
      actions.reduceStatusEffects();

      // 적 턴으로
      setTimeout(() => {
        handleEnemyTurn();
      }, 1500);
      return;
    }

    animateRoll((rollResult) => {
      actions.addCombatLog(`[턴 ${state.currentTurn}] 플레이어의 공격!`);

      const result = executeAttack(state.player, state.currentEnemy, skill, true);
      
      // 상세한 공격 로그 추가
      if (skill.hits && skill.hits > 1) {
        actions.addCombatLog(`🔥 ${skill.name} (${skill.hits}회 연속 공격 시도):`);
        result.detailedMessages.forEach(msg => {
          actions.addCombatLog(`  └ ${msg}`);
        });
      }
      
      actions.addCombatLog(result.message);

      if (result.hit) {
        const newEnemyHp = Math.max(0, state.currentEnemy.currentHp - result.damage);
        actions.updateEnemyHp(newEnemyHp);

        if (newEnemyHp <= 0) {
          // 적 처치
          const goldReward = calculateGoldReward(1, getStageType(state.currentStage) !== 'normal');
          actions.addCombatLog(`${state.currentEnemy.name}을(를) 처치했습니다!`);
          actions.addCombatLog(`${goldReward} 골드를 획득했습니다!`);
          
          // 아티펙트 드롭 체크
          const isBoss = getStageType(state.currentStage) !== 'normal';
          if (shouldDropArtifact(isBoss)) {
            const artifactDrop = generateArtifactDrop(state.selectedClass, state.artifacts, isBoss);
            if (artifactDrop.length > 0) {
              actions.addCombatLog(`아티펙트를 발견했습니다!`);
              setTimeout(() => {
                actions.setArtifactRewards(artifactDrop);
                actions.setGameState('artifact_select');
              }, 3000);
              return;
            }
          }
          
          actions.addCombatLog(`=== 전투 종료 ===`);
          actions.addGold(goldReward);

          // 킬 카운트는 통계용으로만 증가
          actions.incrementKillCount();
          
          // 전투 완료시에만 totalTurns 1 증가
          actions.incrementTotalTurns();
          const newTotalTurns = state.totalTurns + 1;

          setTimeout(() => {
            // 3번의 행동(전투/이벤트) 완료마다 카드 보상
            if (newTotalTurns % 3 === 0) {
              const cardRewards = generateCardRewards();
              actions.setCardRewards(cardRewards);
              actions.setGameState('card_reward');
              return;
            }

            // 일반 스테이지 진행
            if (state.currentStage === gameConstants.STAGES_PER_LAYER) {
              // 계층 클리어
              actions.updatePlayerHp(state.player.baseHp); // 체력 회복
              actions.setLayer(state.currentLayer + 1);
              actions.setStage(1);
            } else {
              actions.setStage(state.currentStage + 1);
            }

            actions.setEnemy(null);
            actions.clearCombatLog();
            actions.setGameState('game');
          }, 3000);
          return;
        }
      }

      // 적의 턴
      actions.setPlayerTurn(false);
      actions.incrementTurn();

      // 상태효과 감소
      actions.reduceStatusEffects();

      setTimeout(() => {
        handleEnemyTurn();
      }, 1500);
    });
  }, [
    state.isPlayerTurn,
    state.player,
    state.currentEnemy,
    state.currentStage,
    state.currentLayer,
    state.totalTurns,
    state.currentTurn,
    state.playerStatusEffects,
    state.artifacts,
    state.selectedClass,
    isRolling,
    actions,
    animateRoll,
    executeAttack,
    generateCardRewards
  ]);

  // 적 턴 처리
  const handleEnemyTurn = useCallback(() => {
    if (!state.currentEnemy || state.currentEnemy.currentHp <= 0 || !state.player || state.player.currentHp <= 0) {
      return;
    }

    // 적이 기절 상태인지 확인
    if (state.enemyStatusEffects.stun > 0 || state.enemyStatusEffects.freeze > 0) {
      actions.addCombatLog(`[턴 ${state.currentTurn}] ${state.currentEnemy.name}이(가) 상태효과로 인해 행동할 수 없습니다!`);

      // 플레이어 턴으로 돌아감
      setTimeout(() => {
        actions.setPlayerTurn(true);
        actions.incrementTurn();
        actions.reduceStatusEffects();
      }, 1000);
      return;
    }

    actions.addCombatLog(`[턴 ${state.currentTurn}] ${state.currentEnemy.name}의 공격!`);

    const enemySkill = {
      name: '공격',
      damage: state.currentEnemy.attack,
      element: state.currentEnemy.element
    };
    const enemyResult = executeAttack(state.currentEnemy, state.player, enemySkill, false);
    actions.addCombatLog(enemyResult.message);

    if (enemyResult.hit) {
      const newPlayerHp = Math.max(0, state.player.currentHp - enemyResult.damage);
      actions.updatePlayerHp(newPlayerHp);

      if (newPlayerHp <= 0) {
        actions.addCombatLog('게임 오버...');
        actions.addCombatLog(`=== 전투 종료 ===`);
        setTimeout(() => {
          actions.resetGame();
        }, 2000);
        return;
      }
    }

    // 플레이어 턴으로 돌아감
    setTimeout(() => {
      actions.setPlayerTurn(true);
      actions.incrementTurn();
      actions.reduceStatusEffects();
    }, 1000);
  }, [
    state.currentEnemy,
    state.player,
    state.currentTurn,
    state.enemyStatusEffects,
    actions,
    executeAttack
  ]);

  // 이벤트 선택 핸들러
  const handleEventChoice = useCallback((choice) => {
    const event = state.currentEvent;
    if (!event) return;

    switch (event.type) {
      case 'heal':
        if (choice === 'accept') {
          const healAmount = event.value();
          actions.updatePlayerHp(state.player.currentHp + healAmount);
          alert(`${healAmount} 체력을 회복했습니다!`);
        }
        break;

      case 'trap':
        if (choice === 'roll') {
          animateRoll((rollResult) => {
            if (rollResult >= 6) {
              alert('함정을 성공적으로 회피했습니다!');
            } else {
              const damage = event.value();
              actions.updatePlayerHp(state.player.currentHp - damage);
              alert(`함정에 걸려 ${damage} 피해를 받았습니다!`);
            }

            // 이벤트 완료시에만 totalTurns 1 증가
            actions.incrementTotalTurns();
            const newTotalTurns = state.totalTurns + 1;

            setTimeout(() => {
              // 3번의 행동 완료마다 카드 보상 체크
              if (newTotalTurns % 3 === 0) {
                const cardRewards = generateCardRewards();
                actions.setCardRewards(cardRewards);
                actions.setEvent(null);
                actions.setGameState('card_reward');
                resetDice();
                return;
              }

              actions.setStage(state.currentStage + 1);
              actions.setEvent(null);
              actions.setGameState('game');
              resetDice();
            }, 2000);
          });
          return;
        } else if (choice === 'avoid') {
          alert('조심스럽게 함정을 우회했습니다.');
        }
        break;

      case 'treasure':
        if (choice === 'open') {
          const goldAmount = event.value();
          actions.addGold(goldAmount);
          alert(`보물 상자에서 ${goldAmount} 골드를 발견했습니다!`);
        } else if (choice === 'ignore') {
          alert('보물 상자를 무시하고 지나갔습니다.');
        }
        break;

      default:
        break;
    }

    // 이벤트 종료 후 다음 스테이지로 (함정의 roll 선택 제외)
    if (event.type !== 'trap' || choice !== 'roll') {
      // 이벤트 완료시에만 totalTurns 1 증가
      actions.incrementTotalTurns();
      const newTotalTurns = state.totalTurns + 1;

      setTimeout(() => {
        // 3번의 행동 완료마다 카드 보상 체크
        if (newTotalTurns % 3 === 0) {
          const cardRewards = generateCardRewards();
          actions.setCardRewards(cardRewards);
          actions.setEvent(null);
          actions.setGameState('card_reward');
          return;
        }

        actions.setStage(state.currentStage + 1);
        actions.setEvent(null);
        actions.setGameState('game');
      }, 1000);
    }
  }, [state.currentEvent, state.player, state.currentStage, state.totalTurns, actions, animateRoll, resetDice, generateCardRewards]);

  // 주사위 컴포넌트 메모화
  const diceComponent = useMemo(() => {
    return diceResult ? (
      <DiceIcon value={diceResult} isRolling={isRolling} />
    ) : null;
  }, [diceResult, isRolling]);

  // 화면 렌더링
  const renderScreen = () => {
    switch (state.gameState) {
      case 'menu':
        return (
          <MainMenu
            onStartGame={() => {
              if (state.selectedClass) {
                // 이미 캐릭터가 선택되어 있으면 바로 게임 시작
                const newPlayer = createPlayer(state.selectedClass, classes[state.selectedClass]);
                actions.setPlayer(newPlayer);
                actions.setGameState('game');
              } else {
                // 캐릭터가 선택되어 있지 않으면 캐릭터 선택으로
                actions.setGameState('character_select');
              }
            }}
            onChangeCharacter={handleChangeCharacter}
            onOpenSkillInventory={handleOpenSkillInventory}
            onOpenArtifactInventory={handleOpenArtifactInventory}
            gold={state.gold}
            selectedClass={state.selectedClass}
            player={state.player}
            skillInventory={state.skillInventory}
            equippedSkills={state.equippedSkills}
            artifacts={state.artifacts}
          />
        );

      case 'character_select':
        return (
          <CharacterSelect
            onSelectCharacter={handleCharacterSelect}
            onGoToMenu={handleGoToMenu}
          />
        );

      case 'game':
        return (
          <GameScreen
            player={state.player}
            currentStage={state.currentStage}
            currentLayer={state.currentLayer}
            gold={state.gold}
            onProceedStage={handleProceedStage}
            onGoToMenu={handleGoToMenu}
            onOpenSkillInventory={handleOpenSkillInventory}
            onOpenArtifactInventory={handleOpenArtifactInventory}
            killCount={state.killCount}
            totalTurns={state.totalTurns}
            artifacts={state.artifacts}
            diceResult={diceResult}
            DiceComponent={diceComponent}
          />
        );

      case 'combat':
        return (
          <CombatScreen
            player={state.player}
            enemy={state.currentEnemy}
            combatLog={state.combatLog}
            onSkillSelect={handleSkillSelect}
            onGoToMenu={handleGoToMenu}
            isPlayerTurn={state.isPlayerTurn}
            diceResult={diceResult}
            DiceComponent={diceComponent}
            isRolling={isRolling}
            currentTurn={state.currentTurn}
            playerStatusEffects={state.playerStatusEffects}
            enemyStatusEffects={state.enemyStatusEffects}
          />
        );

      case 'event':
        return (
          <EventScreen
            event={state.currentEvent}
            onEventChoice={handleEventChoice}
            onGoToMenu={handleGoToMenu}
            diceResult={diceResult}
            DiceComponent={diceComponent}
            isRolling={isRolling}
          />
        );

      case 'card_reward':
        return (
          <CardRewardScreen
            cardRewards={state.cardRewards}
            onSelectCard={handleCardSelect}
            onSkip={handleSkipCardReward}
            totalTurns={state.totalTurns}
          />
        );

      case 'skill_inventory':
        return (
          <SkillInventoryScreen
            skillInventory={state.skillInventory}
            equippedSkills={state.equippedSkills}
            onEquipSkills={handleEquipSkills}
            onGoBack={() => actions.setGameState('game')}
            onGoToMenu={handleGoToMenu}
          />
        );

      case 'artifact_select':
        return (
          <ArtifactSelectScreen
            artifactRewards={state.artifactRewards}
            onSelectArtifact={handleArtifactSelect}
            onSkip={handleSkipArtifact}
            isStartSelection={state.currentStage === 1 && state.currentLayer === 1 && !state.player}
          />
        );

      case 'artifact_inventory':
        return (
          <ArtifactInventoryScreen
            artifacts={state.artifacts}
            onGoBack={() => actions.setGameState('game')}
            onGoToMenu={handleGoToMenu}
          />
        );

      default:
        return (
          <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-white text-2xl">Loading...</div>
          </div>
        );
    }
  };

  return (
    <div className="game-container">
      {renderScreen()}
    </div>
  );
};

export default GameManager;