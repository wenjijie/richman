import request from '@/utils/request'
import base from './base_url'

export default {
    getUserByRoom(id) {
        return request({
            url: base.apiConfig.game.getUserByRoom+'/'+id,
            method: 'get'
        })
    }
}
