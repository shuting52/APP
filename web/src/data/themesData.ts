export interface ThemeItem {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  tag: string;
  desc: string;
  previewBg: string;
  badgeBg: string;
  textColor: string;
  accentColor: string;
}

export const THEME_CATEGORIES: { id: string; label: string }[] = [];

// 全局已切换为极简现代白色主题，已清空个性化风格预设
export const CUTE_THEMES_LIST: ThemeItem[] = [];
