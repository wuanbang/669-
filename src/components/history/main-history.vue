<template>
    <div class="history-main">
        <div class="balls-hd clearfix">
            <h1 class="tit"> {{lotteryName}}, {{curDate}} 开奖号码</h1>
            <span class="subs f-12" @click.stop="curDateHandle" v-show="showDay">
                显示：<a name="sdate0" href="javascript:void(0)" class="cur">今天</a>
                      <a name="sdate1" href="javascript:void(0)">昨天</a>
                      <a name="sdate2" href="javascript:void(0)">前天</a>
            </span>
        </div>
        <component :is="currentLottery">
        </component>
    </div>
</template>
<script lang="babel">
import ssc from './ssc'
import lhc from './lhc'
import lot from '../lottery/constants'
import {addClass, hasClass, toggleClass, removeClass} from '../../tools/command'
import { mapActions } from 'vuex'
export default {
    name : "mainHistory",

    components : {
        ssc,lhc
    },

    mounted(){
    },

    data() {
        return {

        }
    },

    computed: {
        currentLottery(){
            var lottery = this.$store.state.history.lottery
            if(lottery == 'cai14'){
                return 'lhc'
            } 
            return 'ssc'
        },
        lotteryName(){
            var lottery = this.$store.state.history.lottery
            return lot[lottery]
        },
        showDay(){
            var lottery = this.$store.state.history.lottery
            var filterLot = ['cai4','cai5','cai14']
            return filterLot.indexOf(lottery) == -1
        },
        curDate(){
            var sdate = this.$store.state.history.sdate
            var now = new Date()
            var pdate = new Date()
            var lottery = this.$store.state.history.lottery
            var filterLot = ['cai4','cai5','cai14']
            if(filterLot.indexOf(lottery) > -1){
                return pdate.getFullYear() + ""
            }else {
                pdate.setTime(now.getTime() - 24 * 3600 * 1000 * sdate)
                var month = pdate.getMonth() + 1
                return "" + pdate.getFullYear() +'-'+ ( month >= 10 ? month >= 10 : "0" + month) +'-'+
                                (pdate.getDate() >= 10 ? pdate.getDate() : '0' + pdate.getDate())
            }
        }
    },

    methods: {
        ...mapActions({
          setHisDate : 'setHisDate',
        }),
        curDateHandle(event){
            var srcElem = event.target
            var curElem = event.currentTarget
            var selected = curElem.querySelector(".cur")
            if(selected){
                removeClass(selected, 'cur')
            }
            if(srcElem && srcElem.tagName.toLowerCase() == 'a'){
                var sdate = srcElem.getAttribute("name")
                this.setHisDate(sdate.substr(5))
                addClass(srcElem, 'cur')
                this.$root.$emit("getSscHistory")
            }
        },
    }
}
    
</script>
<style scoped>
    a {
        text-decoration: none;
    }

</style>
