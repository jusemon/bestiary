import React, { Component } from 'react';
import SearchBar from '../search-bar/search-bar';
import Results from '../results/results';
import { AppProps, AppState } from './types';
import './app.scss';
import { connect } from 'react-redux';
import { fetchEnemiesIfNeeded } from '../enemies/actions';

class App extends Component<AppProps, AppState> {
  componentDidMount() {
    this.props.dispatch(fetchEnemiesIfNeeded());
  }

  render() {
    return (
      <div className='app container'>
        <nav className='panel'>
          <p className='panel-heading'>
            Enemies
          </p>
          <SearchBar></SearchBar>
          <Results></Results>
        </nav>
      </div >
    );
  }
}

export default connect()(App);
