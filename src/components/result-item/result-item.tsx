import React, { FunctionComponent } from 'react';
import { ResultItemProps } from './types';
import './result-item.scss';

const getPicStyles = (pic: string) => ({
  backgroundImage: `url(${pic})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain'
})

const ResultItem: FunctionComponent<ResultItemProps> = (props) => {
  return (
    <div className='result-item panel-block'>
      <figure className='custom-image' style={getPicStyles(props.element.pic)}></figure>
      <div className='container content'>
        <h4>
          {props.element.name}
        </h4>
        <div className='columns'>
          <div className='column is-half'>
            <strong>Items: </strong>
            <div className='columns'>
              {props.element.items.map((item, i) => (
                <ul key={i} className='column is-half'>
                  {item.names.map((name, j) => (
                    <li key={j}>{name}</li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className='column is-half'>
            <strong>Locations: </strong>
            <ul>
              {(props.element.locations || []).map((location, i) => (
                <li key={i}>{location}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
