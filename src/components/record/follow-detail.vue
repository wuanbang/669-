<template>
	<div class="Detailbox">
		<div class="box_top">
			<table width="100%" border="0" cellpadding="0" cellspacing="0">
				<tbody>
					<tr>
						<td>追号编号</td>
						<td>{{orderFollowDetail.id}}</td>
						<td>游戏用户</td>
						<td>{{orderFollowDetail.username}}</td>
						<td>追号时间</td>
						<td>{{orderFollowDetail.addTime}}</td>
					</tr>
					<tr>
						<td>游戏</td>
						<td>{{orderFollowDetail.className}}</td>
						<td>玩法</td>
						<td>{{orderFollowDetail.typeName}}</td>
						<td>模式</td>
						<td>
							<span v-if="orderFollowDetail.singleMoney >= 1">{{orderFollowDetail.multiple}}倍. 元</span>
							<span v-if="orderFollowDetail.singleMoney == 0.2">{{orderFollowDetail.multiple}}倍. 角</span>
							<span v-if="orderFollowDetail.singleMoney == 0.02">{{orderFollowDetail.multiple}}倍. 分</span>
						</td>
					</tr>
					<tr>
						<td>开始期号</td>
						<td>{{orderFollowDetail.numTitle}}</td>
						<td>追号期数</td>
						<td>{{orderFollowDetail.actCount}}</td>
						<td>完成期数</td>
						<td>{{orderFollowDetail.kjCount}}</td>
					</tr>
					<tr>
						<td>取消期数</td>
						<td>{{orderFollowDetail.cancelCount}}</td>
						<td>追号总金额</td>
						<td><span v-text="orderFollowDetail.amount"></span></td>
						<td>完成金额</td>
						<td><span v-text="orderFollowDetail.kjMoney"></span></td>
					</tr>
					<tr>
						<td>中奖期数</td>
						<td>{{orderFollowDetail.bingoCount}}</td>
						<td>派奖总金额</td>
						<td><span v-text="orderFollowDetail.bingoMoney"></span></td>
						<td>取消金额</td>
						<td><span v-text="orderFollowDetail.cancelMoney"></span></td>
					</tr>
					<tr>
						<td>中奖后停止追号</td>
						<td><span v-text="orderFollowDetail.isBingoStop==true? '是' : '否'"></span></td>
						<td> </td>
						<td> </td>
						<td>追号状态</td>
						<td><span v-text="orderFollowDetail.state ==1 ? '是' : '否'"></span></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="box_content">
			<div style="display:inline-block">追号内容</div><textarea class="content">	</textarea>
		</div>
		<div class="grey_box_top">
			<div class="grey_box_bottom">
				<div class="grey_box_tit">追号列表</div>
				<div class="scroll">
				<table id="theTable" width="100%" border="0" cellpadding="0" cellspacing="0">
					<thead>
						<tr>
							<th>奖期</th>
							<th>追号倍数</th>
							<th>追号状态</th>
							<th>操作</th>
						</tr>	
					</thead>
					<tbody>
						<tr v-for="item in orderFollowDetail.list">
							<td>{{item.numTitle}}</td>
							<td>{{item.multiple}}</td>
							<td>
                                <span v-if="item.bingoFlag == 0" class="isBingoRed">未开奖</span>
                                <span v-if="item.bingoFlag == 1" class="isBingoRed">已中奖</span>
                                <span v-if="item.bingoFlag == 2" class="isBingoGreen">未中奖</span>
                                <span v-if="item.bingoFlag == 3" class="isBingoRed">中奖停追</span>
                                <span v-if="item.bingoFlag == 4" class="isBingoGrey">已撤单</span>
							</td>
							<td><a @click.stop="openDialog(item.id)">详情</a> <a @click.stop="cancelorder(item.id)" v-if="item.bingoFlag == 0" style="text-decoration:underline">撤单</a></td>
						</tr>
					</tbody>
				</table>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { succMsg,errorMsg } from '../../tools/command'
	import { mapActions } from 'vuex'
	export default {
		data () {
			return {
				orderFollowDetail: {},
				form: {
					followId: '50'
				},
			}
		},
		mounted() {
			this.$root.$on("follow-detail-init",this.getData)
		},
		beforeDestroy () {
			this.$root.$off("follow-detail-init",this.getData)
		},
		methods: {
			...mapActions({
                setEventView : 'setEventView',
                setUserMsgId : 'setUserMsgId',
                setDialogView : 'setDialogView',
            }),
			getData () {
				this.form.followId = this.$store.state.useraction.id;
				api.ajax('order/findFollowDetail',this.form).then(data =>{
					this.orderFollowDetail = data.data;
				},error =>{
					errorMsg("数据请求失败")
				})
			},
			openDialog(id){
				this.setUserMsgId(id);
				this.setDialogView('order-detail')
                var that = this;
                this.$nextTick(function(){
                    that.$root.$emit("order-detail-init")
                })
            },
            cancelorder (id) {
                this.form.orderId = id;
                api.ajax('order/cancel',this.form).then(data => {
                    succMsg(data.msg)
                    this.getData();
                }, error => {
                    errorMsg("数据请求失败");
                })
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
	    height: 90px;
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
	.scroll {
		height: 159px;
		overflow-y: scroll;
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
	#theTable td a {
        text-decoration: underline;
    }
	#theTable td a:hover {
        color: #ec0000;
        cursor: pointer;
    }
	#theTable>tbody>tr:nth-child(2n) {
        background: #f7f7f7;
    }
    #theTable>tbody>tr:hover {
        background: lightgrey;
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
