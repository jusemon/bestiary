import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppProps } from './types';
import { fetchEnemiesIfNeeded } from '../enemies/actions';
import SearchBar from '../search-bar/search-bar';
import Results from '../results/results';
import { Environment } from '../../environment';
import { tryRequire } from '../data/utils';
import './app.scss';

// Workarround for StackBlitz
const circle = tryRequire('../../assets/circle.png', Environment.CIRCLE);

const App: FunctionComponent<AppProps> = ({ dispatch }) => {
  useEffect(() => {
    dispatch(fetchEnemiesIfNeeded());
  }, []);

  return (
    <div className="app container">
      <img className="animated-image" alt="Animated logo" src={circle}></img>
      <nav className="panel">
        <p className="panel-heading">Enemies</p>
        <SearchBar></SearchBar>
        <Results></Results>
      </nav>
    </div>
  );
};

export default connect()(App);
