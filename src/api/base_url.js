// const ip = 'http://campus.qiuluo.xin/smartSecurity/'
// const Ip = 'http://qiuluo.xin/dockingServer'
// const ip = 'http://localhost:7008'

const apiConfig = {
  // 历史数据
  user: {
    signup: '/signup',
    login: '/login',
    current: '/user/current',
    getGameInfo: '/user/getGameInfo',
  },
  game: {
    getRoom: '/game/getRoom',
    getRooms: '/game/getRooms',
    createRoom: '/game/createRoom',
    joinRoom: '/game/joinRoom',
    startGame: '/game/startGame',
    getCurrentAreas: '/game/getCurrentAreas',
    getGameResult: '/game/getGameResult',
  }
}
export default {
  apiConfig
}
