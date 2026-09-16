import React, { useState, useMemo } from 'react';
import { NavCard } from '../types';
import { NavCardItem } from './NavCardItem';
import { Bookmark, Trash2, PlusCircle, Flame, Clock, ArrowDownAZ, GripVertical, Move, Sparkles } from 'lucide-react';
import { getCardDailyClickCount } from '../utils/cardClicks';

export type FavoritesSortMode = 'custom' | 'hot' | 'recent' | 'alphabetical';

interface FavoritesSectionProps {
  favoriteCards: NavCard[];
  customCards: NavCard[];
  favorites: string[];
  customOrderIds?: string[];
  onReorderCards?: (newCards: NavCard[]) => void;
  onToggleFavorite: (card: NavCard) => void;
  onRemoveCustomCard: (id: string) => void;
  onCopyUrl: (url: string, title: string) => void;
  onOpenAddCustom: () => void;
  onCardHoverStart?: (card: NavCard, rect: DOMRect) => void;
  onCardHoverEnd?: () => void;
  onCardClick?: (card: NavCard) => void;
  isEditMode?: boolean;
  selectedCardIds?: string[];
  onToggleSelectCard?: (card: NavCard) => void;
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  favoriteCards,
  customCards,
  favorites,
  customOrderIds = [],
  onReorderCards,
  onToggleFavorite,
  onRemoveCustomCard,
  onCopyUrl,
  onOpenAddCustom,
  onCardHoverStart,
  onCardHoverEnd,
  onCardClick,
  isEditMode = false,
  selectedCardIds = [],
  onToggleSelectCard
}) => {
  // If customOrderIds exists in localStorage, default to 'custom' mode
  const [sortMode, setSortMode] = useState<FavoritesSortMode>(() =>
    customOrderIds.length > 0 ? 'custom' : 'recent'
  );

  // Drag and drop state
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [dropTargetCardId, setDropTargetCardId] = useState<string | null>(null);

  const allPinned = useMemo(() => {
    const raw = [...customCards, ...favoriteCards.filter((f) => !customCards.some((c) => c.id === f.id))];

    if (sortMode === 'custom' && customOrderIds.length > 0) {
      const orderMap = new Map(customOrderIds.map((id, index) => [id, index]));
      return [...raw].sort((a, b) => {
        const indexA = orderMap.has(a.id) ? (orderMap.get(a.id) as number) : 99999;
        const indexB = orderMap.has(b.id) ? (orderMap.get(b.id) as number) : 99999;
        return indexA - indexB;
      });
    }

    if (sortMode === 'hot') {
      return [...raw].sort(
        (a, b) => getCardDailyClickCount(b.id, b.title) - getCardDailyClickCount(a.id, a.title)
      );
    }

    if (sortMode === 'alphabetical') {
      return [...raw].sort((a, b) => a.title.localeCompare(b.title, 'zh-Hans-CN'));
    }

    // Default 'recent'
    return raw;
  }, [favoriteCards, customCards, sortMode, customOrderIds]);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    if (!isEditMode) return;
    e.dataTransfer.setData('text/plain', cardId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedCardId(cardId);
  };

  const handleDragOver = (e: React.DragEvent, cardId: string) => {
    if (!isEditMode) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedCardId && cardId !== draggedCardId && dropTargetCardId !== cardId) {
      setDropTargetCardId(cardId);
    }
  };

  const handleDragLeave = (_e: React.DragEvent, cardId: string) => {
    if (dropTargetCardId === cardId) {
      setDropTargetCardId(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetCardId: string) => {
    if (!isEditMode) return;
    e.preventDefault();
    const sourceCardId = e.dataTransfer.getData('text/plain') || draggedCardId;

    setDraggedCardId(null);
    setDropTargetCardId(null);

    if (!sourceCardId || sourceCardId === targetCardId) return;

    const currentList = [...allPinned];
    const sourceIndex = currentList.findIndex((c) => c.id === sourceCardId);
    const targetIndex = currentList.findIndex((c) => c.id === targetCardId);

    if (sourceIndex === -1 || targetIndex === -1) return;

    // Move dragged item to target position
    const [movedItem] = currentList.splice(sourceIndex, 1);
    currentList.splice(targetIndex, 0, movedItem);

    setSortMode('custom');
    if (onReorderCards) {
      onReorderCards(currentList);
    }
  };

  const handleDragEnd = () => {
    setDraggedCardId(null);
    setDropTargetCardId(null);
  };

  if (allPinned.length === 0) {
    return null;
  }

  return (
    <section
      id="section-favorites"
      className="bg-transparent border border-orange-300/30 rounded-xl p-3.5 mb-3 transition-all shadow-none hover:border-orange-400/60"
    >
      <div className="flex items-center justify-between gap-3 flex-wrap mb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0 shadow-[0_0_8px_rgba(255,120,0,0.6)] animate-pulse" />
          <h2 className="text-[15px] font-extrabold flex items-center gap-1.5">
            <Bookmark className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span>我的专属收藏夹与自建网站</span>
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-300 font-bold border border-orange-300/30">
            {allPinned.length} 项
          </span>
        </div>

        {/* Sorting Button Group & Add Custom Button */}
        <div className="flex items-center gap-2.5 flex-wrap ml-auto">
          {/* Sorting Buttons */}
          <div className="flex items-center bg-white/20 dark:bg-white/10 p-0.5 rounded-lg border border-white/25 dark:border-white/15 text-[11px]">
            {/* Custom Drag Order Button */}
            <button
              type="button"
              onClick={() => setSortMode('custom')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all cursor-pointer font-medium ${
                sortMode === 'custom'
                  ? 'bg-white/70 dark:bg-white/25 text-amber-700 dark:text-amber-300 shadow-xs font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:text-amber-600'
              }`}
              title="按自定义拖拽顺序展示"
            >
              <GripVertical className="w-3 h-3" />
              <span>自定义排序</span>
            </button>

            <button
              type="button"
              onClick={() => setSortMode('recent')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all cursor-pointer font-medium ${
                sortMode === 'recent'
                  ? 'bg-white/70 dark:bg-white/25 text-amber-700 dark:text-amber-300 shadow-xs font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:text-amber-600'
              }`}
              title="按最近添加顺序排序"
            >
              <Clock className="w-3 h-3" />
              <span>最近添加</span>
            </button>

            <button
              type="button"
              onClick={() => setSortMode('hot')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all cursor-pointer font-medium ${
                sortMode === 'hot'
                  ? 'bg-white/70 dark:bg-white/25 text-amber-700 dark:text-amber-300 shadow-xs font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:text-amber-600'
              }`}
              title="按今日点击热度从高到低排序"
            >
              <Flame className="w-3 h-3 text-orange-500" />
              <span>点击热度</span>
            </button>

            <button
              type="button"
              onClick={() => setSortMode('alphabetical')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all cursor-pointer font-medium ${
                sortMode === 'alphabetical'
                  ? 'bg-white/70 dark:bg-white/25 text-amber-700 dark:text-amber-300 shadow-xs font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:text-amber-600'
              }`}
              title="按卡片标题字母/拼音顺序排序"
            >
              <ArrowDownAZ className="w-3 h-3" />
              <span>字母顺序</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenAddCustom}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>添加自建网址</span>
          </button>
        </div>
      </div>

      {/* Edit Mode Drag & Drop Reorder Tip Banner */}
      {isEditMode && (
        <div className="mb-2.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-700/60 text-xs text-amber-800 dark:text-amber-300 flex items-center justify-between gap-2 animate-content-fade-in">
          <div className="flex items-center gap-1.5 font-medium">
            <Move className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse shrink-0" />
            <span>
              <strong>拖拽排序已激活</strong>：用鼠标按住下方任意卡片并拖动即可调整顺序，松手后自动同步保存至本地 localStorage。
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-200/70 dark:bg-amber-900/60 font-semibold shrink-0">
            支持鼠标拖拽
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2.5 animate-content-fade-in">
        {allPinned.map((card) => {
          const isDragging = draggedCardId === card.id;
          const isDropTarget = dropTargetCardId === card.id;

          return (
            <div
              key={card.id}
              draggable={isEditMode}
              onDragStart={(e) => handleDragStart(e, card.id)}
              onDragOver={(e) => handleDragOver(e, card.id)}
              onDragLeave={(e) => handleDragLeave(e, card.id)}
              onDrop={(e) => handleDrop(e, card.id)}
              onDragEnd={handleDragEnd}
              className={`relative group/fav rounded-lg transition-all ${
                isEditMode ? 'cursor-grab active:cursor-grabbing' : ''
              } ${
                isDragging
                  ? 'opacity-40 scale-95 border-2 border-dashed border-blue-500 ring-2 ring-blue-400'
                  : ''
              } ${
                isDropTarget
                  ? 'scale-[1.05] ring-2 ring-blue-500 shadow-lg shadow-blue-500/20 z-30'
                  : ''
              }`}
            >
              {/* Drag Handle Indicator badge when in Edit Mode */}
              {isEditMode && (
                <div
                  className="absolute -top-1.5 -left-1.5 z-30 p-0.5 rounded-md bg-amber-500 text-white shadow-xs cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                  title="按住鼠标拖拽此卡片以调整位置"
                >
                  <GripVertical className="w-3 h-3" />
                </div>
              )}

              <NavCardItem
                card={card}
                isFavorite={favorites.includes(card.id)}
                onToggleFavorite={onToggleFavorite}
                onCopyUrl={onCopyUrl}
                onCardHoverStart={onCardHoverStart}
                onCardHoverEnd={onCardHoverEnd}
                onCardClick={onCardClick}
                isEditMode={isEditMode}
                isSelected={selectedCardIds.includes(card.id)}
                onToggleSelect={onToggleSelectCard}
              />

              {!isEditMode && card.isCustom && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveCustomCard(card.id);
                  }}
                  className="absolute top-1 right-1 hidden group-hover/fav:flex p-1 rounded bg-red-600 text-white shadow-sm hover:bg-red-700 z-20 cursor-pointer"
                  title="删除自建网址"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
