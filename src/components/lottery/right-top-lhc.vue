<template>
    <div id="lasdLottery">
        <div id="lastIner" class="clearfix">
            <div class="lastIner_left clearfix">
                <dl class="lhc">
                    <dd>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody><tr>
                                <td style="text-align: right;">
                                    <span id="prevClassName" class="top-left-lhc">{{lotteryName}}</span>
                                </td>
                                <td class="f-12">
                                    第 <em>{{curOpen.titleCode}}</em> 期 {{curOpenMsg}}
                                </td>
                            </tr>
                        </tbody></table>
                        <div id="numList" class="lhc">
                            <ul class="clearfix">
                                <li :class="curOpen.openNum | openNumSplit(0) | lhcsb(lhcData)"><span class="formTit">{{curOpen.openNum | openNumSplit(0)}}</span></li>
                                <li :class="curOpen.openNum | openNumSplit(1) | lhcsb(lhcData)"><span class="formTit">{{curOpen.openNum | openNumSplit(1)}}</span></li>
                                <li :class="curOpen.openNum | openNumSplit(2) | lhcsb(lhcData)"><span class="formTit">{{curOpen.openNum | openNumSplit(2)}}</span></li>
                                <li :class="curOpen.openNum | openNumSplit(3) | lhcsb(lhcData)"><span class="formTit">{{curOpen.openNum | openNumSplit(3)}}</span></li>
                                <li :class="curOpen.openNum | openNumSplit(4) | lhcsb(lhcData)"><span class="formTit">{{curOpen.openNum | openNumSplit(4)}}</span></li>
                                <li :class="curOpen.openNum | openNumSplit(5) | lhcsb(lhcData)"><span class="formTit">{{curOpen.openNum | openNumSplit(5)}}</span></li>
                                <li class="jia"><span>&nbsp;</span></li>
                                <li :class="curOpen.openNum | openNumSplit(6) | lhcsb(lhcData)"><span class="formTit">{{curOpen.openNum | openNumSplit(6)}}</span></li>
                            </ul>
                        </div>
                        <div class="numTxtLhc">
                            <em>{{curOpen.openNum | openNumSplit(0) | lhcSxOpen(lhcData)}}</em><em>{{curOpen.openNum | openNumSplit(1) | lhcSxOpen(lhcData)}}</em><em>{{curOpen.openNum | openNumSplit(2) | lhcSxOpen(lhcData)}}</em><em>{{curOpen.openNum | openNumSplit(3) | lhcSxOpen(lhcData)}}</em><em>{{curOpen.openNum | openNumSplit(4) | lhcSxOpen(lhcData)}}</em><em>{{curOpen.openNum | openNumSplit(5) | lhcSxOpen(lhcData)}}</em><em>&nbsp;</em><em>{{curOpen.openNum | openNumSplit(6) | lhcSxOpen(lhcData)}}</em>
                        </div>
                    </dd>
                </dl>
                <div class="juezhiBar f-12">
                    <span class="period2">第 {{curNumCode | subTitleCode}} 期</span>
                    <span>{{curNumMsg}}</span>
                    <span class="count-down">{{orderTMDesc}}</span>
                    <input id="execdll" name="execdll" value="0" style="display: none; width: 30px;" type="text">
                    <input id="voice_value" name="voice_value" style="display: none" value="1" type="hidden">
                    <span class="sound on" id="voice_pic" onclick="javascript:selectvoice(voice_value.value);">
                    </span>
                </div>
            </div>
            <div class="lastIner_right">
                <div id="lastList">
                    <table id="OpenNumList">
                        <thead>
                            <tr class="f-12">
                                <th><span>期号</span></th>
                                <th><span>开奖号</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in lastOpenThree">
                                <td>{{item.titleCode}}</td>
                                <td><em :class="item.openNum | openNumSplit(0) | lhcsb(lhcData)">{{item.openNum | openNumSplit(0)}}</em><em :class="item.openNum | openNumSplit(1) | lhcsb(lhcData)">{{item.openNum | openNumSplit(1)}}</em><em :class="item.openNum | openNumSplit(2) | lhcsb(lhcData)">{{item.openNum | openNumSplit(2)}}</em><em :class="item.openNum | openNumSplit(3) | lhcsb(lhcData)">{{item.openNum | openNumSplit(3)}}</em><em :class="item.openNum | openNumSplit(4) | lhcsb(lhcData)">{{item.openNum  | openNumSplit(4)}}</em><em :class="item.openNum | openNumSplit(5) | lhcsb(lhcData)">{{item.openNum | openNumSplit(5)}}</em>+<em :class="item.openNum | openNumSplit(6) | lhcsb(lhcData)">{{item.openNum | openNumSplit(6)}}</em></td>
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
    import {lpad, errorMsg,succMsg} from '../../tools/command'
    export default {

        mounted(){
          this.findNumLHC()
          this.findCurrentInfo()
          this.intervalId = setInterval(this.findCurrentInfo, 60000)
          this.orderTmIntervalId = setInterval(this.orderTmInterval, 1000)
        },

        components : {
          
        },

        computed: {
            currentLottery(){
                this.findNumLHC()
                this.findCurrentInfo()
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
              curNumCode : '',
              curNumMsg : '离销售截止还有：',
              curNumNext : {},
              intervalId : '',
              orderTmIntervalId: '',
              orderTMDesc : '',
              lhcData : null,
            }
        },
        methods :{
            listRecentOpen(){
              let curLottery = this.$store.state.lottery.currentLottery
              var parameter = {}
              parameter.classId = curLottery.slice(3)
              var that = this
              api.ajax('lottery/num/listRecentOpen', parameter)
                 .then(data => {
                          if(data && data.code == '0'){
                             if(data.data && data.data.length > 0){
                                  that.curOpen = data.data[0]
                                  that.lastOpenThree.splice(0, that.lastOpenThree.length, ...data.data.slice(0,3))
                             } else {
                                 that.curOpen = {}
                                 that.lastOpenThree.splice(0, that.lastOpenThree.length)
                             }
                          } else {
                              errorMsg(data.msg)
                          }
                      }, error => {
                          errorMsg("系统出错，请稍后重试", error)
                      })
            },
            findCurrentInfo(){
              let curLottery = this.$store.state.lottery.currentLottery
              var parameter = {}
              parameter.classId = curLottery.slice(3)
              api.ajax('lottery/findCurrentInfo', parameter)
                 .then(data => {
                        if(data && data.code == '0'){
                            this.curNum = data.data || {}
                            this.curNumCode = this.curNum.titleCode
                            this.listRecentOpen()
                        } else {
                            errorMsg(data.msg)
                        }
                    }, error => {
                        errorMsg("系统出错，请稍后重试", error)
                    })
            },
            orderTmInterval(){
              var orderTM = this.curNum.orderTM
              if(orderTM > 0) {
                this.curNumMsg = "离销售截止还有："
                this.curNum.orderTM = orderTM - 1
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
                  this.curNumMsg = "等待下一期"
              }
            },
            findNumLHC(){
                api.ajax('lottery/type/findNumLHC', {})
                .then(data => {
                    if(data && data.code == '0'){
                       this.lhcData = data.data
                       this.listRecentOpen()
                    } else {
                        errorMsg(data.msg)
                    }
                }, error => {
                    errorMsg("系统出错，请稍后重试")
                })
            },
        },
        beforeDestroy(){
            clearInterval(this.intervalId)
            clearInterval(this.orderTmIntervalId)
        },
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

  .top-left-lhc {
    padding-left: 60px;
    background: url(../../images/caipiao/cai13White.png) left center no-repeat;
  }

  .count-down {
    font-size: 16px;
    font-weight: bold;
    font-family: "Times New Roman";
  }

</style>