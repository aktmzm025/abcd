import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from '../UI/Button';

const SkillInventoryScreen = ({ 
  skillInventory, 
  equippedSkills,
  onEquipSkills,
  onGoBack,
  onGoToMenu 
}) => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  // 컴포넌트 마운트 시 현재 장착된 스킬들로 초기화
  useEffect(() => {
    setSelectedSkills(equippedSkills.map(skill => skill.id) || []);
  }, [equippedSkills]);

  const handleSkillToggle = (skill) => {
    const skillId = skill.id;
    const isSelected = selectedSkills.includes(skillId);
    
    if (isSelected) {
      // 이미 선택된 스킬을 제거
      setSelectedSkills(prev => prev.filter(id => id !== skillId));
    } else {
      // 새로운 스킬 추가 (최대 4개)
      if (selectedSkills.length < 4) {
        setSelectedSkills(prev => [...prev, skillId]);
      }
    }
  };

  const handleEquipSkills = () => {
    const skillsToEquip = skillInventory.filter(skill => 
      selectedSkills.includes(skill.id)
    );
    onEquipSkills(skillsToEquip);
  };

  const isSkillEquipped = (skillId) => {
    return selectedSkills.includes(skillId);
  };

  const getSkillsByType = () => {
    const typeOrder = ['attack', 'defense', 'buff', 'debuff', 'utility', 'special'];
    const grouped = {};
    
    skillInventory.forEach(skill => {
      if (!grouped[skill.type]) {
        grouped[skill.type] = [];
      }
      grouped[skill.type].push(skill);
    });
    
    return typeOrder.map(type => ({
      type,
      skills: grouped[type] || []
    })).filter(group => group.skills.length > 0);
  };

  const getTypeDisplayName = (type) => {
    const names = {
      attack: '공격',
      defense: '방어',
      buff: '버프',
      debuff: '디버프',
      utility: '유틸리티',
      special: '특수'
    };
    return names[type] || type;
  };

  const getTypeIcon = (type) => {
    const icons = {
      attack: '⚔️',
      defense: '🛡️',
      buff: '⬆️',
      debuff: '⬇️',
      utility: '🔧',
      special: '✨'
    };
    return icons[type] || '❓';
  };

  return (
    <div className="min-h-screen bg-gradient-blue p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={onGoBack}
            variant="secondary"
            size="md"
          >
            🔙 뒤로가기
          </Button>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              🎒 스킬 인벤토리
            </h2>
            <p className="text-gray-300">
              스킬을 선택하여 장착하세요 ({selectedSkills.length}/4)
            </p>
          </div>
          
          <Button
            onClick={onGoToMenu}
            variant="secondary"
            size="md"
          >
            🏠 메인으로
          </Button>
        </div>

        {/* 장착 확인 영역 */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-white">
              <span className="font-bold">선택된 스킬: {selectedSkills.length}/4</span>
              {selectedSkills.length === 4 && (
                <span className="text-green-400 ml-2">✓ 최대 선택</span>
              )}
            </div>
            <div className="space-x-2">
              <Button
                onClick={handleEquipSkills}
                disabled={selectedSkills.length === 0}
                variant="success"
                size="md"
              >
                스킬 장착 ({selectedSkills.length}개)
              </Button>
            </div>
          </div>
        </div>

        {/* 스킬 목록 */}
        {skillInventory.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-white mb-2">
              스킬 인벤토리가 비어있습니다
            </h3>
            <p className="text-gray-400">
              몬스터를 처치하여 새로운 스킬을 획득해보세요!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {getSkillsByType().map(({ type, skills }) => (
              <div key={type} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">{getTypeIcon(type)}</span>
                  <h3 className="text-xl font-bold text-white">
                    {getTypeDisplayName(type)} ({skills.length})
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="relative">
                      <Card
                        card={skill}
                        onClick={() => handleSkillToggle(skill)}
                        isSelected={isSkillEquipped(skill.id)}
                        showDetails={true}
                        forceBlackText={true}
                      />
                      {isSkillEquipped(skill.id) && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          선택됨
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 도움말 */}
        <div className="bg-gray-800 rounded-lg p-4 mt-6">
          <h4 className="text-white font-bold mb-2">💡 스킬 장착 가이드</h4>
          <div className="text-gray-300 text-sm space-y-1">
            <p>• 최대 4개의 스킬을 동시에 장착할 수 있습니다</p>
            <p>• 다양한 타입의 스킬을 조합하여 전략을 구성하세요</p>
            <p>• 공격 스킬은 적에게 피해를 주고, 방어 스킬은 자신을 보호합니다</p>
            <p>• 버프/디버프 스킬로 전투의 흐름을 바꿀 수 있습니다</p>
            <p>• 희귀도가 높을수록 더 강력한 효과를 가집니다</p>
            <p>• <span className="text-red-400 font-bold">연속 공격 스킬:</span> "x회 공격"으로 표시되며, 각 공격이 개별적으로 계산됩니다</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillInventoryScreen;