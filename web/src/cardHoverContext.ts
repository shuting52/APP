import { NavCard } from './types';

export interface CardHoverState {
  card: NavCard | null;
  rect: DOMRect | null;
}
