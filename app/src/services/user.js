
import axios from 'axios'
import { REGISTER_URL, LOGIN_URL, LOGOUT_URL } from '../../config/api'

let REGISTER = async (data) => {
    return await axios.post(REGISTER_URL, data)
}

let LOGIN = async (data) => {
    return await axios.post(LOGIN_URL, data)
}
let LOGOUT = async () => {
    return await axios.post(LOGOUT_URL)
}
export {
    REGISTER, LOGIN, LOGOUT
}