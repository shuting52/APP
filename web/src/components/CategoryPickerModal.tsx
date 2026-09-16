import React from 'react';
import { X, Layers, ChevronRight, Compass } from 'lucide-react';
import { Category } from '../types';

interface CategoryPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSelectCategory: (id: string) => void;
  activeCategoryId?: string;
}

export const CategoryPickerModal: React.FC<CategoryPickerModalProps> = ({
  isOpen,
  onClose,
  categories,
  onSelectCategory,
  activeCategoryId
}) => {
  if (!isOpen) return null;

  const handlePick = (id: string) => {
    onSelectCategory(id);
    onClose();
    setTimeout(() => {
      const el = document.getElementById(`section-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* 与关于弹窗/自定义背景设置弹窗统一的高品质流体磨砂卡片 */}
      <div className="custom-bg-card max-w-lg w-full">
        {/* Animated fluid rainbow-orange blobs */}
        <div className="custom-bg-blob" />
        <div className="custom-bg-blob-secondary" />

        {/* Modal Inner Frosted Container */}
        <div className="custom-bg-inner flex flex-col p-5 sm:p-6 shadow-2xl relative max-h-[85vh]">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-orange-300/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ff3d00] to-[#ff9100] text-white flex items-center justify-center shadow-md shadow-orange-500/30 shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent tracking-wide">
                  全站分类快速直达
                </h3>
                <p className="text-xs text-orange-950/80 dark:text-orange-200/80 font-medium">
                  点击任意分类即刻平滑跳转至对应资源区块
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-orange-500/15 hover:bg-orange-500/30 text-orange-800 dark:text-orange-200 border border-orange-300/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
              aria-label="关闭分类弹窗"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Categories Grid - 磨砂透明橙色质感按钮 */}
          <div className="py-3 flex-1 overflow-y-auto space-y-2 pr-0.5">
            {categories.map((cat) => {
              const isActive = activeCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handlePick(cat.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer group shadow-2xs hover:scale-[1.01] ${
                    isActive
                      ? 'bg-orange-500/25 border-orange-500 ring-2 ring-orange-400/50 text-orange-950 dark:text-orange-100 font-extrabold shadow-md'
                      : 'bg-orange-500/10 hover:bg-orange-500/20 border-orange-300/35 hover:border-orange-500/80 text-stone-900 dark:text-stone-100 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400/25 to-amber-400/25 text-orange-600 dark:text-orange-300 flex items-center justify-center border border-orange-300/40 group-hover:scale-110 transition-transform shrink-0">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold truncate group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {cat.name}
                      </div>
                      {cat.desc && (
                        <div className="text-[11px] text-stone-600 dark:text-stone-300 truncate opacity-80">
                          {cat.desc}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-700 dark:text-orange-300 font-bold border border-orange-300/40 group-hover:bg-orange-500 group-hover:text-white transition-all">
                      {cat.cards.length} 项
                    </span>
                    <ChevronRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-orange-300/30 flex items-center justify-between text-xs text-orange-950/80 dark:text-orange-200/80 font-medium">
            <span>共收录 {categories.length} 大核心分类</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs cursor-pointer shadow-md shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              完成
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
