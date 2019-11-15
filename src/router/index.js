import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import Layout from '../views/layout'
import Article from '../views/article'
import Publish from '../views/publish'

Vue.use(VueRouter)

const routes = [

  // 一级路由
  {
    // 默认
    path: '/',
    component: Layout,
    children: [
      {
        // 首页
        path: '',
        component: Home
      },
      {
        // 文章列表
        path: '/article',
        component: Article
      },
      {
        // 发表文章
        path: '/publish',
        component: Publish
      }
    ]
  },
  // 一级路由
  {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
