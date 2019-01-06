import API from '../services/index'
import { routerRedux } from 'dva/router';

export default {
    namespace: 'user',
    state: {
        userId: localStorage.getItem('userId') || ''
    },
    reducers: {
        updateLogin(state, { userId }) {
            return { ...state, userId }
        }
    },
    effects: {
        *login({ data, from }, { put, call }) {
            let res = yield call(API.LOGIN, data)
            if (res) {
                let userId = res.data.user_id
                yield put({ type: 'updateLogin', userId })
                localStorage.setItem('userId', userId)
                yield put(routerRedux.push(from))
            }
        },
        *logout(action, { put, call }) {
            let res = yield call(API.LOGOUT)
            if (res) {
                yield put({ type: 'updateLogin', userId: '' })
                localStorage.clear('userId')
                yield put(routerRedux.push('/login'))
            }
        }
    }
}