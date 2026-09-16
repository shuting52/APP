// Utility for tracking user search/click frequencies to dynamically compute popular hot search keywords

export interface KeywordStat {
  keyword: string;
  count: number;
}

// Initial curated baseline keywords from the navigation dataset
export const BASELINE_HOT_KEYWORDS: { name: string; tag?: string; count: number }[] = [
  { name: '影视在线', tag: '热', count: 120 },
  { name: 'AI工具', tag: '新', count: 95 },
  { name: '百度网盘', tag: '推', count: 88 },
  { name: '免费听歌', tag: '', count: 76 },
  { name: '小说漫读', tag: '', count: 68 },
  { name: '游戏下载', tag: '火', count: 64 },
  { name: '装机必备', tag: '', count: 52 },
  { name: 'GitHub', tag: '', count: 48 },
  { name: '夸克网盘', tag: '热', count: 45 },
  { name: '电子书', tag: '', count: 42 }
];

const STORAGE_KEY_SEARCH_HISTORY = 'user_search_history';
const STORAGE_KEY_KEYWORD_STATS = 'user_keyword_stats';

// Get recent 5 search records
export function getSearchHistory(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SEARCH_HISTORY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list.slice(0, 5) : [];
  } catch {
    return [];
  }
}

// Add a search record (max 5, deduplicated, most recent first)
export function addSearchHistory(keyword: string): string[] {
  const trimmed = keyword.trim();
  if (!trimmed) return getSearchHistory();

  try {
    const current = getSearchHistory().filter((k) => k.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...current].slice(0, 5);
    localStorage.setItem(STORAGE_KEY_SEARCH_HISTORY, JSON.stringify(updated));

    // Also record frequency
    recordKeywordHit(trimmed, 3); // Searches weigh 3 points
    return updated;
  } catch {
    return [trimmed];
  }
}

// Clear search history
export function clearSearchHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_SEARCH_HISTORY);
  } catch {
    // Ignore
  }
}

// Delete single history item
export function removeSearchHistoryItem(item: string): string[] {
  try {
    const current = getSearchHistory().filter((k) => k !== item);
    localStorage.setItem(STORAGE_KEY_SEARCH_HISTORY, JSON.stringify(current));
    return current;
  } catch {
    return [];
  }
}

// Record keyword hit or card click
export function recordKeywordHit(keyword: string, weight: number = 1): void {
  const trimmed = keyword.trim();
  if (!trimmed) return;

  try {
    const raw = localStorage.getItem(STORAGE_KEY_KEYWORD_STATS);
    const stats: Record<string, number> = raw ? JSON.parse(raw) : {};
    stats[trimmed] = (stats[trimmed] || 0) + weight;
    localStorage.setItem(STORAGE_KEY_KEYWORD_STATS, JSON.stringify(stats));
  } catch {
    // Ignore
  }
}

// Get dynamic popular keywords merged with user frequency
export function getDynamicHotKeywords(): { name: string; tag?: string; count: number }[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_KEYWORD_STATS);
    const userStats: Record<string, number> = raw ? JSON.parse(raw) : {};

    // Clone baseline
    const map = new Map<string, { name: string; tag?: string; count: number }>();
    BASELINE_HOT_KEYWORDS.forEach((item) => {
      map.set(item.name.toLowerCase(), { ...item });
    });

    // Merge user activity stats
    Object.entries(userStats).forEach(([k, count]) => {
      const lower = k.toLowerCase();
      if (map.has(lower)) {
        const item = map.get(lower)!;
        item.count += count;
      } else if (k.length <= 8) {
        map.set(lower, {
          name: k,
          tag: count >= 5 ? '热' : undefined,
          count: count * 5 + 10
        });
      }
    });

    // Sort by count descending and take top 9
    const sorted = Array.from(map.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 9);

    return sorted;
  } catch {
    return BASELINE_HOT_KEYWORDS;
  }
}
