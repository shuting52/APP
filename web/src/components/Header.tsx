import React from 'react';
import { UserCheck, Settings, HardDriveDownload } from 'lucide-react';
import { NavCard } from '../types';

interface HeaderProps {
  inSiteQuery?: string;
  onInSiteQueryChange?: (q: string) => void;
  onOpenAbout: () => void;
  onOpenCustomBackground?: () => void;
  onOpenBackup?: () => void;
  onShowToast?: (msg: string) => void;
  totalCardsCount: number;
  customCards?: NavCard[];
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAbout,
  onOpenCustomBackground,
  onOpenBackup,
  totalCardsCount
}) => {
  return (
    <header className="w-full bg-transparent backdrop-blur-md border-b border-orange-200/30 dark:border-orange-500/20 transition-colors">
      <div className="max-w-[1320px] min-h-[76px] mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        {/* Brand */}
        <div className="flex items-center gap-3 min-w-[240px]">
          <a
            href="/"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[#ff3d00] via-[#ff7a00] to-[#ffaa00] text-white text-xl sm:text-2xl font-bold tracking-wider shadow-lg shadow-orange-500/30 hover:scale-105 hover:shadow-xl transition-all cursor-pointer"
            title="陈淑婷 · 资源收藏导航"
          >
            陈淑婷
          </a>
          <div className="leading-tight">
            <h1 className="text-xl font-bold text-[var(--iiice-title)] flex items-center gap-1.5">
              <a href="/" className="hover:text-orange-600 transition-colors dynamic-brand-title">陈淑婷</a>
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-700 dark:text-orange-300 border border-orange-300/50">
                导航站
              </span>
            </h1>

            {/* Marquee Banner for 白嫖怪的互联网净土 */}
            <div className="relative overflow-hidden w-48 sm:w-56 h-5 mt-1 rounded-md bg-orange-500/10 border border-orange-300/40 flex items-center px-1">
              <div className="animate-netland-marquee flex items-center gap-4 text-[11px] font-semibold text-orange-800 dark:text-orange-200">
                <span>✨ 白嫖怪的互联网净土 · 资源免费下载 ✨</span>
                <span>✨ 白嫖怪的互联网净土 · 资源免费下载 ✨</span>
              </div>
            </div>

            <p className="text-xs text-orange-950/80 dark:text-orange-200/80 mt-1 font-medium">
              站内所有收集的资源都能免费下载 ({totalCardsCount}+精选)
            </p>
          </div>
        </div>

        {/* Action buttons (数据备份、自定义背景、关于我们) */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs text-orange-950/80 dark:text-orange-200/80 ml-auto">
          {onOpenBackup && (
            <button
              type="button"
              onClick={onOpenBackup}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              title="一键备份与恢复个人收藏及配置数据"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-300 flex items-center justify-center border border-orange-300/35 group-hover:scale-105 group-hover:bg-orange-500/25 transition-all shadow-2xs">
                <HardDriveDownload className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold">数据备份</span>
            </button>
          )}

          {onOpenCustomBackground && (
            <button
              type="button"
              onClick={onOpenCustomBackground}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              title="个性化自定义背景设置（壁纸 / 摄像头拍照 / 图片上传）"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-300 flex items-center justify-center border border-orange-300/35 group-hover:scale-105 group-hover:bg-orange-500/25 transition-all shadow-2xs">
                <Settings className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold">自定义背景</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenAbout}
            className="flex flex-col items-center gap-1 group cursor-pointer"
            title="关于陈淑婷与本站介绍"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-300 flex items-center justify-center border border-orange-300/35 group-hover:scale-105 group-hover:bg-orange-500/25 transition-all shadow-2xs">
              <UserCheck className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold">关于我们</span>
          </button>
        </div>
      </div>
    </header>
  );
};
