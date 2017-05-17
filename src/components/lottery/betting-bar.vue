 <template>
 <div class="de_bar clearfix">
    <div class="gftjdat">
        <ul class="gftzxhj">
            <li v-if="showCount" id="IsDs">你选择了 <span id="zs" class="txtRed">{{count}}</span> 注 ，共 <span id="zsje" class="txtRed">
                {{money}}</span>元</li>
            <li ref="betMoney" v-if="showChaseNum"><span class="formTit"><a class="less v_mid" @click.stop="mdown" href="javascript:void(0)">-</a><input
                name="gfbt" id="gfbt" class="RMBtxt v_mid" v-model="multiple" @blur.stop="mblur" @keyup.stop="mkeyup"
                maxlength="6" type="text"><a class="add v_mid" @click.stop="mup" href="javascript:void(0)">+</a>倍</span>
                <em class="selected p-l-2" @click.stop="betMode(0)" id="rdo1"> 元</em> <em class="p-l-2" @click.stop="betMode(1)"
                    id="rdo2"> 角</em> <em class="p-l-2" @click.stop="betMode(2)" id="rdo3"> 分</em> <span style="display: none;"
                        id="BetMode">1</span></li>
        </ul>
        <div class="gftjdtzlb">
            <span class="priceNum"><a v-if="showBetMoney" class="btnWhitePL" href="javascript:void(0);" @click.stop="getPvAndSet">
                <span class="bl"></span><span class="bm" v-if="showBonusLHC">赔率 ：{{bonus}}</span><span v-else class="bm" id="linkBonusPoint">{{bonusHHDesc}} {{bonus}} / {{point}}%</span><span
                    class="br"></span></a></span> <a href="javascript:void(0);" id="button" class="btnGreen"
                        @click.stop="addtz"><span class="bl"></span><span class="bm">添加到列表</span><span class="br"></span></a>
            <a href="javascript:void(0)" @click.stop="clearBetList" id="zuihao_qc" class="btnBlack"><span class="bl"></span><span class="bm">清空列表</span><span class="br"></span></a> <a href="javascript:void(0)" class="btnRed" v-if="showChaseNum"><span class="bl"></span><span @click.stop="zuiHao" class="bm" >追号</span><span class="br"></span></a>
        </div>
    </div>
    <div id="betlistID" class="betlist" style="">
        <div class="gxklsf_main6">
        </div>
        <div class="gxklsf_main7">
            <div class="gxklsf_main7_left">
            </div>
        </div>
    </div>
    <div class="betting-bar-cust">
        <el-dialog title="奖金/返点" size="tiny" v-model="dialogVisible" :close-on-click-modal="closeOnClickModal">
        <div class="pdb20" style="text-align: center;padding-top: 30px;">
             <span id="spnhh" v-if="showBonusHH">奖金：
                 <input id="strBonusHH" type="text" readonly="readonly" :value="setBonusHH" style="width: 70px;" class="input_txt">
                 返点：
                 <input id="strFanDianHH" type="text" readonly="readonly" :value="setPointHH" style="width: 70px;" class="input_txt">
             </span>
             奖金：
             <input id="strBonus" type="text" readonly="readonly" :value="setBonus" style="width: 70px;" class="input_txt">
             返点
             <input id="strFanDian" type="text" readonly="readonly" :value="setPoint" style="width: 70px;" class="input_txt">
         </div>
          <div class="dialog-in-cls" style="text-align: center;">
          <a class="fandian_less hover v_mid" style="margin-right: 10px;" href="javascript:void(0)" @click.stop="setBonusAction">-</a><div class="slider-contailer-cu">
            <el-slider
              v-model="setPoint"
              :max="maxPoint"
              :min="minPoint"
              :step="pointChangeUnit"
              @change="bonusChange"
              >
            </el-slider>
           </div><a class="fandian_add v_mid" style="margin-left: 10px;" href="javascript:void(0)" @click.stop="setFanDianAction">+</a>
           </div>
           <div class="btn_set_cls">
                <a class="btnBig" href="javascript:void(0)" @click.stop="setBonus_FanDian">
                   <span class="bl"></span><span class="bm">确定</span><span class="br"></span>
                </a>
                <a class="btnBig" href="javascript:void(0)" @click.stop="cancel_Bonus_FanDian">
                   <span class="bl"></span><span class="bm">取消</span><span class="br"></span>
                </a>
          </div>
        </el-dialog>
    </div>
    <div class="betting-bar-chase" >
        <el-dialog title="我要追号" size="tiny" v-model="chaseVisible" :close-on-click-modal="closeOnClickModal" @close="closeChaseNum">
           <chase-number v-if="chaseVisible"></chase-number>
        </el-dialog>
    </div>
