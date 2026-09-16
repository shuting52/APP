import React, { useRef, useEffect } from 'react';
import { History, X, Clock, Trash2, ArrowRight } from 'lucide-react';

interface SearchHistoryDropdownProps {
  history: string[];
  isOpen: boolean;
  onSelectKeyword: (kw: string) => void;
  onDeleteItem: (kw: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export const SearchHistoryDropdown: React.FC<SearchHistoryDropdownProps> = ({
  history,
  isOpen,
  onSelectKeyword,
  onDeleteItem,
  onClearAll,
  onClose
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || history.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="absolute top-full left-0 right-0 mt-1.5 z-40 bg-[var(--iiice-white)] border border-[var(--iiice-border)] rounded-xl p-2.5 shadow-xl shadow-black/10 backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-150"
    >
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500">
        <span className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-400">
          <History className="w-3.5 h-3.5 text-blue-500" />
          <span>最近搜索历史 (前5项)</span>
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClearAll();
          }}
          className="flex items-center gap-0.5 hover:text-red-500 cursor-pointer transition-colors"
          title="清空历史记录"
        >
          <Trash2 className="w-3 h-3" />
          <span>清空</span>
        </button>
      </div>

      <div className="flex flex-col gap-0.5">
        {history.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onSelectKeyword(item)}
            className="group/item flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition-colors text-xs text-[var(--iiice-title)]"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Clock className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-blue-500 shrink-0 transition-colors" />
              <span className="truncate font-medium group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400">
                {item}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <span className="hidden group-hover/item:inline-flex items-center text-[10px] text-blue-500 mr-1">
                筛选 <ArrowRight className="w-2.5 h-2.5 ml-0.5" />
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteItem(item);
                }}
                className="p-1 rounded text-slate-300 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                title="删除此项"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
