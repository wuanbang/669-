<template>
	<div class="contentBox">
		<div class="grey_box_top">
			<div class="grey_box_bottom">
				<div class="shuju_box bg2">
					<table width="100%" border="0" cellpadding="0" cellspacing="0"> 
						<tbody>
							<tr>
								<td rowspan="2" class="shuju_td1">综合 : </td>
								<td>团队余额:</td>
								<td class="txtGrey"><span v-text="data.dayMoney" :title="data.dayMoney"></span>元</td>
								<td>今日新注册:</td>
								<td class="txtGrey">{{data.regNum}}人，充值{{data.regPayNum}}人</td>
								<td>团队充值:</td>
								<td class="txtGrey"><span v-text="data.payMoneyAll" :title="data.payMoneyAll"></span>元</td>
							</tr>
							<tr>
								<td>团队人数:</td>
								<td class="txtGrey">{{data.userNum}}人</td>
								<td>当前在线会员:</td>
								<td class="txtGrey">0人</td>
								<td>团队取款:</td>
								<td class="txtGrey"><span v-text="data.takeMoneyAll" :title="data.takeMoneyAll"></span>元</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="shuju_box">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tbody>
							<tr>
								<td rowspan="2" class="shuju_td1">彩票 : </td>
								<td>彩票投注总额:</td>
								<td class="txtGrey"><span v-text="data.realTz" :title="data.realTz"></span>元</td>
								<td>团队彩票返点:</td>
								<td class="txtGrey"><span v-text="data.pointMoneyMax" :title="data.pointMoneyMax"></span>元</td>
								<td>团队佣金总额:</td>
								<td class="txtGrey"><span v-text="data.yjMoneyMax" :title="data.yjMoneyMax"></span>元</td>
							</tr>
							<tr>
								<td>彩票中奖总额:</td>
								<td class="txtGrey"><span v-text="data.bingoMoney" :title="data.bingoMoney"></span>元</td>
								<td>我的彩票返点:</td>
								<td class="txtGrey"><span v-text="data.pointMoneyMaxAgent" :title="data.pointMoneyMaxAgent"></span>元</td>
								<td>团队彩票盈亏:</td>
								<td class="txtGrey"><span v-text="data.resultMoneyPt" :title="data.resultMoneyPt"></span>元</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="shuju_box bg2">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tbody>
							<tr>
								<td rowspan="2" class="shuju_td1">棋牌 : </td>
								<td>棋牌洗码量（赢）:</td>
								<td class="txtGrey"><span v-text="data.dayQPWin" :title="data.dayQPWin"></span>元</td>
								<td>我的棋牌返点:</td>
								<td class="txtGrey"><span v-text="data.dayQPMyFd" :title="data.dayQPMyFd"></span>元</td>
								<td>&nbsp;</td>
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td>团队棋牌返点:</td>
								<td class="txtGrey"><span v-text="data.dayQPAllFd" :title="data.dayQPAllFd"></span>元</td>
								<td>团队棋牌盈亏:</td>
								<td class="txtGrey"><span v-text="data.dayQPAllProfit" :title="data.dayQPAllProfit"></span>元</td>
								<td>&nbsp;</td>
								<td>&nbsp;</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="shuju_box">
					<table width="100%" border="0" cellpadding="0" cellspacing="0"> 
						<tbody>
							<tr>
								<td rowspan="2" class="shuju_td1">真人 : </td>
								<td>投注总额:</td>
								<td class="txtGrey">0元</td>
								<td>团队余额:</td>
								<td class="txtGrey">0元</td>
								<td>&nbsp;</td>
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td>总注单数:</td>
								<td class="txtGrey">0元</td>
								<td>团队人数:</td>
								<td class="txtGrey">0元</td>
								<td>&nbsp;</td>
								<td>&nbsp;</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="shuju_box" style="background-color:white">
				<table width="100%" border="0" cellpadding="0" cellspacing="0"> 
					<tbody>
						<tr>
							<td rowspan="2" class="shuju_td1">总计 : </td>
							<td>团队盈亏总计:</td>
							<td class="numRed"><span v-text="(data.resultMoneyPt+data.dayQPAllProfit)" :title="(data.resultMoneyPt+data.dayQPAllProfit)"></span>元</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { datePick,errorMsg } from '../../tools/command'
	export default {
		data () {
			return {
				form: {
					bDate: '',
					eDate: '',
					agentId: '',
				},
				data: {},
			}
		},
		mounted() {
			this.form.agentId = this.$store.state.useraction.id;
			this.value1 = new Date();
            this.value2 = new Date();
			this.getData();
		},
		methods : {
			getData () {
				var date = datePick(this.value1,this.value2);
				this.form.bDate =  this.value1.getFullYear() + '-' + date.month1 + '-' + date.day1;
                this.form.eDate =  this.value2.getFullYear() + '-' + date.month2 + '-' + date.day2;
				api.ajax('team/findTeamReport',this.form).then(data =>{
					if ( data && data.code=="0" ) {
						this.data = data.data;
					}
				}, error =>{
					errorMsg("数据请求失败")
				})
			},
		} 
	}
</script>
<style scoped>
	* {
	    margin: 0;
	    padding: 0;
	}
	a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }
    ul {
    	list-style: none;
    }
    input {
        outline: medium;
    }
    table {
    	border-collapse: collapse;
    	table-layout: fixed;
    }
    td{
	    word-break: keep-all;/* 不换行 */
        white-space: nowrap;/* 不换行 */
        overflow: hidden;/* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一 起使用。*/ 
	}
    .shuju_box {
	    padding: 22px 0;
	}
	.shuju_box.bg2 {
	    background: url(../../images/tdBg.png) 0 0 repeat;
	}
	.shuju_box table {
	    width: 95%;
	    margin: 0 auto;
	}
	.shuju_box table td {
	    height: 28px;
	    text-align: right;
	}
	.shuju_td1 {
	    font-size: 20px;
	    padding-right: 20px;
	}
	.txtGrey {
	    color: #888;
	}
	.numRed {
		color: #f00;
	}
</style>