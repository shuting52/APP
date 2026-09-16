import React, { useState, useRef } from 'react';
import { X, Download, Upload, ShieldCheck, FileText, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { NavCard } from '../types';
import { BackgroundSettings } from './CustomBackgroundModal';

export interface BackupDataPayload {
  owner?: string;
  version: string;
  exportedAt: string;
  favorites: string[];
  customCards: NavCard[];
  bgSettings?: BackgroundSettings;
}

interface DataBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  customCards: NavCard[];
  bgSettings: BackgroundSettings;
  onRestore: (data: { favorites: string[]; customCards: NavCard[]; bgSettings?: BackgroundSettings }) => void;
  onShowToast: (msg: string) => void;
}

export const DataBackupModal: React.FC<DataBackupModalProps> = ({
  isOpen,
  onClose,
  favorites,
  customCards,
  bgSettings,
  onRestore,
  onShowToast
}) => {
  const [importPreview, setImportPreview] = useState<BackupDataPayload | null>(null);
  const [importError, setImportError] = useState<string>('');
  const [importMode, setImportMode] = useState<'merge' | 'overwrite'>('merge');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Export current data to a downloaded JSON file
  const handleExport = () => {
    try {
      const payload: BackupDataPayload = {
        owner: '陈淑婷 · 资源收藏导航',
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        favorites,
        customCards,
        bgSettings
      };

      const jsonStr = JSON.stringify(payload, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const now = new Date();
      const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
      link.href = url;
      link.download = `chenshuting_nav_backup_${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      onShowToast(`数据备份成功！已导出包含 ${favorites.length} 个收藏与 ${customCards.length} 个自建网站的配置文件`);
    } catch {
      onShowToast('导出备份文件失败，请稍后重试');
    }
  };

  // Handle uploaded JSON file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        if (!parsed || (typeof parsed !== 'object')) {
          throw new Error('无效的 JSON 文件格式');
        }

        const favs = Array.isArray(parsed.favorites) ? parsed.favorites : [];
        const cards = Array.isArray(parsed.customCards) ? parsed.customCards : [];

        if (favs.length === 0 && cards.length === 0 && !parsed.bgSettings) {
          throw new Error('备份文件中未检测到任何收藏或自定义卡片数据');
        }

        setImportPreview({
          owner: parsed.owner || '个人备份',
          version: parsed.version || '1.0.0',
          exportedAt: parsed.exportedAt || new Date().toISOString(),
          favorites: favs,
          customCards: cards,
          bgSettings: parsed.bgSettings
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : '解析备份文件失败，请检查文件是否损坏';
        setImportError(message);
        setImportPreview(null);
      }
    };
    reader.readAsText(file);
  };

  // Confirm import and restore
  const handleConfirmRestore = () => {
    if (!importPreview) return;

    let targetFavorites = [...importPreview.favorites];
    let targetCustomCards = [...importPreview.customCards];

    if (importMode === 'merge') {
      // Merge unique favorites
      const favSet = new Set([...favorites, ...importPreview.favorites]);
      targetFavorites = Array.from(favSet);

      // Merge custom cards (avoid duplicate ids)
      const existingIds = new Set(customCards.map((c) => c.id));
      const newCards = importPreview.customCards.filter((c) => !existingIds.has(c.id));
      targetCustomCards = [...customCards, ...newCards];
    }

    onRestore({
      favorites: targetFavorites,
      customCards: targetCustomCards,
      bgSettings: importPreview.bgSettings || bgSettings
    });

    onShowToast(`数据恢复成功！当前拥有 ${targetFavorites.length} 个收藏、${targetCustomCards.length} 个自建网站`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-content-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[var(--section-bg)] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500" />

        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--iiice-title)]">数据备份与个人配置恢复</h3>
              <p className="text-xs text-slate-400">防止清理浏览器缓存造成数据丢失，支持一键备份与无缝导入</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current status summary */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 mb-5 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 dark:text-slate-400">当前设备本地存储状态：</span>
            <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-200">
              <span>⭐️ 收藏卡片：<strong className="text-blue-600">{favorites.length}</strong> 项</span>
              <span>📌 自建网址：<strong className="text-emerald-600">{customCards.length}</strong> 个</span>
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-400">
            <span>安全纯本地</span>
            <br />
            <span>无任何敏感上传</span>
          </div>
        </div>

        {/* Action Blocks: Export & Import */}
        <div className="space-y-4">
          {/* 1. Export Block */}
          <div className="p-3.5 rounded-xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 font-semibold text-xs text-blue-900 dark:text-blue-300">
                <Download className="w-4 h-4 text-blue-600" />
                <span>一键下载备份文件</span>
              </div>
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-mono">.JSON 格式</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
              将当前所有的收藏夹记录、自定义添加的网站卡片以及个性化背景设置导出为标准 JSON 配置文件。
            </p>
            <button
              type="button"
              onClick={handleExport}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>立即下载个人备份文件</span>
            </button>
          </div>

          {/* 2. Import Block */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-800 dark:text-slate-200">
                <Upload className="w-4 h-4 text-emerald-600" />
                <span>导入备份文件恢复配置</span>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="hidden"
            />

            {!importPreview ? (
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                  选择此前导出的备份文件，即可快速恢复个人收藏夹与自建网站，跨浏览器或换新设备无忧。
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span>点击选择备份文件 (.json)</span>
                </button>
                {importError && (
                  <div className="mt-2.5 p-2 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{importError}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-900 dark:text-emerald-200">
                  <div className="flex items-center gap-1.5 font-semibold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>文件解析成功！待恢复内容详情：</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-emerald-800 dark:text-emerald-300 ml-1">
                    <li>收藏记录：{importPreview.favorites.length} 个</li>
                    <li>自建网站：{importPreview.customCards.length} 个</li>
                    {importPreview.bgSettings && <li>包含个性化背景壁纸设置</li>}
                    <li>备份时间：{new Date(importPreview.exportedAt).toLocaleString()}</li>
                  </ul>
                </div>

                {/* Mode Selector */}
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">恢复模式：</span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="restoreMode"
                      checked={importMode === 'merge'}
                      onChange={() => setImportMode('merge')}
                      className="accent-emerald-600"
                    />
                    <span>合并导入（保留当前已有，补充新增）</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="restoreMode"
                      checked={importMode === 'overwrite'}
                      onChange={() => setImportMode('overwrite')}
                      className="accent-red-600"
                    />
                    <span className="text-red-600 dark:text-red-400">完全覆盖</span>
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleConfirmRestore}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>确认恢复个人配置</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImportPreview(null);
                      setImportError('');
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-300 transition-colors cursor-pointer"
                  >
                    重新选择
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
