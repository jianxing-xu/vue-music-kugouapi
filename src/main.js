import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
Vue.config.productionTip = false
import '@/assets/style/index.scss'
import 'swiper/dist/css/swiper.css'
import Scroll from '@/base/scroll/scroll.vue'
import Loading from '@/base/loading/loading.vue'
Vue.component('scroll',Scroll)
Vue.component('loading',Loading)
import LazyLoad from 'vue-lazyload'
// import vConsole from 'vconsole'

// let vc = new vConsole();
import fastclick from 'fastclick'
fastclick.attach(document.body);
Vue.use(LazyLoad,{
  loading: require('@/assets/img/logo@3x.png'),
  error: require('@/assets/img/logo@3x.png')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
