/**
 * Created by ycj on 2017/4/6.
 */

import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from "react-router";

// routerMiddleware(browserHistory)
// const middlewares = [thunkMiddleware];
const routerMiddlewares = routerMiddleware(browserHistory)
const middlewares = [thunkMiddleware, routerMiddlewares];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(//配置
     //applyMiddleware(thunkMiddleware, logger),
    applyMiddleware(...middlewares),
);


export function createDevToolsStore(reducer) {
    return createStore(reducer, enhancer);
}