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

        <ul>
            <li v-for="item in list" :key="item.id">
                <img v-lazy="item.img_url">
            </li>
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

<style scoped>
    *{
        touch-action: pan-y;
    }
    img[lazy=loading] {
        width: 100%;
        height: 300px;
        margin: auto;
    }
    ul{
        list-style: none;
        margin:0;
        padding: 0;
    }
</style>
