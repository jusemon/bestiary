import { Enemy } from '../result-item/types';

export interface ResultsProps {
  enemies: Enemy[];
  isFetching: boolean;
}
