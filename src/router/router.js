import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/recommend',
      component: () => import('@/views/Recommend/Recommend.vue')
    },
    {
      path: '/singer',
      component: () => import('@/views/Singer/Singer.vue'),
    },
    {
      path: '/rank',
      component: () => import('@/views/Rank/Rank.vue')
    },
    {
      path: '/mv',
      component: () => import('@/views/MV/MV.vue')
    }
  ]
})
