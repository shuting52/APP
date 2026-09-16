import React from 'react';
import { CheckSquare, Star, Trash2, X, Check, EyeOff } from 'lucide-react';
import { NavCard } from '../types';

interface BatchActionToolbarProps {
  isEditMode: boolean;
  selectedCardIds: string[];
  allVisibleCards: NavCard[];
  onSelectAll: () => void;
  onClearSelection: () => void;
  onBatchFavorite: (cardIds: string[]) => void;
  onBatchDelete: (cardIds: string[]) => void;
  onExitEditMode: () => void;
}

export const BatchActionToolbar: React.FC<BatchActionToolbarProps> = ({
  isEditMode,
  selectedCardIds,
  allVisibleCards,
  onSelectAll,
  onClearSelection,
  onBatchFavorite,
  onBatchDelete,
  onExitEditMode
}) => {
  if (!isEditMode) return null;

  const count = selectedCardIds.length;
  const isAllSelected = allVisibleCards.length > 0 && count >= allVisibleCards.length;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl animate-content-fade-in">
      <div className="bg-[var(--iiice-white)] border-2 border-blue-500/80 rounded-2xl p-3 sm:p-3.5 shadow-2xl shadow-blue-900/30 flex items-center justify-between gap-3 flex-wrap backdrop-blur-md">
        {/* Left: Info badge */}
        <div className="flex items-center gap-2.5 min-w-[140px]">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[var(--iiice-title)]">卡片批量管理</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold">
                编辑模式中
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              已勾选 <strong className="text-blue-600 font-bold text-xs">{count}</strong> 项 / 可选 {allVisibleCards.length} 项
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-wrap ml-auto text-xs">
          {/* Select all toggle */}
          <button
            type="button"
            onClick={isAllSelected ? onClearSelection : onSelectAll}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors cursor-pointer font-medium"
          >
            {isAllSelected ? '取消全选' : '全选卡片'}
          </button>

          {/* Batch Star */}
          <button
            type="button"
            disabled={count === 0}
            onClick={() => onBatchFavorite(selectedCardIds)}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
              count > 0
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs active:scale-95'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>加入收藏 ({count})</span>
          </button>

          {/* Batch Delete / Remove */}
          <button
            type="button"
            disabled={count === 0}
            onClick={() => onBatchDelete(selectedCardIds)}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
              count > 0
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-xs active:scale-95'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>批量删除 ({count})</span>
          </button>

          {/* Exit Edit Mode */}
          <button
            type="button"
            onClick={onExitEditMode}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="退出编辑模式"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
