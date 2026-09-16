import React from 'react';

interface BottomFloatingNavProps {
  onGoHome: () => void;
  onOpenCategories: () => void;
  onOpenAbout: () => void;
  onShare?: () => void;
}

/**
 * 底部全息动效导航条 (首页 / 分类 / 分享 / 关于)
 * From Uiverse.io by adarshpatel111 (holographic-stack)
 * 文字色彩与全站联动：七彩橙 (Rainbow Orange)
 */
export const BottomFloatingNav: React.FC<BottomFloatingNavProps> = ({
  onGoHome,
  onOpenCategories,
  onOpenAbout,
  onShare
}) => {
  const handleShare = () => {
    if (onShare) {
      onShare();
      return;
    }
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: '陈淑婷 · 个人精选导航',
        text: '陈淑婷精选导航 - 数字美学 · 高效工具 · 优质资源分享',
        url: shareUrl
      }).catch(() => {
        // Fallback to clipboard if dismissed or failed
        navigator.clipboard.writeText(shareUrl);
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <nav
      className="holographic-nav-container"
      aria-label="底部全息导航"
    >
      <div className="holographic-stack">
        {/* 1. 首页 (Home) */}
        <div
          className="holographic-icon holo-home"
          onClick={onGoHome}
          role="button"
          tabIndex={0}
          title="返回首页"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onGoHome(); }}
        >
          <div className="holographic-ring" />
          <div className="holographic-particles" />
          <div className="holographic-pulse" />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="holo-nav-label">首页</span>
        </div>

        {/* 2. 分类 (Categories) */}
        <div
          className="holographic-icon holo-category"
          onClick={onOpenCategories}
          role="button"
          tabIndex={0}
          title="全部分类"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenCategories(); }}
        >
          <div className="holographic-ring" />
          <div className="holographic-particles" />
          <div className="holographic-pulse" />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
          </svg>
          <span className="holo-nav-label">分类</span>
        </div>

        {/* 3. 分享 (Share - 用户新要求增加) */}
        <div
          className="holographic-icon holo-share"
          onClick={handleShare}
          role="button"
          tabIndex={0}
          title="分享本站"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleShare(); }}
        >
          <div className="holographic-ring" />
          <div className="holographic-particles" />
          <div className="holographic-pulse" />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <span className="holo-nav-label">分享</span>
        </div>

        {/* 4. 关于 (About) */}
        <div
          className="holographic-icon holo-about"
          onClick={onOpenAbout}
          role="button"
          tabIndex={0}
          title="关于本站"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenAbout(); }}
        >
          <div className="holographic-ring" />
          <div className="holographic-particles" />
          <div className="holographic-pulse" />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span className="holo-nav-label">关于</span>
        </div>
      </div>
    </nav>
  );
};
