<template>
    <div id="lasdLottery">
        <div id="lastIner" class="clearfix">
            <div class="lastIner_left clearfix">
                <div>
                    <div class="left-image">
                        <img v-show="'cai1' == currentLottery" src="../../images/caipiao/cai1.png">
                        <img v-show="'cai2' == currentLottery" src="../../images/caipiao/cai2.png">
                        <img v-show="'cai3' == currentLottery" src="../../images/caipiao/cai3.png">
                        <img v-show="'cai4' == currentLottery" src="../../images/caipiao/cai4.png">
                        <img v-show="'cai5' == currentLottery" src="../../images/caipiao/cai5.png">
                        <img v-show="'cai6' == currentLottery" src="../../images/caipiao/cai6.png">
                        <img v-show="'cai7' == currentLottery" src="../../images/caipiao/cai7.png">
                        <img v-show="'cai8' == currentLottery" src="../../images/caipiao/cai8.png">
                        <img v-show="'cai9' == currentLottery" src="../../images/caipiao/cai9.png">
                        <img v-show="'cai10' == currentLottery" src="../../images/caipiao/cai10.png">
                        <img v-show="'cai11' == currentLottery" src="../../images/caipiao/cai11.png">
                        <img v-show="'cai12' == currentLottery" src="../../images/caipiao/cai12.png">
                        <img v-show="'cai15' == currentLottery" src="../../images/caipiao/cai15.png">
                    </div>
                    <div>
                        <div style="display: inline-block; margin-left: 50px; margin-top: 2px;">
                           <div>        
                                <div id="prevClassName" class="div-inline-block">{{lotteryName}}</div>
                                <div class="div-inline-block f-12">
                                    <p>第 {{curOpen.titleCode}} 期</p>
                                    <p>{{curOpenMsg}}</p>
                                </div>
                            </div>
                        </div>
                        <div id="numList" class="ssc div-inline-block" style="margin-left: 20px; margin-top: 5px;">
                          <ul class="clearfix" ref="openNumBar">
                             <li><span class="formTit">{{curOpen.openNum | openNumSplit(0)}}</span></li>
                             <li><span class="formTit">{{curOpen.openNum | openNumSplit(1)}}</span></li>
                             <li><span class="formTit">{{curOpen.openNum | openNumSplit(2)}}</span></li>
                             <li v-show="ballDisplay"><span class="formTit">{{curOpen.openNum | openNumSplit(3)}}</span></li>
                             <li v-show="ballDisplay"><span class="formTit">{{curOpen.openNum | openNumSplit(4)}}</span></li>
                          </ul>
                        </div>
                        <div class="juezhiBar f-12" style="margin-left: 70px;">
                            <span>第 {{curNumCode | subTitleCode}} 期</span>
                            <span>{{curNumMsg}}</span>
                            <span id="countdown">{{orderTMDesc}}</span>
                            <input name="voice_value" style="display: none" value="1" type="hidden">
                            <span class="sound on" id="voice_pic" onclick="javascript:void(0)">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lastIner_right">
                <div id="lastList">
                    <table id="OpenNumList">
                        <thead>
                            <tr style="font-size:12px;">
                              <th><span>期号</span></th><th><span>开奖号</span></th><th v-if="showWanfa"><span>玩法</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in lastOpenThree">
                              <td>{{item.titleCode}}</span></td>
                              <td><em>{{item.openNum | openNumSplit(0)}}</em><em>{{item.openNum | openNumSplit(1)}}</em><em>{{item.openNum | openNumSplit(2)}}</em><em v-show="ballDisplay">{{item.openNum | openNumSplit(3)}}</em><em v-show="ballDisplay">{{item.openNum | openNumSplit(4)}}</em></td>
                              <td v-if="showWanfa">{{item.pattern1}}</td>
                             </tr>
                              <tr><td class="lsjl" colspan="3"><a :href="hisUrl" target="_blank">查看往期开奖号码</a></td>
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
            },
            showWanfa(){
                var cai = this.$store.state.lottery.currentLottery
                var filter = ['cai8','cai9','cai10','cai4','cai5']
                if(filter.indexOf(cai) > -1){
                    return false
                }
                return true
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
              status : 0,   // 0: 初始状态, 状态未知
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
                            addClass(element, 'Turn')
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
                        removeClass(element, 'Turn')
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
                             var openData = data.data || {}
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

  .div-inline-block{
    display: inline-block;
  }
  .f-12 {
    font-size: 12px;
  }

</style>
