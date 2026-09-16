import React from 'react';
import { NavCard } from '../types';
import { Globe, ShieldCheck, Sparkles, MousePointerClick } from 'lucide-react';
import { getCardDailyClickCount } from '../utils/cardClicks';

interface CardPreviewModalProps {
  card: NavCard | null;
  position: { top: number; left: number; placeAbove: boolean };
  isFavorite: boolean;
  onToggleFavorite: (card: NavCard) => void;
  onCopyUrl: (url: string, title: string) => void;
}

export const CardPreviewModal: React.FC<CardPreviewModalProps> = ({
  card,
  position,
  isFavorite,
  onToggleFavorite,
  onCopyUrl
}) => {
  if (!card) return null;

  // Derive domain from URL
  let domain = card.fallbackDomain || '';
  try {
    const u = new URL(card.url);
    domain = u.hostname;
  } catch {
    // ignore
  }

  const fallbackLetter = card.fallbackText || card.title.slice(0, 1) || '网';
  const desc = card.desc || '精选优质互联网站点，绿色无弹窗极速访问，点击可直接跳转到官方正版主页。';
  const clickCount = getCardDailyClickCount(card.id, card.title);

  return (
    <div
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 60
      }}
      className="w-72 sm:w-80 pointer-events-none animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="bg-white/80 dark:bg-stone-900/85 border border-orange-300/40 dark:border-orange-500/30 rounded-2xl p-3.5 shadow-2xl shadow-orange-950/15 backdrop-blur-xl">
        {/* Header with icon & title */}
        <div className="flex items-start justify-between gap-2.5 pb-2.5 mb-2 border-b border-orange-200/30 dark:border-orange-500/20">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-orange-500/10 dark:bg-orange-500/20 border border-orange-300/30 dark:border-orange-500/30">
              {card.icon ? (
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-6 h-6 object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                  {fallbackLetter}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <h4 className="text-sm font-extrabold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 dark:from-orange-400 dark:via-amber-300 dark:to-orange-400 bg-clip-text text-transparent truncate flex items-center gap-1.5">
                <span>{card.title}</span>
                {card.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500">
                    {card.badge}
                  </span>
                )}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1 mt-0.5">
                <Globe className="w-3 h-3 text-orange-400" />
                <span>{domain || card.url}</span>
              </p>
            </div>
          </div>

          <span className="shrink-0 flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 px-1.5 py-0.5 rounded-full font-medium">
            <ShieldCheck className="w-3 h-3" />
            <span>已验安全</span>
          </span>
        </div>

        {/* Description body */}
        <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2.5">
          {desc}
        </div>

        {/* Dynamic today click count: 今日点击 <span>count</span> 次 */}
        <div className="mb-2 px-2.5 py-1.5 rounded-lg bg-orange-500/10 dark:bg-orange-500/15 border border-orange-300/30 dark:border-orange-500/20 flex items-center justify-between text-xs text-orange-800 dark:text-orange-200">
          <span className="flex items-center gap-1 font-medium">
            <MousePointerClick className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            <span>今日热度统计:</span>
          </span>
          <span className="font-semibold text-rose-600 dark:text-rose-400">
            今日点击 <strong className="text-sm font-extrabold underline">{clickCount}</strong> 次
          </span>
        </div>

        {/* Card Footer badges */}
        <div className="flex items-center justify-between pt-2 border-t border-orange-200/30 dark:border-orange-500/20 text-[11px]">
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <Sparkles className="w-3 h-3 text-orange-500" />
            <span>点击卡片快速直达</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                isFavorite
                  ? 'bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-300/40'
                  : 'bg-stone-200/50 dark:bg-stone-800/60 text-slate-600 dark:text-slate-400'
              }`}
            >
              {isFavorite ? '★ 已在收藏夹' : '可一键星标'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
