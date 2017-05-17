<template>
    <div class="balls-bd clearfix f-12" id="shengOpenNumList" style=" margin-left:0px;">
        <table class="balls-data" v-for="item in hisdata">
            <thead>
                <tr v-if="showSsc == 'ssc'">
                    <th>期号</th>
                    <th>开奖号码</th>
                    <th>后2</th>
                    <th>后3</th>
                </tr>
                <tr v-else-if="showSsc == 'elevenSelectFive'">
                    <th>期号</th>
                    <th>开奖号码</th>
                    <th>奇偶</th>
                    <th>大小</th>
                </tr>
                <tr v-else-if="showSsc == 'pk10'">
                    <th>期号</th>
                    <th>开奖号码</th>
                </tr>
            </thead>
            <tbody v-if="showSsc == 'ssc'">
                <tr v-for="elem in item">
                    <td>{{elem.titleCode}}</td>
                    <td><em>{{elem.openNum.charAt(0)}}</em><em>{{elem.openNum.charAt(1)}}</em><i>{{elem.openNum.charAt(2)}}</i><i>{{elem.openNum.charAt(3)}}</i><i>{{elem.openNum.charAt(4)}}</i></td>
                    <td :class="elem.pattern2 | hisPatternStyle">{{elem.pattern2}}</td>
                    <td :class="elem.pattern3 | hisPatternStyle">{{elem.pattern3}}</td>
                </tr>
            </tbody>
            <tbody v-else-if="showSsc == 'elevenSelectFive'">
                <tr v-for="elem in item">
                    <td>{{elem.titleCode}}</td>
                    <td><i>{{elem.openNum}}</i></td>
                    <td :class="elem.pattern2 | hisPatternStyle">{{elem.pattern2}}</td>
                    <td :class="elem.pattern3 | hisPatternStyle">{{elem.pattern3}}</td>
                </tr>
            </tbody>
            <tbody v-else-if="showSsc == 'pk10'">
                <tr v-for="elem in item">
                    <td>{{elem.titleCode}}</td>
                    <td><i>{{elem.openNum}}</i></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="babel">
import api from '../../api'
import { mapActions } from 'vuex'
import { errorMsg } from '../../tools/command'
    export default {
        mounted(){
            this.getHistory()
            this.$root.$on("getSscHistory", this.getHistory)
        },
        beforeDestroy(){
            this.$root.$off("getSscHistory", this.getHistory)
        },
        data(){
            return {
                hisdata : []
            }
        },
        computed:{
            showSsc(){
                var lottery = this.$store.state.history.lottery
                var elevenSelectFive = ['cai8','cai9','cai10']
                var pk10 = ['cai13']
                if(elevenSelectFive.indexOf(lottery) > -1){
                    return 'elevenSelectFive'
                } else if(pk10.indexOf(lottery) > -1){
                    return 'pk10'
                }
                return 'ssc'
            }
        },
        methods : {
            ...mapActions({
              setHisLottery : 'setHisLottery',
            }),
            getHistory(){
                var lottery = this.$store.state.history.lottery
                if(!lottery){
                    var query = location.search
                    if(query.indexOf('=') > -1){
                        this.setHisLottery(query.substring(query.indexOf('=') + 1))
                    }
                    lottery = this.$store.state.history.lottery
                }
                console.log('lottery', lottery)
                var sdate = this.$store.state.history.sdate || '0'
                var now = new Date()
                var pdate = new Date()
                pdate.setTime(now.getTime() - 24 * 3600 * 1000 * sdate)
                var para = {}
                var filterLot = ['cai4','cai5']
                if(filterLot.indexOf(lottery) > -1) {
                    para.beginDate = "" + pdate.getFullYear() + "0101"
                } else {
                    var month = pdate.getMonth() + 1
                    para.beginDate = "" + pdate.getFullYear() + (month >= 10 ? month : "0"+month ) + 
                                    (pdate.getDate() >= 10 ? pdate.getDate() : '0' + pdate.getDate())
                }
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
            }
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
</style>
