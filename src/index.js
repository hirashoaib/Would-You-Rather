import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

function configureStore() {
    return createStore(reducer, {}, applyMiddleware(thunk, logger));
}

ReactDOM.render(<Provider store={configureStore()}>
                    <App />
                </Provider>, document.getElementById('root'));

