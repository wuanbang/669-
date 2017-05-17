<template>
	<div class="Detailbox">
		<div class="caozuo_box clearfix">
			<div class="caozuo_box_left"><img src="../../images/user_90x90.png"></div>
			<div class="caozuo_box_right">
				<div class="caozuo_box_right_top">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tbody>
							<tr>
								<td>账户名</td>
								<td class="td2">{{userAction.username}}</td>
								<td>用户ID号</td>
								<td class="td4">{{userAction.id}}</td>
							</tr>
							<tr>
								<td>用户类型</td>
								<td class="td2">
									<span v-if="directAgent ==0">代理</span>
									<span v-if="directAgent ==1">代理</span>
								</td>
								<td>用户返点</td>
								<td class="td4">{{userAction.point}}%</td>
							</tr>
							<tr>
								<td>可用余额</td>
								<td class="td2">
									<span v-text="userAction.balance"></span>
								</td>
								<td>团队余额</td>
								<td class="td4">
									<span v-text="userAction.leftMoney"></span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="caozuo_box_right_bottom">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tbody>
							<tr>
								<td>
									<el-button type="text" class="btnRed4 wid82" size="small" @click.stop="inRebatePromote">返点提升></el-button>
								</td>
								<td>
									<el-button type="text" class="btnRed4 wid104" size="small" @click.stop="rebateRecord">返点申请记录></el-button>
								</td>
								<td v-if="directAgent ==0 && agentLevel <3 && agentLevel >0 && userAgent ==1">
									<el-button type="text" class="btnRed4 wid111" size="small" @click.stop="pointUpEdit">提升为分红代理></el-button>
								</td>
								<td v-if="directAgent ==1">
									<el-button type="text" class="btnRed4 wid82" size="small" @click.stop="fenhongPromote">分红提升></el-button>
								</td>
								<td v-if="directAgent ==1">
									<el-button type="text" class="btnRed4 wid104" size="small" @click.stop="fenhongRecord">分红申请记录</el-button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div>
			<component :is="rebatePromoteView"></component>
		</div>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { mapActions } from 'vuex'
	import { errorMsg } from '../../tools/command'
	import rebatePromote from './rebate-promote'
	import rebateRecord from './rebate-record'
	import pointUpEdit from './point-up-edit'
	import fenhongPromote from './fenhong-promote'
	import fenhongRecord from './fenhong-record'
	export default {
		components : {
			rebatePromote,
			rebateRecord,
			pointUpEdit,
			fenhongPromote,
			fenhongRecord
		},
		data () {
			return {
				userAction: {},
				form: {
					userId : '',
				},
			}
		},
		mounted() {
			this.$root.$on("point-up-init",this.pointUp)
			this.$root.$on("user-action-init",this.getData)
		},
		beforeDestroy () {
			this.$root.$on("point-up-init",this.pointUp)
			this.$root.$off("user-action-init",this.getData)
		},
		computed: {
			rebatePromoteView () {
				var second = this.$store.state.useraction.secondView; 
                if (second == 'rebate-promote') {
                    return "rebatePromote"
                } else if (second == 'rebate-record') {
                	return "rebateRecord"
                } else if (second == 'point-up-edit') {
                	return "pointUpEdit"
                } else if (second == 'fenhong-promote') {
                	return "fenhongPromote"
                } else if (second == 'fenhong-record') {
                	return "fenhongRecord"
                }
			},
			agentLevel () {
				return this.$store.state.useraction.agentLevel;
			},
			directAgent () {
				return this.$store.state.useraction.agent;
			},
			userAgent () {
				return this.$store.state.useraction.userAgent;
			}
		},
		methods : {
			...mapActions({ 
              	setSecondView : 'setSecondView',
              	setPoint : 'setPoint'
			}),
			getData () {
				this.form.userId = this.$store.state.useraction.id;
				api.ajax('team/member/findMemberInfo',this.form).then(data =>{
					this.userAction = data.data
					this.setPoint(this.userAction.point)
				},error =>{
					errorMsg("数据请求失败")
				})
			},
			pointUp () {
				this.userAction.point = this.$store.state.useraction.point
			},
			inRebatePromote () {
				console.log(123122313)
				this.setSecondView('rebate-promote');
			},
			rebateRecord () {
				this.setSecondView('rebate-record')
			},
			pointUpEdit () {
				this.setSecondView('point-up-edit')
			},
			fenhongPromote () {
				this.setSecondView('fenhong-promote')
			},
			fenhongRecord () {
				this.setSecondView('fenhong-record')
			},
		}
	}
</script>
<style scoped>
	.Detailbox {
	    width: 580px;
	    font-size: 12px;
	    background: transparent;
	    font-family: "微软雅黑";
	    font-weight: normal;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: -17px;
        color: #000;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
	.caozuo_box {
	    padding: 10px 20px;
	    float: right;
	}
	.caozuo_box_left {
	    float: left;
	    margin: 10px 20px 0 0;
	}
	.caozuo_box_right {
	    float: right;
	    width: 430px;
	}
	.caozuo_box_right_top table td {
	    height: 28px;
	}
	.caozuo_box_right_top table td.td2 {
	    padding-right: 80px;
	    text-align: right;
	    color: #888;
	}
	.caozuo_box_right_top table td.td4 {
	    text-align: right;
	    color: #888;
	}
	.caozuo_box_right_foot {
	    padding-top: 5px;
	}
	.btnRed4 {
		border-radius: 5px;
		background: #ec0000;
		color: #fff;
	}
	.btnRed4:hover {
		background: #fc0000;
	}
	.wid82 {
		width: 82px;
	}
	.wid104 {
		width: 104px;
	}
	.wid111 {
		width: 111px;
	}
</style>