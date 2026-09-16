export interface NavCard {
  id: string;
  title: string;
  url: string;
  icon?: string;
  fallbackText?: string;
  fallbackDomain?: string;
  badge?: string;
  subcatId: string;
  isTitleRed?: boolean;
  desc?: string;
  isCustom?: boolean;
}

export interface SubCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  iconName?: string;
  desc?: string;
  subcategories: SubCategory[];
  cards: NavCard[];
}

export interface SearchEngine {
  id: string;
  name: string;
  url: string;
  placeholder?: string;
  icon?: string;
}
