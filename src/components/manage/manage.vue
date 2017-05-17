<template>
	<div style="height:563px">
		<div :class="{'account-tabs_1' : wt68,'account-tabs_2' : wt57}">
			<el-tabs :active-name="defaultActive" @tab-click="handleClick">
				<el-tab-pane name="add-member" label="添加会员"></el-tab-pane>
				<el-tab-pane name="member-list" label="会员列表"></el-tab-pane>
				<el-tab-pane name="team-bet" label="团队投注"></el-tab-pane>
				<el-tab-pane name="team-change" label="团队变帐"></el-tab-pane>
				<el-tab-pane name="team-statement" label="团队报表"></el-tab-pane>
				<el-tab-pane name="team-data" label="团队数据"></el-tab-pane>
				<el-tab-pane  name="team-fenhong" label="团队月分红"></el-tab-pane>
			</el-tabs>
		</div>
		<div>
			<component :is="manageView"></component>
		</div>
	</div>
</template>
<script lang="babel">
	import { mapActions } from 'vuex'
  	import addMember from './add-member'
  	import memberList from './member-list'
  	import teamBet from './team-bet'
  	import teamChange from './team-change'
  	import teamStatement from './team-statement'
  	import teamData from './team-data'
  	import teamFenhong from './team-fenhong'
	export default {
		components : {
          addMember,
          memberList,
          teamBet,
          teamChange,
          teamStatement,
          teamData,
          teamFenhong,
        },
		data () {
			return {
				wt68: false,
				wt57: false,
				agent: '',
			}
		},
		mounted () {
			this.agent = this.$store.state.useraction.userAgent
		},
		methods :{
			...mapActions({
              setEventView : 'setEventView',
              setNextView : 'setNextView',
            }),
			handleClick (tab) {
				console.log(tab)
				switch (tab.name) {
					case "add-member":
					this.setEventView('add-member')
					break
					case "member-list":
					this.setEventView('member-list')
					break
					case "team-bet":
					this.setEventView('team-bet')
					this.setNextView('team-lottery-bet')
					break
					case "team-change":
					this.setEventView('team-change')
					this.setNextView('team-lottery-change')
					break
					case "team-statement":
					this.setEventView('team-statement')
					break
					case "team-data":
					this.$store.state.useraction.id = ''
					var that = this;
					this.$nextTick(function(){
	                    that.$root.$emit("team-message-init")
	                })
					this.setEventView('team-data')
					this.setNextView('team-message')
					break
					case "team-fenhong":
					this.setEventView('team-fenhong')
					this.setNextView('fenhong-sum')
					break
				}
			}
		},
		computed : {
          manageView () {
            var manages = this.$store.state.useraction.eventView;
            if (manages == 'add-member') {
              return "addMember"
            } else if (manages == 'member-list') {
              return "memberList"
            } else if (manages == 'team-bet') {
              return "teamBet"
            } else if (manages == 'team-change') {
              return "teamChange"
            } else if (manages == 'team-statement') {
              return "teamStatement"
            } else if (manages == 'team-data') {
              return "teamData"
            } else if (manages == 'team-fenhong') {
              return "teamFenhong"
            }
          },
          defaultActive (){
            return this.$store.state.useraction.eventView;
          }
        },
	}
</script>
<style scoped>
    .account-tabs_1 {
        margin-left: auto;
        margin-right: auto;
        width: 68%;
        margin-bottom: -17px;
    }
    .account-tabs_2 {
        margin-left: auto;
        margin-right: auto;
        width: 57%;
        margin-bottom: -17px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>