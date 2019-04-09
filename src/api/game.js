import request from '@/utils/request'
import base from './base_url'

export default {
    getRoom(id) {
        return request({
            url: base.apiConfig.game.getRoom+'/'+id,
            method: 'get'
        })
    },
    getRooms() {
        return request({
            url: base.apiConfig.game.getRooms,
            method: 'get'
        })
    },
    createRoom(data) {
        return request({
            url: base.apiConfig.game.createRoom,
            method: 'post',
            data
        })
    },
    joinRoom(id) {
        return request({
            url: base.apiConfig.game.joinRoom+'/'+id,
            method: 'get'
        })
    },
    startGame(id) {
        return request({
            url: base.apiConfig.game.startGame+'/'+id,
            method: 'get'
        })
    },
    getCurrentAreas(roomId) {
        return request({
            url: base.apiConfig.game.getCurrentAreas+'/'+roomId,
            method: 'get'
        })
    },
    getGameResult(roomId) {
        return request({
            url: base.apiConfig.game.getGameResult+'/'+roomId,
            method: 'get'
        })
    }
}
