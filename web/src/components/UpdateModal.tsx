import React, { useState } from 'react';
import { APP_CONFIG, APP_VERSION, RemoteVersionInfo } from '../config';

interface UpdateModalProps {
  isOpen: boolean;
  /** 远端检测到的新版本信息；为空表示普通"更新说明"弹窗 */
  remoteVersion: RemoteVersionInfo | null;
  onClose: () => void;
}

/**
 * 版本更新弹窗：流体红 blob 毛玻璃卡片 (From Uiverse.io by dylanharriscameron)
 * - 检测到 GitHub 远端新版本（remoteVersion 非空）时，强制更新弹窗，不可关闭；
 * - 无新版本时保留"版本说明"弹窗，点击"我知道了"写入已读版本号。
 */
export const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, remoteVersion, onClose }) => {
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  if (!isOpen) return null;

  const forced = Boolean(remoteVersion);
  const title = forced
    ? (remoteVersion?.updateTitle || `发现新版本 v${remoteVersion?.versionName}`)
    : APP_VERSION.updateTitle;
  const currentName = APP_VERSION.versionName;
  const logLines = forced
    ? (remoteVersion?.changelog ? String(remoteVersion.changelog).split('\n').filter(Boolean) : [`发现新版本 v${remoteVersion?.versionName}，请立即更新至最新版体验完整功能。`])
    : APP_VERSION.updateLog;
  const latestName = forced ? remoteVersion?.versionName : currentName;

  const resolveApkUrl = (): string => {
    if (downloadUrl) return downloadUrl;
    const raw = remoteVersion?.apkUrlRaw || remoteVersion?.apkUrl || '';
    if (!raw) return '';
    setDownloadUrl(raw);
    return raw;
  };

  const handleUpdateNow = () => {
    const url = resolveApkUrl();
    if (!url) return;
    try {
      // 优先使用系统浏览器/外部应用打开下载（APK 安装包）
      const w = window.open(url, '_blank');
      if (!w) {
        // WebView 拦截弹窗时，降级为当前窗口跳转
        window.location.href = url;
      }
    } catch {
      window.location.href = url;
    }
  };

  const handleJoinGroup = () => {
    try {
      const w = window.open(APP_CONFIG.officialGroup.qqGroupUrl, '_blank');
      if (!w) {
        window.location.href = APP_CONFIG.officialGroup.qqGroupUrl;
      }
    } catch {
      window.location.href = APP_CONFIG.officialGroup.qqGroupUrl;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        // 强制更新弹窗禁止点击遮罩关闭
        if (!forced && e.target === e.currentTarget) onClose();
      }}
    >
      <div className="blob-card w-full max-w-md" role="dialog" aria-modal="true">
        <div className="blob-card-bg" />
        <div className="blob-card-blob" />
        <div className="blob-card-inner p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-orange-300/30 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#ff5d00] text-white flex items-center justify-center shadow-md shadow-red-500/30 shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent tracking-wide">
                  {forced ? '发现新版本' : '版本说明'}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  当前版本 v{currentName}
                  {forced && <span className="text-[#c8102e] dark:text-red-400 font-semibold"> → 最新 v{latestName}</span>}
                </p>
              </div>
            </div>
            {!forced && (
              <button
                type="button"
                onClick={onClose}
                aria-label="关闭更新提示"
                title="关闭"
                className="w-8 h-8 rounded-full bg-orange-500/15 hover:bg-orange-500/30 text-orange-800 dark:text-orange-200 border border-orange-300/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Body */}
          <div className="space-y-3 mb-4">
            {forced && (
              <p className="text-center text-[11px] font-bold text-[#c8102e] dark:text-red-400 tracking-widest">
                ⚠ 检测到新版本 · 请更新后继续使用
              </p>
            )}
            <ul className="space-y-1.5 text-[12.5px] text-slate-700 dark:text-slate-200">
              {logLines.map((line, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-500 dark:text-amber-400 font-bold shrink-0">✦</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            {/* 官方群入口（强制更新时展示） */}
            {forced && (
              <div className="rounded-2xl border border-dashed border-amber-400/60 bg-amber-50/70 dark:bg-amber-950/30 p-3 text-center">
                <p className="text-[11px] text-slate-500 dark:text-slate-300 mb-1.5">遇到问题？加入官方群获取帮助与最新消息</p>
                <button
                  type="button"
                  onClick={handleJoinGroup}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-xs font-bold shadow-md shadow-amber-500/30 transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
                >
                  {APP_CONFIG.officialGroup.groupName}（{APP_CONFIG.officialGroup.qqNumber}）
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-orange-300/30 pt-3.5">
            {forced ? (
              <button
                type="button"
                onClick={handleUpdateNow}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#c8102e] to-[#8b0000] hover:from-[#d81a3a] hover:to-[#a01020] text-white font-extrabold text-sm cursor-pointer shadow-md shadow-[#c8102e]/40 transition-all hover:scale-[1.02] active:scale-95"
              >
                立即更新
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#c8102e] to-[#8b0000] hover:from-[#d81a3a] hover:to-[#a01020] text-white font-bold text-sm cursor-pointer shadow-md shadow-[#c8102e]/30 transition-all hover:scale-[1.02] active:scale-95"
              >
                我知道了
              </button>
            )}
            {forced && (
              <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-2">
                更新后才能继续使用完整功能
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
