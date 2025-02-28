import { FunctionComponent } from 'react';
import { ResultItemProps } from './types';
import { Figure } from '../../ui';
import './index.css';

export const ResultItem: FunctionComponent<ResultItemProps> = (props) => {
  return (
    <div className='result-item panel-block'>
      <Figure style={{ backgroundImage: `url(${props.element.pic})` }}></Figure>
      <div className='container content'>
        <h4>{props.element.name}</h4>
        <div className='columns'>
          <div className='column is-two-thirds'>
            <strong>Items: </strong>
            <div className='columns'>
              {props.element.items.map((item, i) => (
                <div key={i} className='column is-half'>
                  {item.names.map((name, j) => (
                    <div key={j}>- {name}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className='column'>
            <strong>Locations: </strong>
            <div>
              {(props.element.locations || []).map((location, i) => (
                <div key={i}>- {location}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
