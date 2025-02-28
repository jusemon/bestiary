import { ChangeEvent, FunctionComponent, useCallback } from 'react';
import { SearchState, SearchType } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { searchEnemies } from './search-bar.slice';
import './search-bar.css';

export const SearchBar: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const enemies = useSelector((state: RootState) => state.enemies.enemies);
  const { search, searchType } = useSelector(
    (state: RootState) => state.searchBar
  );

  const handleSearch = useCallback(
    (newState: Partial<SearchState>) => {
      dispatch(
        searchEnemies({
          search: newState.search ?? search,
          searchType: newState.searchType ?? searchType,
          enemies,
        })
      );
    },
    [dispatch, enemies, search, searchType]
  );

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleSearch({ search: event.target.value });
    },
    [handleSearch]
  );

  const handleSearchTypeChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      handleSearch({ searchType: event.target.value as SearchType });
    },
    [handleSearch]
  );

  const searchOptions = Object.entries(SearchType).map(([text, value]) => ({
    text,
    value,
  }));

  return (
    <div className='search-bar panel-block'>
      <div className='field has-addons'>
        <p className='control'>
          <span className='select'>
            <select value={searchType} onChange={handleSearchTypeChange}>
              {searchOptions.map(({ text, value }) => (
                <option key={value} value={value}>
                  {text}
                </option>
              ))}
            </select>
          </span>
        </p>
        <p className='control is-expanded has-icons-left'>
          <input
            value={search}
            onChange={handleSearchChange}
            className='input'
            type='text'
            placeholder='Write your search'
          />
          <span className='icon is-left'>
            <i className='fas fa-search' aria-hidden='true' />
          </span>
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
