import { configureStore } from '@reduxjs/toolkit';
import enemiesReducer from './components/enemies/enemies.slice';
import searchBarReducer from './components/search-bar/search-bar.slice';

export const store = configureStore({
  reducer: {
    enemies: enemiesReducer,
    searchBar: searchBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
