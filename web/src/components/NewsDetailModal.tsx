import React, { useEffect } from 'react';
import { X, ExternalLink, Search, Sparkles, Newspaper, Clock, Check, Copy } from 'lucide-react';
import { TechNewsItem } from '../data/staticAiNews';

interface NewsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: TechNewsItem | null;
  onSearchInSite: (query: string) => void;
  onShowToast: (msg: string) => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  isOpen,
  onClose,
  news,
  onSearchInSite,
  onShowToast
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !news) return null;

  const handleCopy = () => {
    const text = `【${news.tag || 'AI科技'}】${news.title}（来源：${news.source}）`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        onShowToast('新闻标题已复制到剪贴板！');
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      onShowToast(text);
    }
  };

  const handleOpenGoogle = () => {
    const kw = encodeURIComponent(news.query || news.title);
    window.open(`https://www.google.com/search?q=${kw}`, '_blank', 'noopener,noreferrer');
  };

  const handleOpenBaidu = () => {
    const kw = encodeURIComponent(news.query || news.title);
    window.open(`https://www.baidu.com/s?wd=${kw}`, '_blank', 'noopener,noreferrer');
  };

  const handleTriggerInSite = () => {
    onSearchInSite(news.query || news.title);
    onClose();
    onShowToast(`已在站内筛选：“${news.query || news.title}”`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-content-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[var(--section-bg)] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500" />

        {/* Top close & badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 flex items-center gap-1">
              <Newspaper className="w-3.5 h-3.5" />
              {news.tag || '科技头条'}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {news.time || '实时动态'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* News Title */}
        <h3 className="text-base sm:text-lg font-bold text-[var(--iiice-title)] leading-snug mb-3">
          {news.title}
        </h3>

        {/* Source metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <span>资讯报道来源：</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {news.source || '全球科技资讯'}
          </span>
          <span className="mx-1.5 opacity-40">|</span>
          <span>联网检索工具：Google Search API</span>
        </div>

        {/* AI Key Insights / Summary Points */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 mb-5 border border-slate-200/70 dark:border-slate-700/60">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI 要点解析与行业速递</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {news.summary && news.summary.length > 0 ? (
              news.summary.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))
            ) : (
              <>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>该项科技动态正在重塑当前行业发展格局与开发者技术栈。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>通过下方搜索引擎链接可查看第一手官方技术文档与权威评测报告。</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleTriggerInSite}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>在站内筛选相关导航资源</span>
            </button>

            <button
              type="button"
              onClick={handleOpenGoogle}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-blue-500" />
              <span>Google 实时检索全文</span>
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <button
              type="button"
              onClick={handleOpenBaidu}
              className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>百度热搜追踪</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>复制标题</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
