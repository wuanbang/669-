<template>
    <div class="balls-bd clearfix f-12" id="shengOpenNumList" style=" margin-left:0px;">
        <table class="balls-data" v-for="item in hisdata" style="width: 333px;">
            <thead>
                <tr>
                    <th>期号</th>
                    <th>开奖号码</th>
                </tr>
            </thead>
            <tbody class="f-12">
                <tr v-for="elem in item">
                    <td>{{elem.titleCode}} </td>
                    <td>
                        <i class="f-12 lhc_round" :class="elem.openNum.charAt(0) | lhcsb(lhcData)">{{elem.openNum.charAt(0)}}</i>
                        <i class="f-12 lhc_round" :class="elem.openNum.charAt(1) | lhcsb(lhcData)">{{elem.openNum.charAt(1)}}</i>
                        <i class="f-12 lhc_round" :class="elem.openNum.charAt(2) | lhcsb(lhcData)">{{elem.openNum.charAt(2)}}</i>
                        <i class="f-12 lhc_round" :class="elem.openNum.charAt(3) | lhcsb(lhcData)">{{elem.openNum.charAt(3)}}</i>
                        <i class="f-12 lhc_round" :class="elem.openNum.charAt(4) | lhcsb(lhcData)">{{elem.openNum.charAt(4)}}</i>
                        <i class="f-12 lhc_round" :class="elem.openNum.charAt(5) | lhcsb(lhcData)">{{elem.openNum.charAt(5)}}</i><span class="add-style">+</span><i class="f-12 lhc_round" :class="elem.openNum.charAt(6) | lhcsb(lhcData)">{{elem.openNum.charAt(6)}}</i>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="babel">
import api from '../../api'
import { errorMsg } from '../../tools/command'
    export default {
        mounted(){
            this.findNumLHC()
            this.$root.$on("getSscHistory", this.getHistory)
        },
        beforeDestroy(){
            this.$root.$off("getSscHistory", this.getHistory)
        },
        data(){
            return {
                hisdata : [],
                lhcData : null,
            }
        },
        computed:{
        },
        methods : {
            getHistory(){
                var lottery = this.$store.state.history.lottery || 'cai1'
                var sdate = this.$store.state.history.sdate || '0'
                var now = new Date()
                var pdate = new Date()
                pdate.setTime(now.getTime() - 24 * 3600 * 1000 * sdate)
                var para = {}
                para.beginDate = "" + pdate.getFullYear() + "0101"
                para.classId = lottery.substring(3)
               
                api.ajax('lottery/num/listOpenHistory', para).then(data => {
                        if(data && data.code == '0'){
                            this.handleData(data.data)
                        } else {
                            errorMsg(data.msg)
                        }
                    }, error => {
                        errorMsg("系统出错，请稍后重试", error)
                    })
            },
            handleData(data){
                this.hisdata.splice(0, this.hisdata.length)
                if(data && data.length > 0){
                    var item = []
                    data.forEach((element, index) => {
                        var ind = index + 1
                        if(ind % 30 == 0) {
                            item.push(element)
                            this.hisdata.push(item)
                            item = []
                        } else {
                            item.push(element)
                        }
                    })
                    if(item.length > 0){
                        this.hisdata.push(item)
                    }
                }
            },
            findNumLHC(){
                api.ajax('lottery/type/findNumLHC', {})
                .then(data => {
                    if(data && data.code == '0'){
                       this.lhcData = data.data
                       this.getHistory()
                    } else {
                        errorMsg(data.msg)
                    }
                }, error => {
                    errorMsg("系统出错，请稍后重试")
                })
            },
        }

    }
</script>
<style scoped>
    table {
        border-collapse: collapse;
    }
    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        overflow: hidden;
        visibility: hidden;
    }
    .add-style {
        margin-left: 10px;
        margin-right: 10px;
    }
</style>
