<template>
    <div>
        <!--轮播图-->
        <swiper :lunboList="lunboList" :isfull="true"></swiper>
        <!--六宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newsList">
                <img src="../../images/menu1.png">
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photoList">
                <img src="../../images/menu2.png">
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodsList">
                <img src="../../images/menu3.png">
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                <img src="../../images/menu4.png">
                <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                <img src="../../images/menu5.png">
                <div class="mui-media-body">视频专区</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                <img src="../../images/menu6.png">
                <div class="mui-media-body">联系我们</div></router-link></li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import swiper from '../subcomponent/swiper.vue'
    export default {
        data(){
            return {
                lunboList:[]
            }
        },
        components:{
            swiper
        },
        created(){
            this.getPicture();
        },
        methods:{
            getPicture(){
                this.$http.get('api/getlunbo').then(result=>{
                    if (result.body.status===0){
                        this.lunboList=result.body.message;
                    }else {
                        Toast('加载图片失败')
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border: none;
        img{
            height: 60px;
            width: 60px;
        }
        .mui-media-body{
            font-size: 13px;
        }
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: 0;
    }
</style>
