import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/views/game'
import Login from '@/views/login'
import Signup from '@/views/signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Game',
      component: Game,
    },
    {
      path: '/signup',
      component:Signup
      // hidden: true
    },
    {
      path: '/login',
      component:Login
      // hidden: true
    },
  ]
})
