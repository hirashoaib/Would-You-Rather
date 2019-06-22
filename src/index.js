import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

function configureStore() {
    return createStore(reducer, {}, applyMiddleware(thunk));
}

ReactDOM.render(<Provider store={configureStore()}>
                    <App />
                </Provider>, document.getElementById('root'));

