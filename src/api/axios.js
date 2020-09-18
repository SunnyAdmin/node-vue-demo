import axios from "axios";
import { Message } from "view-design";

const instance = axios.create({
    // baseURL: "http://localhost:3000",
    timeout: 50000
});

// 请求拦截
instance.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

// 响应拦截
instance.interceptors.response.use(response => {
    if (!response.data.errno) {
        return Promise.resolve(response.data);
    } else {
        Message.error(response.data.msg);
        return Promise.reject(response.data);
    }
}, error => {
    return Promise.reject(error);
});

export function get(url) {
    return function(params = null) {
        return instance({
            url,
            method: "get",
            params
        });
    };
}

export function post(url) {
    return function(params = null) {
        return instance({
            url,
            method: "post",
            data: params
        });
    };
}
