import React from 'react';
import { Category } from '../types';
import { CheckSquare } from 'lucide-react';

interface CategoryNavProps {
  categories: Category[];
  activeCategoryId?: string;
  onSelectCategory: (id: string) => void;
  isEditMode?: boolean;
  onToggleEditMode?: () => void;
  selectedCount?: number;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  isEditMode = false,
  onToggleEditMode,
  selectedCount = 0
}) => {
  const scrollToSection = (id: string) => {
    onSelectCategory(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 12;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-transparent border border-orange-300/30 rounded-xl p-2 mb-3 flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs flex-1 min-w-0 py-0.5 allow-hscroll">
        <span className="font-extrabold text-[12px] bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent tracking-wide drop-shadow-[0_1px_1.5px_rgba(255,100,0,0.3)] px-2 shrink-0">
          快速直达：
        </span>
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => scrollToSection(cat.id)}
              className={`px-3 py-1.5 rounded-lg transition-all shrink-0 cursor-pointer border flex items-center gap-1 shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
                isActive
                  ? 'bg-orange-500/20 border-orange-500/80 ring-2 ring-orange-400/40 shadow-md'
                  : 'bg-transparent hover:bg-orange-500/10 border-orange-300/30 hover:border-orange-400/60'
              }`}
            >
              <span className="font-extrabold text-[12px] bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent tracking-wide">
                {cat.name}
              </span>
              <span className="text-[11px] font-bold text-orange-600/90 dark:text-orange-400/90">
                ({cat.cards.length})
              </span>
            </button>
          );
        })}
      </div>

      {/* Edit Mode Toggle Switch */}
      {onToggleEditMode && (
        <button
          type="button"
          onClick={onToggleEditMode}
          className={`shrink-0 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer border shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
            isEditMode
              ? 'bg-white/25 dark:bg-white/15 border-amber-500/80 ring-2 ring-amber-400/40 shadow-md'
              : 'bg-transparent hover:bg-white/15 dark:hover:bg-white/10 border-white/30 dark:border-white/15 hover:border-white/50'
          }`}
          title={isEditMode ? '退出批量管理编辑模式' : '开启卡片批量编辑模式（勾选卡片并批量收藏或删除）'}
        >
          <CheckSquare className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
          <span className="font-extrabold text-[12px] bg-gradient-to-r from-amber-600 via-rose-500 to-purple-600 dark:from-amber-400 dark:via-rose-400 dark:to-purple-400 bg-clip-text text-transparent tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            {isEditMode ? '退出编辑' : '编辑模式'}
          </span>
          {isEditMode && selectedCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-bold border border-amber-400/40">
              {selectedCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
};
