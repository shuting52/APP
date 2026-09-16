import React, { useEffect, useState } from 'react';

/**
 * 开屏特效：Uiverse.io by SelfMadeSystem 双环流光加载动画
 * 文字以“陈淑婷”为核心内容呈现
 */
const SplashScreen: React.FC = () => {
  const [phase, setPhase] = useState<'show' | 'fade' | 'hidden'>('show');

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('fade'), 2600);
    const t2 = window.setTimeout(() => setPhase('hidden'), 3300);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const handleSkip = () => {
    setPhase('fade');
    setTimeout(() => setPhase('hidden'), 400);
  };

  if (phase === 'hidden') return null;

  return (
    <div className={`splash-screen ${phase === 'fade' ? 'splash-fade-out' : ''}`}>
      <button 
        type="button" 
        onClick={handleSkip}
        className="splash-skip-btn"
        aria-label="跳过开屏动画"
      >
        跳过
      </button>

      <div className="splash-content">
        {/* From Uiverse.io by SelfMadeSystem */}
        <div className="flex items-center justify-center p-3 relative" aria-label="加载中">
          <svg height="0" width="0" className="absolute">
            <defs>
              <linearGradient id="splash-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff3d00" />
                <stop offset="50%" stopColor="#ff9100" />
                <stop offset="100%" stopColor="#ffc107" />
              </linearGradient>
            </defs>
          </svg>
          <svg height="84" width="84" viewBox="0 0 120 120" className="drop-shadow-md">
            <circle
              className="dash"
              cx="60"
              cy="60"
              r="46"
              fill="none"
              stroke="url(#splash-grad)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle
              className="spin"
              cx="60"
              cy="60"
              r="28"
              fill="none"
              stroke="#ff7a00"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="splash-branding">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-300/40 text-orange-800 dark:text-orange-200 text-xs font-bold shadow-2xs mb-1">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span>陈淑婷 · 个人精选导航</span>
          </div>
          <h1 className="splash-title">陈淑婷专属工具箱</h1>
          <p className="splash-subtitle">数字美学 · 高效实用 · 精选全网百宝箱</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
