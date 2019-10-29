import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
Vue.config.productionTip = false
import '@/assets/style/index.scss'
import 'swiper/dist/css/swiper.css'

/** 引用全局 scroll 组件 */
import Scroll from '@/base/scroll/scroll.vue'

/** 引用全局 loading 组件 */
import Loading from '@/base/loading/loading.vue'

/** 注册全局 scroll 组件 */
Vue.component('scroll',Scroll)

/** 注册全局 loading 组件 */
Vue.component('loading',Loading)


/**
 * import vConsole from 'vconsole'
 * let vc = new vConsole();
 * 移动端调试工具
 */
 
 /** 解决移动端300ms 延迟的库*/
import LazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'
fastclick.attach(document.body);

/** 图片懒加载 */
Vue.use(LazyLoad,{
  loading: require('@/assets/img/logo@3x.png'),
  error: require('@/assets/img/logo@3x.png')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
