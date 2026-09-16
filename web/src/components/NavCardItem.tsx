import React, { useState, useRef, useEffect } from 'react';
import { NavCard } from '../types';
import { Star, Copy, Check } from 'lucide-react';
import { recordKeywordHit } from '../utils/hotKeywords';
import { recordCardClick, getCardDailyClickCount } from '../utils/cardClicks';

interface NavCardItemProps {
  card: NavCard;
  isFavorite: boolean;
  onToggleFavorite: (card: NavCard) => void;
  onCopyUrl: (url: string, title: string) => void;
  onCardHoverStart?: (card: NavCard, rect: DOMRect) => void;
  onCardHoverEnd?: () => void;
  onCardClick?: (card: NavCard) => void;
  isEditMode?: boolean;
  isSelected?: boolean;
  onToggleSelect?: (card: NavCard) => void;
}

export const NavCardItem: React.FC<NavCardItemProps> = ({
  card,
  isFavorite,
  onToggleFavorite,
  onCopyUrl,
  onCardHoverStart,
  onCardHoverEnd,
  onCardClick,
  isEditMode = false,
  isSelected = false,
  onToggleSelect
}) => {
  const [imgErrorStage, setImgErrorStage] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [dailyClicks, setDailyClicks] = useState<number>(() =>
    getCardDailyClickCount(card.id, card.title)
  );
  const cardRef = useRef<HTMLAnchorElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 3-tier fallback icon logic
  const handleImgError = () => {
    if (imgErrorStage === 0 && card.fallbackDomain) {
      setImgErrorStage(1); // Try iowen favicon
    } else {
      setImgErrorStage(2); // Fallback to character badge
    }
  };

  const getImgSrc = () => {
    if (imgErrorStage === 0 && card.icon) {
      return card.icon;
    }
    if (imgErrorStage === 1 && card.fallbackDomain) {
      return `https://api.iowen.cn/favicon/${card.fallbackDomain}.png`;
    }
    return '';
  };

  const fallbackLetter = card.fallbackText || card.title.slice(0, 1) || '网';

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCopyUrl(card.url, card.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(card);
  };

  // 1-second hover timer for preview modal
  const handleMouseEnter = () => {
    if (isEditMode) return;
    // Refresh click count on hover
    setDailyClicks(getCardDailyClickCount(card.id, card.title));

    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

    hoverTimerRef.current = setTimeout(() => {
      if (cardRef.current && onCardHoverStart) {
        const rect = cardRef.current.getBoundingClientRect();
        onCardHoverStart(card, rect);
      }
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (onCardHoverEnd) {
      onCardHoverEnd();
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (isEditMode) {
      e.preventDefault();
      e.stopPropagation();
      if (onToggleSelect) onToggleSelect(card);
      return;
    }

    // Click count request (+1) with keepalive simulation
    const updatedClicks = recordCardClick(card.id, card.title, card.url, card.subcatId);
    setDailyClicks(updatedClicks);

    // Record click count for popular search keywords
    recordKeywordHit(card.title, 2);
    if (onCardClick) onCardClick(card);
  };

  // Determine badge text variations
  const isNew = card.badge === '新' || card.badge === 'NEW';
  const rawBadge = card.badge || '';
  const badgeTextFull = rawBadge === '推'
    ? '推荐'
    : rawBadge === '热'
    ? '热门'
    : rawBadge === '火'
    ? '火爆'
    : rawBadge === '新'
    ? 'NEW'
    : rawBadge;

  // Clear legible font size: comfortable 10px-10.5px so 100% of characters are distinct and readable
  const badgeLen = badgeTextFull.length;
  const badgeFontSize = badgeLen >= 5 ? '9.5px' : '10.5px';

  return (
    <div className="relative group/card min-w-0">
      <a
        ref={cardRef}
        href={isEditMode ? undefined : card.url}
        target={isEditMode ? undefined : "_blank"}
        rel={isEditMode ? undefined : "external nofollow noopener"}
        title={isEditMode ? `点击勾选/取消: ${card.title}` : `${card.title} - 今日点击 ${dailyClicks} 次`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`nav-card-item h-10 rounded-lg border px-2.5 flex items-center gap-2 transition-all duration-200 relative ${
          isEditMode
            ? isSelected
              ? 'bg-blue-500/20 border-blue-500 ring-2 ring-blue-500 shadow-sm cursor-pointer'
              : 'border-white/25 dark:border-white/15 hover:border-blue-400 cursor-pointer opacity-90 hover:opacity-100'
            : 'hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl active:scale-95 card-dynamic-border'
        }`}
      >
        {/* Edit mode checkbox */}
        {isEditMode && (
          <div
            className={`w-4 h-4 rounded shrink-0 flex items-center justify-center border transition-all ${
              isSelected
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-white/80 dark:bg-slate-800/80 border-slate-400 dark:border-slate-600'
            }`}
          >
            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
        )}

        {/* 竖向绑扣在边框上的织带角标 */}
        {!isEditMode && card.badge && (
          <span
            className={`navcat-badge ${isNew ? 'navcat-badge-new' : ''}`}
            aria-label={badgeTextFull}
            title={badgeTextFull}
          >
            <span className="ribbon-knot" aria-hidden="true" />
            <span
              className="ribbon-text"
              style={{ fontSize: badgeFontSize }}
            >
              {badgeTextFull}
            </span>
          </span>
        )}

        {/* Favicon / Letter Badge */}
        <div className="card-favicon-dynamic relative w-5 h-5 shrink-0 flex items-center justify-center rounded overflow-hidden transition-all duration-200 group-hover/card:scale-110 ml-0.5">
          {imgErrorStage < 4 && getImgSrc() ? (
            <img
              src={getImgSrc()}
              alt={card.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={handleImgError}
              className="w-5 h-5 rounded object-cover"
            />
          ) : (
            <div className="w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold bg-white/30 text-blue-800 dark:bg-white/15 dark:text-blue-200">
              {fallbackLetter}
            </div>
          )}
        </div>

        {/* Title with theme-adaptive contrast and dynamic gradient */}
        <span
          className={`min-w-0 flex-1 truncate font-extrabold text-[12px] tracking-wide transition-all duration-200 ${
            card.isTitleRed ? 'dynamic-text-red' : 'dynamic-text-card'
          }`}
        >
          {card.title}
        </span>

        {/* Quick action buttons on hover */}
        <div className="hidden group-hover/card:flex items-center gap-1 shrink-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xs pl-1 z-10 rounded animate-in fade-in duration-150">
          <button
            type="button"
            onClick={handleFav}
            className="p-1 rounded hover:bg-white/50 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 hover:text-amber-500 cursor-pointer transition-colors"
            title={isFavorite ? '取消收藏' : '收藏此网站'}
          >
            <Star className={`w-3 h-3 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 rounded hover:bg-white/50 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 hover:text-blue-500 cursor-pointer transition-colors"
            title="复制网址"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </a>
    </div>
  );
};
