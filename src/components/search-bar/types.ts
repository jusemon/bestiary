export enum SearchType {
  Item = 'ITEM',
  Enemy = 'ENEMY',
  Location = 'LOCATION',
}

export interface SearchState {
  search: string;
  searchType: SearchType;
}
