import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import Layout from '../views/layout'
import Article from '../views/article'
import Publish from '../views/publish'
import NProgress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   // redirect: '/login'
  // },
  // 一级路由
  {
    path: '/',
    component: Layout,
    children: [
      {
        // 首页
        path: '/',
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
// 路由的拦截器 beforeEach 方法
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 如果访问的是登录页面，则直接放行
  if (to.path === '/login') {
    next()

    // 停止代码往后执行
    return
  }
  // 获取用户 token
  const token = window.localStorage.getItem('user-token')
  // 判断是否有 token，有就通过
  if (token) {
    next()
    // 没有，就跳转到登录页
  } else {
    next('/login')
    NProgress.done()
  }
})

router.afterEach((to, from) => {
  // 进度条完成
  NProgress.done()
})

export default router
