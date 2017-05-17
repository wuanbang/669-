<template>
    <table class="lhcHm" width="100%" border="0" cellspacing="0" cellpadding="0">
        <colgroup><col width="50%"><col width="50%"></colgroup>
        <tbody>
            <tr>
                <td colspan="2">
                    <table width="90%" border="0" cellspacing="0" cellpadding="0" style="width: 30%;">
                        <tbody ref="selBar">
                            <tr class="f-12">
                                <th>玩法</th><th>赔率</th><th>金额</th><th></th>
                            </tr>
                            <tr v-for="item in mainData">
                                <td class="td1"><span class="lhcSx f-12">{{item.cname}}</span></td>
                                <td class="td2 bonusxs f-12">{{item.bonus}}</td>
                                <td class="td3"><input class="lhc_txt" :name="item.value" type="text" @keyup="action"></td>
                                <td class="td4"></td>
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

    mounted() {
        this.$root.$on("clear_number", this.clear)
        this.getBonus()
    },
    beforeDestroy(){
        this.$root.$off("clear_number", this.clear)
    },
    
    components : {
    },

    updated(){
    },

    data(){
        return {
            mainData :
            [
                {name : "da",cname : "大",value:"09", bonus: ""},
                {name : "xiao",cname : "小",value:"01", bonus: ""},
                {name : "dan",cname : "单",value:"03", bonus: ""},
                {name : "shuang",cname : "双",value:"02", bonus: ""}
            ],
            bonus : null,
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
        getBonus(){
            api.ajax('lottery/type/findBonusLHC', {})
            .then(data => {
                if(data && data.code == '0'){
                   this.bonus = data.data
                   this.setBonus()
                } else {
                    errorMsg(data.msg)
                }
            }, error => {
                errorMsg("系统出错，请稍后重试")
            })
        },
        setBonus(){
            this.mainData.forEach((element, index) => {
                element.bonus = this.bonus["dxds"]/100
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