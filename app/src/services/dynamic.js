
import axios from 'axios'
import { PUBLISH_URL, DYNAMIC_SEARCH_URL, UPLOAD_URL, DYNAMIC_UPDATE_LIKE_URL, DYNAMIC_DETAIL_URL } from '../../config/api'

let PUBLISH = async (data) => {
    return await axios.post(PUBLISH_URL, data)
}
let UPLOAD = async ({ file, type }) => {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    let formData = new FormData();
    formData.append('file', file)
    formData.append('type', type)

    return await axios.post(UPLOAD_URL, formData, config)
}

let DYNAMIC_SEARCH = async (data) => {
    return await axios.get(DYNAMIC_SEARCH_URL, { params: data })
}

let DYNAMIC_UPDATE_LIKE = async (data) => {
    return await axios.post(DYNAMIC_UPDATE_LIKE_URL, data)
}
let DYNAMIC_DETAIL = async (data) => {
    return await axios.get(DYNAMIC_DETAIL_URL, { params: data })
}
export {
    PUBLISH, DYNAMIC_SEARCH, UPLOAD, DYNAMIC_UPDATE_LIKE, DYNAMIC_DETAIL
}