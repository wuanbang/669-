<template>
	<div class="contentBox">
		<div class="grey_box_top pdt5" style="clear:both">
			<div class="grey_box_bottom pdb10">
				<ul class="form">
					<li>
						<span class="formTit">用户级别:</span>分红代理
					</li>
					<li>
						<span class="formTit">当前分红级别:</span>{{agentLevel}}级
					</li>
					<li>
						<span class="formTit">分红比例:</span>
						<input type="text" v-model="rate" class="input_txt"> %
						<span class="tip">(分红比例的范围在{{minRate}}%到{{maxRate}}%之间)</span>
					</li>
					<li class="textareali">
						<span class="formTit desc">申请说明:</span>
						<textarea id="txtAppDes" v-model="reason"></textarea>
					</li>
					<li>
						<div class="btn">
						<el-button type="text" class="btnRed4" @click.stop="submitApply">申请提升</el-button>
						</div>
						<span class="notice">{{notice}}</span>
					</li>
				</ul>
			</div>
		</div>
		<dl class="czsm">
			<dt>申请分红说明:</dt>
			<dd>1.上下级代理分红计算方式跟返点同样原理，分红月报可在分红明细里面查看。</dd>
		</dl>
	</div>	
</template>
<script lang="babel">
	import api from '../../api'
	import { errorMsg,succMsg } from '../../tools/command';
	export default {
		data () {
			return {
				rate: '',
				value: '',
				reason: '',
				notice: '',
				userInfo: {},
				form: {
					userId: '',
					rate: '',
					appDesc: '',
				},
				data: {},
			}
		},
		mounted() {
			this.getData()
		},
		computed : {
			agentLevel () {
				return this.$store.state.useraction.agentLevel;
			},
			minRate () {
				return this.$store.state.useraction.rate;
			},
			maxRate () {
				if (this.userInfo.id == this.$store.state.useraction.id) {
					return this.userInfo.rate
				}
				return this.userInfo.rate - 1;
			}
		},
		methods : {
			getData () {
				api.ajax('user/findInfo',this.form).then(data =>{
					this.userInfo = data.data;
				},error =>{
					errorMsg("数据请求失败")
				})
			},
			submitApply () {
				if (!this.rate) {
					this.notice = '分红不允许为空，请填写！'
				} else {
					if (!this.reason) {
						this.notice = '申请理由不允许为空，请填写！'
					} else {
						this.form.userId = this.$store.state.useraction.id;
						this.form.rate = this.rate;
						this.form.appDesc = this.reason;
						api.ajax('team/dividendAgent/promoteRate',this.form).then(data =>{
							succMsg(data.msg);
							this.notice = data.msg;
						},error =>{
							errorMsg("数据请求失败")
						})
					}
				}
			},
		}
	}
</script>
<style scoped>
	ul {
		list-style: none;
	}
	.contentBox {
		width: 580px;
	    font-size: 12px;
	    height: 475px;
	}
	.pdt5 {
	    padding-top: 5px;
	}
	.pdb10 {
	    padding-bottom: 10px;
	}
	.form li {
	    height: 25px;
	    line-height: 25px;
	    padding-bottom: 5px;
	}
	.form li span.formTit {
	    width: 80px;
	    text-align: right;
	    display: inline-block;
	    margin-right: 10px;
	}
	.form li.textareali {
	    height: 50px;
	    margin-bottom: 5px;
	}
	.input_txt {
		width: 58px;
	    height: 23px;
	    line-height: 23px;
	    margin: 0 5px;
	    padding: 0 3px;
	    border: solid 1px #ccc;
	    background: #fff;
	    outline: none;
	}
	textarea {
		outline: none;
		display: inline-block;
		float: right;
		margin-right: 84px;
	}
	textarea {
	    border: solid 1px #ccc;
	    padding-right: 0;
	    background: #fff;
	    vertical-align: middle;
	}
	#txtAppDes {
		margin: 12px 84px 5px 0;
		height: 50px;
    	width: 360px;
    	resize: none;
	}
	.czsm {
	    padding: 5px 30px 20px 30px;
	    line-height: 1.8em;
	}
	.czsm dt {
	    padding-bottom: 5px;
	    font-size: 14px;
	}
	.czsm dd {
		-webkit-margin-start: 0px;
	}
	.btn {
		margin-left: 90px; 
		display: inline-block;
	}
    .btnRed4 {
    	width: 114px;
		border-radius: 10px;
		background: #ec0000;
		color: #fff;
		font-weight: bold;
	}
	.btnRed4:hover {
		background: #fc0000;
	}
	.desc {
		margin-top: 25px;
	}
	.notice {
		color: #ec0000;
		margin-left: 5px;
	}
</style>