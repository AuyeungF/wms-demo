import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import "babel-polyfill";
import BaiduMap from 'vue-baidu-map'

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;

Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'YOUR_APP_KEY'
});

Vue.config.productionTip = false;
// Vue.use(VueSocketio, socketio('http://192.168.1.103:8089/'));
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('params');
    // console.log(role)
    if(!role && to.path !== '/login'){
        next('/login');
    }else{
        next();
    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
