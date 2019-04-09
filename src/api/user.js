import request from '@/utils/request'
import base from './base_url'

export default {
    signup(para) {
        return request({
            url: base.apiConfig.user.signup,
            method: 'post',
            data: para
        })
    },
    login(data) {
        return request({
            url: base.apiConfig.user.login,
            method: 'post',
            data: data
        })
    },
    current() {
        return request({
            url: base.apiConfig.user.current,
            method: 'get'
        })
    },
    getGameInfo(userId) {
        return request({
            url: base.apiConfig.user.getGameInfo + '/' + userId,
            method: 'get'
        })
    }
}
