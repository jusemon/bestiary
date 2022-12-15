import React, { ChangeEvent } from 'react';
import { SearchBarProps, SearchType, SearchBarActions, SearchBarState } from './types';
import './search-bar.scss';
import { AppState } from '../app/types';
import { Dispatch } from 'redux';
import { searchEnemies } from './actions';
import { Enemy } from '../result-item/types';
import { connect } from 'react-redux';

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {

  constructor(props: SearchBarProps) {
    super(props);
    this.state = { search: '', searchType: SearchType.Item };
    this.props.search(this.state.search, this.state.searchType, this.props.enemies);
    console.log('constructor');
  }

  handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ search: event.target.value });
  }

  handleSearchTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({ searchType: event.target.value as SearchType });
  }

  componentDidUpdate(_: SearchBarProps, state: SearchBarState) {
    if (this.state !== state) {
      this.props.search(this.state.search, this.state.searchType, this.props.enemies)  
    }
  }

  render() {
    const options = Object.keys(SearchType).map(k => ({ text: k, value: (SearchType as Record<string, string>)[k] }));
    return (
      <div className='search-bar panel-block'>
        <div className='field has-addons'>
          <p className='control'>
            <span className='select'>
              <select value={this.state.searchType} onChange={(value) => this.handleSearchTypeChange(value)}>
                {options.map((option, i) => (<option key={i} value={option.value}>{option.text}</option>))}
              </select>
            </span>
          </p>
          <p className='control is-expanded has-icons-left'>
            <input value={this.state.search} onChange={(value) => this.handleSearchChange(value)}
              className='input' type='text' placeholder='Write your search' />
            <span className='icon is-left'>
              <i className='fas fa-search' aria-hidden='true'></i>
            </span>
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

const mapDispatchToProps = (dispatch: Dispatch<SearchBarActions>) =>
  ({
    search: (search: string, searchType: SearchType, enemies: Enemy[]) => dispatch(searchEnemies({ search, searchType, enemies }))
  });

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
