import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './styles/style.scss';
import { HashRouter as Router} from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <Router>
      <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
