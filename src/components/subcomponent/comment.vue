<template>
    <div class="cmt-container">
        <h3>发表评论：</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最多120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item"  v-for="(item ,i) in commentList" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataFormat}}
                </div>
                <div class="cmt-body">{{item.content==='undefined'?'此用户很懒，什么都没说':item.content}}</div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    export default {
        data(){
            return {
                pageIndex:1,
                commentList:[],
                msg:''
            }
        },
        props:['id'],
        created(){
            this.getComment()
        },
        methods:{
            getComment(){
                this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result=>{
                    if (result.body.status===0){
                        //this.commentList=result.body.message
                        this.commentList=this.commentList.concat(result.body.message)
                    } else{
                        Toast('加载评论失败')
                    }
                })

            },
            getMore(){
                this.pageIndex++;
                this.getComment()
            },
            postComment(){
                if (this.msg.trim().length===0){
                    return Toast('评论不能为空')
                }
                this.$http.post('api/postcomment/'+this.id,{content:this.msg.trim()}).then(result=>{
                    if (result.body.status===0){
                        var cmt={
                            user_name:'匿名用户',
                            add_time:Date.now(),
                            content:this.msg.trim()
                        };
                        this.commentList.unshift(cmt);
                        this.msg=''
                    } else{
                        Toast('评论失败')
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin-top: 5px;
            .cmt-item{
                font-size: 13px;
            }
            .cmt-title{
                background-color: #ccc;
                line-height: 30px;
            }
            .cmt-body{
                line-height: 30px;
                text-indent: 2em;
            }
        }
    }
</style>
