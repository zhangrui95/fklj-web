import {hex_md5} from "../resources/md5";
import { browserHistory } from 'react-router';
import {post} from "./request";
import { routerMiddleware, push } from 'react-router-redux';
import {store} from '../index.js';
import {clientNameList,clientName,securityCenterUrl, loginUrl} from '../utils/index';
import { message} from 'antd';
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'







function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(json) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: json.token,
        json
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}
export function loginUser(creds) {

    return dispatch => {
        dispatch(requestLogin(creds))

        let cred = {username: creds.username, password: hex_md5(creds.password),sid:'fklj_sys'}
        post(loginUrl+'/aqzx/api/login', cred).then((res) => {
            console.log('res', res)
            if(res.error !== null){
                message.warning('提示：'+res.error.text+"!",3);
            } else {
                let userJson = JSON.stringify(res.data);
                let user = JSON.parse(userJson);
                console.log('userJson', userJson)
                console.log('user', user)
                sessionStorage.setItem('user', userJson);
                sessionStorage.setItem('userName', user.user.name);
                sessionStorage.setItem('id_token', res.data.token);
                // sessionStorage.setItem('id_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjNTFmZDQwMS1hYTQ1LTQ3NzctOTkyZC1mODA5ODg5MGE2NGMiLCJpYXQiOjE1MjMyNTE0NDMsInN1YiI6IjEiLCJpc3MiOiJTZWN1cmUgQ2VudGVyIiwiZ3JvdXBjb2RlIjoiNDEwMzAwMDAwMDAwIiwidXR5cGUiOiIxIiwiaWRjYXJkIjoiYWRtaW4iLCJleHAiOjE1MjMzMzc4NDN9.WzBKSsbIkSOZy60FTmfGfliJxDYohkadUaArP1po2Wo');
                dispatch(receiveLogin(res.data));
                message.success('提示：登录成功!');
                browserHistory.push('/Home');
            }
        }).catch(err => {console.log("Error: ", err); message.warning('提示：登录失败，与服务器交互发生异常!');});

    }

}



// 对应退出过程的三种状态，我们可以调用api到后台通知用户退出，这里我们只是把用户`isAuthenticated` 设为false并把token从localStorage中移除。
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

// 退出方法
export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        sessionStorage.removeItem('id_token');
        sessionStorage.removeItem('user');
        dispatch(receiveLogout());
        browserHistory.push('/');
    }
}

