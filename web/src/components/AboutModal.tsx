import React, { useState } from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

/**
 * 关于弹窗页面
 * From Uiverse.io by ilkhoeri (card, corner, boxes, box-body, box-foot)
 * 融入“七彩橙” (Rainbow Orange) 艺术色彩与高互动性
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
      {/* From Uiverse.io by ilkhoeri: 弧角异形美学卡片 */}
      <div className="ilkhoeri-card" role="dialog" aria-modal="true">
        {/* 右上角独特异形角标带关闭操作按钮 */}
        <div className="ilkhoeri-corner">
          <i data-corner="tl" />
          <i data-corner="br" />
          <button
            className="action"
            type="button"
            onClick={onClose}
            aria-label="关闭关于卡片"
            title="关闭"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* 头部：站长头像与身份 */}
        <div className="ilkhoeri-boxes">
          <div
            className="img"
            style={{
              background: 'linear-gradient(135deg, #ff2200, #ff8c00)',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 800,
              boxShadow: '0 4px 12px rgba(255, 60, 0, 0.4)'
            }}
          >
            婷
          </div>
          <div className="caption">
            <div className="name">陈淑婷</div>
            <div className="as">个人精选 · 站长</div>
          </div>
        </div>

        {/* 卡片主体：介绍寄语与核心理念 */}
        <div className="ilkhoeri-box-body">
          <div className="box-content">
            <div className="caption">
              <div
                style={{
                  fontWeight: 800,
                  fontSize: '14.5px',
                  background: 'linear-gradient(135deg, #ff2200, #ff7700, #ffaa00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 1px 2px rgba(255, 80, 0, 0.25))'
                }}
              >
                数字美学 · 高效工具 · 优质资源分享
              </div>

              <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.65' }}>
                欢迎来到我的个人精选导航站点！我是陈淑婷，一名热爱探索前沿数字化工具与优质互联网资源的分享者。秉持“真诚分享、纯净无套路”的初心，在此汇聚全网影音视听、前沿AI、设计灵感与开发神器。
              </p>

              <div
                style={{
                  fontSize: '11px',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  background: 'rgba(255, 120, 0, 0.08)',
                  border: '1px solid rgba(255, 140, 0, 0.25)',
                  color: '#c2410c',
                  lineHeight: '1.5'
                }}
              >
                🛡️ <strong>隐私与安全承诺：</strong>
                全站所有个人收藏、自建卡片及偏好设置均保存在您的本地浏览器中，绝不上报个人隐私，安心畅享。
              </div>
            </div>
          </div>
        </div>

        {/* 卡片底部：专属空间与互动操作按钮 */}
        <div className="ilkhoeri-box-foot" data-title="陈淑婷专属空间">
          <div className="ilkhoeri-box-foot-figure">
            <div
              className="img"
              style={{
                width: '24px',
                height: '24px',
                fontSize: '13px',
                background: 'linear-gradient(135deg, #ff3d00, #ff9100)',
                color: '#fff',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ★
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#ea580c' }}>
              Ctrl + D 收藏
            </span>
            <button
              type="button"
              onClick={handleBookmarkTip}
              title="一键收藏提示"
              aria-label="收藏快捷提示"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="7 13 12 18 17 13" />
                <polyline points="7 6 12 11 17 6" />
              </svg>
            </button>
          </div>

          <div className="ilkhoeri-box-foot-actions">
            <button
              type="button"
              className="ilkhoeri-box-foot-action"
              onClick={handleCopySiteUrl}
              title="复制主页链接"
              aria-label="share"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </button>
            <button
              type="button"
              className="ilkhoeri-box-foot-action"
              onClick={handleHeart}
              title={`为站长点赞 (${likes})`}
              aria-label="meets"
            >
              <svg
                viewBox="0 0 24 24"
                fill={hasLiked ? '#ff3d00' : 'currentColor'}
                stroke={hasLiked ? '#ff3d00' : 'currentColor'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
