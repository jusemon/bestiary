import { Reducer } from 'redux';
import {
  EnemiesActions,
  EnemiesActionTypes,
  EnemiesState
} from './types';

const initialState: EnemiesState = {
  ids: [],
  enemies: [],
  isFetching: false,
  didInvalidate: false
};

export const enemiesReducer: Reducer<EnemiesState, EnemiesActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case EnemiesActionTypes.REQUEST_ENEMIES_IDS:
      return {
        ...state,
        isFetching: true
      };
    case EnemiesActionTypes.RECEIVE_ENEMIES_IDS:
      return {
        ...state,
        ids: action.ids,
        isFetching: false
      };
    case EnemiesActionTypes.INVALIDATE_ENEMIES_IDS:
      return {
        ...state,
        didInvalidate: true
      };
    case EnemiesActionTypes.REQUEST_ENEMIES:
      return {
        ...state,
        isFetching: true
      };
    case EnemiesActionTypes.RECEIVE_ENEMIES:
      return {
        ...state,
        enemies: action.enemies.sort((a, b) => a.name < b.name ? -1 : 1),
        isFetching: false
      };
    case EnemiesActionTypes.INVALIDATE_ENEMIES:
      return {
        ...state,
        didInvalidate: true
      };
    default:
      return state;
  }
};
