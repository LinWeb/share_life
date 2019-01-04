import { Toast } from 'antd-mobile';

let LOGIN_CHECK = ({ username, password }) => {
    if (username === '') {
        Toast.info('账号不能为空', 1);
        return false
    }
    if (password === '') {
        Toast.info('密码不能为空', 1);
        return false
    }
    return true
}

export {
    LOGIN_CHECK
}
