import React, { useState, useRef } from 'react';
import {
  X,
  Video,
  Image as ImageIcon,
  Upload,
  Trash2,
  CheckCircle2
} from 'lucide-react';

export interface BackgroundSettings {
  type: 'none' | 'preset' | 'video' | 'upload' | 'theme';
  value: string; // url or data url
  theme?: string;
  blur?: number; // px blur
  opacity?: number; // 0 to 1 opacity
}

interface CustomBackgroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: BackgroundSettings;
  onSaveSettings: (settings: BackgroundSettings) => void;
}

export const CustomBackgroundModal: React.FC<CustomBackgroundModalProps> = ({
  isOpen,
  onClose,
  currentSettings,
  onSaveSettings
}) => {
  // 两个核心功能标签：视频上传 与 图片上传
  const [activeTab, setActiveTab] = useState<'video' | 'upload'>('video');
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // 1. 本地视频文件上传（MP4/WebM）并自动应用到全局且自动关闭弹窗
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 80 * 1024 * 1024) {
      alert('上传的视频过大（建议80MB以内较短循环视频），请选择较小的视频以保证手机与网页流畅度。');
      return;
    }

    setUploadNotice('正在读取并应用视频壁纸...');

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const newSettings: BackgroundSettings = {
        type: 'video',
        value: result,
        blur: 0,
        opacity: 0.9
      };
      onSaveSettings(newSettings);
      setUploadNotice('视频上传成功，已全局生效！');
      // 上传后自动应用到全局，并自动关闭弹窗
      setTimeout(() => {
        onClose();
      }, 350);
    };
    reader.readAsDataURL(file);
  };

  // 2. 本地图片文件上传（JPG/PNG/WebP）并自动应用到全局且自动关闭弹窗
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadNotice('正在读取并应用图片壁纸...');

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const newSettings: BackgroundSettings = {
        type: 'upload',
        value: result,
        blur: 0,
        opacity: 0.9
      };
      onSaveSettings(newSettings);
      setUploadNotice('图片上传成功，已全局生效！');
      // 上传后自动应用到全局，并自动关闭弹窗
      setTimeout(() => {
        onClose();
      }, 350);
    };
    reader.readAsDataURL(file);
  };

  // 清空自定义壁纸（恢复全站浅蓝渐变）
  const handleClearBackground = () => {
    onSaveSettings({
      type: 'none',
      value: '',
      blur: 0,
      opacity: 0.9
    });
    onClose();
  };

  const hasCurrentCustomBg =
    (currentSettings.type === 'video' || currentSettings.type === 'upload') &&
    Boolean(currentSettings.value);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      {/* From Uiverse.io by dylanharriscameron: 弹窗背景与流体光斑卡片 */}
      <div className="custom-bg-card max-w-xl w-full">
        {/* Animated fluid blobs */}
        <div className="custom-bg-blob" />
        <div className="custom-bg-blob-secondary" />

        {/* Modal Inner Frosted Container */}
        <div className="custom-bg-inner flex flex-col p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-orange-300/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ff3d00] to-[#ff9100] text-white flex items-center justify-center shadow-md shadow-orange-500/30 shrink-0">
                {activeTab === 'video' ? (
                  <Video className="w-5 h-5" />
                ) : (
                  <ImageIcon className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent tracking-wide">
                  自定义背景设置
                </h3>
                <p className="text-xs text-orange-950/80 dark:text-orange-200/80 font-medium">
                  支持本地视频或图片上传，上传后自动应用到全局并关闭
                </p>
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-orange-500/15 hover:bg-orange-500/30 text-orange-800 dark:text-orange-200 border border-orange-300/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
              aria-label="关闭弹窗"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Navigation: 视频上传 / 图片上传 */}
          <div className="flex items-center gap-2 pt-4 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('video')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                activeTab === 'video'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30 scale-102'
                  : 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-900 dark:text-orange-200 border border-orange-300/40'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>视频上传</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                activeTab === 'upload'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30 scale-102'
                  : 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-900 dark:text-orange-200 border border-orange-300/40'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>图片上传</span>
            </button>
          </div>

          {/* Upload Notice */}
          {uploadNotice && (
            <div className="mt-2 p-2.5 rounded-xl bg-emerald-100/90 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadNotice}</span>
            </div>
          )}

          {/* Content: 视频上传 */}
          {activeTab === 'video' && (
            <div className="py-4 space-y-4">
              <input
                ref={videoInputRef}
                type="file"
                accept="video/mp4,video/webm,video/ogg,video/quicktime"
                onChange={handleVideoUpload}
                className="hidden"
              />

              <div
                onClick={() => videoInputRef.current?.click()}
                className="p-6 rounded-2xl border-2 border-dashed border-orange-300/80 hover:border-orange-500 bg-orange-500/10 hover:bg-orange-500/15 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3 group shadow-2xs"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-500/20 group-hover:bg-orange-500 group-hover:text-white text-orange-700 dark:text-orange-300 flex items-center justify-center transition-colors shadow-xs">
                  <Upload className="w-7 h-7 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-stone-800 dark:text-stone-100">
                    点击选择本地视频文件 (MP4 / WebM)
                  </h4>
                  <p className="text-xs text-orange-950/80 dark:text-orange-300/80 mt-1">
                    选择完成后立即自动全局应用为背景，并自动关闭弹窗
                  </p>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold shadow-md shadow-orange-500/25 transition-all">
                  浏览本地视频
                </span>
              </div>
            </div>
          )}

          {/* Content: 图片上传 */}
          {activeTab === 'upload' && (
            <div className="py-4 space-y-4">
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div
                onClick={() => imageInputRef.current?.click()}
                className="p-6 rounded-2xl border-2 border-dashed border-orange-300/80 hover:border-orange-500 bg-orange-500/10 hover:bg-orange-500/15 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3 group shadow-2xs"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-500/20 group-hover:bg-orange-500 group-hover:text-white text-orange-700 dark:text-orange-300 flex items-center justify-center transition-colors shadow-xs">
                  <Upload className="w-7 h-7 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-stone-800 dark:text-stone-100">
                    点击选择本地图片文件 (JPG / PNG / WebP)
                  </h4>
                  <p className="text-xs text-orange-950/80 dark:text-orange-300/80 mt-1">
                    选择完成后立即自动全局应用为背景，并自动关闭弹窗
                  </p>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold shadow-md shadow-orange-500/25 transition-all">
                  浏览本地图片
                </span>
              </div>
            </div>
          )}

          {/* Current Custom Background Preview & Clear Option */}
          {hasCurrentCustomBg && (
            <div className="mt-1 pt-3 border-t border-orange-300/30 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-200">
                当前已应用{currentSettings.type === 'video' ? '视频' : '图片'}自定义壁纸
              </span>
              <button
                type="button"
                onClick={handleClearBackground}
                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold border border-rose-200 cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>移除壁纸</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
