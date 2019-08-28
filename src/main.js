
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import app from './App.vue'

/*import {Header,Swipe, SwipeItem ,Button,Lazyload} from 'mint-ui'
Vue.component(Header.name,Header);
Vue.component(Button.name,Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(Lazyload);*/
/*按需加载不能显示懒加载效果*/
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

import  './lib/mui/css/mui.css'
import  './lib/mui/css/icons-extra.css'
import router from './router.js'
import moment from 'moment'
import VueResource from 'vue-resource'
Vue.use(VueResource);
import VuePreview from 'vue-preview'
Vue.use(VuePreview);

Vue.http.options.root='http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON=true;
Vue.filter('dataFormat',function (dataStr,pattern='YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
});

var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router
});
