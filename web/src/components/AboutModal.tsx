import React, { useState } from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

/**
 * 关于弹窗：流体红 blob 毛玻璃卡片 (From Uiverse.io by dylanharriscameron)
 * 与设置中心、更新弹窗统一视觉风格
 */
export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [likes, setLikes] = useState(666);
  const [hasLiked, setHasLiked] = useState(false);

  if (!isOpen) return null;

  const handleCopySiteUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    onShowToast('已复制陈淑婷主页链接，欢迎推荐给朋友！');
  };

  const handleHeart = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      onShowToast('感谢您的点赞与鼓励！陈淑婷会持续更新优质资源~ ❤️');
    } else {
      onShowToast('您已经点过赞啦，十分感谢支持！');
    }
  };

  const handleBookmarkTip = () => {
    onShowToast('在电脑端按下 Ctrl + D 即可快速收藏本站！');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="blob-card w-full max-w-md" role="dialog" aria-modal="true">
        <div className="blob-card-bg" />
        <div className="blob-card-blob" />
        <div className="blob-card-inner p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-orange-300/30 mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0 shadow-md shadow-orange-500/30"
                style={{ background: 'linear-gradient(135deg, #ff2200, #ff8c00)' }}
              >
                婷
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent tracking-wide">
                  关于本站
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">陈淑婷 · 个人精选 · 站长</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="关闭关于卡片"
              title="关闭"
              className="w-8 h-8 rounded-full bg-orange-500/15 hover:bg-orange-500/30 text-orange-800 dark:text-orange-200 border border-orange-300/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="space-y-3 mb-4">
            <div className="rounded-2xl border border-orange-300/30 bg-white/40 dark:bg-white/5 p-3.5 text-[12.5px] leading-relaxed text-slate-700 dark:text-slate-200">
              <div className="font-extrabold text-sm mb-1.5" style={{ background: 'linear-gradient(135deg, #ff2200, #ff7700, #ffaa00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                数字美学 · 高效工具 · 优质资源分享
              </div>
              <p className="opacity-90">
                欢迎来到我的个人精选导航站点！我是陈淑婷，一名热爱探索前沿数字化工具与优质互联网资源的分享者。秉持"真诚分享、纯净无套路"的初心，在此汇聚全网影音视听、前沿AI、设计灵感与开发神器。
              </p>
            </div>

            <div className="rounded-xl px-3.5 py-2.5 text-[11px] leading-relaxed" style={{ background: 'rgba(255, 120, 0, 0.08)', border: '1px solid rgba(255, 140, 0, 0.25)', color: '#c2410c' }}>
              🛡️ <strong>隐私与安全承诺：</strong>全站所有个人收藏、自建卡片及偏好设置均保存在您的本地浏览器中，绝不上报个人隐私，安心畅享。
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-between gap-2 border-t border-orange-300/30 pt-3.5">
            <button
              type="button"
              onClick={handleBookmarkTip}
              className="flex items-center gap-1.5 text-[11px] font-bold text-orange-700 dark:text-orange-300 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-300/40 rounded-xl px-3 py-2 transition-all cursor-pointer"
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px]" style={{ background: 'linear-gradient(135deg, #ff3d00, #ff9100)' }}>★</span>
              Ctrl + D 收藏
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopySiteUrl}
                title="复制主页链接"
                aria-label="share"
                className="w-9 h-9 rounded-xl bg-orange-500/10 hover:bg-orange-500/25 text-orange-700 dark:text-orange-300 border border-orange-300/40 flex items-center justify-center transition-all cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleHeart}
                title="点赞支持"
                aria-label="heart"
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                  hasLiked
                    ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-400/60'
                    : 'bg-orange-500/10 hover:bg-orange-500/25 text-orange-700 dark:text-orange-300 border-orange-300/40'
                }`}
              >
                <svg viewBox="0 0 24 24" fill={hasLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              <span className="text-xs font-bold text-orange-700 dark:text-orange-300 min-w-[34px] text-center">{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
