<template>
	<div class="Changebox">
		<div class="grey_box_top">
			<ul class="form">
				<li></li>
				<li>
					<span class="formTit">密保邮箱：</span><input autocomplete="off" type="password" name="oldPsw" v-model="value1"  class="input_txt">
				</li>
				<li>
					&nbsp;<span v-if="show">您已经设定了密码保护邮箱，不能更改，如果忘记，请联系客服!</span>
				</li>
				<li>
					<span class="formTit"></span><el-button type="text" class="btnRed4" @click.stop="change">修改</el-button><el-button type="text"  class="btnRed4" @click.stop="cancel">取消</el-button>
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
				show: false,
				form: {
					email: '',
				},
			}
		},
		mounted(){
			this.getData()
		},
		methods : {
			...mapActions({
              	setEventView : 'setEventView'
            }),
            getData(){
            	api.ajax('user/getEmail',this.form).then(data =>{
					this.value1 = data.data
					if (this.value1 == '') {
						this.show = false
					} else {
						this.show = true
					}
				},error =>{
					errorMsg("数据请求失败")
				})
            },
			change () {
				if (this.value1 == '') {
					errorMsg("请输入正确的Email地址！");
				} else{
					this.form.email = this.value1;
					api.ajax('user/updateEmail',this.form).then(data =>{
						succMsg(data.msg)
					},error =>{
						errorMsg("数据请求失败")
					})
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