import axios from 'axios'
import { Toast } from 'antd-mobile';
import * as USER from './user';
import * as CATEGORY from './category'
import * as DYNAMIC from './dynamic'

axios.defaults.baseURL = 'http://localhost:3000/';

// 设置浏览器自动存储服务器cookie
axios.interceptors.request.use((config) => {
    // Toast.loading('', 0)
    config.withCredentials = true
    return config
}, (error) => {
    return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data.status !== 1) {
        Toast.fail(response.data.msg, 1);
        return null
    } else {
        // Toast.success(response.data.msg, 1);
        return response.data
    }
}, function (error) {
    Toast.fail(error.message, 1);
    return Promise.reject(error);
});

export default {
    ...USER, ...CATEGORY, ...DYNAMIC
}