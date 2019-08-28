<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoList(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'

    export default {
       data(){
           return {
               cates:[],
               list:[]
           }
       },
        created(){
            this.getAllCategory();
            this.getPhotoList(0)
        },
        mounted(){//组件中的DOM结构被渲染好并放到页面中后，会执行这个函数
            mui('.mui-scroll-wrapper').scroll({
                deceleration:0.0005
            });
        },
        methods:{
            getAllCategory(){
                this.$http.get('api/getimgcategory').then(result=>{
                    if (result.body.status===0){
                        result.body.message.unshift({title:'全部',id:0});
                        this.cates=result.body.message;
                    }else {
                        Toast('加载图片失败')
                    }
                })
            },
            getPhotoList(cateId){
                this.$http.get("api/getimages/" + cateId).then(result => {
                    if (result.body.status===0){
                        this.list=result.body.message;
                    }else {
                        Toast('加载图片失败')
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    *{
        touch-action: pan-y;
    }
    .photo-list{
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
        li{
            text-align: center;
            background-color: #ccc;
            margin-bottom: 10px;
            box-shadow: 0 0 8px #999;
            position: relative;
            img{
                width: 100%;
                vertical-align: middle;
            }
            img[lazy=loading] {/*懒加载图片，不需更改*/
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info{
                position: absolute;
                bottom: 0;
                color: white;
                text-align: left;
                background-color: rgba(0,0,0,0.4);
                max-height: 84px;
                .info-title{
                    font-size: 14px;
                }
                .info-body{
                    font-size: 13px;
                }
            }
        }
    }
</style>
