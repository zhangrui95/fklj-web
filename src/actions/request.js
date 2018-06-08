import { hashHistory } from 'react-router';

export default function request (method, url, body) {
    method = method.toUpperCase();
    if (method === 'GET') {
        // fetch的GET不允许有body，参数只能放在url中
        body = undefined;
    } else {
        body = body && JSON.stringify(body);
    }

    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'token': sessionStorage.getItem('id_token') || '' // 从sessionStorage中获取access token
        },
        body
    })
        .then((res) => {
            if (res.status === 401) {
               // hashHistory.push('/login');
               // return Promise.reject('Unauthorized.');
                return res.json();
            } else {
                const token = res.headers.get('test_token');
                if (token) {
                    sessionStorage.setItem('id_token', token);
                }
                return res.json();
            }
        });
}
function requestAQZX (method, url, body) {
    method = method.toUpperCase();
    if (method === 'GET') {
        // fetch的GET不允许有body，参数只能放在url中
        body = undefined;
    } else {
        body = body && JSON.stringify(body);
    }

    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem('id_token') || '' // 从sessionStorage中获取access token
        },
        body
    })
        .then((res) => {
            if (res.status === 401) {
               // hashHistory.push('/login');
               // return Promise.reject('Unauthorized.');
                return res.json();
            } else {
                const token = res.headers.get('test_token');
                if (token) {
                    sessionStorage.setItem('id_token', token);
                }
                return res.json();
            }
        });
}
export const get = url => request('GET', url);
export const post = (url, body) => request('POST', url, body);
export const put = (url, body) => request('PUT', url, body);
export const del = (url, body) => request('DELETE', url, body);
export const postAQZX = (url, body) => requestAQZX('POST', url, body);