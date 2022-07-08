import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppProps } from './types';
import { fetchEnemiesIfNeeded } from '../enemies/actions';
import SearchBar from '../search-bar/search-bar';
import Results from '../results/results';
import './app.scss';
import { Environment } from '../../environment';

const App: FunctionComponent<AppProps> = ({ dispatch }) => {
  const [circle] = useState(() => {
    // Workarround for StackBlitz
    try {
      return require('../../assets/circle.png');
    } catch (err) {
      return Environment.CIRCLE;
    }
  })

  useEffect(() => {
    dispatch(fetchEnemiesIfNeeded());
  }, []);

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

export default connect()(App);
