<template>
    <table class="lhc_table" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tbody ref="selBar">
            <tr>
                <th v-for="item in headData" class="td1 f-12 t-a-l" :name="item"><span class="m-l-10 m-r-15">号码</span>金额</th>
            </tr>
            <tr v-for="item in mainData">
                <th class="td1 t-a-l" v-for="elem in item"><em class="lhc_round m-l-10 m-r-15" :class="elem.color">{{elem.intValue}}</em><input class="lhc_txt" maxlength="6" :name="elem.value" type="text" @keyup="action"></th>
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
        this.findNumLHC()

    },
    beforeDestroy(){
        this.$root.$off("clear_number", this.clear)
    },

    data(){
        return {
            showSelectUnit : false,
            headData : [1,2,3,4,5,6,7],
            mainData : [],
            lhcData : '',
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
            var item = []
            var data = []
            for(var i = 1;i <= 49;++i) {
                var elem = {}
                var v = lpad(i+'', 2, "0")
                elem.intValue = i
                elem.value = v
                if(this.lhcData.hongbo.indexOf(v) > -1){
                    elem.color  = "red"
                } else if(this.lhcData.lvbo.indexOf(v) > -1){
                    elem.color  = "green"
                } else if(this.lhcData.lanbo.indexOf(v) > -1){
                    elem.color  = "blue"
                }
                item.push(elem)

                if( i%7 === 0){
                    data.push(item)
                    item = []
                }
            }
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
        }
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