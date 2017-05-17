<template>
    <div class="contentBox">
        <div class="email_top">
            <dl>
                <dt>{{data.title}}</dt>
                <dd>发件人：{{data.senderName}}</dd>
                <dd>发件时间：{{data.addTime}}</dd>
                <dd>收件人：{{data.username}}</dd>
            </dl>
            <div class="email_pre_nxt">
                <el-button size="small" type="text" class="pre_nxt" @click.stop="lastMsg">上一封</el-button>
                <el-button size="small" type="text" class="pre_nxt" @click.stop="nextMsg">下一封</el-button>
            </div>
        </div>
        <div class="email_box">
            <div class="grey_box_top">
                <div class="grey_box_bottom">
                    <div class="email_content">
                        {{data.msgText}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    import api from '../../api'
    import { mapActions } from 'vuex'
    import { errorMsg } from '../../tools/command';
    export default {
        mounted () {
            this.form.id = this.$store.state.useraction.id;
            this.getData()
            this.$root.$on("top-init",this.getData)
        },
        beforeDestroy () {
            this.$root.$off("top-init",this.getData)
        },
        data () {
            return {
                data: {},
                form: {
                    id: '',
                },
            }
        },
        methods :{
            ...mapActions({
                  setUserMsgId : 'setUserMsgId',
                }),
            getData () {
                this.form.id = this.$store.state.useraction.id;
                api.ajax('msg/findMsgDetail',this.form).then(data =>{
                    this.data = data.data; 
                },error =>{
                    errorMsg("数据请求失败")
                })
            },
            lastMsg () {
                this.setUserMsgId(this.data.lastId);
                if (this.$store.state.useraction.id != null) {
                    this.getData();
                    if (document.getElementsByClassName('pre_nxt')[1].disabled == true) {
                        document.getElementsByClassName('pre_nxt')[1].disabled = false;
                    }
                } else {
                    document.getElementsByClassName('pre_nxt')[0].disabled = true;
                }
            },
            nextMsg () {
                this.setUserMsgId(this.data.nextId);
                if (this.$store.state.useraction.id != null) {
                    this.getData();
                    if (document.getElementsByClassName('pre_nxt')[0].disabled == true) {
                        document.getElementsByClassName('pre_nxt')[0].disabled = false;
                    }
                } else {
                    document.getElementsByClassName('pre_nxt')[1].disabled = true;
                }
            },
        }
    }
</script>
<style scoped>
    a {
        text-decoration: none;
        color: inherit;
    }
    .email_top {
        height: 130px;
        position: relative;
        background: #fff;
    }
    .email_top dl {
        line-height: 21px;
        padding: 20px 0 0 55px;
    }
    .email_top dl dt {
        padding-bottom: 10px;
        font-weight: bold;
    }
    .email_top dl dd {
        color: #888;
    }
    .email_pre_nxt {
        width: 165px;
        height: 25px;
        position: absolute;
        right: 0;
        bottom: 15px;
    }
    .pre_nxt {
        width: 65px;
        background: #a5a7a9;
        color: #fff;
    }
    .pre_nxt:hover {
        background: #b7b9bb;
    }
    .grey_box_top {
        padding-top: 20px;
    }
    .grey_box_bottom {
        height: 370px;
        padding-bottom: 30px;
    }
    .email_content {
        height: 370px;
        line-height: 21px;
        padding: 0 55px;
        color: #888;
        overflow: auto;
    }
</style>