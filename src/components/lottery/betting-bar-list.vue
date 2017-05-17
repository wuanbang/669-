<template>
	<div class="tzBox clearfix">
        <div class="float_l dis-inl-b" ref="betListScroll">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="betlistshow" id="betlistshowID">
               <tbody>
                   <tr v-for="(item, index) in betdata">
                        <td>{{item.typeName}}</td>
                        <td :title="item.betnumbersName">{{item.betnumbersName | hanlerBetString}}</td>
                        <td>模式：{{item.unitName}}</td>
                        <td>{{item.count}}注 </td>
                        <td>{{item.multiple}}倍 </td>
                        <td>￥{{item.totalMoney}}元 </td>
                        <td><a class="close" href="javascript:void(0)" @click.stop="gfbetdel(index)"></a></td>
                    </tr>
               </tbody>
            </table>
        </div>
        <div class="float_r f-12" id="gfzfhz" style="text-align: left;">
            <span id="LotteryID"></span>
            <p>
                总注数：<span class="txtRed" id="gfhjzs">{{tcount}}</span> 注</p>
            <p>
                总金额：<span class="txtRed" id="gfhjje" name="gfhjje">{{tmoney}}</span> <span id="unit">元</span></p>
            <div id="ljtjtz" @click.stop="needConfirm">立即投注</div>
        </div>
        <div class="betting-bar-list-dialog">
            <el-dialog title="提示" v-model="dialogVisible" size="tiny">
              <span>您确认要提交本次的订单记录吗？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click.native="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="confirmBet">确 定</el-button>
              </span>
            </el-dialog>
        </div>
    </div>
