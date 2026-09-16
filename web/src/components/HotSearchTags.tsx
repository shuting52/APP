import React from 'react';
import { Flame, TrendingUp } from 'lucide-react';

interface HotSearchTagsProps {
  hotKeywords: { name: string; tag?: string; count: number }[];
  onSelectKeyword: (kw: string) => void;
  activeKeyword?: string;
}

export const HotSearchTags: React.FC<HotSearchTagsProps> = ({
  hotKeywords,
  onSelectKeyword,
  activeKeyword
}) => {
  if (!hotKeywords || hotKeywords.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 flex-wrap pt-2 px-1 text-xs">
      <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 font-medium shrink-0 mr-1 select-none">
        <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
        <span className="text-[11px]">热门搜索:</span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {hotKeywords.map((item, idx) => {
          const isActive = activeKeyword?.trim().toLowerCase() === item.name.toLowerCase();
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectKeyword(item.name)}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs scale-105'
                  : 'bg-white/20 dark:bg-white/10 text-slate-700 dark:text-slate-200 border border-white/20 dark:border-white/10 hover:bg-white/35 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105'
              }`}
              title={`热度指数: ${item.count} · 点击即刻筛选`}
            >
              <span>{item.name}</span>
              {item.tag && (
                <span
                  className={`px-1.5 py-0.5 rounded text-[10.5px] font-extrabold leading-none shadow-2xs ${
                    item.tag === '热' || item.tag === '火'
                      ? 'bg-rose-500 text-white animate-pulse'
                      : item.tag === '新'
                      ? 'bg-emerald-500 text-white animate-pulse'
                      : 'bg-amber-500 text-white'
                  }`}
                >
                  {item.tag}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
