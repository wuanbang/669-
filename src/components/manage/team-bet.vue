<template>
	<div style="height:563px">
		<div class="account-tabs">
			<el-tabs :active-name="defaultActive" @tab-click="handleClick">
				<el-tab-pane name="team-lottery-bet" label="团队彩票投注"></el-tab-pane>
				<el-tab-pane name="team-chess-bet" label="团队棋牌投注"></el-tab-pane>
				<el-tab-pane name="team-immortal-bet" label="团队真人投注"></el-tab-pane>
			</el-tabs>
		</div>
		<div>
			<component :is="teamBetView"></component>
		</div>
	</div>
</template>
<script lang="babel">
	import { mapActions } from 'vuex'
    import teamLotteryBet from './team-lottery-bet'
    import teamChessBet from './team-chess-bet'
    import teamImmortalBet from './team-immortal-bet'
	export default {
		components : {
          teamLotteryBet,
          teamChessBet,
          teamImmortalBet,
        },
		data () {
			return {
			}
		},
		methods : {
			...mapActions({
              setNextView : 'setNextView'
            }),
			handleClick (tab) {
				console.log(tab);
				switch (tab.name) {
					case 'team-lottery-bet':
					this.setNextView('team-lottery-bet') 
					break
					case 'team-chess-bet':
					this.setNextView('team-chess-bet') 
					break
					case 'team-immortal-bet':
					this.setNextView('team-immortal-bet') 
					break
				}
			}
		},
		computed : {
          teamBetView () {
            var teambetrecords = this.$store.state.useraction.nextView;
            if (teambetrecords == 'team-lottery-bet') {
              return "teamLotteryBet"
            } else if (teambetrecords == 'team-chess-bet') {
              return "teamChessBet"
            } else if (teambetrecords == 'team-immortal-bet') {
              return "teamImmortalBet"
            }
          },
          defaultActive (){
            return this.$store.state.useraction.nextView;
          }
        },
	}
</script>
<style scoped>
	.account-tabs {
        margin-left: auto;
        margin-right: auto;
        width: 38%;
        margin-bottom: -17px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>