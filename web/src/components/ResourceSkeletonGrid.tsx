import React from 'react';

interface ResourceSkeletonGridProps {
  cardCount?: number;
  categoryTitle?: string;
}

export const ResourceSkeletonGrid: React.FC<ResourceSkeletonGridProps> = ({
  cardCount = 8,
  categoryTitle = '正在加载内容...'
}) => {
  return (
    <div className="w-full space-y-3 animate-content-fade-in pointer-events-none select-none">
      {/* Skeleton Category Section */}
      <div className="bg-[var(--section-bg)] border border-slate-200/80 dark:border-slate-800 rounded-xl p-3.5 shadow-xs">
        {/* Header bar skeleton */}
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500/60 animate-pulse" />
            <div className="h-5 w-28 rounded-md skeleton-shimmer" />
            <div className="h-4 w-12 rounded-md skeleton-shimmer opacity-60" />
          </div>

          <div className="flex items-center gap-1.5 overflow-hidden">
            <div className="h-6 w-14 rounded-full skeleton-shimmer" />
            <div className="h-6 w-16 rounded-full skeleton-shimmer" />
            <div className="h-6 w-14 rounded-full skeleton-shimmer hidden sm:block" />
          </div>
        </div>

        {/* Card grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2.5">
          {Array.from({ length: cardCount }).map((_, idx) => (
            <div
              key={idx}
              className="bg-[var(--card-bg)] border border-slate-200/60 dark:border-slate-800/80 rounded-xl p-2.5 flex flex-col justify-between h-[68px] relative overflow-hidden"
            >
              <div className="flex items-center gap-2">
                {/* Favicon placeholder */}
                <div className="w-5 h-5 rounded-md skeleton-shimmer shrink-0" />
                {/* Title placeholder */}
                <div className="flex-1 space-y-1">
                  <div
                    className="h-3.5 rounded skeleton-shimmer"
                    style={{ width: `${60 + (idx % 4) * 10}%` }}
                  />
                </div>
              </div>

              {/* Desc placeholder */}
              <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-100 dark:border-slate-800/60">
                <div className="h-2.5 w-3/4 rounded skeleton-shimmer opacity-70" />
                <div className="w-3 h-3 rounded-full skeleton-shimmer opacity-50 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second subtle skeleton section for multi-category transitions */}
      <div className="bg-[var(--section-bg)] border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-3.5 shadow-xs opacity-70">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-400/50" />
          <div className="h-5 w-24 rounded-md skeleton-shimmer" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2.5">
          {Array.from({ length: Math.min(cardCount, 8) }).map((_, idx) => (
            <div
              key={idx}
              className="bg-[var(--card-bg)] border border-slate-200/50 dark:border-slate-800/60 rounded-xl p-2.5 flex flex-col justify-between h-[68px]"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md skeleton-shimmer shrink-0" />
                <div className="h-3.5 w-16 rounded skeleton-shimmer" />
              </div>
              <div className="h-2.5 w-12 rounded skeleton-shimmer opacity-60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
