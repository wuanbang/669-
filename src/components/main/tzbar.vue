<template>
  <div class="tzbar-main">
     <div class="tzBar clearfix">
            <div class="tzBar_left" >
                <ul>
                    <li v-for="item in msgData.list" @click.stop="sysNotice(item.id)"><span>{{item.addTime.substr(0,10)}}</span><a href="javascript:void(0)" >{{item.title}}</a></li>
                </ul>
            </div>
            <div class="tzBar_mid">
                <div class="remenBang">
                    <ul @click.stop="goLottery" class="clearfix">
                        <li name="cai1">
                            <a href="javascript:void(0)" >
                                <span>进入游戏</span>
                                <img src="../../images/caipiao/cai1.png" >
                                <h3>重庆时时彩</h3>
                            </a>
                        </li>
                        <li name="cai12">
                            <a href="javascript:void(0)" >
                                <span>进入游戏</span>
                                <img src="../../images/caipiao/cai12.png" >
                                <h3>银狐分分彩</h3>
                            </a>
                        </li>
                        <li name="cai8">
                            <a href="javascript:void(0)" >
                                <span>进入游戏</span>
                                <img src="../../images/caipiao/cai8.png" >
                                <h3>广东11选5</h3>
                            </a>
                        </li>
                        <li name="cai4">
                            <a href="javascript:void(0)" >
                                <span>进入游戏</span>
                                <img src="../../images/caipiao/cai4.png" >
                                <h3>福彩3D</h3>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tzBar_right">
                <div class="remenBang">
                    <ul @click.stop="goLottery" class="clearfix">
                        <li name="qp1"><a href="javascript:void(0)" ><span>进入游戏</span>
                            <img src="../../images/caipiao/qp1.png"><h3>
                                百家乐</h3>
                        </a></li>
                        <li name="qp3"><a href="javascript:void(0)" ><span>进入游戏</span>
                            <img src="../../images/caipiao/qp2.png"><h3>
                                二人牛牛</h3>
                        </a></li>
                        <li name="qp2"><a href="javascript:void(0)" ><span>进入游戏</span>
                            <img src="../../images/caipiao/qp3.png"><h3>
                                百人牛牛</h3>
                        </a></li>
                        <li name="qp4"><a href="javascript:void(0)" ><span>进入游戏</span>
                            <img src="../../images/caipiao/qp4.png"><h3>
                                炸金花</h3>
                        </a></li>
                    </ul>
                </div>
            </div>
        </div>
  </div>
</template>
<script lang="babel">
     import { mapActions, mapGetters } from 'vuex'
     import api from '../../api'
     import {errorMsg,succMsg} from '../../tools/command'
    export default {
        mounted(){
            this.getSysNotice()
        },

        data(){
            return {
                msgData : {},
            }
        },
        methods :{
            getSysNotice(){
                var parameter = {}
                parameter.pageSize = 6
                parameter.pageNumber = 1
                api.ajax('notice/list', parameter).then(data => {
                    if(data && data.code == '0'){
                        this.msgData = data.data
                    } else {
                        errorMsg(data.msg)
                    }
                }, error => {
                    errorMsg("登录报错，"+JSON.stringify(error))
                })
            },
            goLottery(event){
                var srcElem = event.target
                var curLi = null
                var srcTagName = srcElem.tagName.toLowerCase()
                if(srcTagName == 'h3' || srcTagName == 'span' || srcTagName == 'img'){
                   curLi = srcElem.parentElement.parentElement
                } else if(srcElem.tagName.toLowerCase() == 'a'){
                   curLi = srcElem.parentElement
                } else if(srcElem.tagName.toLowerCase() == 'li'){
                  curLi = srcElem
                }
                if(!curLi) {
                    return
                }
                var curLiName = curLi.getAttribute("name")
                if(curLiName && curLiName.indexOf("qp") > -1){
                    this.goGame(curLiName.substring(2))
                    return
                }
                this.setCurrentLottery(curLiName)
                this.setActivedLottery(curLiName)

                this.setCurrentView('lottery')
            },
            goGame(id){
                var newWin = window.open('/#/loading')
                var para = {}
                para.id = id
                api.ajax('game/enter',para).then(data =>{
                    if (data.code == '0') {
                        newWin.location.href = data.data
                    }
                },error =>{
                    errorMsg("数据请求失败")
                })
            },
             ...mapActions({
              setActivedLottery: "setActivedLottery",
              setCurrentLottery: "setCurrentLottery",
              setCurrentView: "setCurrentView",
              setDiaView : 'setDiaView',
              setNoticeId : 'setNoticeId',
            }),
            sysNotice(id){
                console.log('sysNotice',id)
                this.setNoticeId(id)
                this.$root.$emit("triggerNotice")
            } 
        }

    }
</script>
<style scoped>
    .tzbar-main {
       width: 1000px;
       height: 200px;
       margin: 0 auto;
       padding: 10px 0;
    }
    .tzBar {
        padding-bottom: 10px;
    }
    .tzBar_left {
        float: left;
        width: 410px;
        height: 200px;
        margin-right: 16px;
        font-size: 12px;
        background: url(../../images/dating_tz_bg.png) 0 0 no-repeat;
    }
    .tzBar_left ul {
        padding: 7px 14px 0 14px;
        color: #fff;
        margin: 0;
    }
  
    .tzBar_left ul li {
        height: 30px;
        line-height: 30px;
        border-bottom: solid 1px #83888d;
    }
    .tzBar_left ul li span {
        float: right;
        padding-right: 5px;
    }
    .tzBar_left ul li a {
        width: 290px;
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        color: #fff;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background: url(../../images/dating_tz_ico.png) 5px center no-repeat;
    }

    .tzBar_left ul li:hover { 
        background: url(../../images/blackBg20.png) 0 0 repeat;
    }
    a {
        text-decoration: none;
        color: inherit;
    }

    ul {
        list-style: none;
    }

    .tzBar_mid {
        float: left;
        width: 275px;
        height: 200px;
        padding-left: 4px;
        background: url(../../images/dating_cp_bg.png) 0 0 no-repeat;
    }
    .remenBang {
        padding: 49px 14px 0 14px;
        color: #fff;
    }

    .remenBang ul li {
        height: 35px;
        line-height: 35px;
        border-bottom: solid 1px #83888d;
    }    
    .remenBang ul {
        padding-left: 0;
        margin-top: 0;
        margin-bottom: 0;
    }
    .remenBang ul li a {
        color: #fff;
    }
    .remenBang ul li span {
        float: right;
        padding: 0 5px 0 20px;
        font-size: 12px;
    }
    .remenBang ul li img {
        float: left;
        width: 35px;
        height: 35px;
        margin-right: 5px;
    }
    .remenBang ul li h3 {
        font-size: 16px;
        font-weight: normal;
        font-family: "Microsoft YaHei";
        margin: 0;
    }

    .tzBar_right {
        float: right;
        width: 275px;
        height: 200px;
        padding-left: 4px;
        background: url(../../images/dating_qp_bg.png) 0 0 no-repeat;
    }

    .clearfix{*zoom:1}

    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        overflow: hidden;
        visibility: hidden;
    }

    .remenBang ul li:hover { 
        background: url(../../images/blackBg20.png) 0 0 repeat;
    }

    .remenBang ul li:hover span { 
        background: url(../../images/arrow_yuan_right.png) left center no-repeat;
    }

</style>