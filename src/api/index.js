/* global vue-resource ajax */
import Vue from 'vue'
import store from '../store'
import VueResource from 'vue-resource'
import * as types from '../store/mutation-types'
import {
    Message
} from 'element-ui'

var hostdoamin = 'http://yiweitec.com:8080'
if (process.env.NODE_ENV === 'production') {
    hostdoamin = ''
}

if (process.env.NODE_ENV === 'test') {
    hostdoamin = ''
}

Vue.use(VueResource)

Vue.http.options.root = ""
Vue.http.options.emulateJSON = true
Vue.http.options.timeout = 10000
Vue.http.options.credentials = true
Vue.http.headers.common['Content-Type'] = "application/x-www-form-urlencoded"
Vue.http.options.before = function() {
    console.log('Vue.http.options.before')
        //store.commit(types.SET_LOADING, true)
}

export default {
    ajax(url, param) {
        if (url !== 'login') {
            console.log("ajax.param", JSON.stringify(param))
        }
        var timeoutId = window.setTimeout(function() {
            store.commit(types.SET_LOADING, false)
            Message({
                showClose: true,
                duration: 10000,
                message: "操作超时",
                type: 'error'
            })
        }, 10000)
        return new Promise((resolve, reject) => {
            Vue.http['post'](`${hostdoamin}/yiwei/${url}`, param).then(data => {
                var body = data.body
                console.log(`${url} ajax.data`, JSON.stringify(body))
                window.clearTimeout(timeoutId)
                timeoutId = undefined
                    //store.commit(types.SET_LOADING, false)
                if (!body.code) {
                    body = JSON.parse(body)
                }
                if (body.code === '-1') {
                    Message({
                        showClose: true,
                        duration: 3000,
                        message: body.msg,
                        type: 'error'
                    })
                    store.commit(types.USER_ISLOGIN, false)
                } else {
                    store.commit(types.USER_ISLOGIN, true)
                }
                resolve(body)
            }, error => {
                console.log('ajax.error', JSON.stringify(error))
                window.clearTimeout(timeoutId)
                timeoutId = undefined
                //store.commit(types.USER_ISLOGIN, false)
                //store.commit(types.SET_LOADING, false)
                reject(error)
            })
        })
    }
}