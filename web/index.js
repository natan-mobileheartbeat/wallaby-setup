import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { unregister as unregisterServiceWorker } from './registerServiceWorker';
import Root from '../core/components/Root';
import { configureStore, history } from '../core/store/configureStore';

import '../css/app.global.css';

const store = configureStore();
ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);

unregisterServiceWorker();
