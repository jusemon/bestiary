import fetchJsonp from 'fetch-jsonp';
import { EnemiesActions, EnemiesActionTypes, EnemiesState, Dict, EnemyResult, EnemyDetailResult } from './types';
import { Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Environment } from '../../environment';
import { Enemy, Item, ItemType } from '../result-item/types';
import { AppState } from '../app/types';
import { Data, Types, DataTypeImage, DataDetailed, DataType } from '../data/types';
import { recursiveValueSearch, clearHtml } from '../data/utils';

function requestEnemies(): EnemiesActions {
  return {
    type: EnemiesActionTypes.REQUEST_ENEMIES
  };
}

export function receiveEnemies(enemies: Enemy[]): EnemiesActions {
  return {
    type: EnemiesActionTypes.RECEIVE_ENEMIES,
    enemies
  };
}

function requestEnemiesIds(): EnemiesActions {
  return {
    type: EnemiesActionTypes.REQUEST_ENEMIES_IDS
  };
}

function receiveEnemiesIds(enemies: EnemyResult[]): EnemiesActions {
  return {
    type: EnemiesActionTypes.RECEIVE_ENEMIES_IDS,
    ids: enemies.map(e => e.pageid)
  };
}

function fetchEnemiesIds(): (dispatch: Dispatch<EnemiesActions, {}>) => Promise<EnemiesActions> {
  return async (dispatch) => {
    dispatch(requestEnemiesIds());
    const categories = ['Category:Bosses in Crisis Core -Final Fantasy VII-', 'Category:Enemies in Crisis Core -Final Fantasy VII-'];
    const url = new URL(Environment.API);
    const output: EnemyResult[] = [];
    for (const category of categories) {
      output.push(...await fetchEnemiesIdsByCategory(url, category));
    }
    return dispatch(receiveEnemiesIds(output));
  };
}

async function fetchEnemiesIdsByCategory(url: URL, category: string): Promise<EnemyResult[]> {
  const params: Dict<string> = {
    action: 'query',
    cmtitle: category,
    cmlimit: '500',
    list: 'categorymembers',
    format: 'json',
  };
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      url.searchParams.append(key, params[key]);
    }
  }
  const result = await fetchJsonp(url.toString()).then(r => r.json()).then(r => r.query.categorymembers);
  return result;
}

function fetchEnemies(): (dispatch: Dispatch<EnemiesActions, {}>, getState: () => AppState) => Promise<EnemiesActions> {
  return async (dispatch, getState) => {
    dispatch(requestEnemies());
    const url = new URL(Environment.API);
    const ids = getState().enemiesState.ids;
    const result: EnemyDetailResult[] = [];
    const enemies: Enemy[] = [];
    for (let current = 0; current < ids.length; current += 50) {
      const params: Dict<string> = {
        action: 'query',
        prop: 'pageprops',
        pageids: ids.slice(current, current + 50).join('|'),
        format: 'json'
      };
      for (const key in params) {
        if (params.hasOwnProperty(key)) { url.searchParams.append(key, params[key]); }
      }
      const currentResult = await fetchJsonp(url.toString())
        .then(r => r.json())
        .then(r => Object.keys(r.query.pages).map(k => r.query.pages[k] as EnemyDetailResult));

      result.push(...currentResult.filter(r => r.pageprops && r.pageprops.infoboxes));
    }
    const results = result.map(i => JSON.parse(i.pageprops.infoboxes) as Data[]);
    results.forEach(infoboxes => {
      const info = infoboxes.flatMap(datas => datas.data);
      const pic = (info.find(i => i.type === Types.Image) as DataTypeImage).data[0].url;
      const itemsResult = recursiveValueSearch(info, 'items');
      const gameplayDetailsResult = recursiveValueSearch(info, 'Gameplay details');
      if (itemsResult && gameplayDetailsResult) {
        const name = (info.find(i => i.type === Types.Title) as DataType).data.value;
        const items: Item[] = itemsResult.filter(i => i.type === Types.Data)
          .map(i => i.data as DataDetailed).map(d =>
            ({ names: d.value.split('<br />').map(v => clearHtml(v)), type: d.source as ItemType }));
        const gameplayDetails = gameplayDetailsResult.filter(i => i.type === Types.Data)
          .map(i => i.data as DataDetailed).find(i => i.source === 'location') as DataDetailed;
        enemies.push({ name, pic, items, ubications: gameplayDetails ? gameplayDetails.value.split('<br />').map(v => clearHtml(v)) : [] });
      }
    });
    localStorage.setItem('enemies', JSON.stringify(enemies));
    localStorage.setItem('version', Environment.VERSION);
    return dispatch(receiveEnemies(enemies));
  };
}

function shouldFetchEnemies(state: EnemiesState) {
  if (localStorage.getItem('enemies') && localStorage.getItem('version') === Environment.VERSION) {
    return false;
  }
  if (state.enemies.length === 0) {
    return true;
  } else if (state.isFetching) {
    return false;
  }
  return state.didInvalidate;
}

function shouldFetchEnemiesIds(state: EnemiesState) {
  if (state.ids.length === 0) {
    return true;
  } else if (state.isFetching) {
    return false;
  }
  return state.didInvalidate;
}

const fetchEnemiesIdsIfNeeded:
  ActionCreator<ThunkAction<Promise<EnemiesActions> | void, AppState, null, EnemiesActions>> = () => {
    return (dispatch, getState) => {
      if (shouldFetchEnemiesIds(getState().enemiesState)) {
        return dispatch(fetchEnemiesIds());
      }
    };
  };

export const fetchEnemiesIfNeeded:
  ActionCreator<ThunkAction<Promise<EnemiesActions> | EnemiesActions | void, AppState, null, EnemiesActions>> = () => {
    return (dispatch, getState) => {
      const state = getState().enemiesState;
      if (shouldFetchEnemies(state)) {
        const result = dispatch(fetchEnemiesIdsIfNeeded());
        if (result) {
          return result.then(s => dispatch(fetchEnemies()));
        }
      } else {
        const enemies = localStorage.getItem('enemies');
        if (enemies) {
          return dispatch(receiveEnemies(JSON.parse(enemies)));
        }
      }
    };
  };
