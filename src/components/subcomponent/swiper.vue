<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunboList" :key="item.id">
                <img :src="item.img" alt="" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props:['lunboList','isfull']
    }
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        text-align: center;
    .mint-swipe-item{
    img{
        height: 100%;
    }
    }
    }
    .full{
        width: 100%;
    }
</style>
