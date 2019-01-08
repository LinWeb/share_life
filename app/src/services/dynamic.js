
import axios from 'axios'
import { PUBLISH_URL, DYNAMIC_SEARCH_URL, UPLOAD_URL } from '../../config/api'

let PUBLISH = async (data) => {
    return await axios.post(PUBLISH_URL, data)
}
let UPLOAD = async (file) => {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    let formData = new FormData();
    formData.append('file', file)
    return await axios.post(UPLOAD_URL, formData, config)
}

let DYNAMIC_SEARCH = async (data) => {
    return await axios.get(DYNAMIC_SEARCH_URL, { params: data })
}


export {
    PUBLISH, DYNAMIC_SEARCH, UPLOAD
}