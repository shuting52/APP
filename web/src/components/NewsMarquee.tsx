import React, { useState, useEffect } from 'react';
import { Newspaper, RefreshCw, ChevronRight, ChevronLeft, ExternalLink, Sparkles } from 'lucide-react';
import { STATIC_AI_NEWS_LIST, TechNewsItem } from '../data/staticAiNews';

export type NewsHeadline = TechNewsItem;

interface NewsMarqueeProps {
  onSelectNews: (news: NewsHeadline) => void;
  onOpenDetail?: (news: NewsHeadline) => void;
}

export const NewsMarquee: React.FC<NewsMarqueeProps> = ({ onSelectNews, onOpenDetail }) => {
  const [headlines, setHeadlines] = useState<NewsHeadline[]>(STATIC_AI_NEWS_LIST);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const fetchHeadlines = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news/tech');
      const data = await res.json();
      if (data.success && Array.isArray(data.headlines) && data.headlines.length > 0) {
        setHeadlines(data.headlines);
      }
    } catch {
      // Fallback to static list
      setHeadlines(STATIC_AI_NEWS_LIST);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeadlines();
  }, []);

  // Cycle headlines every 4 seconds when not paused
  useEffect(() => {
    if (headlines.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [headlines.length, isPaused]);

  if (headlines.length === 0 && !loading) return null;

  const currentNews = headlines[currentIndex] || headlines[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + headlines.length) % headlines.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % headlines.length);
  };

  const handleClickItem = () => {
    if (onOpenDetail) {
      onOpenDetail(currentNews);
    } else {
      onSelectNews(currentNews);
    }
  };

  const handleDirectExternalSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    const query = encodeURIComponent(currentNews.query || currentNews.title);
    window.open(`https://www.google.com/search?q=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="w-full mt-2.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50/95 via-indigo-50/90 to-amber-50/90 dark:from-slate-800/95 dark:via-slate-800/80 dark:to-slate-800/95 border border-blue-200/80 dark:border-slate-700/80 flex items-center gap-2 text-xs transition-all shadow-xs"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Badge Header */}
      <div className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-[11px] shadow-xs">
        <Newspaper className="w-3.5 h-3.5" />
        <span>AI 头条</span>
      </div>

      {/* Marquee ticker content */}
      <div className="flex-1 min-w-0 overflow-hidden relative h-6 flex items-center">
        {loading ? (
          <span className="text-slate-400 text-xs flex items-center gap-1.5 animate-pulse">
            <RefreshCw className="w-3 h-3 animate-spin text-blue-500" />
            <span>正在通过 Google Search 检索最新资讯...</span>
          </span>
        ) : currentNews ? (
          <div
            onClick={handleClickItem}
            className="w-full text-left truncate flex items-center gap-2 group cursor-pointer"
            title="点击查看 AI 深度要点摘要与相关检索"
          >
            {currentNews.tag && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-950/80 shrink-0">
                {currentNews.tag}
              </span>
            )}
            <span className="truncate font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {currentNews.title}
            </span>
            {currentNews.source && (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 shrink-0 hidden lg:inline">
                ({currentNews.source})
              </span>
            )}
            <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] text-blue-600 dark:text-blue-400 font-medium px-1.5 py-0.2 rounded bg-blue-50 dark:bg-slate-700/60 shrink-0 group-hover:bg-blue-100 transition-colors">
              <Sparkles className="w-2.5 h-2.5" />
              <span>详情</span>
            </span>
          </div>
        ) : null}
      </div>

      {/* Action Buttons: Direct External Search + Prev/Next + Refresh */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Quick External Google Search Button */}
        <button
          type="button"
          onClick={handleDirectExternalSearch}
          className="p-1 rounded hover:bg-blue-100 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          title="在 Google 中快速搜索此新闻"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        {/* Counter */}
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono hidden sm:inline px-1">
          {headlines.length > 0 ? `${currentIndex + 1}/${headlines.length}` : ''}
        </span>

        {/* Prev / Next buttons */}
        <button
          type="button"
          onClick={handlePrev}
          className="p-0.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          title="上一条新闻"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="p-0.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          title="下一条新闻"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Refresh button */}
        <button
          type="button"
          onClick={fetchHeadlines}
          disabled={loading}
          className="p-1 rounded text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer disabled:opacity-50 transition-colors"
          title="刷新最新热点资讯"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};
