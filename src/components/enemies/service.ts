import { Enemy, Item, ItemType } from '../result-item/types';
import {
  Data,
  Types,
  DataTypeImage,
  DataDetailed,
  DataType,
} from '../data/types';
import { recursiveValueSearch, clearHtml, batchItems } from '../data/utils';
import { config } from '../../config';
import { EnemyDetailResult, EnemyResult } from './types';
import { EnemiesState } from './enemies.slice';

export const fetchEnemiesIdsByCategory = async (
  category: string
): Promise<EnemyResult[]> => {
  const params = new URLSearchParams({
    action: 'query',
    cmtitle: category,
    cmlimit: '500',
    list: 'categorymembers',
    format: 'json',
    origin: '*',
  });
  const result = await fetch(`${config.api}?${params.toString()}`);
  const json = await result.json();
  return json.query.categorymembers;
};

export const fetchEnemiesByIds = async (
  ids: number[]
): Promise<EnemyDetailResult[]> => {
  const params = new URLSearchParams({
    action: 'query',
    prop: 'pageprops',
    pageids: ids.join('|'),
    format: 'json',
    origin: '*',
  });
  const result = await fetch(`${config.api}?${params.toString()}`);
  const json = await result.json();
  const pages = Object.values(json.query.pages).map(
    (p) => p as EnemyDetailResult
  );
  return pages.filter((p) => p.pageprops && p.pageprops.infoboxes);
};

export const fetchEnemiesInBatches = async (ids: number[], batchSize = 50) => {
  let output: EnemyDetailResult[] = [];
  for (const batchIds of batchItems(ids, batchSize)) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    output = output.concat(await fetchEnemiesByIds(batchIds));
  }
  return output;
};

export const fetchEnemies = async () => {
  const categories = [
    'Category:Bosses in Crisis Core -Final Fantasy VII-',
    'Category:Enemies in Crisis Core -Final Fantasy VII-',
  ];
  const enemiesIds = await Promise.all(
    categories.map(async (category) => fetchEnemiesIdsByCategory(category))
  );
  const ids = enemiesIds.flat().map((i) => i.pageid);
  const output = await fetchEnemiesInBatches(ids);
  const results = output.map<Data[]>((i) => JSON.parse(i.pageprops.infoboxes));
  const enemies: Enemy[] = [];
  results.forEach((infoboxes) => {
    const info = infoboxes.flatMap((datas) => datas.data);
    const pic = (
      info.find((i) => i.type === Types.Image) as DataTypeImage
    ).data[0].url
      .split('/')
      .slice(0, -2)
      .join('/');
    const itemsResult = recursiveValueSearch(info, 'items');
    const gameplayDetailsResult = recursiveValueSearch(
      info,
      'Gameplay details'
    );
    if (itemsResult && gameplayDetailsResult) {
      const name = (info.find((i) => i.type === Types.Title) as DataType).data
        .value;
      const items: Item[] = itemsResult
        .filter((i) => i.type === Types.Data)
        .map((i) => i.data as DataDetailed)
        .map((d) => ({
          names: d.value
            .replace(/<br \/>/g, '<br/>')
            .split('<br/>')
            .map((v: string) => clearHtml(v)),
          type: d.source as ItemType,
        }));
      const gameplayDetails = gameplayDetailsResult
        .filter((i) => i.type === Types.Data)
        .map((i) => i.data as DataDetailed)
        .find((i) => i.source === 'location') as DataDetailed;
      enemies.push({
        name,
        pic,
        items,
        locations: gameplayDetails
          ? gameplayDetails.value
              .replace(/<br \/>/g, '<br/>')
              .split('<br/>')
              .map((v: string) => clearHtml(v))
          : [],
      });
    }
  });
  const sortedEnemies = enemies.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem('enemies', JSON.stringify(sortedEnemies));
  localStorage.setItem('version', config.version);
  return sortedEnemies;
};

export const shouldFetchEnemies = (state: EnemiesState) => {
  const isCacheValid =
    localStorage.getItem('enemies') &&
    localStorage.getItem('version') === config.version;
  if (state.didInvalidate || !isCacheValid) {
    return true;
  }
  return false;
};
