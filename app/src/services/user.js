
import axios from 'axios'
import { REGISTER_URL, LOGIN_URL } from '../../config/api'
import { Toast } from 'antd-mobile';

let REGISTER = async (data) => {
    return await axios.post(REGISTER_URL, data)
}

let LOGIN = async (data) => {
    return await axios.post(LOGIN_URL, data)
}

export {
    REGISTER, LOGIN
}