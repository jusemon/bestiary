import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bulma/css/bulma.min.css';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
