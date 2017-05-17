<template>
    <div class="gf-main">
        <div class="xz">
           <div class="gzsm_rx f-12" v-if="ballPosition" ref="selBarSingle">
                <strong>选择球位</strong>：
                <input id="check_wan" name="1" type="checkbox" class="v_mid"> 万位
                <input id="check_qian" name="2" type="checkbox" class="v_mid"> 千位
                <input id="check_bai" name="3" type="checkbox" class="v_mid"> 百位
                <input id="check_shi" name="4" type="checkbox" class="v_mid"> 十位
                <input id="check_ge" name="5" type="checkbox" class="v_mid"> 个位
            </div>
            <div><textarea name="Addds" id="Addds" ref="single" cols="85" rows="10" class="qiuTextarea f-12"></textarea></div>
            <div class="f-12">空格[ ]、逗号[,] 或者 美元符号[$] 隔开</div>
        </div>
    </div>
</template>
<script lang="babel">
import ballPosi from './data/ball-position'
import bet from './betting'
import { Message } from 'element-ui'
import { mapActions } from 'vuex'
export default {

    mounted(){
        this.clear()
        this.$root.$on("clear_number", this.clear)
        this.$root.$on("single_plate", this.bettings)
    },
    beforeDestroy(){
        this.$root.$off("clear_number", this.clear)
        this.$root.$off("single_plate", this.bettings)
    },

    data(){
        return {
            count : 0
        }
    },

    updated(){
        this.clear()
    },

    computed : {

        ballPosition(){
            var curLottery = this.$store.state.lottery.currentLottery
            var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
            var playMethodType = this.$store.state.lottery.playMethodType
            if(ballPosi.indexOf(playMethodType) > -1){
                return  true
            }
            return false
        }

    },
    methods : {
        ...mapActions({
           setCurbetting : 'setCurbetting',
        }),
        clear(){
            var single = this.$refs.single
            if(single){
                single.value = ''
            }
            var selBar = this.$refs.selBarSingle
            if(selBar){
                var all = selBar.querySelectorAll('input')
                var allArray = Array.from(all)
                if(allArray && allArray.length > 0){
                    allArray.forEach( function(element, index) {
                        if(element.checked){
                            element.checked = false
                        }
                    })
                }
            }
        },
        selBarSingle(){
            var data = {
                name : 'ballposi',
                selected : []
            }
            var selBar = this.$refs.selBarSingle
            if(selBar){
                var all = selBar.querySelectorAll('input')
                var allArray = Array.from(all)
                if(allArray && allArray.length > 0){
                    allArray.forEach( function(element, index) {
                        if(element.checked){
                            data.selected.push(element.getAttribute("name"))
                        }
                    })
                }
            }
            return data
        },
        bettings(){
            var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
            var curLottery = this.$store.state.lottery.currentLottery
            var playMethodType = this.$store.state.lottery.playMethodType
            var selected = this.$refs.single
            var selBarSingle = this.selBarSingle()
            if(gamePlayMethod && curLottery && playMethodType && selected){
                var svalue = selected.value.trim().replace(/\s{2,}/g, ' ')
                var rst = bet[curLottery][gamePlayMethod][playMethodType](svalue, selBarSingle)
            }
            rst = rst || {}
            this.count = rst.count || 0
            console.log('count: ',rst.count)
            console.log('number: ',rst.numbers)
            if(rst.msg){
                Message({
                  showClose: true,
                  duration:3000,
                  message: rst.msg,
                  type: 'error'
                })
            } else {
                var value = {}
                Object.assign(value, this.$store.state.lottery.curBetting)
                var tzbs = this.selBarSingle().selected
                if(tzbs.length == 0){
                    value.tzbs = '0'
                } else {
                    value.tzbs = tzbs.join('')
                }
                value.count = this.count
                value.betnumbers = rst.numbers
                value.betmoney = value.count * 2 / value.unit
                this.setCurbetting(value)
                var that = this
                this.$nextTick(function () {
                    that.$root.$emit("betting_list")
                })
            }
        },
    }

}

</script>
<style scoped>
    .gf-main {
        padding-top: 5px;
    }

    textarea {
        resize: none;
        outline: none;
    }
</style>
