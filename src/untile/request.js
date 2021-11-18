import { message } from 'antd';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8086';

axios.interceptors.request.use(
    config => {
        config.headers['X-Token'] = localStorage.getItem('token');
        return config;
    },
    error => {
        console.log('设置请求头失败');
        return Promise.reject(error);
    }
);

export function get(url) {
    return function (params) {
        return axios.get(url, { params }).then(res => {
            const { data } = res;
            if (data.code === 4) {
                window.location.href = 'http://localhost:3000';
                sessionStorage.clear();
                message.info('token过期，请重新登录');
                return res.data;
            } else {
                return res.data;
            }
        });
    };
}

export function post(url) {
    return function (data) {
        const obj = Object.entries(data)
            .map(item => {
                return item.join('=');
            })
            .join('&');
        return axios.post(url, obj).then(res => {
            const { data } = res;
            if (data.code === 2) {
                return res.data;
            } else if (data.code === 4) {
                window.location.href = 'http://localhost:3000';
                sessionStorage.clear();
                message.info('token过期，请重新登录');
                return res.data;
            } else {
                message.info(data.message);
                return res.data;
            }
        });
    };
}