</div>
</template>
<script lang="babel">
    import api from '../../api'
    import bet from './betting'
    import lotteryType from './order-type-constants'
    import {addClass, hasClass, toggleClass, removeClass} from '../../tools/command'
    import { errorMsg,succMsg } from '../../tools/command'
    import { mapActions } from 'vuex'
    import chaseNumber from './chase-number'
    export default {
        components : {
          chaseNumber
        },

        mounted(){
            this.$root.$on("betting", this.bettings)
            this.$root.$on("getBonus", this.getBonus)
            this.$root.$on("clear-betting", this.clearBet)
            this.$root.$on("close-chase", this.closeChaseNum)
        },
        beforeDestroy(){
            this.$root.$off("betting", this.bettings)
            this.$root.$off("getBonus", this.getBonus)
            this.$root.$off("clear-betting", this.clearBet)
            this.$root.$off("close-chase", this.closeChaseNum)
        },
        data(){
            return {
                count : 0,
                unit : 1,
                multiple : 1,
                bonus : '',
                point : '',
                maxBonus : '',
                maxPoint : '',
                minBonus : '',
                minPoint : '',
                bonusChangeUnit : '',
                pointChangeUnit : '',
                dialogVisible : false,
                setBonus : '',
                setPoint : '',
                setBonusHH : '',
                setPointHH : '',
                closeOnClickModal: false,
                betnumbers : '',
                betmoney : 0,
                chaseVisible : false,
                tzbs : '',
                maxBonusHH : '',
                maxPointHH : '',
                minBonusHH : '',
                pointHH : '',
                bonusHH : '',
                bonusChangeUnitHH : '',
                pointChangeUnitHH : '',
                showBonusHH : false,
                lhcMoney : 0,
            }
        },

        computed: {
            money(){
                var curLottery = this.$store.state.lottery.currentLottery
                if(curLottery == 'cai14'){
                    return this.lhcMoney
                } else {
                    return this.count * 2/this.unit
                }
            },
            showCount(){
                var rst  = true
                var type = this.$store.state.lottery.playMethodType
                if(type && type.indexOf('single') > -1){
                    rst = false
                }
                return rst
            },
            bonusHHDesc(){
                return this.bonusHH ? this.bonusHH + " | " : ''
            },
            showBetMoney(){
                var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
                var limitType = ["lhc_tmsx","lhc_tmdxds", "lhc_tmsb"]
                if(limitType.indexOf(gamePlayMethod) > -1){
                    return false
                }
                return true
            },
            showChaseNum(){
                var curLottery = this.$store.state.lottery.currentLottery
                if(curLottery == 'cai14'){
                    return false
                }
                return true
            },
            showBonusLHC(){
                var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
                var limitType = ["lhc_tm","lhc_zm", "lhc_zmt"]
                if(limitType.indexOf(gamePlayMethod) > -1){
                    return true
                }
                return false
            }
        },
        watch : {
            "setPoint" : function(value){
                console.log('watch setPoint', value)
                var diff = (value - this.point)/this.pointChangeUnit
                this.setBonus = Math.abs((this.bonus - diff * this.bonusChangeUnit).toFixed(2))
                if(this.setBonusHH || this.setPointHH){
                    this.setPointHH = value
                    this.setBonusHH = (this.bonusHH -0 - diff*this.bonusChangeUnitHH).toFixed(2)
                }
            }
        },
        methods :{
            ...mapActions({
               setCurbetting : 'setCurbetting',
               clearBetting : 'clearBetting',
               clearSelected : 'clearSelected',
            }),
            clearBet(){
                this.count = 0
                this.betmoney = 0
                this.multiple = 1
                this.tzbs = ''
                this.lhcMoney = 0
                this.clearBetting()
                if(this.$store.state.lottery.currentLottery == 'cai14'){
                    this.clearSelected()
                }
            },
            zuiHao(event){
                var betList = this.$store.state.lottery.betList
                if(betList.length == 0){
                    errorMsg("追号前请先正确选择注单号码!")
                    return
                } else if(betList.length > 1){
                    errorMsg("追号只能投注单注!")
                    return
                }
                this.chaseVisible = true
            },
            closeChaseNum(){
                this.chaseVisible = false
            },
            bettings(){
                var curLottery = this.$store.state.lottery.currentLottery
                var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
                var playMethodType = this.$store.state.lottery.playMethodType
                var selected = this.$store.state.lottery.selected
                if(curLottery == 'cai14'){
                    var selArray = Object.keys(selected)
                    if(selArray && selArray.length > 0){
                        var count = 0, lhcMoney = 0
                        selArray.forEach((element, index) => {
                            if(selected[element][0] && selected[element][0].length > 0){
                                count ++
                                lhcMoney += selected[element][0]/1
                            }
                        })
                        this.count = count
                        this.lhcMoney = lhcMoney
                    }
                } else {
                    if(gamePlayMethod && curLottery && playMethodType && selected){
                        var rst = bet[curLottery][gamePlayMethod][playMethodType](selected)
                    }
                    rst = rst || {}
                    this.count = rst.count || 0
                    console.log('count: ',rst.count)
                    console.log('number: ',rst.numbers)
                    if(rst.msg){
                        errorMsg(rst.msg)
                    } else if(this.count > 0){
                        this.betnumbers = rst.numbers
                        if(rst.tzbs){
                            this.tzbs = rst.tzbs
                        }
                    }
                }
            },
            addtz(){
                var type = this.$store.state.lottery.playMethodType
                this.setCurbetting(this.$data)
                if(type && type.indexOf('single') > -1){
                    var that = this
                    this.$nextTick(function () {
                        that.$root.$emit("single_plate")
                    })
                } else {
                    this.betmoney = this.money
                    var that = this
                    this.$nextTick(function () {
                        that.$root.$emit("betting_list")
                    })
                }
            },
            betMode(mode){
                console.log('mode', mode)
                if(mode == 0){
                    this.unit = 1
                } else if(mode == 1){
                    this.unit = 10
                } else if(mode == 2){
                    this.unit = 100
                }
                var betMoney = this.$refs.betMoney
                var ems = betMoney.querySelectorAll('em')
                var emsArray = Array.from(ems)
                emsArray.forEach( function(element, index) {
                    if(index == mode){
                        addClass(element, "selected")
                    } else {
                        removeClass(element, "selected")
                    }
                })
            },
            mdown(){
                if(this.multiple > 1){
                    this.multiple = this.multiple - 1
                }
            },
            mup(){
                if(this.multiple < 999999){
                    this.multiple = this.multiple + 1
                }
            },
            mblur(){
                var value = this.multiple
                if(!value || isNaN(value)) {
                    this.multiple = 1
                } else {
                    this.multiple = parseInt(value)
                }
            },
            mkeyup(){
                var value = this.multiple
                if(value){
                    var re = /\D+/g
                    this.multiple = value.replace(re, '')
                }
            },
            getBonus(){
                var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
                var curLottery = this.$store.state.lottery.currentLottery
                var playMethodType = this.$store.state.lottery.playMethodType
                if(gamePlayMethod && curLottery && playMethodType){
                    var lotteryTypeValue = lotteryType[curLottery][gamePlayMethod][playMethodType]
                    console.log('lotteryTypeValue', lotteryTypeValue)
                    var param = {classId : curLottery.slice(3), typeId : lotteryTypeValue}
                    var that = this
                    api.ajax('lottery/type/findBonus', param).then(data => {
                        if(data && data.code == '0'){
                            var pl = data.data
                            that.point = 0.0
                            that.bonus = pl.minBonus + (pl.maxPoint - that.point) * pl.bonusChangeUnit / 0.1
                            that.maxBonus = pl.minBonus + pl.maxPoint * pl.bonusChangeUnit / 0.1
                            that.maxPoint = pl.maxPoint
                            that.minBonus = pl.minBonus
                            that.minPoint = 0
                            that.bonusChangeUnit = pl.bonusChangeUnit
                            that.pointChangeUnit = pl.pointChangeUnit
                            that.setBonus = that.bonus
                            that.setPoint = that.point

                            if(pl.minBonusHH){
                                that.showBonusHH = true
                                that.pointHH = that.point
                                that.bonusHH = pl.minBonusHH + (pl.maxPointHH - that.pointHH) * pl.bonusChangeUnitHH / 0.1
                                that.setBonusHH = that.bonusHH
                                that.setPointHH = that.pointHH

                                that.maxBonusHH = pl.minBonus + (pl.maxPointHH) * pl.bonusChangeUnitHH / 0.1
                                that.maxPointHH = pl.maxPointHH
                                that.minBonusHH = pl.minBonusHH
                                that.minPointHH = 0
                                that.bonusChangeUnitHH = pl.bonusChangeUnitHH
                                that.pointChangeUnitHH = pl.pointChangeUnitHH
                            } else {
                                that.showBonusHH = false
                                that.setBonusHH = ""
                                that.setPointHH = ""
                                that.bonusHH = ""
                                that.pointHH = ""

                                that.maxBonusHH = ""
                                that.maxPointHH = ""
                                that.minBonusHH = ""
                                that.minPointHH = ""
                                that.bonusChangeUnitHH = ""
                                that.pointChangeUnitHH = ""
                            }

                        } else {
                            errorMsg(data.msg)
                        }
                    }, error => {
                        errorMsg("系统出错，请稍后重试")
                    })
                }
            },
            getPvAndSet(){
                var curLottery = this.$store.state.lottery.currentLottery
                var playMethodType = this.$store.state.lottery.playMethodType
                var ssc = ['cai1','cai2','cai3','cai6','cai7','cai11','cai12','cai15']
                var order = ['not_location_last_three_one_code','not_location_first_three_one_code','big_little_odd_even_first_two','big_little_odd_even_last_two']
                if(this.showBonusLHC){
                    this.dialogVisible = false
                    errorMsg("此玩法不支持调节奖金和返点！")
                    return
                } else if(ssc.indexOf(curLottery) > -1 && order.indexOf(playMethodType) > -1){
                    this.dialogVisible = false
                    errorMsg("此玩法不支持调节奖金和返点！")
                    return
                }
                this.dialogVisible = true
            },
            bonusChange(value){
                console.log('bonusChange', value)
            },
            cancel_Bonus_FanDian(){
                this.dialogVisible = false
                this.getBonus()
            },
            setFanDianAction(){
                if(this.setPoint == this.maxPoint){
                    return
                }
                this.setPoint = (this.setPoint - 0 + this.pointChangeUnit).toFixed(1) - 0
            },
            setBonusAction(){
                if(this.setPoint == 0){
                    return
                }
                this.setPoint = (this.setPoint - this.pointChangeUnit).toFixed(1) - 0
            },
            setBonus_FanDian(){
                this.dialogVisible = false
                var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
                var curLottery = this.$store.state.lottery.currentLottery
                var playMethodType = this.$store.state.lottery.playMethodType
                var lotteryTypeValue = lotteryType[curLottery][gamePlayMethod][playMethodType]
                var param = {classId : curLottery.slice(3),  typeId : lotteryTypeValue, bonus:this.setBonus, point: this.setPoint.toFixed(1) }
                api.ajax('order/setBonus', param).then(data => {
                    if(data && data.code == '0'){
                        this.getBonus()
                        succMsg('奖金/返点设置成功！')
                    } else {
                        errorMsg(data.msg)
                        this.getBonus()
                    }
                }, error => {
                    errorMsg("系统出错，请稍后重试")
                    this.getBonus()
                })
            },
            clearBetList(){
                var that = this
                this.$nextTick(function () {
                    that.$root.$emit("clear_betting_list")
                })
            },
        },

    }
</script>
<style scoped>
     li {
       list-style: none;
       font-size: 12px;
     }
     * {
         margin: 0;
         padding: 0;
     }
     a {
       text-decoration: none;
     }
     .slider-contailer-cu{
        width: 75%;
        height: 20px;
        display: inline-block;
     }
     .dialog-in-cls{
        margin: 10px auto;
        width: 60%;
        height: 50px;
    }
    .btn_set_cls {
        text-align: center;
        margin-bottom: 30px;
    }
    .p-l-2{
        padding-left: 2px;
    }
</style>
