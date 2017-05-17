<template>
	<div class="Changebox">
		<div class="grey_box_top">
			<ul class="form">
				<li>
					<span class="formTit">旧密码：</span><input type="password" name="oldPsw" v-model="value1" class="input_txt">
				</li>
				<li>
					<span class="formTit">新密码：</span><input type="password" name="oldPsw" v-model="value2" class="input_txt">
				</li>
				<li>
					<span class="formTit">确认新密码：</span><input type="password" name="oldPsw" v-model="value3" class="input_txt">
				</li>
				<li>
					<span class="formTit"></span><el-button type="text" class="btnRed4" @click.stop="change">修改</el-button><el-button type="text" class="btnRed4" @click.stop="cancel">取消</el-button>
				</li>
			</ul>
		</div>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { errorMsg,succMsg } from '../../tools/command';
	import { mapActions } from 'vuex'
	export default {
		data () {
			return {
				value1: '',
				value2: '',
				value3: '',
				form: {
					key: '',
					oldKey: '',
				},
			}
		},
		methods : {
			...mapActions({
              	setEventView : 'setEventView'
            }),
			change () {
				if (!this.value1) {
					errorMsg("抱歉，请输入原来的登录密码！");
				} else{
					if (!this.value2) {
						errorMsg("抱歉，请输入新的登录密码！");
					} else{
						if (this.value2!=this.value3) {
							errorMsg("抱歉，两次登录密码不一致！");
						} else{
							this.form.oldKey = this.value1;
							this.form.key = this.value2;
							api.ajax('user/updateLoginPwd',this.form).then(data =>{
								succMsg(data.msg)
							},error =>{
								errorMsg("数据请求失败")
							})
						}
					}
				}
			},
			cancel () {
				var that  = this;
				this.$nextTick(function(){
				  that.$root.$emit("closeHandle-init")
				})
				this.setEventView('user-data')
			},
		}
	}
</script>
<style scoped>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.Changebox {
		width: 360px;
	    font-size: 12px;
	    background: transparent;
	    font-family: "微软雅黑";
	    font-weight: normal;
	    color: #000;
	}
	.grey_box_top {
	    padding: 20px 0;
	}
	.form {
	    padding-top: 10px;
	}
	.form li {
	    height: 25px;
	    line-height: 25px;
	    padding-bottom: 15px;
	}
	.form li span.formTit {
	    width: 110px;
	    text-align: right;
	    display: inline-block;
	}
	.input_txt {
		width: 190px;
	    height: 23px;
	    line-height: 23px;
	    margin: 0 5px;
	    padding: 0 3px;
	    border: solid 1px #ccc;
	    background: #fff;
	}
	.form .input_txt {
	    margin: 0;
	}
	.btnRed4 {
		border-radius: 12px;
		width: 82px;
		background: #ec0000;
		color: #fff;
		font-weight: bold;
		margin-right: 5px;
	}
	.btnRed4:hover {
		background: #fc0000;
	}
</style>