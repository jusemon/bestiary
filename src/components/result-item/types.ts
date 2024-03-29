export type ItemType = 'steal' | 'drop';

export interface Item {
  names: string[];
  type: ItemType;
}

export interface Enemy {
  name: string;
  pic: string;
  locations: string[];
  items: Item[];
}

export interface ResultItemProps {
  element: Enemy;
}