</template>
<script lang="babel">
import { errorMsg,succMsg } from '../../tools/command'
import { mapActions } from 'vuex'
import cai from './lottery-data'
import lotteryType from './order-type-constants'
import api from '../../api'
export default {
    mounted(){
        $(this.$refs.betListScroll).mCustomScrollbar()
        this.$root.$on("betting_list", this.betting)
        this.$root.$on("clear_betting_list", this.clearAll)
    },
    beforeDestroy(){
        this.$root.$off("betting_list", this.betting)
        this.$root.$off("clear_betting_list", this.clearAll)
    },
	data(){
		return {
            betdata : [],
            curAct : '',
            dialogVisible : false,
		}
	},
    computed: {
        tcount(){
            if(this.betdata.length == 0){
                return 0
            }
            var tm = 0
            this.betdata.forEach( function(element, index) {
                tm += element.count
            })
            return tm
        },
        tmoney(){
            if(this.betdata.length == 0){
                return 0
            }
            var tm = 0
            this.betdata.forEach( function(element, index) {
                tm += element.totalMoney/1
            })
            var tmStr = tm + ''
            if(tmStr.indexOf('.') > -1){
                return tm.toFixed(2)
            }
            return tm
        },
    },
    methods : {
        ...mapActions({
           clearSelected : 'clearSelected',
           setBetList : 'setBetList',
           clearBetList : 'clearBetList',
        }),
        convertName(btname){
            btname = btname.replace(/09/g, "大")
            btname = btname.replace(/01/g, "小")
            btname = btname.replace(/03/g, "单")
            btname = btname.replace(/02/g, "双")
            btname = btname.replace(/hongbo/g, "红波")
            btname = btname.replace(/lanbo/g, "蓝波")
            btname = btname.replace(/lvbo/g, "绿波")
            
            btname = btname.replace(/shu/g, "鼠")
            btname = btname.replace(/long/g, "龙")
            btname = btname.replace(/ma/g, "马")
            btname = btname.replace(/hou/g, "猴")
            btname = btname.replace(/gou/g, "狗")
            btname = btname.replace(/niu/g, "牛")
            btname = btname.replace(/tu/g, "兔")
            btname = btname.replace(/she/g, "蛇")
            btname = btname.replace(/yang/g, "羊")
            btname = btname.replace(/ji/g, "鸡")
            btname = btname.replace(/zhu/g, "猪")
            btname = btname.replace(/hu/g, "虎")
            return btname
        },
        betting(){
            if(this.$store.state.lottery.currentLottery == 'cai14'){
                var lottery = this.$store.state.lottery.currentLottery
                var playMethod = this.$store.state.lottery.gamePlayMethod
                var methodType = this.$store.state.lottery.playMethodType
                var selected = this.$store.state.lottery.selected
                var typeName = this.calcTypeName()
                var selArray = Object.keys(selected)
                var limitType = ["lhc_tmsx","lhc_tmdxds", "lhc_tmsb"]
                if(selArray && selArray.length > 0){
                    selArray.forEach((element, index) => {
                        if(selected[element][0] && selected[element][0].length > 0){
                            var value = {}
                            value.lottery = lottery
                            value.playMethod = playMethod
                            value.methodType = methodType
                            value.tzbs = '0'
                            value.model = 1
                            value.totalMoney = selected[element][0]
                            var tmStr = selected[element][0] + ''
                            if(tmStr.indexOf('.') > -1){
                                value.totalMoney = selected[element][0].toFixed(2)
                            }
                            value.count = 1
                            value.multiple = selected[element][0]
                            value.typeName = typeName
                            value.betnumbersName = element
                            if(limitType.indexOf(playMethod) > -1){
                                value.betnumbersName = this.convertName(element)
                            } 
                            value.betnumbers = element
                            value.unit = 1
                            value.unitName = "元"
                            this.betdata.push(value)
                        }
                    })
                }
                this.clearSelected()
                var that = this
                this.$nextTick(function () {
                    that.$root.$emit("clear_number")
                    that.$root.$emit("clear-betting")
                })
            } else {
                var value = {}
                Object.assign(value, this.$store.state.lottery.curBetting)
                if(value.count == 0){
                    errorMsg("请先正确选择号码！")
                    return
                }

                if(!value.tzbs){
                    var tzbs = "0"
                    var ballposi = this.$store.state.lottery.selected["ballposi"]
                    if(ballposi && ballposi.length > 0){
                        tzbs = ballposi.join('')
                    }
                    value.tzbs = tzbs
                }
                value.lottery = this.$store.state.lottery.currentLottery
                value.playMethod = this.$store.state.lottery.gamePlayMethod
                value.methodType = this.$store.state.lottery.playMethodType
                value.typeName = this.calcTypeName()
                if(value.unit == 1){
                    value.unitName = "元"
                    value.model = 1
                } else if(value.unit == 10){
                    value.unitName = "角"
                    value.model = 2
                } else if(value.unit == 100){
                    value.unitName = "分"
                    value.model = 3
                }

                var scid = ['big_little_odd_even','pk10_guess_daxiao', 'pk10_guess_danshuang']
                if(scid.indexOf(value.playMethod) > -1){
                    var btname = value.betnumbers
                    btname = btname.replace(/09/g, "大")
                    btname = btname.replace(/01/g, "小")
                    btname = btname.replace(/03/g, "单")
                    btname = btname.replace(/02/g, "双")
                    btname = btname.replace(/9/g, "大")
                    btname = btname.replace(/1/g, "小")
                    btname = btname.replace(/3/g, "单")
                    btname = btname.replace(/2/g, "双")
                    value.betnumbersName = btname
                } else {
                    value.betnumbersName = value.betnumbers
                }
                var tmStr = value.betmoney + ''
                if(tmStr.indexOf('.') > -1){
                    value.betmoney = value.betmoney.toFixed(2)
                }
                value.totalMoney = value.betmoney * value.multiple

                tmStr = value.totalMoney + ''
                if(tmStr.indexOf('.') > -1){
                    if(tmStr.substring(tmStr.indexOf('.') + 1, tmStr.indexOf('.') + 3) == '00'){
                        value.totalMoney = value.totalMoney.toFixed(0)
                    } else {
                        value.totalMoney = value.totalMoney.toFixed(2)
                    }
                }
                console.log('betting_list', JSON.stringify(value))

                this.betdata.push(value)
                this.setBetList(this.betdata)
                this.clearSelected()
                var that = this
                this.$nextTick(function () {
                    that.$root.$emit("clear_number")
                    that.$root.$emit("clear-betting")
                })
            }
        },
        calcTypeName(){
            var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
            var curLottery = this.$store.state.lottery.currentLottery
            var playMethodType = this.$store.state.lottery.playMethodType
            var methodTypeArray = cai[curLottery].methodType[gamePlayMethod]
            var playMethodTypeName = ''
            console.log('calcTypeName', methodTypeArray)
            if(methodTypeArray && methodTypeArray){
                methodTypeArray.forEach( function(element) {
                    element.items.forEach( function(elem) {
                        if(elem.name == playMethodType){
                            playMethodTypeName = elem.value
                        }
                    })
                })
            }
            console.log('playMethodTypeName', playMethodTypeName)
            return playMethodTypeName
        },
        gfbetdel(value){
            console.log(value)
            this.betdata.splice(value, 1)
            this.setBetList(this.betdata)
        },
        clearAll(){
            this.betdata.splice(0)
            this.clearBetList()
        },
        bet(){
            var para = []
            if(this.betdata.length == 0){
                errorMsg("请先正确选择号码！")
            }
            var that = this
            this.betdata.forEach(function(value, index) {
                var item = {}
                item.gid = value.lottery.slice(3)
                item.gmcid = lotteryType[value.lottery][value.playMethod][value.methodType]
                item.contents = value.betnumbers
                item.lid = that.curAct
                item.zs = value.count
                item.bs = value.multiple
                item.model = value.model
                item.amount = value.totalMoney
                item.tzbs = value.tzbs
                para.push(item)
            })
            var curLottery = this.$store.state.lottery.currentLottery
            var parameter = {}
            parameter.classId = curLottery.slice(3)
            parameter.numId = this.curAct
            parameter.amountTotal = this.tmoney
            parameter.point = 0.0
            parameter.strJson = JSON.stringify(para)
            var that = this
            api.ajax('order/save', parameter).then(data => {
                        if(data && data.code == '0'){
                            succMsg(data.msg)
                            that.clearAll()
                        } else {
                            errorMsg(data.msg)
                        }
                    }, error => {
                        errorMsg("系统出错，请稍后重试", error)
                    })
        },
        betImmediate(){
            var that = this
            var para = {}
            var curLottery = this.$store.state.lottery.currentLottery
            para.classId = curLottery.slice(3)
            api.ajax('lottery/findCurrentInfo', para).then(data => {
                        if(data && data.code == '0'){
                            that.curAct = data.data.curNumId
                            that.bet()
                        } else {
                            errorMsg(data.msg)
                        }
                    }, error => {
                        errorMsg("系统出错，请稍后重试", error)
                    })
        },
        confirmBet(){
            this.dialogVisible = false
            this.betImmediate()
        },
        needConfirm(){
            if(this.betdata.length == 0){
                errorMsg("请先正确选择号码！")
                return
            }
            this.dialogVisible = true
        }
    },
}

</script>
<style scoped>

.tzBox .float_r {
    width: 144px;
}
.float_r {
    float: right;
}

.dis-inl-b {
	display: inline-block;
}

.f-12 {

}

.overflow-ellipsis-spc {
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    width: 140px;
    display: inline-block;
    font-size: 12px;
}

</style>
