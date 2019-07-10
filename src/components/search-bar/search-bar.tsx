import React, { ChangeEvent } from 'react';
import { SearchBarProps, SearchType, SearchBarActions } from './types';
import './search-bar.scss';
import { AppState } from '../app/types';
import { Dispatch } from 'redux';
import { searchEnemies } from './actions';
import { Enemy } from '../result-item/types';
import { connect } from 'react-redux';

class SearchBar extends React.Component<SearchBarProps, { value: string, searchType: string }> {

  constructor(props: SearchBarProps) {
    super(props);
    this.state = { value: '', searchType: SearchType.Item.toString() };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
  }

  handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleSearchTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({ searchType: event.target.value });
  }

  render() {
    const options = Object.keys(SearchType).map(k => ({ text: k, value: (SearchType as any)[k] }));
    return (
      <div className='search-bar panel-block'>
        <div className='field has-addons'>
          <p className='control'>
            <span className='select'>
              <select value={this.state.searchType} onChange={this.handleSearchTypeChange}>
                {options.map((option, i) => (<option key={i} value={option.value}>{option.text}</option>))}
              </select>
            </span>
          </p>
          <p className='control is-expanded has-icons-left'>
            <input value={this.state.value} onChange={this.handleSearchChange}
              className='input' type='text' placeholder='Write your search' />
            <span className='icon is-left'>
              <i className='fas fa-search' aria-hidden='true'></i>
            </span>
          </p>
          <p className='control'>
            <button className='button'
              onClick={() => this.props.search(this.state.value, this.state.searchType as SearchType, this.props.enemies)}>
              Search
            </button>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const { enemies } = state.enemiesState;
  return {
    enemies
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SearchBarActions, {}>) =>
  ({
    search: (search: string, searchType: SearchType, enemies: Enemy[]) => dispatch(searchEnemies({ search, searchType, enemies }))
  });

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
