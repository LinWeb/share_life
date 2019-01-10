
import axios from 'axios'
import { REGISTER_URL, LOGIN_URL, LOGOUT_URL, UPDATE_FOLLOW_URL } from '../../config/api'

let REGISTER = async (data) => {
    return await axios.post(REGISTER_URL, data)
}

let LOGIN = async (data) => {
    return await axios.post(LOGIN_URL, data)
}
let LOGOUT = async () => {
    return await axios.post(LOGOUT_URL)
}
let UPDATE_FOLLOW = async (data) => {
    return await axios.post(UPDATE_FOLLOW_URL, data)
}
export {
    REGISTER, LOGIN, LOGOUT, UPDATE_FOLLOW
}