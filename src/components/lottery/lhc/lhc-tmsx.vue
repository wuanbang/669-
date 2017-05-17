<template>
    <table class="lhcHm" width="100%" border="0" cellspacing="0" cellpadding="0">
        <colgroup><col width="50%"><col width="50%"></colgroup>
        <tbody>
            <tr ref="selBar">
                <td v-for="item in mainData">
                    <table width="90%" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr class="f-12">
                                <th class="td1">生肖</th><th class="td2">赔率</th><th class="td3">金额</th><th class="td4">号码</th>
                            </tr>
                            <tr v-for="type in item">
                                <td class="td1"><span class="lhcSx f-12">{{type.name | lhcsx}}</span></td>
                                <td class="td2 bonusxs f-12">{{type.bonus}}</td>
                                <td class="td3"><input class="lhc_txt" type="text" :name="type.name" @keyup="action"></td>
                                <td class="td4"><em class="lhc_round " :class="num | lhcsb(lhcData)" v-for="num in type.value">{{num}}</em></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script lang="babel">
import api from '../../../api'
import cai from '../lottery-data'
import { mapActions } from 'vuex'
import { errorMsg,succMsg,lpad } from '../../../tools/command'
export default {

    mounted(){ 
        this.$root.$on("clear_number", this.clear)
        this.getBonus()

    },
    beforeDestroy(){
        this.$root.$off("clear_number", this.clear)
    },

    data(){
        return {
            mainData : null,
            lhcData : null,
            bonus : null
        }
    },

    methods : {
        ...mapActions({
           setSelected : 'setSelected',
        }),
        action(event){
            var srcElem = event.target
            var data = {
                name : '',
                selected : []
            }
            data.name = srcElem.getAttribute("name")
            if(srcElem.value.trim()){
                var ss = /\D/g
                srcElem.value = srcElem.value.trim().replace(ss,'')
                if(srcElem.value){
                    srcElem.value = parseInt(srcElem.value)
                    if(srcElem.value > 0){
                        data.selected.push(srcElem.value)
                    } else {
                        srcElem.value = ''
                    }
                }
            }
            this.setSelected(data)
            var that = this
            this.$nextTick(function () {
                that.$root.$emit("betting")
            })
        },
        clear(){
            var selBar = this.$refs.selBar
            if(selBar){
                var all = selBar.querySelectorAll('input')
                var allArray = Array.from(all)
                if(allArray && allArray.length > 0){
                    allArray.forEach( function(element, index) {
                        if(element.value){
                            element.value = ''
                        }
                    })
                }
            }
        },
        numBarData(){
            var curLottery = this.$store.state.lottery.currentLottery
            var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
            var left = []
            var right = []
            var data = []
            var that = this
            var shu = {
                name : "shu",
                value : that.lhcData.shu,
                bonus : that.bonus["shu"]/100
            }
            var hu = {
                name : "hu",
                value : that.lhcData.hu,
                bonus : that.bonus["hu"]/100
            }
            var long = {
                name : "long",
                value : that.lhcData.long,
                bonus : that.bonus["long"]/100
            }
            var ma = {
                name : "ma",
                value : that.lhcData.ma,
                bonus : that.bonus["ma"]/100
            }
            var hou = {
                name : "hou",
                value : that.lhcData.hou,
                bonus : that.bonus["hou"]/100
            }
            var gou = {
                name : "gou",
                value : that.lhcData.gou,
                bonus : that.bonus["gou"]/100
            }
            var niu = {
                name : "niu",
                value : that.lhcData.niu,
                bonus : that.bonus["niu"]/100
            }
            var tu = {
                name : "tu",
                value : that.lhcData.tu,
                bonus : that.bonus["tu"]/100
            }
            var she = {
                name : "she",
                value : that.lhcData.she,
                bonus : that.bonus["she"]/100
            }
            var yang = {
                name : "yang",
                value : that.lhcData.yang,
                bonus : that.bonus["yang"]/100
            }
            var ji = {
                name : "ji",
                value : that.lhcData.ji,
                bonus : that.bonus["ji"]/100
            }
            var zhu = {
                name : "zhu",
                value : that.lhcData.zhu,
                bonus : that.bonus["zhu"]/100
            }
            left.push(shu)
            left.push(hu)
            left.push(long)
            left.push(ma)
            left.push(hou)
            left.push(gou)

            right.push(niu)
            right.push(tu)
            right.push(she)
            right.push(yang)
            right.push(ji)
            right.push(zhu)

            data.push(left)
            data.push(right)
            
            this.mainData = data
        },
        findNumLHC(){
            api.ajax('lottery/type/findNumLHC', {})
            .then(data => {
                if(data && data.code == '0'){
                   this.lhcData = data.data
                   this.numBarData()
                } else {
                    errorMsg(data.msg)
                }
            }, error => {
                errorMsg("系统出错，请稍后重试")
            })
        },
        getBonus(){
            api.ajax('lottery/type/findBonusLHC', {})
            .then(data => {
                if(data && data.code == '0'){
                   this.bonus = data.data
                   this.findNumLHC()
                } else {
                    errorMsg(data.msg)
                }
            }, error => {
                errorMsg("系统出错，请稍后重试")
            })
        },
    },
    computed : {

    }

}
    
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    .gf-main {
        padding-top: 5px;
    }
    .m-l-10 {
        margin-left: 10px;
    }
    .m-r-15 {
        margin-right: 18px;
    }
    .t-a-l {
        text-align: left;
    }
    input {
        outline: none;
    }
</style>