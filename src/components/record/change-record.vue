<template>
    <div id="Tab">
    	<form class="form1">
    		<div class="Menubox">
        		<el-tabs :active-name="defaultActive" @tab-click="handleClick">
	                <el-tab-pane name="lottery-change" label="彩票变帐记录"></el-tab-pane>
	                <el-tab-pane name="chess-change" label="棋牌变帐记录"></el-tab-pane>
	                <el-tab-pane name="immortal-change" label="真人变帐记录"></el-tab-pane>
	            </el-tabs>
	        </div>
	        <div>
	            <component :is="changeRecordView"></component>
	        </div>
    	</form>
    </div>
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
    import lotteryChange from './lottery-change'
    import chessChange from './chess-change'
    import immortalChange from './immortal-change'
	export default {
        components : {
          lotteryChange,
          chessChange,
          immortalChange,
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
            	console.log(tab)
                switch (tab.name) {
                      case "lottery-change":
                        this.setNextView('lottery-change')
                        break
                      case "chess-change":
                         this.setNextView('chess-change')
                         break
                      case "immortal-change":
                         this.setNextView('immortal-change')
                         break
                      default:
                         break
                    }
            },
        },
        computed : {
          changeRecordView () {
            var changerecords = this.$store.state.useraction.nextView;
            if (changerecords == 'lottery-change') {
              return "lotteryChange"
            } else if (changerecords == 'chess-change') {
              return "chessChange"
            } else if (changerecords == 'immortal-change') {
              return "immortalChange"
            }
          },
          defaultActive (){
            return this.$store.state.useraction.nextView;
          }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
            })
        },

        watch: {
           $route () {
           }
            
        },
        destroyed() {
        },

    }
</script>
<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	#Tab {
    height: 563px;
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
        width: 364px;
        margin-bottom: -17px;
    }
</style>