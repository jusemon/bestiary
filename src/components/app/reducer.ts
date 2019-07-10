import { combineReducers } from 'redux';
import { AppState } from './types';
import { enemiesReducer } from '../enemies/reducer';
import { searchBarReducer } from '../search-bar/reducer';

export default combineReducers<AppState>({
  enemiesState: enemiesReducer,
  searchBarState: searchBarReducer
});
