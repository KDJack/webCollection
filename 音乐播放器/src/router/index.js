import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: HomePage
    }
  ]
})
