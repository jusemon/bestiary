import { Enemy } from '../result-item/types';

export enum SearchType {
  Item = 'ITEM',
  Enemy = 'ENEMY',
  Location = 'LOCATION',
}

export interface SearchBarProps {
  enemies: Enemy[];
  search: (search: string, searchType: SearchType, enemies: Enemy[]) => SearchEnemiesAction;
}

export interface SearchBarState {
  search: string;
  searchType: SearchType;
}

export enum SearchActionTypes {
  SEARCH_ENEMIES = 'SEARCH_ENEMIES'
}

interface SearchEnemiesAction {
  type: typeof SearchActionTypes.SEARCH_ENEMIES;
  search: string;
  searchType: SearchType;
  enemies: Enemy[];
}

export type SearchBarActions = SearchEnemiesAction;
