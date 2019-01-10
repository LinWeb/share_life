import axios from 'axios'
import { withRouter } from 'dva/router'
import { BASE_URL, PRIVATE_URLS } from '../../config/api'
import { Toast } from 'antd-mobile';

axios.defaults.baseURL = BASE_URL;
// 设置浏览器自动存储服务器cookie
axios.interceptors.request.use((config) => {
    // Toast.loading('', 0)
    if (PRIVATE_URLS.includes(config.url)) { }
    // 判断哪些url需要验证是否已登录
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


export default withRouter(axios)