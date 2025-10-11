import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './styles/App.css'
import './styles/index.css'
import './styles/themes/default.css'
import './styles/themes/classic-blue.css'
import './styles/themes/classic-dark.css'
import './styles/themes/dark-aqua.css'
import './styles/themes/dark-green.css'
import './styles/themes/light-blue.css'
import './styles/themes/light-orange.css'
import './styles/themes/light-pink.css'

import App from './App.tsx'
import { store } from '#store/store.ts';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
)
