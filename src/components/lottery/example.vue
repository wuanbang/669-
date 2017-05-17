<template>
	<div class="juli">
        <ul>
            <el-popover
              ref="example"
              placement="bottom"
              width="200"
              trigger="hover"
              popper-class="self-popper"
              :content="example">
            </el-popover>

            <el-popover
              ref="help"
              placement="bottom"
              width="200"
              trigger="hover"
              popper-class="self-popper"
              :content="help">
            </el-popover>
            <li v-show="showExample" data-id="juli_tan1" v-popover:example><a class="juli1" href="javascript:void(0)">例</a></li>
            <li v-show="showHelp" data-id="juli_tan2" v-popover:help><a class="juli2" href="javascript:void(0)">?</a></li>
        </ul>
    </div>
</template>
<script lang="babel">

	import cai from './lottery-data'

	export default {

		computed : {
            showExample(){
                var curLottery = this.$store.state.lottery.currentLottery
                var cail = ['cai4', 'cai5', 'cai8', 'cai9', 'cai10', 'cai13', 'cai14']
                if(cail.indexOf(curLottery) > -1){
                    return false
                }
                return true
            },
            showHelp(){
                var curLottery = this.$store.state.lottery.currentLottery
                var cail = ['cai14']
                if(cail.indexOf(curLottery) > -1){
                    return false
                }
                return true
            },

			example(){
				return 	(this.getExamplAndHelp || {}).example
			},
			help(){
				return 	(this.getExamplAndHelp || {}).help
			},

			getExamplAndHelp(){
				var curLottery = this.$store.state.lottery.currentLottery
				var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
			    var playMethodType = this.$store.state.lottery.playMethodType

			    if(curLottery && gamePlayMethod && playMethodType){
                    if(cai && cai[curLottery] && cai[curLottery].exapmleAndHelp[gamePlayMethod]){
        			    return cai[curLottery].exapmleAndHelp[gamePlayMethod][playMethodType]
                    }
			    }
			},
		}
	}

</script>
<style scoped>

</style>
