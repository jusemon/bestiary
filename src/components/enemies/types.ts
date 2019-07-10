import { Enemy } from '../result-item/types';

export interface Dict<T> {
  [key: string]: T;
}

export enum EnemiesActionTypes {
  REQUEST_ENEMIES_IDS = 'REQUEST_ENEMIES_IDS',
  RECEIVE_ENEMIES_IDS = 'RECEIVE_ENEMIES_IDS',
  INVALIDATE_ENEMIES_IDS = 'INVALIDATE_ENEMIES_IDS',
  REQUEST_ENEMIES = 'REQUEST_ENEMIES',
  RECEIVE_ENEMIES = 'RECEIVE_ENEMIES',
  INVALIDATE_ENEMIES = 'INVALIDATE_ENEMIES'
}

export interface EnemyResult {
  pageid: number;
}

export interface EnemyDetailResult {
  pageid: number;
  ns: number;
  title: string;
  pageprops: {
    infoboxes: string;
  };
}

export interface EnemiesState {
  ids: number[];
  enemies: Enemy[];
  isFetching: boolean;
  didInvalidate: boolean;
}

interface RequestEnemiesAction {
  type: typeof EnemiesActionTypes.REQUEST_ENEMIES;
}

interface ReceiveEnemiesAction {
  type: typeof EnemiesActionTypes.RECEIVE_ENEMIES;
  enemies: Enemy[];
}

interface InvalidateEnemiesAction {
  type: typeof EnemiesActionTypes.INVALIDATE_ENEMIES;
}

interface RequestEnemiesIdsAction {
  type: typeof EnemiesActionTypes.REQUEST_ENEMIES_IDS;
}

interface ReceiveEnemiesIdsAction {
  type: typeof EnemiesActionTypes.RECEIVE_ENEMIES_IDS;
  ids: number[];
}

interface InvalidateEnemiesIdsAction {
  type: typeof EnemiesActionTypes.INVALIDATE_ENEMIES_IDS;
}

export type EnemiesActions =
  RequestEnemiesAction |
  ReceiveEnemiesAction |
  InvalidateEnemiesAction |
  RequestEnemiesIdsAction |
  ReceiveEnemiesIdsAction |
  InvalidateEnemiesIdsAction;
