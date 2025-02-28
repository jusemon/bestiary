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
