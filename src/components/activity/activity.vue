<template>
	<div >
		<div class="account-tabs">
			<el-tabs :active-name="defaultActive" @tab-click="handleClick">
				<el-tab-pane name="point-exchange" label="积分兑换"></el-tab-pane>
				<el-tab-pane name="yj-point" label="三级佣金"></el-tab-pane>
				<el-tab-pane name="sign-user" label="签到领奖"></el-tab-pane>
			</el-tabs>
		</div>
		<div>
			<component :is="activityView"></component>
		</div>
	</div>
</template>
<script lang="babel">
	import { mapActions } from 'vuex'
	import pointExchange from './point-exchange'
	import exchangeRecord from './exchange-record'
	import yjPoint from './yj-point'
	import yjDetailList from './yj-detail-list'
	import signUser from './sign-user'
	import signDayLog from './sign-day-log'
	export default {
		components : {
			pointExchange,
			exchangeRecord,
			yjPoint,
			yjDetailList,
			signUser,
			signDayLog,
		},
		data () {
			return {
			}
		},
		methods : {
			...mapActions({
              setEventView : 'setEventView'
            }),
			handleClick (tab) {
				console.log(tab);
				switch (tab.name) {
					case 'point-exchange':
					this.setEventView('point-exchange') 
					break
					case 'yj-point':
					this.setEventView('yj-point') 
					break
					case 'sign-user':
					this.setEventView('sign-user') 
					break
					default:
                    break
				}
			}
		},
		computed : {
			activityView () {
				var activitys = this.$store.state.useraction.eventView;
	            if (activitys == 'point-exchange') {
	              return "pointExchange"
	            } else if (activitys == 'yj-point') {
	              return "yjPoint"
	            } else if (activitys == 'sign-user') {
	              return "signUser"
	            } else if (activitys == 'exchange-record') {
	              return "exchangeRecord"
	            } else if (activitys == 'yj-detail-list') {
	              return "yjDetailList"
	            } else if (activitys == 'sign-day-log') {
	              return "signDayLog"
	            }
			},
			defaultActive (){
	           	return this.$store.state.useraction.eventView;
	        }
		},
	}
</script>
<style scoped>
	.account-tabs {
        margin-left: auto;
        margin-right: auto;
        width: 268px;
        margin-bottom: -17px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>