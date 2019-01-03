import API from '../services/index'
import { routerRedux } from 'dva/router';
export default {
    namespace: 'user',
    state: {
        userId: ''
    },
    reducers: {
        updateLogin(state, { userId }) {
            return { ...state, userId }
        }
    },
    effects: {
        *login({ data }, { put, call, select }) {
            let res = yield call(API.LOGIN, data)
            if (res) {
                let userId = res.data.user_id
                yield put({ type: 'updateLogin', userId })
                console.log(document.cookie)
                yield put(routerRedux.push('/'))
            }
        }
    }
}