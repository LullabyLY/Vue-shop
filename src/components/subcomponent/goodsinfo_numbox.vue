<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        props:['max'],
        mounted() {
            mui(".mui-numbox").numbox();
        },
        methods:{
            countChange(){
                this.$emit('getcount',this.$refs.numbox.value)
            }
        },
        watch:{
            max:function (newValue,oldValue) {
                mui(".mui-numbox").numbox().setOption('max',newValue)
            }
        }
    }
</script>

<style scoped>

</style>
