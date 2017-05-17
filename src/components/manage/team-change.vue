<template>
	<div style="height:563px">
		<div class="account-tabs">
			<el-tabs :active-name="defaultActive" @tab-click="handleClick">
				<el-tab-pane name="team-lottery-change" label="团队彩票变帐记录"></el-tab-pane>
				<el-tab-pane name="team-chess-change" label="团队棋牌变帐记录"></el-tab-pane>
				<el-tab-pane name="team-immortal-change" label="团队真人变帐记录"></el-tab-pane>
			</el-tabs>
		</div>
		<div>
			<component :is="teamChangeView"></component>
		</div>
	</div>
</template>
<script lang="babel">
	import { mapActions } from 'vuex'
    import teamLotteryChange from './team-lottery-change'
    import teamChessChange from './team-chess-change'
    import teamImmortalChange from './team-immortal-change'
	export default {
		components : {
          teamLotteryChange,
          teamChessChange,
          teamImmortalChange,
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
					case 'team-lottery-change':
					this.setNextView('team-lottery-change') 
					break
					case 'team-chess-change':
					this.setNextView('team-chess-change') 
					break
					case 'team-immortal-change':
					this.setNextView('team-immortal-change') 
					break
				}
			}
		},
		computed : {
          teamChangeView () {
            var teamchangerecords = this.$store.state.useraction.nextView;
            if (teamchangerecords == 'team-lottery-change') {
              return "teamLotteryChange"
            } else if (teamchangerecords == 'team-chess-change') {
              return "teamChessChange"
            } else if (teamchangerecords == 'team-immortal-change') {
              return "teamImmortalChange"
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
        width: 440px;
        margin-bottom: -17px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>