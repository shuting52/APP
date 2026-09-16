import { Category, NavCard } from '../types';
import { CATEGORIES_PART1 } from './categoriesPart1';
import { CATEGORIES_PART2 } from './categoriesPart2';
import { CATEGORIES_AI_AND_TOOLS } from './categoriesAiAndTools';

export const ALL_CATEGORIES: Category[] = [
  ...CATEGORIES_AI_AND_TOOLS, // 常用AI与大模型, 无限画布与创作, Prompt与Skill社区, 常用工具与魔法网络
  ...CATEGORIES_PART1.slice(1), // video, saving, resource, music
  ...CATEGORIES_PART2, // novel, game, tool, setup, explore
  CATEGORIES_PART1[0] // coop (伙伴推荐)
];

export const TOTAL_RESOURCE_COUNT = ALL_CATEGORIES.reduce(
  (sum, cat) => sum + cat.cards.length,
  0
);

export function searchAllCards(query: string, categories: Category[]): NavCard[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  const matched: NavCard[] = [];

  for (const cat of categories) {
    for (const card of cat.cards) {
      if (
        card.title.toLowerCase().includes(q) ||
        (card.desc && card.desc.toLowerCase().includes(q)) ||
        card.url.toLowerCase().includes(q)
      ) {
        matched.push(card);
      }
    }
  }

  return matched;
}
