import React, { useMemo, useState, useEffect } from 'react';
import { Category, NavCard } from '../types';
import { Sparkles, ExternalLink, ArrowRight, Compass, Search, Tag } from 'lucide-react';

export interface SearchSuggestionItem {
  type: 'card' | 'category';
  id: string;
  title: string;
  desc?: string;
  categoryId: string;
  categoryName: string;
  subcatName?: string;
  icon?: string;
  url?: string;
  card?: NavCard;
}

interface SearchSuggestionsDropdownProps {
  query: string;
  isOpen: boolean;
  categories: Category[];
  customCards?: NavCard[];
  onSelectSuggestion: (item: SearchSuggestionItem, actionType?: 'filter' | 'direct') => void;
  onClose: () => void;
}

export const SearchSuggestionsDropdown: React.FC<SearchSuggestionsDropdownProps> = ({
  query,
  isOpen,
  categories,
  customCards = [],
  onSelectSuggestion,
  onClose
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const suggestions = useMemo<SearchSuggestionItem[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: SearchSuggestionItem[] = [];
    const seenTitles = new Set<string>();

    // 1. Check custom cards first (highest user priority)
    for (const card of customCards) {
      const matchTitle = card.title.toLowerCase().includes(q);
      const matchDesc = card.desc && card.desc.toLowerCase().includes(q);
      if (matchTitle || matchDesc) {
        if (!seenTitles.has(card.title.toLowerCase())) {
          seenTitles.add(card.title.toLowerCase());
          results.push({
            type: 'card',
            id: `custom-${card.id}`,
            title: card.title,
            desc: card.desc || '我的自建收藏网址',
            categoryId: 'favorites',
            categoryName: '我的自建',
            icon: card.icon,
            url: card.url,
            card
          });
        }
      }
    }

    // 2. Check preset cards across all categories
    for (const cat of categories) {
      for (const card of cat.cards) {
        const titleLower = card.title.toLowerCase();
        const matchTitle = titleLower.includes(q);
        const matchDesc = card.desc && card.desc.toLowerCase().includes(q);

        if (matchTitle || matchDesc) {
          if (!seenTitles.has(titleLower)) {
            seenTitles.add(titleLower);
            const sub = cat.subcategories.find((s) => s.id === card.subcatId);
            results.push({
              type: 'card',
              id: card.id,
              title: card.title,
              desc: card.desc,
              categoryId: cat.id,
              categoryName: cat.name,
              subcatName: sub?.name,
              icon: card.icon,
              url: card.url,
              card
            });
          }
        }
        if (results.length >= 30) break;
      }
      if (results.length >= 30) break;
    }

    // 3. Check matching category names
    for (const cat of categories) {
      if (cat.name.toLowerCase().includes(q)) {
        results.push({
          type: 'category',
          id: `cat-${cat.id}`,
          title: cat.name,
          desc: `浏览“${cat.name}”分类下全部 ${cat.cards.length} 个精选实用资源`,
          categoryId: cat.id,
          categoryName: cat.name
        });
      }
    }

    // Sort:
    // 1) Titles starting with query
    // 2) Titles containing query
    // 3) Descriptions containing query
    return results
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        const aStarts = aTitle.startsWith(q);
        const bStarts = bTitle.startsWith(q);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        const aHasTitle = aTitle.includes(q);
        const bHasTitle = bTitle.includes(q);
        if (aHasTitle && !bHasTitle) return -1;
        if (!aHasTitle && bHasTitle) return 1;

        return 0;
      })
      .slice(0, 8); // Top 8 most relevant suggestions
  }, [query, categories, customCards]);

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  // Handle keyboard navigation (ArrowUp, ArrowDown, Enter, Escape)
  useEffect(() => {
    if (!isOpen || suggestions.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          e.preventDefault();
          onSelectSuggestion(suggestions[selectedIndex], 'filter');
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, suggestions, selectedIndex, onSelectSuggestion, onClose]);

  if (!isOpen || !query.trim() || suggestions.length === 0) {
    return null;
  }

  // Highlight matched substrings
  const renderHighlighted = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span
              key={i}
              className="text-blue-600 dark:text-blue-400 font-bold bg-blue-100/70 dark:bg-blue-950/80 px-1 py-0.5 rounded"
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div
      className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-[var(--iiice-white)] border border-blue-300/80 dark:border-slate-700 rounded-xl shadow-2xl shadow-blue-900/15 overflow-hidden animate-content-fade-in"
      onMouseDown={(e) => e.preventDefault()}
    >
      {/* Header Info */}
      <div className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50/70 dark:from-slate-800/80 dark:to-slate-800/60 border-b border-[var(--iiice-border)] flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
        <span className="flex items-center gap-1.5 font-semibold text-blue-700 dark:text-blue-400">
          <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
          <span>常用资源联想建议 ({suggestions.length})</span>
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:inline">
          ↑ ↓ 切换 · Enter 筛选 · 或点击直接访问
        </span>
      </div>

      {/* Suggestion List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
        {suggestions.map((item, index) => {
          const isSelected = selectedIndex === index;

          return (
            <div
              key={item.id}
              onClick={() => {
                onSelectSuggestion(item, 'filter');
                onClose();
              }}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`p-2.5 transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                isSelected
                  ? 'bg-blue-50/90 dark:bg-slate-800/95 ring-1 ring-inset ring-blue-400/80'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {item.type === 'category' ? (
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-2xs">
                    <Compass className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                    {item.icon ? (
                      <img
                        src={item.icon}
                        alt=""
                        className="w-4 h-4 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        {item.title.charAt(0)}
                      </span>
                    )}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-[var(--iiice-title)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {renderHighlighted(item.title, query)}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-0.5">
                      <Tag className="w-2.5 h-2.5 text-slate-400" />
                      <span>{item.categoryName}</span>
                      {item.subcatName && <span>· {item.subcatName}</span>}
                    </span>
                  </div>
                  {item.desc && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 leading-normal">
                      {renderHighlighted(item.desc, query)}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="shrink-0 flex items-center gap-1.5">
                {item.card?.url && (
                  <a
                    href={item.card.url}
                    target="_blank"
                    rel="external nofollow noopener"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                    className="px-2 py-1 rounded-md text-[11px] font-medium bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                    title="在浏览器新标签页中直接打开此网站"
                  >
                    <span>直达</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSuggestion(item, 'filter');
                    onClose();
                  }}
                  className="px-2 py-1 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all flex items-center gap-0.5 cursor-pointer"
                  title="在站内定位此资源"
                >
                  <Search className="w-3 h-3" />
                  <span className="hidden sm:inline">定位</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Tips Footer */}
      <div className="px-3 py-1 bg-slate-50/80 dark:bg-slate-800/40 border-t border-[var(--iiice-border)] text-[10px] text-slate-400 flex items-center justify-between">
        <span>输入任意关键字即可联想匹配</span>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
        >
          收起
        </button>
      </div>
    </div>
  );
};
