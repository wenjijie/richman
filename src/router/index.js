import Vue from 'vue'
import Router from 'vue-router'
// import Game from '@/views/game'
// import Login from '@/views/login'
// import Signup from '@/views/signup'
// import Hall from '@/views/hall'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Game',
      component: () => import('@/views/game'),
    },
    {
      path: '/hall',
      component:() => import('@/views/hall')
      // hidden: true
    },
    {
      path: '/signup',
      component:() => import('@/views/signup')
      // hidden: true
    },
    {
      path: '/login',
      component:() => import('@/views/login')
      // hidden: true
    },
  ]
})
