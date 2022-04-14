import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux'
import {applyMiddleware, compose, createStore} from "redux";
import thunk from 'redux-thunk'
import createSagaMiddleware  from 'redux-saga'

import reportWebVitals from './reportWebVitals';
import App from './App';

import {rootReducer} from "./redux/rootReducer";
import {forbiddenWordsMiddleware} from "./components/middleware";
import {sagaWatcher} from "./redux/sagas";

const saga = createSagaMiddleware()

const store = createStore(rootReducer,  compose(
    applyMiddleware(
        thunk,
        forbiddenWordsMiddleware,
        saga
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

saga.run(sagaWatcher)


const root = createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)



reportWebVitals();
