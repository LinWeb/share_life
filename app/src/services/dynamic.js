
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { MAX_FILE_SIZE, PUBLISH_URL, DYNAMIC_SEARCH_URL, UPLOAD_HEAD_URL, UPLOAD_DYNAMIC_URL, DYNAMIC_UPDATE_LIKE_URL } from '../../config/api'

let PUBLISH = async (data) => {
    return await axios.post(PUBLISH_URL, data)
}
let UPLOAD = async ({ API_URL, file }) => {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    if (file.size < MAX_FILE_SIZE) {
        // const name = file.name; //文件名
        // const reader = new FileReader();
        // reader.readAsDataURL(file)
        // reader.onload = async (e) => {
        //     let src = e.target.result
        //     const img = new Image()
        //     img.src = src
        //     img.onload = (e) => {
        //         const w = img.width;
        //         const h = img.width;
        //         const quality = 0.8
        //         const canvas = document.createElement('canvas')
        //         const ctx = canvas.getContext('2d')

        //         const anw = document.createAttribute('width')
        //         anw.nodeValue = w;
        //         const anh = document.createAttribute('height')
        //         anh.nodeValue = h

        //         canvas.setAttributeNode(anw)
        //         canvas.setAttributeNode(anh)

        //         ctx.fillStyle = '#fff'
        //         ctx.fillRect(0, 0, w, h)

        //         ctx.drawImage(img, 0, 0, w, h)
        //         const base64 = canvas.toDataURL('image/jpeg', quality)


        //         const bytes = window.atob(base64.split(',')[1])
        //         const ab = new ArrayBuffer(bytes.length)
        //         const ia = new Uint8Array(ab)
        //         for (let i = 0; i < bytes.length; i++) {
        //             ia[i] = bytes.charCodeAt(i)
        //         }
        //         file = new Blob([ab], { type: 'image/jpeg' })
        //         file.name = name
        //         console.log(file)
        //         let formData = new FormData();
        //         formData.append('file', file)
        //         axios.post(UPLOAD_DYNAMIC_URL, formData, config)
        //     }
        // }

        let formData = new FormData();
        formData.append('file', file)
        return await axios.post(API_URL, formData, config)
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