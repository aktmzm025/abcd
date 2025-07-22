import React from 'react';
import { classes } from '../../data/gameData';
import { elements } from '../../data/elements';
import ElementIcon from '../UI/ElementIcon';
import Button from '../UI/Button';

const CharacterSelect = ({ onSelectCharacter }) => {
  return (
    <div className="min-h-screen bg-gradient-purple p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          직업 선택
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(classes).map(([key, classData]) => (
            <div 
              key={key} 
              className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition-colors transform scale-105"
            >
              <div className="mb-4">
                <ElementIcon 
                  element={classData.element} 
                  className="w-16 h-16 mx-auto mb-4" 
                />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {classData.name}
                </h3>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-gray-300">속성:</span>
                  <ElementIcon 
                    element={classData.element} 
                    showName={true}
                  />
                </div>
              </div>
              
              <div className="space-y-2 text-left mb-6 bg-gray-900 p-4 rounded">
                <div className="flex justify-between">
                  <span className="text-gray-300">공격력:</span>
                  <span className="text-red-400 font-bold">{classData.baseAttack}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">체력:</span>
                  <span className="text-green-400 font-bold">{classData.baseHp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">행운:</span>
                  <span className="text-yellow-400 font-bold">{classData.baseLuck}</span>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4 min-h-10">
                {classData.description}
              </p>
              
              <Button
                onClick={() => onSelectCharacter(key)}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {classData.name} 선택
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-gray-800 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">속성 상성 시스템</h3>
            <div className="text-gray-300 mb-4">
              <p>• 모든 캐릭터는 무속성이지만, 스킬에는 속성이 있습니다</p>
              <p>• 스킬의 속성에 따라 데미지가 달라집니다</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {Object.entries(elements).filter(([key]) => key !== 'none').map(([key, element]) => (
                <div key={key} className="bg-gray-900 p-3 rounded">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <ElementIcon element={key} />
                    <span className="text-white font-medium">{element.name}</span>
                  </div>
                  <div className="text-gray-300 text-center">
                    <ElementIcon element={element.strength} showName={true} />
                    <span className="text-xs"> 에게 강함 (1.5배)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelect;