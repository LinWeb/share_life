
import axios from 'axios'
import { PUBLISH_URL, DYNAMIC_SEARCH_URL, UPLOAD_HEAD_URL, UPLOAD_DYNAMIC_URL, DYNAMIC_UPDATE_LIKE_URL } from '../../config/api'

let PUBLISH = async (data) => {
    return await axios.post(PUBLISH_URL, data)
}
let UPLOAD_HEAD = async ({ file }) => {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    let formData = new FormData();
    formData.append('file', file)
    return await axios.post(UPLOAD_HEAD_URL, formData, config)
}
let UPLOAD_DYNAMIC = async ({ file }) => {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    let formData = new FormData();
    formData.append('file', file)
    return await axios.post(UPLOAD_DYNAMIC_URL, formData, config)
}
let DYNAMIC_SEARCH = async (data) => {
    return await axios.get(DYNAMIC_SEARCH_URL, { params: data })
}

let DYNAMIC_UPDATE_LIKE = async (data) => {
    return await axios.post(DYNAMIC_UPDATE_LIKE_URL, data)
}

export {
    PUBLISH, DYNAMIC_SEARCH, UPLOAD_HEAD, UPLOAD_DYNAMIC, DYNAMIC_UPDATE_LIKE,
}