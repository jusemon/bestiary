import React, { Component } from 'react';
import { ResultsProps } from './types';
import './results.scss';
import ResultItem from '../result-item/result-item';
import { AppState } from '../app/types';
import { Enemy } from '../result-item/types';
import { connect } from 'react-redux';
import { SearchType } from '../search-bar/types';
import { Scrollbar } from '../scrollbar';

class Results extends Component<ResultsProps> {
  shouldComponentUpdate(next: ResultsProps) {
    return next.enemies !== this.props.enemies;
  }

  render() {
    return (
      <div className='results'>
        <Scrollbar>
          {this.props.enemies
            .filter((e, i) => i < 1000)
            .map((e, i) => (
              <ResultItem element={e} key={i}></ResultItem>
            ))}
        </Scrollbar>
      </div>
    );
  }
}

const searchs: Record<
  SearchType,
  (search: string) => (enemy: Enemy) => boolean
> = {
  ENEMY: (search: string) => (enemy: Enemy) =>
    enemy.name.toLowerCase().includes(search),
  ITEM: (search: string) => (enemy: Enemy) =>
    enemy.items.some((item) =>
      item.names.some((name) =>
        name
          .toLowerCase()
          .split(':')
          [name.toLowerCase().split(':').length - 1].includes(search)
      )
    ),
  LOCATION: (search: string) => (enemy: Enemy) =>
    enemy.locations.some((item) => item.toLowerCase().includes(search)),
};

function mapStateToProps(state: AppState) {
  const { enemies, isFetching } = state.enemiesState || {
    isFetching: true,
    enemies: [] as Enemy[],
  };
  const { searchType, search } = state.searchBarState;
  return {
    enemies: enemies.filter(searchs[searchType](search)),
    isFetching,
  };
}

export default connect(mapStateToProps)(Results);
