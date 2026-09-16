import React, { useState } from 'react';
import {
  PlusCircle,
  Bookmark,
  HardDriveDownload,
  Video,
  Info,
  Sun,
  Moon
} from 'lucide-react';

interface QuickLinksBarProps {
  onOpenAddCustom?: () => void;
  favoritesCount?: number;
  onScrollToFavorites?: () => void;
  onOpenBackup?: () => void;
  onOpenCustomBackground?: () => void;
  onOpenAbout?: () => void;
  isDark?: boolean;
  onToggleDark?: () => void;
}

export const QuickLinksBar: React.FC<QuickLinksBarProps> = ({
  onOpenAddCustom,
  favoritesCount = 0,
  onScrollToFavorites,
  onOpenBackup,
  onOpenCustomBackground,
  onOpenAbout,
  isDark = false,
  onToggleDark
}) => {
  const [clickedKey, setClickedKey] = useState<string | null>(null);

  const handleAction = (key: string, action?: () => void) => {
    setClickedKey(key);
    setTimeout(() => setClickedKey(null), 400);
    if (action) {
      action();
    }
  };

  return (
    <div
      id="quicklinks"
      className="w-full bg-transparent border-b border-orange-200/30 select-none relative overflow-hidden"
    >
      {/* 极光流光跑道线（顶部流动的彩色光带） */}
      <div className="quicklinks-aurora-line" />

      {/* 动态胶囊核心容器 */}
      <div className="max-w-[1320px] min-h-[46px] mx-auto px-3 py-1 flex flex-wrap items-center justify-between gap-3 text-xs quicklinks-scroll-mask relative z-10 text-orange-600">
        <div className="flex items-center gap-2.5">
          {/* 左侧动态雷达声呐探头与全景流光标题 */}
          <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-slate-200/80 text-[11px] font-bold text-orange-600">
            {/* 三重声呐脉冲雷达圆点 */}
            <div className="relative flex items-center justify-center h-4 w-4 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-60" />
              <span
                className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-orange-400 opacity-40"
                style={{ animationDuration: '2s', animationDelay: '0.4s' }}
              />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-tr from-orange-600 to-amber-500 shadow-xs shadow-orange-500/50" />
            </div>

            {/* 全息流光变色标题 */}
            <span className="tracking-wide font-extrabold text-[12px] text-orange-600">
              快捷直达
            </span>

            <span className="w-1 h-1 rounded-full bg-amber-400/80 animate-ping hidden sm:inline-block" />
          </div>

          {/* 1. 自定义添加 */}
          <button
            type="button"
            onClick={() => handleAction('add', onOpenAddCustom)}
            style={{ '--chip-idx': 0 } as React.CSSProperties}
            className={`quicklink-chip shrink-0 group ${
              clickedKey === 'add' ? 'scale-95 ring-2 ring-orange-500' : ''
            }`}
            title="添加您自己的常用网站到导航卡片"
          >
            <PlusCircle className="w-3.5 h-3.5 text-orange-500 group-hover:rotate-90 transition-transform duration-300 shrink-0" />
            <span className="font-extrabold text-[12px] tracking-wide text-orange-600">
              自定义添加
            </span>
          </button>

          {/* 2. 我的收藏 */}
          <button
            type="button"
            onClick={() => handleAction('fav', onScrollToFavorites)}
            style={{ '--chip-idx': 1 } as React.CSSProperties}
            className={`quicklink-chip shrink-0 group ${
              clickedKey === 'fav' ? 'scale-95 ring-2 ring-orange-500' : ''
            }`}
            title="平滑滚动至‘我的专属收藏夹与自建网站’区域"
          >
            <Bookmark className="w-3.5 h-3.5 text-orange-500 fill-orange-500/60 group-hover:fill-orange-500 group-hover:scale-110 transition-all shrink-0" />
            <span className="font-extrabold text-[12px] tracking-wide text-orange-600">
              我的收藏
            </span>
            {favoritesCount > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-orange-100 text-orange-700 border border-orange-300/60 leading-tight">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* 3. 数据备份 */}
          <button
            type="button"
            onClick={() => handleAction('backup', onOpenBackup)}
            style={{ '--chip-idx': 2 } as React.CSSProperties}
            className={`quicklink-chip shrink-0 group ${
              clickedKey === 'backup' ? 'scale-95 ring-2 ring-orange-500' : ''
            }`}
            title="一键导出、导入及恢复个人收藏与配置数据"
          >
            <HardDriveDownload className="w-3.5 h-3.5 text-orange-500 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            <span className="font-extrabold text-[12px] tracking-wide text-orange-600">
              数据备份
            </span>
          </button>

          {/* 4. 壁纸设置 */}
          <button
            type="button"
            id="quicklinksWallpaperBtn"
            onClick={() => handleAction('wallpaper', onOpenCustomBackground)}
            style={{ '--chip-idx': 3 } as React.CSSProperties}
            className={`quicklink-chip shrink-0 group ${
              clickedKey === 'wallpaper' ? 'scale-95 ring-2 ring-orange-500' : ''
            }`}
            title="自定义壁纸设置：支持本地视频与图片上传"
          >
            <Video className="w-3.5 h-3.5 text-orange-500 group-hover:scale-110 transition-transform shrink-0" />
            <span className="font-extrabold text-[12px] tracking-wide text-orange-600">
              壁纸设置
            </span>
          </button>

          {/* 5. 关于本站 */}
          <button
            type="button"
            onClick={() => handleAction('about', onOpenAbout)}
            style={{ '--chip-idx': 4 } as React.CSSProperties}
            className={`quicklink-chip shrink-0 group ${
              clickedKey === 'about' ? 'scale-95 ring-2 ring-orange-500' : ''
            }`}
            title="查看陈淑婷导航站与站长介绍"
          >
            <Info className="w-3.5 h-3.5 text-orange-500 group-hover:scale-110 transition-transform shrink-0" />
            <span className="font-extrabold text-[12px] tracking-wide text-orange-600">
              关于本站
            </span>
          </button>

          {/* 6. 网站名字：“懒得找” */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 shadow-2xs shrink-0 select-none cursor-default hover:scale-105 transition-transform"
            title="「懒得找」官方精选导航 · 资源一键直达"
          >
            <span className="font-extrabold text-[12px] tracking-wide text-orange-600">
              懒得找
            </span>
            <span
              className="text-[9px] font-bold px-1.5 py-0.2 rounded-full text-white leading-none shadow-2xs"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
            >
              官方
            </span>
          </div>

          {/* 7. 跑马灯公告功能 */}
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 shrink-0 max-w-[280px] sm:max-w-[360px] md:max-w-[480px] overflow-hidden"
            title="最新跑马灯公告 (鼠标悬停可暂停滚动)"
          >
            <div className="flex items-center gap-1 text-orange-600 font-bold text-[11px] shrink-0">
              <span className="inline-block animate-bounce">📢</span>
              <span>公告:</span>
            </div>
            <div className="relative overflow-hidden w-full h-4 flex items-center">
              <div className="animate-netland-marquee hover:[animation-play-state:paused] flex items-center gap-8 text-[11px] font-medium text-orange-800 whitespace-nowrap cursor-default">
                <span>🎉 欢迎来到「懒得找」导航站！站内精选资源均免费直达无套路，支持一键收藏与本地/云端备份！</span>
                <span>✨ 发现失效链接或需提交新站，请点击「自定义添加」或关于本站留言！祝您使用愉快~</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧明暗模式快捷切换 */}
        {onToggleDark && (
          <div className="flex items-center shrink-0 pl-2">
            <button
              type="button"
              onClick={onToggleDark}
              className="quicklink-chip p-1.5 px-2.5 rounded-full flex items-center gap-1 text-orange-600 hover:text-orange-500"
              title={isDark ? '切换至明亮模式' : '切换至暗黑模式'}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-orange-500" />
                  <span className="text-[11px] font-medium hidden sm:inline">明亮</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-orange-500" />
                  <span className="text-[11px] font-medium hidden sm:inline">暗黑</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
