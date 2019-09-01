<template>
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChange" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        mounted() {
            mui(".mui-numbox").numbox();
        },
        props:["initcount","id"],
        methods:{
            countChange(){
                this.$store.commit('updateCount',{id:this.id,count:this.$refs.numbox.value})
            },
        }
    }
</script>

<style scoped>

</style>
