import { EnemiesState } from '../enemies/types';
import { SearchBarState } from '../search-bar/types';

export interface AppState {
  enemiesState: EnemiesState;
  searchBarState: SearchBarState;
}

export interface AppProps {
  dispatch: (params: any) => any;
}
