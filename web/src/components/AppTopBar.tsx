import React, { useState } from 'react';
import { APP_CONFIG } from '../config';
import {
  Users,
  Settings,
  CheckSquare,
  Sun,
  Moon,
  Image as ImageIcon,
  DatabaseBackup,
  Info
} from 'lucide-react';

interface AppTopBarProps {
  isDark: boolean;
  onToggleDark: () => void;
  onOpenCustomBackground: () => void;
  onOpenBackup: () => void;
  onOpenAbout: () => void;
  isEditMode?: boolean;
  onToggleEditMode?: () => void;
}

/**
 * 国风顶栏：印章 + 应用名 + 官方群 + 编辑模式 + 设置
 * 样式依赖 index.css 中的 .app-topbar / .tb-bar / .tb-seal
 */
export const AppTopBar: React.FC<AppTopBarProps> = ({
  isDark,
  onToggleDark,
  onOpenCustomBackground,
  onOpenBackup,
  onOpenAbout,
  isEditMode = false,
  onToggleEditMode
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="app-topbar sticky top-0 z-50 w-full">
        <div className="tb-bar">
          <div className="flex items-center gap-2 min-w-0">
            <span className="tb-seal">懒</span>
            <span className="text-sm sm:text-base font-black tracking-[4px] text-[#ffd700] font-kai truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
              {APP_CONFIG.appName}
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#ffd700]/15 text-[#ffd700] border border-[#ffd700]/40 shrink-0">
              官方
            </span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* 官方群入口 */}
            <button
              type="button"
              onClick={() => {
                try {
                  const qqUrl = APP_CONFIG.officialGroup.qqGroupUrl;
                  if (qqUrl) {
                    window.open(qqUrl, '_blank', 'noopener');
                  }
                } catch {
                  // 忽略打开失败
                }
              }}
              className="flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-[#ffd700]/15 border border-[#ffd700]/50 text-[#ffd700] text-xs font-bold hover:bg-[#ffd700]/30 hover:scale-105 hover:shadow-md transition-all cursor-pointer shrink-0 shadow-sm"
              title={`加入${APP_CONFIG.officialGroup.groupName}`}
            >
              <Users className="w-3.5 h-3.5" />
              官方群
            </button>

            {/* 编辑模式入口（位于官方群之后） */}
            {onToggleEditMode && (
              <button
                type="button"
                onClick={onToggleEditMode}
                className={`flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 shadow-sm border ${
                  isEditMode
                    ? 'bg-[#ffd700]/30 border-[#ffd700]/80 text-[#ffd700]'
                    : 'bg-white/10 border-white/30 text-[#ffd700]/90 hover:bg-white/20'
                }`}
                title={isEditMode ? '退出批量管理编辑模式' : '开启卡片批量编辑模式（勾选卡片并批量收藏或删除）'}
              >
                <CheckSquare className="w-3.5 h-3.5" />
                {isEditMode ? '退出编辑' : '编辑模式'}
              </button>
            )}

            {/* 设置入口 */}
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-white/10 border border-white/30 text-[#ffd700]/90 text-xs font-bold hover:bg-white/20 transition-all cursor-pointer shrink-0 shadow-sm"
              title="设置"
            >
              <Settings className="w-3.5 h-3.5" />
              设置
            </button>
          </div>
        </div>
      </div>

      {/* 设置弹窗：列表形式 + 流体红 blob 毛玻璃卡片 (From Uiverse.io by dylanharriscameron) */}
      {settingsOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSettingsOpen(false);
          }}
        >
          <div className="blob-card w-full max-w-md" role="dialog" aria-modal="true">
            <div className="blob-card-bg" />
            <div className="blob-card-blob" />
            <div className="blob-card-inner p-5 sm:p-6">
              <div className="flex items-center justify-between pb-3.5 border-b border-orange-300/30 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ff3d00] to-[#ff9100] text-white flex items-center justify-center shadow-md shadow-orange-500/30 shrink-0">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent tracking-wide">
                      设置
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">个性化你的专属导航</p>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-orange-500/15 hover:bg-orange-500/30 text-orange-800 dark:text-orange-200 border border-orange-300/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  aria-label="关闭设置卡片"
                  title="关闭"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2.5">
                {[
                  {
                    key: 'theme',
                    icon: isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />,
                    label: isDark ? '明亮模式' : '暗黑模式',
                    desc: isDark ? '切换至明亮的日间配色' : '切换至护眼的暗黑配色',
                    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-300/40',
                    onClick: () => {
                      setSettingsOpen(false);
                      onToggleDark();
                    }
                  },
                  {
                    key: 'wallpaper',
                    icon: <ImageIcon className="w-4.5 h-4.5" />,
                    label: '自定义背景',
                    desc: '壁纸 / 图片 / 视频背景设置',
                    color: 'bg-sky-500/10 text-sky-600 dark:text-sky-300 border-sky-300/40',
                    onClick: () => {
                      setSettingsOpen(false);
                      onOpenCustomBackground();
                    }
                  },
                  {
                    key: 'backup',
                    icon: <DatabaseBackup className="w-4.5 h-4.5" />,
                    label: '数据备份',
                    desc: '导出 / 导入 / 恢复收藏与配置',
                    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-300/40',
                    onClick: () => {
                      setSettingsOpen(false);
                      onOpenBackup();
                    }
                  },
                  {
                    key: 'group',
                    icon: <Users className="w-4.5 h-4.5" />,
                    label: `${APP_CONFIG.appName}官方群`,
                    desc: APP_CONFIG.officialGroup.groupName,
                    color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-300/40',
                    onClick: () => {
                      setSettingsOpen(false);
                      try {
                        const qqUrl = APP_CONFIG.officialGroup.qqGroupUrl;
                        if (qqUrl) {
                          window.open(qqUrl, '_blank', 'noopener');
                        }
                      } catch {
                        // 忽略打开失败
                      }
                    }
                  },
                  {
                    key: 'about',
                    icon: <Info className="w-4.5 h-4.5" />,
                    label: '关于本站',
                    desc: '查看版本信息与站长介绍',
                    color: 'bg-violet-500/10 text-violet-600 dark:text-violet-300 border-violet-300/40',
                    onClick: () => {
                      setSettingsOpen(false);
                      onOpenAbout();
                    }
                  }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={item.onClick}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl border bg-white/40 dark:bg-white/5 hover:scale-[1.02] hover:shadow-md transition-all cursor-pointer ${item.color}`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span className="flex-1 text-left min-w-0">
                      <span className="block text-sm font-bold">{item.label}</span>
                      <span className="block text-[11px] opacity-75 truncate">{item.desc}</span>
                    </span>
                    <span className="text-slate-400 text-sm shrink-0">›</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
