
import axios from 'axios'
import { PUBLISH_URL, DYNAMIC_URL } from '../../config/api'

let PUBLISH = async (data) => {
    return await axios.post(PUBLISH_URL, data)
}

let DYNAMIC = async (data) => {
    return await axios.get(DYNAMIC_URL, data)
}




export {
    PUBLISH, DYNAMIC
}