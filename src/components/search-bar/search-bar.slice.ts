import { createSlice } from '@reduxjs/toolkit';
import { SearchType } from './types';

export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState: {
    search: '',
    searchType: SearchType.Item,
  },
  reducers: {
    searchEnemies: (state, action) => {
      state.search = action.payload.search;
      state.searchType = action.payload.searchType;
    },
  },
});

export const { searchEnemies } = searchBarSlice.actions;

export default searchBarSlice.reducer;
