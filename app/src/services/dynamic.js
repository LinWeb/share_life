
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { MAX_FILE_SIZE, PUBLISH_URL, DYNAMIC_SEARCH_URL, UPLOAD_HEAD_URL, UPLOAD_DYNAMIC_URL, DYNAMIC_UPDATE_LIKE_URL } from '../../config/api'

let PUBLISH = async (data) => {
    return await axios.post(PUBLISH_URL, data)
}

let compressImg = async (file, name) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = async (e) => {
            let src = e.target.result
            const img = new Image()
            img.src = src
            img.onload = (e) => {
                const w = img.width;
                const h = img.width;
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')

                const anw = document.createAttribute('width')
                anw.nodeValue = w;
                const anh = document.createAttribute('height')
                anh.nodeValue = h

                canvas.setAttributeNode(anw)
                canvas.setAttributeNode(anh)

                ctx.fillStyle = '#fff'
                ctx.fillRect(0, 0, w, h)

                ctx.drawImage(img, 0, 0, w, h)

                const quality = 0.7
                canvas.toBlob((blob) => {
                    blob.name = name
                    let formData = new FormData();
                    formData.append('file', blob)
                    resolve(formData)
                }, 'image/jpeg', quality)
            }
        }
    })
}
let UPLOAD = async ({ API_URL, file }) => {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    if (file.size < MAX_FILE_SIZE) {
        const name = file.name; //文件名
        let formData = await compressImg(file, name)
        return axios.post(API_URL, formData, config)
    } else {
        Toast.fail('file is too big!', 1);
    }
}
let UPLOAD_HEAD = async ({ file }) => {
    return await UPLOAD({ API_URL: UPLOAD_HEAD_URL, file })
}
let UPLOAD_DYNAMIC = async ({ file }) => {
    return await UPLOAD({ API_URL: UPLOAD_DYNAMIC_URL, file })
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