import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Enemy } from '../result-item/types';
import { fetchEnemies, shouldFetchEnemies } from './service';
import { RootState } from '../../store';

export const fetchEnemiesIfNeeded = createAsyncThunk<
  Enemy[],
  void,
  { state: RootState }
>('enemies/fetchEnemiesIfNeeded', async (_, { getState }) => {
  const { enemies: state } = getState();
  if (shouldFetchEnemies(state)) {
    return await fetchEnemies();
  } else {
    const savedEnemies = localStorage.getItem('enemies');
    const enemies: Enemy[] = savedEnemies ? JSON.parse(savedEnemies) : [];
    return enemies;
  }
});

export const enemiesSlice = createSlice({
  name: 'enemies',
  initialState: {
    enemies: [] as Enemy[],
    isFetching: false,
    didInvalidate: false,
  },
  reducers: {
    invalidateEnemies: (state) => {
      state.didInvalidate = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEnemiesIfNeeded.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchEnemiesIfNeeded.fulfilled, (state, action) => {
      state.enemies = action.payload;
      state.isFetching = false;
    });
    builder.addCase(fetchEnemiesIfNeeded.rejected, (state) => {
      state.isFetching = false;
    });
  },
});

export const { invalidateEnemies } = enemiesSlice.actions;

export type EnemiesState = ReturnType<typeof enemiesSlice.reducer>;

export default enemiesSlice.reducer;
