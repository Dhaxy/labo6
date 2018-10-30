import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Weekly from './views/WeekPrevisions.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/weekly',
      name: 'weekly',
      component: Weekly
    }
  ]
})
