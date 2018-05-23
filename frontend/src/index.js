import React from 'react';
import ReactDOM from 'react-dom';
import './styling/index.css';
import './components/Login.js';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
