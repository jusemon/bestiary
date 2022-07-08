import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppProps, AppState } from './types';
import { fetchEnemiesIfNeeded } from '../enemies/actions';
import SearchBar from '../search-bar/search-bar';
import Results from '../results/results';
import circle from '../../assets/circle.png'
import './app.scss';

class App extends Component<AppProps, AppState> {
  componentDidMount() {
    this.props.dispatch(fetchEnemiesIfNeeded());
  }

  render() {
    return (
      <div className='app container'>
        <img className='animated-image' alt="Animated logo" src={circle}></img>
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
