
import axios from 'axios'
import { PUBLISH_URL, DYNAMIC_URL, UPLOAD_URL } from '../../config/api'

let PUBLISH = async (data) => {
    return await axios.post(PUBLISH_URL, data)
}
let UPLOAD = async (files) => {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    let formData = new FormData();
    formData.append('files', files[0].file)
    return await axios.post(UPLOAD_URL, formData, config)
}

let DYNAMIC = async (data) => {
    return await axios.get(DYNAMIC_URL, data)
}


export {
    PUBLISH, DYNAMIC, UPLOAD
}