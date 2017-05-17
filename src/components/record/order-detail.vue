<template>
	<div class="Detailbox">
		<div class="box_top">
			<table width="100%" border="0" cellpadding="0" cellspacing="0">
				<tbody>
					<tr>
						<td>用户</td>
						<td>{{orderDetail.username}}</td>
						<td>游戏</td>
						<td>{{orderDetail.className}}</td>
						<td>玩法</td>
						<td>{{orderDetail.typeName}}</td>
					</tr>
					<tr>
						<td>注单编号</td>
						<td>{{orderDetail.id}}</td>
						<td>投单时间</td>
						<td>{{orderDetail.addTime}}</td>
						<td>总金额</td>
						<td><span v-text="orderDetail.amount"></span></td>
					</tr>
					<tr>
						<td>倍数模式</td>
						<td>
							<span v-if="orderDetail.singleMoney >= 1">{{orderDetail.multiple}}倍. 元</span>
							<span v-if="orderDetail.singleMoney == 0.2">{{orderDetail.multiple}}倍. 角</span>
							<span v-if="orderDetail.singleMoney == 0.02">{{orderDetail.multiple}}倍. 分</span>
						</td>
						<td>返点</td>
						<td><span>{{orderDetail.point}}%</span></td>
						<td>动态返点</td>
						<td><span v-text="orderDetail.pointMoney"></span></td>
					</tr>
					<tr>
						<td>中奖注数</td>
						<td>{{orderDetail.bingoCount}}</td>
						<td>注单奖金</td>
						<td><span v-text="orderDetail.bingoMoney"></span></td>
						<td>盈亏</td>
						<td><span v-text="orderDetail.resultMoney"></span></td>
					</tr>
					<tr>
						<td>奖期</td>
						<td>{{orderDetail.numTitle}}</td>
						<td>开奖内容</td>
						<td>{{orderDetail.openNum}}</td>
						<td>订单状态</td>
						<td>
							<span v-if="orderDetail.bingoFlag == 0" class="isBingoRed">未开奖</span>
                            <span v-if="orderDetail.bingoFlag == 1" class="isBingoRed">已中奖</span>
                            <span v-if="orderDetail.bingoFlag == 2" class="isBingoGreen">未中奖</span>
                            <span v-if="orderDetail.bingoFlag == 3" class="isBingoRed">中奖停追</span>
                            <span v-if="orderDetail.bingoFlag == 4" class="isBingoGrey">已撤单</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="box_content">
			<div style="display:inline-block">投注内容</div>
				<textarea class="content" v-if="orderDetail.typeName =='前二大小单双'" v-text="filter(orderDetail.orderValue)"></textarea>
				<textarea class="content" v-if="orderDetail.typeName =='后二大小单双'" v-text="filter(orderDetail.orderValue)"></textarea>
                <textarea class="content" v-if="orderDetail.typeName =='特码大小单双'" v-text="filter(orderDetail.orderValue)"></textarea>
                <textarea class="content" v-if="orderDetail.typeName !='前二大小单双' && orderDetail.typeName !='特码大小单双' && orderDetail.typeName !='后二大小单双'" v-text="orderDetail.orderValue"></textarea>
		</div>
		<div class="grey_box_top">
			<div class="grey_box_bottom">
				<div class="grey_box_tit">实际中奖情况</div>
				<table id="theTable" width="100%" border="0" cellpadding="0" cellspacing="0">
					<thead>
						<tr>
							<th>奖金名称</th>
							<th>中奖注数</th>
							<th>单注奖金</th>
							<th>倍数</th>
							<th>总奖金(注数*奖金*倍数)</th>
						</tr>	
					</thead>
					<tbody>
						<tr>
							<td>{{orderDetail.typeName}}</td>
							<td>{{orderDetail.bingoCount}}</td>
							<td align="right">
								<span v-if="orderDetail.singleMoney >= 1" v-text="orderDetail.bonus"></span>&nbsp;&nbsp;
								<span v-if="orderDetail.singleMoney == 0.2" v-text="orderDetail.bonus"></span>&nbsp;&nbsp;
								<span v-if="orderDetail.singleMoney == 0.02" v-text="orderDetail.bonus"></span>&nbsp;&nbsp;
							</td>
							<td>{{orderDetail.multiple}}</td>
							<td align="right"><span v-text="orderDetail.bingoMoney"></span>&nbsp;&nbsp;</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="box_bottom">
			<table width="100%" border="0" cellpadding="0" cellspacing="0">
				<tbody>
					<tr>
						<td><a @click.stop="reOrder">再次下注</a></td>
						<td><a @click.stop="confirm">确定</a></td>
						<td v-if="orderDetail.followId >0"><a @click.stop="openDialog(orderDetail.followId)">追号详情</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { exchange,errorMsg,succMsg }from '../../tools/command'
	import { mapActions } from 'vuex'
	export default {
		data () {
			return {
				orderDetail: {},
				form: {
					orderId: '50'
				},
			}
		},
		mounted() {
			this.$root.$on("order-detail-init",this.getData)
		},
		beforeDestroy () {
			this.$root.$off("order-detail-init",this.getData)
		},
		methods: {
			...mapActions({
                setEventView : 'setEventView',
                setNextView : 'setNextView',
                setUserMsgId : 'setUserMsgId',
                setDialogView : 'setDialogView',
            }),
			getData () {
				this.form.orderId = this.$store.state.useraction.id;
				api.ajax('order/findDetail',this.form).then(data =>{
					this.orderDetail = data.data;
				},error =>{
					errorMsg("数据请求失败")
				})
			},
			filter (value) {
				return exchange(value)
			},            
            openDialog(id){
				this.setUserMsgId(id);
				this.setDialogView('follow-detail')
                var that = this;
                this.$nextTick(function(){
                    that.$root.$emit("follow-detail-init")
                })
            },
            reOrder () {
            	this.form.orderId = this.$store.state.useraction.id;
				api.ajax('order/reorder',this.form).then(data =>{
					succMsg(data.msg)
				},error =>{
					errorMsg("数据请求失败")
				})
            },
			confirm () {
				if (this.$store.state.useraction.eventView == "game-record") {
					var that  = this;
					this.$nextTick(function(){
				  		that.$root.$emit("closeHandle-init")
				  		that.setNextView('lottery-bet')
					})
				} else if (this.$store.state.useraction.eventView == "follow-record") {
					var that  = this;
					this.$nextTick(function(){
				  		that.$root.$emit("closeHandle-init")
				  		that.setEventView('follow-record')
					})
				} else if (this.$store.state.useraction.eventView == "team-bet") {
					var that  = this;
					this.$nextTick(function(){
				  		that.$root.$emit("closeHandle-init")
				  		that.setNextView('team-lottery-bet')
					})
				}
			},
		},
	}
