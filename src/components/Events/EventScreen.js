import React from 'react';
import Button from '../UI/Button';

const EventScreen = ({ 
  event, 
  onEventChoice, 
  onGoToMenu,
  diceResult, 
  DiceComponent,
  isRolling 
}) => {
  const getEventEmoji = (eventType) => {
    switch (eventType) {
      case 'heal': return '💧';
      case 'trap': return '⚠️';
      case 'treasure': return '💰';
      default: return '❓';
    }
  };

  const getEventBackground = (eventType) => {
    switch (eventType) {
      case 'heal': return 'bg-gradient-blue';
      case 'trap': return 'bg-gradient-red';
      case 'treasure': return 'bg-gradient-game';
      default: return 'bg-gray-900';
    }
  };

  const getEventActions = () => {
    switch (event.type) {
      case 'heal':
        return (
          <Button
            onClick={() => onEventChoice('accept')}
            variant="success"
            size="lg"
          >
            샘물을 마신다
          </Button>
        );
      
      case 'trap':
        return (
          <div className="space-y-4">
            <Button
              onClick={() => onEventChoice('roll')}
              variant="warning"
              size="lg"
              disabled={isRolling}
            >
              {isRolling ? '주사위 굴리는 중...' : '주사위를 굴려 회피 시도'}
            </Button>
            <Button
              onClick={() => onEventChoice('avoid')}
              variant="secondary"
              size="md"
            >
              조심스럽게 우회한다
            </Button>
          </div>
        );
      
      case 'treasure':
        return (
          <div className="space-y-4">
            <Button
              onClick={() => onEventChoice('open')}
              variant="warning"
              size="lg"
            >
              상자를 연다
            </Button>
            <Button
              onClick={() => onEventChoice('ignore')}
              variant="secondary"
              size="md"
            >
              무시하고 지나간다
            </Button>
          </div>
        );
      
      default:
        return (
          <Button
            onClick={() => onEventChoice('continue')}
            variant="primary"
            size="lg"
          >
            계속 진행
          </Button>
        );
    }
  };

  if (!event) return null;

  return (
    <div className={`min-h-screen ${getEventBackground(event.type)} p-4`}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          {/* 이벤트 헤더 */}
          <div className="mb-6">
            <div className="text-6xl mb-4">{getEventEmoji(event.type)}</div>
            <h2 className="text-3xl font-bold text-white mb-2">{event.name}</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto rounded"></div>
          </div>

          {/* 이벤트 설명 */}
          <div className="mb-8">
            <p className="text-xl text-gray-300 leading-relaxed">
              {event.text}
            </p>
          </div>

          {/* 주사위 결과 표시 (함정 이벤트용) */}
          {event.type === 'trap' && diceResult && DiceComponent && (
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <div className="text-white mb-2">🎲 회피 주사위 결과</div>
              <div className="flex justify-center mb-2">
                {DiceComponent}
              </div>
              <div className="text-white text-xl font-bold">{diceResult}</div>
              <div className="text-gray-400 text-sm mt-2">
                {diceResult >= 6 ? '✅ 회피 성공!' : '❌ 회피 실패...'}
              </div>
            </div>
          )}

          {/* 이벤트 선택지 */}
          <div className="space-y-4 mb-6">
            {getEventActions()}
          </div>
          
          {/* 메인으로 가기 버튼 */}
          <div className="text-center">
            <Button
              onClick={onGoToMenu}
              variant="secondary"
              size="sm"
            >
              🏠 메인 메뉴로
            </Button>
          </div>

          {/* 이벤트 설명 */}
          <div className="mt-8 text-sm text-gray-400">
            {event.type === 'heal' && (
              <p>• 신비한 샘물로 체력을 회복할 수 있습니다</p>
            )}
            {event.type === 'trap' && (
              <p>• 주사위 6 이상으로 회피 성공, 실패 시 피해를 받습니다</p>
            )}
            {event.type === 'treasure' && (
              <p>• 보물 상자에는 골드가 들어있을 수 있습니다</p>
            )}
          </div>
        </div>

        {/* 이벤트 배경 장식 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 left-quarter w-1-5 h-1-5 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-third w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

export default EventScreen;