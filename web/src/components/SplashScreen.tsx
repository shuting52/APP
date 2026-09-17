import React, { useEffect, useState } from 'react';
import { SPLASH_EFFECT_ID } from '../config';

/**
 * 开屏特效（按编号对接参考图，编号见 config.ts 的 SPLASH_EFFECT_ID）：
 * 1 - Uiverse.io by Subaashbala  hideAndSeek 字母逐字弹出动画（LOADING）
 * 2 - Uiverse.io by SelfMadeSystem 双环流光加载动画（旧版开屏）
 * 3 - Uiverse.io by gogo_3618      3D 圆环旋转渐变加载动画（首页同款）
 */
const SplashScreen: React.FC = () => {
  const [phase, setPhase] = useState<'show' | 'fade' | 'hidden'>('show');
  const effectId = SPLASH_EFFECT_ID;

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('fade'), 3200);
    const t2 = window.setTimeout(() => setPhase('hidden'), 4000);
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

  const renderEffect = () => {
    // 特效 3：gogo_3618 3D 圆环旋转渐变
    if (effectId === 3) {
      return (
        <div className="flex items-center justify-center p-3 relative" aria-label="加载中">
          <div className="gogo-loader">
            <div className="gogo-circle" />
          </div>
        </div>
      );
    }

    // 特效 2：双环流光（旧版开屏）
    if (effectId === 2) {
      return (
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
      );
    }

    // 特效 1（默认）：hideAndSeek 字母逐字弹出 LOADING
    const letters = [
      { ch: 'L', cls: 'l' },
      { ch: 'O', cls: 'o' },
      { ch: 'A', cls: 'a' },
      { ch: 'D', cls: 'd' },
      { ch: 'I', cls: 'ispan' },
      { ch: 'N', cls: 'n' },
      { ch: 'G', cls: 'g' }
    ];
    return (
      <div className="splash-loading-wrap">
        <div className="loader" aria-label="加载中">
          {letters.map((item, idx) => (
            <span key={idx} className={item.cls}>
              {item.ch}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`splash-screen splash-effect-${effectId} ${phase === 'fade' ? 'splash-fade-out' : ''}`}>
      <button
        type="button"
        onClick={handleSkip}
        className="splash-skip-btn"
        aria-label="跳过开屏动画"
      >
        跳过
      </button>

      <div className="splash-content">
        {renderEffect()}

        <div className="splash-branding">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-300/40 text-orange-800 dark:text-orange-200 text-xs font-bold shadow-2xs mb-1">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span>陈淑婷 · 个人精选导航</span>
          </div>
          <h1 className="splash-title">陈淑婷专属工具箱</h1>
          <p className="splash-subtitle">数字美学 · 高效实用 · 精选全网百宝箱</p>
        </div>

        {/* 底部波浪启动按钮（参考 Uiverse.io WELCOME/SAHARA 渐变波浪按钮） */}
        <button
          type="button"
          onClick={handleSkip}
          className="splash-go-btn group"
          style={{ WebkitBoxReflect: 'below 0px linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4))' }}
          aria-label="进入应用"
        >
          <span className="splash-go-wave" />
          <span className="splash-go-text splash-go-text-front">WELCOME</span>
          <span className="splash-go-text splash-go-text-back">开始使用</span>
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
