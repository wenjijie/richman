import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Game',
      component: () => import('@/views/game'),
    },
    {
      path: '/result',
      component:() => import('@/views/gameResult')
    },
    {
      path: '/hall',
      component:() => import('@/views/hall')
    },
    {
      path: '/signup',
      component:() => import('@/views/signup')
    },
    {
      path: '/login',
      component:() => import('@/views/login')
    },
    {
      path: '/persion',
      component:() => import('@/views/persion')
    },
  ]
})
