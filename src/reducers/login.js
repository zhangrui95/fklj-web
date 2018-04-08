import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
} from '../actions/login'
import {store} from '../index.js';

const initialState = {
    isFetching: false,
    isAuthenticated: sessionStorage.getItem('id_token') ? true : false
}

// 初始值在localStorage中取得，实际应用中我们也需要检查用户是否失效。
const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            })
        case LOGIN_SUCCESS:
            return {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
                user:action.json
            }


        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false
            })
        default:
            if(store !== undefined){
                return store.getState().login;
            }else{
                return state;
            }

    }
}

module.exports = {login}



