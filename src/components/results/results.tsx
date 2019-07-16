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
          {this.props.enemies.filter((e, i)=>i<1000).map((e, i) => (
            <ResultItem element={e} key={i} ></ResultItem>)
          )}
        </Scrollbar>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  const { enemies, isFetching } = state.enemiesState || {
    isFetching: true,
    enemies: [] as Enemy[]
  };
  const { searchType, search } = state.searchBarState;
  return {
    enemies: searchType === SearchType.Enemy ? enemies.filter(e => e.name.toLowerCase().indexOf(search) > -1) :
      enemies.filter(
        e => e.items.some(
          i => i.names.some(
            n => n.toLowerCase().split(':')[n.toLowerCase().split(':').length - 1].indexOf(search) > -1
          )
        )
      ),
    isFetching
  };
}

export default connect(mapStateToProps)(Results);
