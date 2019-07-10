import { SearchBarActions, SearchActionTypes, SearchType } from './types';
import { Enemy } from '../result-item/types';

export function searchEnemies({ search, searchType, enemies }:
  { search: string, searchType: SearchType, enemies: Enemy[] }): SearchBarActions {
  return {
    type: SearchActionTypes.SEARCH_ENEMIES,
    search,
    searchType,
    enemies
  };
}
