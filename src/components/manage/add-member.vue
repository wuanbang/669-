<template>
	<div class="contentBox">
		<div class="grey_box_top pdt10">
			<div class="grey_box_bottom h510">
				<ul class="form">
					<li>
						<span class="formTit">用户级别:</span>
						<el-radio v-model="radio1" label="1">代理用户</el-radio>
						<el-radio v-model="radio1" label="2">会员用户</el-radio>
					</li>
					<li>
						<span class="formTit">登录帐号:</span>
						<input type="text" name="txtUsername" v-model="username" style="width:160px">
						<span class="notice">{{txtUsername}}</span>
					</li>
					<li style="position:relative">
						<span class="formTit nextPoint">下级返点:</span>
						<div class="slider">
							<el-slider v-model="value1" :min="0" :max="cpont" :step="0.1" show-input></el-slider>
						</div>
						<span class="tip">2.5以上返点，需会员列表内提交申请</span>
					</li>
					<li>
						<div class="btn">
							<el-button type="danger" @click.native.prevent="submit" class="btn_Red" style="width:82px">提交</el-button>
							<span class="notice">{{notice}}</span>
						</div>
					</li>
				</ul>
				<div class="form_mid_tit">
					<h3>自动注册设置</h3>您的返点级别:{{point}}
				</div>
				<ul class="form" style="padding-top:0">
					<li>
						<span class="formTit">用户级别:</span>
						<el-radio class="radio" v-model="radio2" label="1">代理用户</el-radio>
						<el-radio class="radio" v-model="radio2" label="2">会员用户</el-radio>
					</li>
					<li style="position:relative">
						<span class="formTit nextPoint">下级返点:</span>
						<div class="slider">
							<el-slider v-model="value2" :min="0" :max="cpont" :step="0.1" show-input></el-slider>
						</div>
						<span class="tip">2.5以上返点，需会员列表内提交申请</span>
					</li>
					<li class="register" style="margin-top:10px">
						<span class="formTit">自动注册地址1:</span>
						<input type="text" name="regUrl1" id="regUrl1" class="input_txt" v-model="registerUrl">
						<el-button type="text" size="small" class="copyAddress" @click.native.prevent="copy">复制</el-button>
					</li>
					<li class="register">
						<span class="formTit">自动注册地址2:</span>
						<input type="text" name="regUrl2" id="regUrl2" class="input_txt" v-model="registerUrl">
						<el-button type="text" size="small" class="copyAddress" @click.native.prevent="copy">复制</el-button>
					</li>
					<li class="register">
						<span class="formTit">自动注册地址3:</span>
						<input type="text" name="regUrl3" id="regUrl3" class="input_txt" v-model="registerUrl">
						<el-button type="text" size="small" class="copyAddress" @click.native.prevent="copy">复制</el-button>
					</li>
					<li class="register">
						<span class="formTit">自动注册地址4:</span>
						<input type="text" name="regUrl4" id="regUrl4" class="input_txt" v-model="registerUrl">
						<el-button type="text" size="small" class="copyAddress" @click.native.prevent="copy">复制</el-button>
					</li>
					<li>
						<div class="btn">
							<el-button type="danger" @click.native.prevent="setlink" class="btn_Red" style="width:146px">生成注册链接</el-button>
							<span class="notice"></span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { mapActions } from 'vuex'
	import { errorMsg,succMsg } from '../../tools/command';
	export default {
		data () {
			return {
				point: '',
				radio1 : '',
				radio2 : '',
				notice : '',
				username : '',
				txtUsername: '由0-9,a-z,A-Z组成的6-16个字符,新增用户默认密码a123456',
				value1 : 0,
				value2 : 0,
				registerUrl : '',
				form: {},
			}
		},
		mounted :function(){
			this.point = this.$store.state.useraction.point;
		},
		computed : {
			cpont(){
				var point = this.$store.state.useraction.point
				if(point > 2.5){
					return 2.5
				}
				return point - 0.1
			}
		},
		methods :{
			...mapActions({
				setCode : 'setCode'
			}),
			addMember () {
				this.form.username = this.username;
				this.form.point = this.value1;
				api.ajax('team/member/add',this.form).then(data =>{
                    succMsg(data.msg)
                    this.notice = data.msg;
                },error =>{
                    errorMsg("数据请求失败")
                })
			},
			submit (event) {
				if (!this.username) {
					this.txtUsername = "抱歉，请输入正确的用户名!"
				} else{ 
					if (!this.username.match(/^[0-9a-zA-Z]+$/)) {
						this.txtUsername = "抱歉，用户名由字母和数字的组合!"
					} else{ 
						if (!this.username.match(/^.{6,20}$/)) {
		        			this.txtUsername = "抱歉，用户名的长度为6-20个字符组合"
		        		} else {
		        			this.addMember();
		        			this.username = "";
		        			this.txtUsername = "由0-9,a-z,A-Z组成的6-16个字符,新增用户默认密码a123456"
		        		}
		        	}
		        }
			},
			setlink () {
				this.form.point = this.value2;
				api.ajax('team/member/regUrl',this.form).then(data =>{
                    succMsg(data.msg)
                    this.registerUrl = data.data;
                    this.setCode(this.registerUrl.split('?')[1])
                },error =>{
                    errorMsg("数据请求失败")
                })
			},
			copy () {
				succMsg("复制成功")
			},
		}
	}
</script>
<style scoped>
	a {
        text-decoration: none;
        color: inherit;
    }
    ul {
    	list-style: none;
    }

    input {
        outline: medium;
    }
    .pdt10 {
	    padding-top: 10px;
	}
    .h510 {
	    height:510px;
	}
    .form {
    	padding: 10px 0;
    	margin: 0;
    }
    .form li {
	    height: 25px;
	    line-height: 25px;
	    padding-bottom: 8px;
	}
	.form li span.formTit {
	    width: 110px;
	    text-align: right;
	    display: inline-block;
	    margin-right:0 10px;
	}
	.form_mid_tit {
	    padding: 5px 0 10px 48px;
	    color: #888;
	}
	.form_mid_tit h3 {
	    padding-right: 5px;
	    margin: 5px 0;
	    display: inline-block;
	    font-size: 18px;
	    color: #000;
	    font-weight: normal;
	    font-family: "Microsoft YaHei";
	}
	.form li.register {
	    padding-bottom: 15px;
	}
	.slider {
		width: 300px; 
		display: inline-block;
		margin-left: 135px;
	}
	.nextPoint {
		position: absolute; 
		top: 10px; 
		left: 0;
	}
	.tip {
		color:#888;
		font-size:12px;
		position: absolute;
		margin: 7px 0 10px 10px;
	}
	.input_txt {
	    height: 23px;
	    line-height: 23px;
	    padding: 0 3px;
	    border: solid 1px #ccc;
	    background: #fff;
	    width: 710px;
	    margin-right: 5px;
	}
	.btn {
		margin: 10px 0 0 125px;
	}
	.btn_Red {
		background: #ec0000;
		border-radius: 10px;
	}
	.btn_Red:hover {
		background: #ff0000;
	}
	.notice {
		color: #f00; 
		font-size: 12px; 
		margin-left: 5px;
	}
	.copyAddress {
		width: 45px;
		background:#9d9fa1;
		color: #fff;
	}
	.copyAddress:hover {
		background: #b7b9bb;
	}
</style>