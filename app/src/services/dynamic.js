
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { MAX_FILE_SIZE, PUBLISH_URL, DYNAMIC_SEARCH_URL, UPLOAD_HEAD_URL, UPLOAD_DYNAMIC_URL, DYNAMIC_UPDATE_LIKE_URL } from '../../config/api'

let PUBLISH = async (data) => {
    return await axios.post(PUBLISH_URL, data)
}

let compressImg = async (file, name) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)   // 异步以base64的形式读取图片内容
        reader.onload = async (e) => {
            let src = e.target.result   // 获取图片内容
            const img = new Image()
            img.src = src  // 异步加载图片内容
            img.onload = () => {
                const w = img.width;  // 获取图片的宽度
                const h = img.height;  // 获取图片的高度
                const canvas = document.createElement('canvas')  // 创建canvas

                const anw = document.createAttribute('width')  // 创建宽度节点
                anw.nodeValue = w;  // 宽度节点赋值
                const anh = document.createAttribute('height')  // 创建高度节点
                anh.nodeValue = h;  // 高度节点赋值

                canvas.setAttributeNode(anw)  // 设置canvas的宽度
                canvas.setAttributeNode(anh)  // 设置canvas的高度

                const ctx = canvas.getContext('2d') // 返回一个用于画布上绘图的环境
                ctx.fillStyle = '#fff'  // 用白色填充画布
                ctx.fillRect(0, 0, w, h)  // 在画布上绘制指定宽度和高度的矩形
                ctx.drawImage(img, 0, 0, w, h) // 在画布上绘制图片

                canvas.toBlob((blob) => {   // 画布生成一个blob对象
                    let formData = new FormData();  // 创建表单数据对象
                    formData.append('file', blob, name)  // 添加数据
                    resolve(formData)
                }, 'image/jpeg', 0.7)
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