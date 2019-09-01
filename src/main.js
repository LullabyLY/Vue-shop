
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import VueResource from 'vue-resource'
Vue.use(VueResource);
import VuePreview from 'vue-preview'
Vue.use(VuePreview);
import Vuex from 'vuex'
Vue.use(Vuex);

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


Vue.http.options.root='http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON=true;
Vue.filter('dataFormat',function (dataStr,pattern='YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
});
var car=JSON.parse(localStorage.getItem('car')||'[]');
var store=new Vuex.Store({
   state:{
        car:car
   },
   mutations:{
       addToCar(state,goods){
           var flag=false;
           state.car.some(item=>{
               if (item.id===goods.id){
                   flag=true;
                   item.count+=goods.count
               }
           });
           if (!flag){
               state.car.push(goods)
           }
           localStorage.setItem('car',JSON.stringify(state.car))
       },
       updateCount(state,goodsinfo){
           state.car.some(item=>{
               if (item.id==goodsinfo.id){
                    item.count=parseInt(goodsinfo.count);
                    return true
               }
           });
           localStorage.setItem('car',JSON.stringify(state.car))
       },
       removeLocal(state,id){
           state.car.some((item,i)=>{
               if (item.id==id){
                   state.car.splice(i,1)
                   return true
               }
           });
           localStorage.setItem('car',JSON.stringify(state.car))
       },
       updateSelected(state,info){
           state.car.forEach(item=>{
               if (item.id==info.id){
                   item.selected=info.selected
               }
           });
           localStorage.setItem('car',JSON.stringify(state.car))
       }
   },
   getters:{
       getAllCount(state){
           var c=0;
           state.car.forEach(item=>{
               c+=item.count
           });
           return c
       },
       getGoodsCount(state){
           var o={};
           state.car.forEach(item=>{
               o[item.id]=item.count;
           });
           return o
       },
       getGoodsSelected(state){
           var o={};
           state.car.forEach(item=>{
               o[item.id]=item.selected
           });
           return o
       },
       getCountAndAmount(state){
           var o={
               count:0,
               amount:0
           };
           state.car.forEach(item=>{
               if (item.selected){
                   o.count+=item.count;
                   o.amount+=item.price*item.count
               }
           });
           return o
       }
   }
});
var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router,
    store
});
