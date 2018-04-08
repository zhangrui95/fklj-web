import {hex_md5,b64_md5} from "../resources/md5";
import {  browserHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import {store} from '../index.js';
import {clientNameList,clientName,securityCenterUrl} from '../utils/index';
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
        id_token: json.id_token,
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
//172.19.12.217:8071     http://172.19.12.232:8081
//调用action取得token,并dispatch三种状态。
export function loginUser(creds) {
    //
    // let config = {
    //     method: 'POST',
    //     headers: {
    //        'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: `username=${creds.username}&password=${hex_md5(creds.password)}&serverId=1&clientIp=127.0.0.1`
    // }
    // headers: {'Content-Type': 'application/x-www-form-urlencoded',
    //     'Accept': 'application/json',
    //     'Access-Token':'888888'
    // },

    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
                 'Access-Token':'qweqweqweasdasdasd'
        },
        body: `username=${creds.username}&password=${hex_md5(creds.password)}&serverId=1&serverType=1`
    }

    return dispatch => {
        // dispatch 请求开始状态
        dispatch(requestLogin(creds))
                //http://172.19.12.217:8071/api/user/login
        return fetch(securityCenterUrl+'/api/user/login', config)
            .then((res) =>
            {
                if (!res.ok) {
                    // dispatch 错误状态
                    dispatch(loginError(res))
                    return Promise.reject(res)
                } else {
                    res.json().then(json=> {
                        if(json.code===200){//登录成功
                            let userJson = JSON.stringify(json);
                            let user = JSON.parse(userJson);
                            sessionStorage.setItem('user', userJson);
                            sessionStorage.setItem('userName', user.body.name);
                            sessionStorage.setItem('id_token', json.token);
                            dispatch(receiveLogin(json));
                            message.success('提示：登录成功!');
                            browserHistory.push('/Home');
                        }else{
                            message.warning('提示：'+json.msg+"!",3);
                        }
                    });
                }
            }).catch(err => {console.log("Error: ", err); message.warning('提示：登录失败，与服务器交互发生异常!');})
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

