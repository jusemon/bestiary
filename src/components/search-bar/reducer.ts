import { Reducer } from 'redux';
import {
  SearchActionTypes,
  SearchType,
  SearchBarActions,
  SearchBarState
} from './types';

const initialState: SearchBarState = {
  search: '',
  searchType: SearchType.Item
};

export const searchBarReducer: Reducer<SearchBarState, SearchBarActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SearchActionTypes.SEARCH_ENEMIES:
      const text = action.search.toLowerCase();
      return {
        ...state,
        search: text,
        searchType: action.searchType
      };
    default:
      return state;
  }
};
