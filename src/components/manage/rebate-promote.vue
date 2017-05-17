<template>
	<div class="contentBox">
		<div class="grey_box_top pdt5" style="clear:both">
			<div class="grey_box_bottom pdb10">
				<ul class="form">
					<li>
						<span class="formTit">用户级别:</span>
						代理用户
					</li>
					<li>
						<span class="formTit">当前返点:</span>
						{{userpoint}}%
					</li>
					<li>
						<span class="formTit">返点操作:</span>
						<input type="text" v-model="range" class="input_txt" name="range">
						<span class="range">范围{{userpoint}}至{{maxpoint}}</span>
						<span class="notice">{{notice}}</span>
					</li>
					<li class="textareali">
						<span class="formTit desc">申请说明:</span>
						<textarea id="txtAppDes" v-model="reason"></textarea>
					</li>
					<li>
						<div class="btn">
							<el-button type="text" class="btnRed4" @click.stop="submitapply">提交申请</el-button>
						</div>
						<span class="notice">{{notice1}}</span>
					</li>
				</ul>
			</div>
		</div>
		<dl class="czsm">
			<dt>申请返点说明:</dt>
			<dd>1.本功能是防止平台内招高点限号设置，提交申请后联系客服审核，申请结果与状态在返点记录内查看。</dd>
			<dd>2.如查询是(1.平台原有成员(内招)、2.该用户资料信息未设置、有本平台多号)一律拒绝申请。</dd>
		</dl>
	</div>	
</template>
<script lang="babel">
	import api from '../../api'
	import { mapActions } from 'vuex'
	import { errorMsg,succMsg } from '../../tools/command'
	export default {
		data () {
			return {
				userpoint: '',
				radio1: '',
				range: '',
				userInfo: {},
				notice: '',
				notice1: '',
				reason: '',
				form: {
					userId: '',
					username: '',
					point: '',
					pointBdw: '',
					appDesc: '',
				},
			}
		},
		mounted () {
			this.getData()
		},
		computed: {
			userpoint(){
				return this.$store.state.useraction.point;
			},
			maxpoint() {
				return this.userInfo.point -0.1
			}
		},
		methods : {
			...mapActions({
				setPoint: 'setPoint'
			}),
			getData () {
				api.ajax('user/findInfo',this.form).then(data =>{
					this.userInfo = data.data;
				},error =>{
					errorMsg("数据请求失败")
				})
				this.data = this.$store.state.useraction.member;
			},
			//userPointUp已弃用，统一合并为提交申请
			userPointUp () {
				this.setPoint(this.range);
				var that = this;
				this.$nextTick(function(){
					that.$root.$emit('point-up-init')
				})
				this.form.point = this.range;
				this.form.pointBdw = this.range;
				this.form.userId = this.$store.state.useraction.id;
				api.ajax('team/point/apply',this.form).then(data =>{
					succMsg(data.msg)
				},error =>{
					errorMsg("数据请求失败")
				})
			},
			pointUpApply () {
				this.form.point = this.range;
				this.form.pointBdw = this.range;
				this.form.userId = this.$store.state.useraction.id;
				this.form.appDesc = this.reason
				api.ajax('team/point/apply',this.form).then(data =>{
					succMsg(data.msg)
					this.notice1 = data.msg;
				},error =>{
					errorMsg("数据请求失败")
				})
			},
			submitapply () {
				this.notice1 = '';
				this.notice = '';
				if (!this.reason) {
					this.notice1 = '申请理由不允许为空，请填写！'
				} else {
					this.notice1 ='';
					if (!this.range) {
						this.notice = '返点不允许为空，请填写！'
					} else if(!this.range.match(/^[0-9]+(.[0-9]{1})?$/)){
						this.notice = '小数点后面只能填写一个数字,请删除多余的数字!';
					} else {
						if (Number(this.range) < Number(this.userpoint) || Number(this.range) > (Number(this.userInfo.point)-0.1)) {
							this.notice = '抱歉，您填写的定位返点超出了范围值！';
						} else {
							this.pointUpApply();
						}
					}
				}
			},
			clear () {
				this.range = '';
				this.reason = '';
				this.notice = '';
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
	    width: 60px;
	    text-align: right;
	    display: inline-block;
	    margin-right: 10px;
	}
	.form li.textareali {
	    height: 50px;
	    margin-bottom: 5px;
	}
	.input_txt {
		width: 50px;
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
		height: 50px;
    	width: 380px;
    	resize: none;
	}
	.czsm {
	    padding: 0px 30px 15px 30px;
	    line-height: 1.8em;
	}
	.czsm dt {
	    padding-bottom: 5px;
	    font-size: 14px;
	}
	.czsm dd {
		-webkit-margin-start: 0px;
	}
	.btnGreen3 {
		width: 75px;
        background: #3dcb00;
        color: #fff;
        border-radius: 5px;
    }
    .btnGreen3:hover {
        background: #55df00;
    }
    .btn {
    	margin-left: 70px; 
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
		margin-top: 15px;
	}
	.range {
		margin: 0 5px;
	}
	.notice {
		color: #ec0000;
		margin-left: 5px;
	}
</style>