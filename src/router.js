import VueRouter from 'vue-router'

import home from './components/tabbar/homeContainer.vue'
import member from './components/tabbar/memberContainer.vue'
import shopcar from './components/tabbar/shopcarContainer.vue'
import search from './components/tabbar/searchContainer.vue'

var router = new VueRouter({
    routes: [
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/shopcar',component:shopcar},
        {path:'/search',component:search},
    ],
    linkActiveClass: 'mui-active'
});

export default router
