const apiConfig = {
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
