import {
    USER_ISLOGIN,
    USER_USERNAME,
} from '../mutation-types'

const state = {
    isLogin: true,
    username:'',
    userMail:'',
    accountBalance:''
}

const mutations = {
    [USER_ISLOGIN](state, isLogin) {
        state.isLogin = isLogin
    },
    [USER_USERNAME](state, username) {
        state.username = username
    },
}

export default {
    state,
    mutations
}
