import './app.css';

import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchEnemiesIfNeeded } from '../enemies/enemies.slice';
import SearchBar from '../search-bar/search-bar';
import { Results } from '../results';
import { tryRequire } from '../data/utils';
import { config } from '../../config';
import { Container, Panel, PanelHeading, AnimatedImage } from '../../ui';
import { AppDispatch } from '../../store';

// Workarround for StackBlitz
const circle = tryRequire('../../assets/circle.png', config.circle);

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEnemiesIfNeeded());
  }, [dispatch]);

  return (
    <Container>
      <AnimatedImage alt='Animated logo' src={circle}></AnimatedImage>
      <Panel>
        <PanelHeading
          style={{
            borderTop: '3px solid #BCBCC9',
          }}
        >
          Enemies
        </PanelHeading>
        <SearchBar></SearchBar>
        <Results></Results>
      </Panel>
    </Container>
  );
};

export default connect()(App);
