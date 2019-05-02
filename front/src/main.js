import React from 'react';
import { render as reactDomRender } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

import App from './components/app';
import thunk from './lib/redux-thunk';
import session from './lib/redux-session';
import reporter from './lib/redux-reporter';
import reducers from './reducers/index';

import './style/main.scss';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(reporter, thunk, session)));

const container = document.createElement('div');
document.body.appendChild(container);
reactDomRender(<Provider store={ store }><App/></Provider>, container);
