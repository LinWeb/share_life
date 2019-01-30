export default {
    namespace: 'imgView',
    state: {
        isShow: false,
        imgUrl: ''
    },
    reducers: {
        updateImgView(state, { data }) {
            return { ...state, ...data }
        }
    },
    effects: {
        *showImgView({ imgUrl }, { put }) {
            yield put({ type: 'updateImgView', data: { isShow: true, imgUrl } })
        },
        *hideImgView(action, { put }) {
            yield put({ type: 'updateImgView', data: { isShow: false, imgUrl: '' } })
        }
    }
}