</script>
<style scoped>
	table {
	    border-collapse: collapse;
	}
	.Detailbox {
	    width: 580px;
	    display: block;
	    left: 138px;
	    top: 1px;
	    font-size: 12px;
	    background: transparent;
	    font-family: "微软雅黑";
	    font-weight: normal;
	    color: #000;
	}
	.box_top table td {
	    height: 25px;
	    padding: 0 5px;
	    border-bottom: solid 1px #eee;
	}
	.box_top table td:nth-child(2n) {
	   text-align: right;
	   color: #888;
	   border-right: solid 1px #eee;
	}
	.box_content {
    	padding: 10px 0 10px 15px;
	}
	.content {
	    width: 490px;
	    height: 152px;
	    border: solid 1px #ccc;
	    padding-right: 0;
	    background: #fff;
	    vertical-align: middle;
	    line-height: 23px;
	    margin: 0 5px;
	    padding: 0 3px;
	    resize: none;
	    outline: none;
	}
	.grey_box_tit {
	    height: 30px;
	    line-height: 30px;
	    font-weight: bold;
	    text-align: center;
	}
	#theTable {
	    overflow: hidden;
	    text-align: center;
	}
	#theTable thead tr {
	    height: 30px;
	}
	#theTable thead tr th {
	    height: 30px;
	    line-height: 30px;
	    font-size: 12px;
	    font-weight: normal;
	    white-space: nowrap;
	    border-bottom: solid 1px #e1e1e1;
	    background: url(../../images/thBg.png) right top no-repeat;
	}
	#theTable td {
	    height: 30px;
	    line-height: 30px;
	    font-size: 12px;
	    white-space: nowrap;
	    background: url(../../images/tableLine.gif) right top repeat-y;
	}
	#theTable tbody tr:hover td {
	    background: url(../../images/tdBgHover.png) right top no-repeat;
	}
	.box_bottom {
		text-align: center;
	}
	.box_bottom table td {
	    width: 33.333%;
	    height: 43px;
	    text-align: center;
	    font-size: 14px;
	    border-left: solid 1px #eee;
	    border-right: solid 1px #eee;
	}
	.box_bottom a:hover {
		color: #ec0000;
        cursor: pointer;
        text-decoration: underline;
	}
	.isBingoRed {
        color: #f00;
        font-weight: bold;
    }
    .isBingoGreen {
        color: #090;
        font-weight: bold;
    }
    .isBingoGrey {
        color: #888;
        font-weight: bold;
    }
</style>
