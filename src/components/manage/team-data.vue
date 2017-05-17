<template>
	<div style="height:563px">
		<div class="account-tabs">
			<el-tabs :active-name="defaultActive" @tab-click="handleClick">
				<el-tab-pane name="team-message" label="团队数据信息"></el-tab-pane>
				<el-tab-pane name="team-yk" label="团队数据盈亏日报"></el-tab-pane>
			</el-tabs>
		</div>
		<div>
			<component :is="teamDataView"></component>
		</div>
	</div>
</template>
<script lang="babel">
	import { mapActions } from 'vuex'
    import teamMessage from './team-message'
    import teamYk from './team-yk'
	export default {
		components : {
          teamMessage,
          teamYk,
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
					case 'team-message':
					this.$store.state.useraction.id = ''
					var that = this;
					this.$nextTick(function(){
	                    that.$root.$emit("team-message-init")
	                })
					this.setNextView('team-message') 
					break
					case 'team-yk':
					this.setNextView('team-yk') 
					break
				}
			}
		},
		computed : {
          teamDataView () {
            var teamdatarecords = this.$store.state.useraction.nextView;
            if (teamdatarecords == 'team-message') {
              return "teamMessage"
            } else if (teamdatarecords == 'team-yk') {
              return "teamYk"
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
        width: 265px;
        margin-bottom: -17px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>