<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch ></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h3>{{item.title}}</h3>
                            <div>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :id="item.id"></numbox>
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import numbox from '../subcomponent/shopcar_numbox.vue'
    export default {
        data(){
            return {
                goodslist:[]
            }
        },
        components:{
            numbox
        },
        created(){
            this.getGoodsList()
        },
        methods:{
            getGoodsList(){
                var id=[];
                this.$store.state.car.forEach(item=>{
                    id.push(item.id)
                });
                if (id.length<=0){
                    return
                }
                this.$http.get('api/goods/getshopcarlist/'+id.join(',')).then(result=>{
                    if (result.body.status===0){
                        this.goodslist=result.body.message;
                    }
                })
            },
            remove(id,index){
                this.goodslist.splice(index,1);
                this.$store.commit('removeLocal',id)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .shopcar-container{
        background-color: #eee;
        overflow: hidden;
        .goods-list{
            .mui-card-content-inner{
                display: flex;
                align-items: center;
            }
            img{
                width: 60px;
                height: 60px;
            }
            h3{
                font-size: 13px;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .price{
                    color: red;
                    font-weight: bold;
                }
            }
        }
    }
</style>
