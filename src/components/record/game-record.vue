<template>
    <div id="Tab">
    	<form class="form1">
    		<div class="Menubox">
        		<el-tabs :active-name="defaultActive" @tab-click="handleClick">
	                <el-tab-pane name="lottery-bet" label="彩票投注"></el-tab-pane>
	                <el-tab-pane name="chess-bet" label="棋牌投注"></el-tab-pane>
	                <el-tab-pane name="immortal-bet" label="真人投注"></el-tab-pane>
	            </el-tabs>
	        </div>
	        <div>
	            <component :is="gameRecordView"></component>
	        </div>
    	</form>
    </div>
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
    import lotteryBet from './lottery-bet'
    import chessBet from './chess-bet'
    import immortalBet from './immortal-bet'
	export default {
        components : {
          lotteryBet,
          chessBet,
          immortalBet,
        },
        data(){
            return {
            }
        },
        methods :{
            ...mapActions({
              setNextView : 'setNextView'
            }),
            handleClick (tab) {
                switch (tab.name) {
                      case "lottery-bet":
                        this.setNextView('lottery-bet')
                        break
                      case "chess-bet":
                         this.setNextView('chess-bet')
                         break
                      case "immortal-bet":
                         this.setNextView('immortal-bet')
                         break
                      default:
                         break
                    }
            },
        },
        computed : {
          gameRecordView () {
            var gamerecords = this.$store.state.useraction.nextView;
            if (gamerecords == 'lottery-bet') {
              return "lotteryBet"
            } else if (gamerecords == 'chess-bet') {
              return "chessBet"
            } else if (gamerecords == 'immortal-bet') {
              return "immortalBet"
            }
          },
          defaultActive (){
            return this.$store.state.useraction.nextView;
          }
        },
    }
</script>
<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	#Tab {
		background-color: transparent;
		font-size: 12px;
		color: #000;
	}
    .account-tabs {
        margin-left: auto;
        margin-right: auto;
        width: 400px;
        margin-bottom: -17px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .Menubox {
        margin-left: auto;
        margin-right: auto;
        width: 300px;
        margin-bottom: -17px;
    }
</style>