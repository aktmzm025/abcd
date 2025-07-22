import React, { useState, useEffect } from 'react';

const StatusBar = ({ 
  current, 
  max, 
  label, 
  color = 'bg-green-500',
  backgroundColor = 'bg-gray-700',
  textColor = 'text-white',
  showPercentage = false,
  showNumbers = true,
  className = '',
  height = 'h-6' // 기본 높이를 더 크게
}) => {
  const [displayCurrent, setDisplayCurrent] = useState(current);
  const [isAnimating, setIsAnimating] = useState(false);

  // 값 변화 감지 및 애니메이션
  useEffect(() => {
    if (current !== displayCurrent) {
      setIsAnimating(true);
      
      // 부드러운 애니메이션을 위한 지연
      const timeout = setTimeout(() => {
        setDisplayCurrent(current);
        setIsAnimating(false);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [current, displayCurrent]);

  // 안전한 percentage 계산
  const percentage = Math.max(0, Math.min(100, max > 0 ? (displayCurrent / max) * 100 : 0));
  
  // 체력에 따른 색상 변경 (개선된 버전)
  const getHealthColor = () => {
    if (label?.includes('체력') || label?.includes('HP')) {
      if (percentage >= 70) return 'bg-green-500';
      if (percentage >= 50) return 'bg-yellow-500';
      if (percentage >= 30) return 'bg-orange-500';
      if (percentage >= 15) return 'bg-red-500';
      return 'bg-red-700'; // 매우 낮은 체력일 때 더 진한 빨간색
    }
    return color;
  };

  // 텍스트 색상 개선 (체력에 따라 적절한 대비색 사용)
  const getTextColor = () => {
    if (label?.includes('체력') || label?.includes('HP')) {
      if (percentage >= 50) return 'text-white'; // 초록, 노랑 배경에는 흰색
      return 'text-white'; // 주황, 빨강 배경에도 흰색 (더 나은 가독성)
    }
    return textColor;
  };

  // 상태 텍스트 개선
  const getHealthStatus = () => {
    if (percentage >= 80) return { text: '건강함', color: 'text-green-300' };
    if (percentage >= 60) return { text: '양호함', color: 'text-yellow-300' };
    if (percentage >= 40) return { text: '부상', color: 'text-orange-300' };
    if (percentage >= 20) return { text: '위험', color: 'text-red-300' };
    if (percentage >= 10) return { text: '치명상', color: 'text-red-400' };
    return { text: '위급', color: 'text-red-500' };
  };

  const finalColor = getHealthColor();
  const finalTextColor = getTextColor();
  const healthStatus = getHealthStatus();
  
  return (
    <div className={`${className} ${isAnimating ? 'animate-pulse' : ''}`}>
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-bold ${finalTextColor}`}>
          {label}
        </span>
        {showNumbers && (
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-bold ${finalTextColor}`}>
              {displayCurrent}/{max}
              {showPercentage && ` (${Math.round(percentage)}%)`}
            </span>
            {/* 상태 표시 개선 */}
            {(label?.includes('체력') || label?.includes('HP')) && (
              <span className={`text-xs font-medium ${healthStatus.color} bg-gray-800 px-2 py-1 rounded`}>
                {healthStatus.text}
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* 체력바 자체 */}
      <div className={`w-full ${backgroundColor} rounded-full ${height} border-2 border-gray-600 overflow-hidden relative`}>
        <div 
          className={`${finalColor} ${height} rounded-full transition-all duration-500 ease-out relative overflow-hidden`}
          style={{ 
            width: `${percentage}%`,
            minWidth: percentage > 0 ? '2px' : '0px' // 최소 너비 보장
          }}
        >
          {/* 체력바 내부 글로우 효과 */}
          <div className="absolute inset-0 bg-white opacity-20 rounded-full"></div>
          {/* 움직이는 하이라이트 효과 */}
          <div className="absolute top-0 left-0 h-2 w-full bg-white opacity-30 rounded-full"></div>
          {/* 펄스 효과 (낮은 체력일 때) */}
          {percentage <= 20 && percentage > 0 && (
            <div className="absolute inset-0 bg-white opacity-40 rounded-full animate-pulse"></div>
          )}
          
          {/* 체력바 내부 텍스트 (큰 체력바일 때) */}
          {height === 'h-8' && percentage > 15 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xs font-bold drop-shadow-lg">
                {Math.round(percentage)}%
              </span>
            </div>
          )}
        </div>
        
        {/* 배경에 희미한 그리드 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10%, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 20%)'
          }}></div>
        </div>
      </div>
      
      {/* 추가 정보 표시 */}
      {(label?.includes('체력') || label?.includes('HP')) && (
        <div className="flex justify-between items-center mt-2">
          <div className="text-center">
            <span className={`text-xs font-medium ${healthStatus.color}`}>
              {percentage.toFixed(1)}%
            </span>
            {displayCurrent <= 0 && (
              <span className="ml-2 text-red-500 font-bold animate-pulse">💀</span>
            )}
          </div>
          
          {/* 체력 변화 표시 */}
          {isAnimating && (
            <div className="text-xs text-gray-400 animate-bounce">
              📊 업데이트 중...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusBar;