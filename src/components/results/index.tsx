import { ResultItem } from '../result-item';
import { Enemy } from '../result-item/types';
import { SearchType } from '../search-bar/types';
import { Scrollbar } from '../../ui/scrollbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useMemo, useState } from 'react';
import { Stack } from '../../ui';
import { styled } from '../../ui/styled';

const ResultsContainer = styled(Stack, {
  backgroundImage: `linear-gradient(
    to right,
    rgba(7, 21, 66, 0.89),
    rgba(6, 8, 112, 0.055),
    rgba(6, 8, 112, 0.055),
    rgba(7, 21, 66, 0.89)
  )`,
});

const LoadingContainer = styled(
  'div',
  {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    fontSize: '1.2rem',
  },
  'result-item panel-block'
);

const LoadingText = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <>Loading{'.'.repeat(dots)}</>;
};

const searchs: Record<
  SearchType,
  (search: string) => (enemy: Enemy) => boolean
> = {
  ENEMY: (search: string) => (enemy: Enemy) =>
    enemy.name.toLowerCase().includes(search.toLowerCase()),
  ITEM: (search: string) => (enemy: Enemy) =>
    enemy.items.some((item) =>
      item.names.some((name) =>
        name
          .toLowerCase()
          .split(':')
          [name.toLowerCase().split(':').length - 1].includes(
            search.toLowerCase()
          )
      )
    ),
  LOCATION: (search: string) => (enemy: Enemy) =>
    enemy.locations.some((location) =>
      location.toLowerCase().includes(search.toLowerCase())
    ),
};

export const Results = () => {
  const searchBarState = useSelector((state: RootState) => state.searchBar);
  const { enemies, isFetching } = useSelector(
    (state: RootState) => state.enemies
  );
  const filteredEnemies = useMemo(
    () =>
      enemies.filter(searchs[searchBarState.searchType](searchBarState.search)),
    [enemies, searchBarState.searchType, searchBarState.search]
  );

  if (isFetching) {
    return (
      <ResultsContainer>
        <Scrollbar>
          <LoadingContainer>
            <LoadingText />
          </LoadingContainer>
        </Scrollbar>
      </ResultsContainer>
    );
  }

  return (
    <ResultsContainer>
      <Scrollbar>
        {filteredEnemies
          .filter((_e, i) => i < 500)
          .map((e, i) => (
            <ResultItem element={e} key={i}></ResultItem>
          ))}
      </Scrollbar>
    </ResultsContainer>
  );
};
