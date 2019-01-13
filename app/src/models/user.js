import API from '../services/index'
import { routerRedux } from 'dva/router';

export default {
    namespace: 'user',
    state: {
        userId: localStorage.getItem('userId') || '',
        userInfo: {}
    },
    reducers: {
        updateLogin(state, { userId }) {
            return { ...state, userId }
        },
        updateUserInfo(state, { userInfo }) {
            return { ...state, userInfo }
        }
    },
    effects: {
        *loginAction({ data, from }, { put, call }) {
            let res = yield call(API.LOGIN, data)
            if (res) {
                let userId = res.data.user_id
                yield put({ type: 'updateLogin', userId })
                localStorage.setItem('userId', userId)
                yield put(routerRedux.push(from))
            }
        },
        *logoutAction(action, { put, call }) {
            let res = yield call(API.LOGOUT)
            if (res) {
                yield put({ type: 'updateLogin', userId: '' })
                localStorage.clear('userId')
                yield put(routerRedux.push('/login'))
            }
        },
        *getUserInfoAction(action, { put, call, select }) {
            let id = yield select((state) => state.user.userId)
            let res = yield call(API.USER_INFO, { id })
            if (res) {
                yield put({ type: 'updateUserInfo', userInfo: res.data })
            }
        },
        *updateUserInfoAction({ data }, { put, call, select }) {
            let res = yield call(API.UPDATE_USER_INFO, data)
            if (res) {
                yield put({ type: 'updateUserInfo', userInfo: res.data })
            }
        }
    }
}