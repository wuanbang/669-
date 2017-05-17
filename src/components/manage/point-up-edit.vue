<template>
	<div class="contentBox">
		<div class="grey_box_top pdt5" style="clear:both">
			<div class="grey_box_bottom pdb10">
				<ul class="form">
					<li>
						<span class="formTit">用户级别:</span>代理
					</li>
					<li>
						<span class="formTit">分红等级:</span>3级
					</li>
					<li>
						<span class="formTit">分红比例:</span>
						<input type="text" v-model="rate" class="input_txt"> %
					</li>
					<li>
						<span class="formTit">分红生效时间:</span>
						<el-date-picker v-model="value" type="date" style="width:120px"></el-date-picker>
					</li>
					<li class="textareali">
						<span class="formTit desc">申请说明:</span>
						<textarea id="txtAppDes" v-model="reason"></textarea>
					</li>
					<li>
						<div class="btn">
						<el-button type="text" class="btnRed4" @click.stop="submitApply">申请提升</el-button>
						</div>
						<span id="notice">{{notice}}</span>
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
				form: {
					userId: '',
					point: '',
					beginTime: '',
					appDesc: '',
				},
				data: {},
			}
		},
		mounted() {
			this.data.userId = this.$store.state.useraction.id;
			this.value = new Date();
		},
		methods : {
			submitApply () {
				var month1 = this.value.getMonth() +1;
                if (month1 < 10) {
                    month1 = '0' + month1;
                } else {
                    month1 = '' + month1;
                }
                var day1 = this.value.getDate();
                if (day1 < 10) {
                    day1 = '0' + day1;
                } else {
                    day1 = '' + day1;
                }
                this.form.beginTime =  this.value.getFullYear() + '-' + month1 + '-' + day1;
				if (!this.rate) {
					this.notice = '分红不允许为空，请填写！'
				} else {
					if (!this.reason) {
						this.notice = '申请理由不允许为空，请填写！'
					} else {
						this.form.userId = this.data.userId;
						this.form.point = this.rate;
						this.form.appDesc = this.reason;
						api.ajax('team/point/apply',this.form).then(data =>{
							succMsg(data.msg)
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
	    width: 75px;
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
    	width: 365px;
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
		margin-left: 85px; 
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
	#notice {
		color: #ec0000;
		margin-left: 5px;
	}
</style>