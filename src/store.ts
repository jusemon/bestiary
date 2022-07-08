import {
  applyMiddleware,
  createStore,
  Store,
  Middleware
} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './components/app/reducer';
import { AppState } from './components/app/types';

const middleware: Middleware[] = [thunk, createLogger()];

export default function configureStore(): Store<AppState, any> {
  const store = createStore(rootReducer, undefined, applyMiddleware(...middleware));
  return store;
}
