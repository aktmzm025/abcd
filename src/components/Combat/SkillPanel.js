import React from 'react';
import Button from '../UI/Button';
import ElementIcon from '../UI/ElementIcon';

const SkillPanel = ({ skills, onSkillSelect, disabled = false, isPlayerTurn = true }) => {
  const getSkillButtonVariant = (skill) => {
    if (skill.damage < 0) return 'success'; // 힐링 스킬
    if (skill.damage >= 10) return 'danger'; // 강력한 공격
    return 'primary'; // 일반 공격
  };

  const getSkillDescription = (skill) => {
    let description = `피해: ${skill.damage}`;

    if (skill.damage < 0) {
      description = `회복: ${Math.abs(skill.damage)}`;
    }

    if (skill.hits && skill.hits > 1) {
      description += ` (${skill.hits}회)`;
    }

    if (skill.critChance) {
      description += ` 치명타: ${Math.round(skill.critChance * 100)}%`;
    }

    if (skill.stun) {
      description += ' 기절';
    }

    if (skill.poison) {
      description += ' 독';
    }

    if (skill.slow) {
      description += ' 둔화';
    }

    return description;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h4 className="text-white font-bold mb-4 text-center">
        {isPlayerTurn ? '스킬 선택' : '적 턴 - 대기 중...'}
      </h4>

      <div className="grid grid-cols-2 gap-3">
        {skills.map((skill) => (
          <Button
            key={skill.id}
            onClick={() => onSkillSelect(skill)}
            disabled={disabled || !isPlayerTurn}
            variant={getSkillButtonVariant(skill)}
            className="p-3 h-auto"
          >
            <div>
              <div className="font-bold text-sm flex items-center justify-between">
                {skill.name}
                {skill.element && skill.element !== 'none' && (
                  <ElementIcon element={skill.element} className="w-4 h-4" />
                )}
              </div>
              <div className="text-xs mt-1 opacity-90">
                {getSkillDescription(skill)}
              </div>
              {skill.description && (
                <div className="text-xs mt-1 opacity-75 italic">
                  {skill.description}
                </div>
              )}
            </div>
          </Button>
        ))}
      </div>

      {!isPlayerTurn && (
        <div className="text-center mt-3">
          <div className="text-gray-400 text-sm">적이 행동을 준비하고 있습니다...</div>
          <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mt-2"></div>
        </div>
      )}
    </div>
  );
};

export default SkillPanel;