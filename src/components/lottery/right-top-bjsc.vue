<template>
    <div id="lasdLottery">
        <div id="lastIner" class="clearfix">
            <div class="lastIner_left clearfix">
                <dl class="pk10">
                    <dd>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td style="text-align: right;"><span id="prevClassName" class="top-left-pk">{{lotteryName}}</span></td>
                                    <td class="f-12">第 <em>{{curOpen.titleCode | subTitleCode}}</em> 期 {{curOpenMsg}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="numList" class="pk10">
                            <ul class="clearfix" ref="openNumBar">
                                <li><span class="formTit">{{curOpen.openNum | openNumSplit(0)}}</span></li>
                                <li><span class="formTit">{{curOpen.openNum | openNumSplit(1)}}</span></li>
                                <li><span class="formTit">{{curOpen.openNum | openNumSplit(2)}}</span></li>
                                <li><span class="formTit">{{curOpen.openNum | openNumSplit(3)}}</span></li>
                                <li><span class="formTit">{{curOpen.openNum | openNumSplit(4)}}</span></li>
                                <li><span class="formTit">{{curOpen.openNum | openNumSplit(5)}}</span></li>
                                <li><span class="formTit">{{curOpen.openNum | openNumSplit(6)}}</span></li>
                                <li><span class="formTit">{{curOpen.openNum | openNumSplit(7)}}</span></li>
                                <li><span class="formTit">{{curOpen.openNum | openNumSplit(8)}}</span></li>
                                <li><span class="formTit">{{curOpen.openNum | openNumSplit(9)}}</span></li>
                            </ul>
                        </div>
                        <div class="numTxt10 f-12"><em>冠</em><em>亚</em><em>季</em><em>4</em><em>5</em><em>6</em><em>7</em><em>8</em><em>9</em><em>10</em></div>
                      </dd>
                  </dl>
                  <div class="juezhiBar f-12">
                      <span>第 {{curNumCode | subTitleCode}} 期</span>
                      <span>{{curNumMsg}}</span>
                      <span class="count-down">{{orderTMDesc}}</span>
                      <input id="execdll" name="execdll" value="0" style="display: none; width: 30px;" type="text">
                      <input id="voice_value" name="voice_value" style="display: none" value="1" type="hidden">
                      <span class="sound on" id="voice_pic" onclick="javascript:void(0)"></span>
                  </div>
            </div>
            <div class="lastIner_right">
                <div id="lastList">
                    <table id="OpenNumList" class="pk10">
                        <thead>
                            <tr style="font-size:12px;">
                              <th><span>期号</span></th><th><span>开奖号</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in lastOpenThree">
                                <td>{{item.titleCode | subTitleCode}}</td>
                                <td><em>{{item.openNum | openNumSplit(0)}}</em><em>{{item.openNum | openNumSplit(1)}}</em><em>{{item.openNum | openNumSplit(2)}}</em><em>{{item.openNum | openNumSplit(3)}}</em><em>{{item.openNum | openNumSplit(4)}}</em><em>{{item.openNum | openNumSplit(5)}}</em><em>{{item.openNum | openNumSplit(6)}}</em><em>{{item.openNum | openNumSplit(7)}}</em><em>{{item.openNum | openNumSplit(8)}}</em><em>{{item.openNum | openNumSplit(9)}}</em></td>
                            </tr>
                            <tr>
                                <td class="lsjl" colspan="3"><a :href="hisUrl" target="_blank">查看往期开奖号码</a></td>
                            </tr>
                         </tbody>
                     </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    import api from '../../api'
    import constants from './constants'
    import {addClass, hasClass, toggleClass, removeClass, lpad, errorMsg,succMsg} from '../../tools/command'
    export default {
      
        mounted(){
            this.listRecentOpen()
            this.findCurrentInfo()
            this.currentNumId = setInterval(this.findCurrentInfo, 1000)
            this.curNumNextId = setInterval(this.getCurNumNext, 1000)
            this.openId = setInterval(this.getOpen, 10000)
            this.orderTmIntervalId = setInterval(this.orderTmInterval, 1000)
            this.turnOnId = setInterval(this.turnOn, 1000)
        },

        components : {

        },

        computed: {
            currentLottery(){
               this.status = 0
               return this.$store.state.lottery.currentLottery
            },
            lotteryName(){
               var that = this
               this.$nextTick(function () {
                   that.$root.$emit("clear_number")
                   that.$root.$emit("clear-betting")
                   that.$root.$emit("clear_betting_list")
               })
               return constants[this.$store.state.lottery.currentLottery]
            },
            titleCodeShow(){
               var cai = this.$store.state.lottery.currentLottery
               var excludeCai = ['cai4','cai5']
               if(excludeCai.indexOf(cai) > -1){
                   return false
               }
               return true
            },
            ballDisplay(){
               var cai = this.$store.state.lottery.currentLottery
               var excludeCai = ['cai4','cai5']
               if(excludeCai.indexOf(cai) > -1){
                   return false
               }
               return true
            },
            hisUrl(){
                var cai = this.$store.state.lottery.currentLottery
                return "/?cai="+cai+"#/history"
            }

        },

        data() {
            return {
                curOpen : {},
                curOpenMsg : '（已截止）已开奖',
                lastOpenThree : [],
                curNum : {},
                curNumBak : {},
                curNumCode : null,
                curNumMsg : '离销售截止还有：',
                curNumNext : {},
                orderTmIntervalId: null,
                currentNumId : null,
                curNumNextId : null,
                openId : null,
                turnOnId : null,
                orderTMDesc : null,
                status : 0,    // 0: 初始状态, 状态未知
                               // 1: 开奖状态, orderTM > 0 and openWaitTM > 0 and waitTM == 0
                               // 2: 当前期截止前状态 orderTM > 0 and openWaitTM <= 0 and waitTM == 0
                               // 3: 当前期截止，下一期尚未开始投注的中间状态，当前期orderTM == 0 and waitTm > 0
            }
        },
        methods :{
            listRecentOpen(){
                let curLottery = this.$store.state.lottery.currentLottery
                var parameter = {}
                parameter.classId = curLottery.slice(3)
                api.ajax('lottery/num/listRecentOpen', parameter)
                .then(data => {
                         if(data && data.code == '0'){
                            if(data.data && data.data.length > 0){
                                 this.curOpen = data.data[0]
                                 this.lastOpenThree.splice(0, this.lastOpenThree.length, ...data.data.slice(0,3))
                            } else {
                                this.curOpen = {}
                                this.lastOpenThree.splice(0, this.lastOpenThree.length)
                            }
                         } else {
                             errorMsg(data.msg)
                         }
                     }, error => {
                         errorMsg("系统出错，请稍后重试", error)
                     })
            },
            findCurrentInfo(){
                var orderTM = this.curNum.orderTM
                var waitTM = this.curNum.waitTM
                if(this.status == 1){
                    if(orderTM%10 != 0){
                        return
                    }
                }
                if(this.status == 2){
                    if(orderTM > 3 && orderTM%30 != 0){
                        return
                    }
                }
                if(this.status == 3){
                    if(waitTM < 55 && waitTM > 3){
                        return
                    }
                }
                var curLottery = this.$store.state.lottery.currentLottery
                var parameter = {}
                parameter.classId = curLottery.slice(3)
                api.ajax('lottery/findCurrentInfo', parameter)
                .then(data => {
                       if(data && data.code == '0'){
                           this.curNum = data.data
                           this.calcStatus()
                       } else {
                           errorMsg(data.msg)
                       }
                   }, error => {
                       errorMsg("系统出错，请稍后重试", error)
                   })
            },
            calcStatus(){
                var data = this.curNum
                if(data.openWaitTM > 0 && this.curOpen.id != this.curNum.numId - 1){
                    this.curNumNext = {}
                    this.status = 1
                } else if(data.openWaitTM > 0 && this.curOpen.id == this.curNum.numId - 1){
                    this.curNumNext = {}
                    this.status = 2
                } else if(data.orderTM > 0 && data.openWaitTM <= 0 && data.waitTM <= 0){
                    this.curNumNext = {}
                    this.status = 2
                    this.listRecentOpen()
                } else if(data.orderTM == 0 && data.waitTM > 0){
                    this.status = 3
                }
            },
            turnOn(){
                if(this.status == 1 && this.curOpen.id != this.curNum.numId - 1) {
                   var data = this.curNum
                   this.curOpen = this.curNumBak
                   this.curOpenMsg = '正在开奖...'
                   this.curOpen.titleCode = data.titleLast
                   var openNum = this.$refs.openNumBar
                   var liList = openNum.querySelectorAll('li')
                   if(liList){
                       var liArr = Array.from(liList)
                       liArr.forEach( function(element, index) {
                           addClass(element, 'TurnPk10')
                       })
                   }
                } else {
                   this.turnOff()
                }
            },
            turnOff(){
                this.curOpenMsg = '（已截止）已开奖'
                var openNum = this.$refs.openNumBar
                var liList = openNum.querySelectorAll('li')
                if(liList){
                    var liArr = Array.from(liList)
                    liArr.forEach( function(element, index) {
                        removeClass(element, 'TurnPk10')
                    })
               }
            },
            orderTmInterval(){
                var orderTM = this.curNum.orderTM
                var waitTM = this.curNum.waitTM
                if(orderTM > 0) {
                    this.curNum.orderTM = this.curNum.orderTM - 1
                    this.curNumCode = this.curNum.titleCode
                    var min = Math.floor(orderTM/60)
                    var sec = orderTM % 60
                    if(min > 0){
                        if(min >= 60){
                           this.orderTMDesc = lpad(Math.floor(min/60),2,'0')+":"+lpad(min % 60,2,'0')+":"+lpad(sec,2,'0')
                        } else {
                           this.orderTMDesc = "00:"+lpad(min,2,'0')+":"+lpad(sec,2,'0')
                        }
                    } else {
                       this.orderTMDesc = "00:"+lpad(sec,2,'0')
                    }
                } else {
                    orderTM = this.curNumNext.orderTM
                    this.curNumNext.orderTM = this.curNumNext.orderTM - 1
                    this.curNumCode = this.curNumNext.titleCode
                    this.curNum.waitTM = this.curNum.waitTM - 1
                    if(orderTM >= 0){
                        var min = Math.floor(orderTM/60)
                        var sec = orderTM % 60
                        if(min > 0){
                            if(min >= 60){
                               this.orderTMDesc = lpad(Math.floor(min/60),2,'0')+":"+lpad(min % 60,2,'0')+":"+lpad(sec,2,'0')
                            } else {
                               this.orderTMDesc = "00:"+lpad(min,2,'0')+":"+lpad(sec,2,'0')
                            }
                        } else {
                           this.orderTMDesc = "00:"+lpad(sec,2,'0')
                        }
                    }
                } 
            },
            getCurNumNext(){
                if(this.status == 3){
                    if(this.curNumNext.orderTM){
                        return
                    }
                   var curLottery = this.$store.state.lottery.currentLottery
                   var parameter = {}
                   parameter.classId = curLottery.slice(3)
                   api.ajax('lottery/findCurrentCanBet', parameter)
                       .then(data => {
                           if(data && data.code == '0'){
                               this.curNumNext = data.data
                           } else {
                               errorMsg(data.msg)
                           }
                       }, error => {
                         errorMsg("系统出错，请稍后重试", error)
                       })
               }
           },
           getOpen(){
               if(this.status == 1){
                   var curLottery = this.$store.state.lottery.currentLottery
                   var parameter = {}
                   parameter.classId = curLottery.slice(3)
                   api.ajax('lottery/num/findRecentOpenOne', parameter)
                       .then(data => {
                        if(data && data.code == '0'){
                            var openData = data.data
                            if(openData.id == this.curNum.numId - 1){
                               this.listRecentOpen()
                               this.turnOff()
                            }
                        } else {
                            errorMsg(data.msg)
                        }
                       }, error => {
                        errorMsg("系统出错，请稍后重试", error)
                       })
               }
           }
       },
       beforeDestroy(){
           clearInterval(this.curNumNextId)
           clearInterval(this.orderTmIntervalId)
           clearInterval(this.currentNumId)
           clearInterval(this.openId)
           clearInterval(this.turnOnId)
       },
       watch : {
           "currentLottery" : function(value, old){
                this.curNumNext = {}
                this.listRecentOpen()
                this.findCurrentInfo()
           }
       }
    }
</script>
<style scoped>
  li {
    list-style: none;
  }
  * {
      margin: 0;
      padding: 0;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  .f-12 {
    font-size: 12px;
  }

  .top-left-pk {
    padding-left: 60px;
    background: url(../../images/caipiao/cai14White.png) left center no-repeat;
  }

  .count-down {
    font-size: 16px;
    font-weight: bold;
    font-family: "Times New Roman";
  }

</style>
