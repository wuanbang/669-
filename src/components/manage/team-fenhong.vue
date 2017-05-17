<template>
	<div style="height:563px" >
		<div class="account-tabs">
			<el-tabs :active-name="defaultActive" @tab-click="handleClick">
				<el-tab-pane name="fenhong-sum" label="当前分红数据"></el-tab-pane>
				<el-tab-pane name="fenhong-dav-log" label="团队分红日报"></el-tab-pane>
				<el-tab-pane name="fenhong-month-log" label="团队分红月报"></el-tab-pane>
				<el-tab-pane name="fenhong-agent-list" label="团队分红会员"></el-tab-pane>
			</el-tabs>
		</div>
		<div>
			<component :is="teamFenhongView"></component>
		</div>
	</div>
</template>
<script lang="babel">
	import { mapActions } from 'vuex'
    import fenhongSum from './fenhong-sum'
    import fenhongDavLog from './fenhong-dav-log'
    import fenhongMonthLog from './fenhong-month-log'
    import fenhongAgentList from './fenhong-agent-list'
	export default {
		components : {
          fenhongSum,
          fenhongDavLog,
          fenhongMonthLog,
          fenhongAgentList,
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
					case 'fenhong-sum':
					this.setNextView('fenhong-sum') 
					break
					case 'fenhong-dav-log':
					this.setNextView('fenhong-dav-log') 
					break
					case 'fenhong-month-log':
					this.setNextView('fenhong-month-log') 
					break
					case 'fenhong-agent-list':
					this.setNextView('fenhong-agent-list') 
					break
				}
			}
		},
		computed : {
          teamFenhongView () {
            var teamfenhongrecords = this.$store.state.useraction.nextView;
            if (teamfenhongrecords == 'fenhong-sum') {
              	return "fenhongSum"
            } else if (teamfenhongrecords == 'fenhong-dav-log') {
              	return "fenhongDavLog"
            } else if (teamfenhongrecords == 'fenhong-month-log') {
              	return "fenhongMonthLog"
            } else if (teamfenhongrecords == 'fenhong-agent-list') {
            	return "fenhongAgentList"
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
        width: 471px;
        margin-bottom: -17px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>