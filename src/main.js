import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import axios from 'axios'
import 'nprogress/nprogress.css'
// // 常态地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 赋值给全局
Vue.prototype.$axios = axios

Vue.use(Element)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
