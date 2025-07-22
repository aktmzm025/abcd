import React, { useEffect, useRef } from 'react';

const CombatLog = ({ logs, className = "" }) => {
  const logEndRef = useRef(null);

  useEffect(() => {
    // 새 로그가 추가될 때마다 스크롤을 맨 아래로
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLogStyle = (log) => {
    // 턴 정보 강조
    if (log.includes('[턴') || log.includes('=== ')) {
      return 'text-yellow-300 font-bold bg-gray-700 px-2 py-1 rounded';
    }
    // 피해 관련
    if (log.includes('피해')) {
      return 'text-red-300';
    }
    // 회복 관련
    if (log.includes('회복') || log.includes('치유')) {
      return 'text-green-300';
    }
    // 회피 관련
    if (log.includes('회피')) {
      return 'text-blue-300';
    }
    // 골드 관련
    if (log.includes('골드')) {
      return 'text-yellow-300';
    }
    // 상태효과 관련
    if (log.includes('기절') || log.includes('중독') || log.includes('빙결') || log.includes('상태효과')) {
      return 'text-purple-300 font-semibold';
    }
    // 속성 상성 관련
    if (log.includes('효과는 굉장했다') || log.includes('효과는 별로였다')) {
      return 'text-orange-300 italic';
    }
    // 처치/승리 관련
    if (log.includes('처치') || log.includes('승리')) {
      return 'text-green-400 font-semibold';
    }
    // 게임 오버
    if (log.includes('게임 오버')) {
      return 'text-red-400 font-semibold';
    }
    // 전투 시작/종료
    if (log.includes('전투를 시작') || log.includes('전투 시작') || log.includes('전투 종료')) {
      return 'text-cyan-300 font-semibold';
    }
    return 'text-gray-300';
  };

  const formatLogMessage = (log, index) => {
    // 턴 정보 추출
    const turnMatch = log.match(/\[턴 (\d+)\]/);
    if (turnMatch) {
      const turnNumber = turnMatch[1];
      const message = log.replace(/\[턴 \d+\]\s*/, '');
      return (
        <div className="flex items-center space-x-2">
          <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-bold">
            T{turnNumber}
          </span>
          <span>{message}</span>
        </div>
      );
    }

    // 전투 시작/종료 구분선
    if (log.includes('===')) {
      return (
        <div className="border-t border-yellow-400 pt-2 mt-2">
          <div className="text-center font-bold">{log}</div>
        </div>
      );
    }

    return log;
  };

  return (
    <div className={`bg-gray-900 rounded-lg p-4 ${className}`}>
      <h4 className="text-white font-bold mb-3 flex items-center">
        <span className="mr-2">⚔️</span>
        전투 로그
        <span className="ml-auto text-xs text-gray-400">
          ({logs.length}개 기록)
        </span>
      </h4>
      
      <div className="h-40 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {logs.length === 0 ? (
          <div className="text-gray-500 text-center italic">
            전투가 시작되면 로그가 표시됩니다...
          </div>
        ) : (
          logs.map((log, index) => (
            <div 
              key={index} 
              className={`text-sm p-2 rounded transition-all duration-300 ${getLogStyle(log)}`}
            >
              <span className="text-gray-500 text-xs mr-2">
                [{String(index + 1).padStart(2, '0')}]
              </span>
              {formatLogMessage(log, index)}
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
      
      {logs.length > 0 && (
        <div className="mt-2 text-xs text-gray-500 text-center flex justify-between">
          <span>총 {logs.length}개의 로그</span>
          <span>🔄 실시간 업데이트</span>
        </div>
      )}
    </div>
  );
};

export default CombatLog;