import VueRouter from 'vue-router'

import home from './components/tabbar/homeContainer.vue'
import member from './components/tabbar/memberContainer.vue'
import shopcar from './components/tabbar/shopcarContainer.vue'
import search from './components/tabbar/searchContainer.vue'
import newsList from './components/news/newsList.vue'
import newsInfo from "./components/news/newsInfo.vue";

var router = new VueRouter({
    routes: [
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/shopcar',component:shopcar},
        {path:'/search',component:search},
        {path:'/home/newsList',component:newsList},
        {path:'/home/newsInfo/:id',component:newsInfo,children:[

            ]}
    ],
    linkActiveClass: 'mui-active'
});

export default router
