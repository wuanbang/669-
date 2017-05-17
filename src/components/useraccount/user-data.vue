<template>
	<div class="contentBox" style="z-index: 3 ">
		<div class="grey_box_top">
			<div class="grey_box_bottom">
				<div class="zhanghao_top clearfix">
					<div class="zhanghao_top_left">
					<div><img src="../../images/user_90x90.png"></div>
					<br />
					<div ><el-button type="text" class="btnGreen4" @click.stop="inMoney">充值</el-button></div>
					<div ><el-button type="info" class="account" @click.stop="outMoney">提现</el-button></div>
					</div>
					<div class="zhanghao_top_right">
						<div class="zhanghao_top_right_top">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tbody>
									<tr>
										<td class="td1">账户名</td>
										<td class="td2">{{username}}</td>
										<td class="td3">用户ID号</td>
										<td class="td4">{{userId}}</td>
										<td class="td5">上级联系QQ</td>
										<td class="td6 supQQ" >679735</td>
									</tr>
									<tr>
										<td class="td1">用户类型</td>
										<td class="td2">
											<span v-if="userAgent ==0">代理</span><span v-if="userAgent ==1">分红代理</span>
										</td>
										<td class="td3">用户返点</td>
										<td class="td4">{{point}}%</td>
										<td class="td5">个人联系QQ</td>
										<td class="td6">
											<input type="text" name="personalQQ" v-model="QQ" class="input_txt personalQQ">
											<el-button size="small" type="text" class="change" @click.stop="changeQQ">修改</el-button>
										</td>
									</tr>
									<tr>
										<td class="td1">可用余额</td>
										<td class="td2">
											<span v-text="data.balance"></span>
										</td>
										<td class="td3">额度币</td>
										<td class="td4">
											<span v-text="data.coin"></span>
										</td>
										<td class="td5">&nbsp;</td>
										<td class="td6 supQQ">&nbsp;</td>
									</tr>
									<tr>
										<td class="td1">我的银行卡</td>
										<td class="td2">
											<el-button size="small" class="btnRed4 wid92" type="text" @click.stop="bankCard">银行卡 1张 ></el-button>
										</td>
										<td class="td3">资金变动</td>
										<td class="td4">
											<el-button size="small" class="btnRed4 wid82" type="text" @click.stop="recordStat">日报报表 ></el-button>
										</td>
										<td class="td5">&nbsp;</td>
										<td class="td6 supQQ">&nbsp;</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="zhanghao_top_right_bottom">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tbody>
									<tr>
										<td class="td1">上次登入时间</td>
										<td class="td2">{{lastLoginTime}}</td>
										<td class="td3">本次登入时间</td>
										<td class="td4">{{currentTime}}</td>
									</tr>
									<tr>
										<td class="td1">上次登入IP</td>
										<td class="td2">{{lastLoginIp}}</td>
										<td class="td3">本次登入IP</td>
										<td class="td4">{{currentIp}}</td>
									</tr>
									<tr>
										<td class="td1">上次登入地址</td>
										<td class="td2">广东省深圳市电信</td>
										<td class="td3">本次登入地址</td>
										<td class="td4">广东省深圳市电信</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="zhanghao_bottom">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tbody>
					<tr>
						<td class="td1">登录密码:</td>
						<td class="td2">登录平台时需要输入的密码</td>
						<td class="td3">
							<el-button size="small" type="text" class="change" @click.stop="changeLoginPsw">修改</el-button>
						</td>
					</tr>
					<tr>
						<td class="td1">资金密码:</td>
						<td class="td2">在账户资金变动发生变动时，需要输入的密码:</td>
						<td class="td3">
							<el-button size="small" type="text" class="change" @click.stop="changeMoneyPsw">修改</el-button>
						</td>
					</tr>
					<tr>
						<td class="td1">安全邮箱:</td>
						<td class="td2">账号安全邮箱设计，找回登入密码以及取款密码</td>
						<td class="td3">
							<span class="txtRed">已设置</span>
							<el-button size="small" type="text" class="change" @click.stop="bindEmail">设置</el-button>
						</td>
					</tr>
					<tr>
						<td class="td1">注册时间:</td>
						<td class="td2">{{addTime}}</td>
						<td class="td3">&nbsp;</td>
					</tr>
					<tr>
						<td class="td1">资金限额:</td>
						<td class="td2">	高频彩：4000000元，低频彩：1000000元</td>
						<td class="td3">
							<el-button size="small" type="text" class="btnRed4 wid82">奖金信息 ></el-button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- 用户操作弹框 -->
        <div style="margin:0px; z-index: 4 ">
            <el-dialog custom-class="dialog-cus-cls-2" size="70%" :title="title" v-model="dialogTableVisible" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape" @open="openHandle" @close="closeHandle" :modal="cancelModal">
                <component :is="userDataView"></component>
            </el-dialog>
        </div>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { mapActions } from 'vuex'
	import { errorMsg,succMsg } from '../../tools/command'
	import changeLoginPsw from './change-login-psw'
	import changeMoneyPsw from './change-money-psw'
	import bindEmail from './bind-email'
	export default {
		components : {
			changeLoginPsw,
			changeMoneyPsw,
			bindEmail
		},
		data () {
			return {
				data: {},
				form: {},
				QQ: '',
				username: '',
				userId: '',
				point: '',
				addTime: '',
				currentIp: '',
				currentTime: '',
				lastLoginIp: '',
				lastLoginTime: '',
				userAgent: '',
				dialogTableVisible : false,
                closeOnClickModal : false,
                closeOnPressEscape : false,
                cancelModal : false,
                title : '修改登录密码',
			}
		},
		mounted () {
			this.getData();
			this.username = this.$store.state.useraction.username;
			this.userId = this.$store.state.useraction.userId;
			this.point = this.$store.state.useraction.point;
			this.addTime = this.$store.state.useraction.addTime;
			this.currentIp = this.$store.state.useraction.currentIp;
			this.currentTime = this.$store.state.useraction.currentTime;
			this.lastLoginIp = this.$store.state.useraction.lastLoginIp;
			this.lastLoginTime = this.$store.state.useraction.lastLoginTime;
			this.userAgent = this.$store.state.useraction.userAgent;
			this.$root.$on("closeHandle-init",this.close)
		},
		beforeDestroy(){
			this.$root.$off("closeHandle-init",this.close)
		},
		computed : {
			userDataView () {
				var userDatas = this.$store.state.useraction.dialogView;
                if (userDatas == 'change-login-psw') {
                  return "changeLoginPsw"
                } else if (userDatas == 'change-money-psw') {
                  return "changeMoneyPsw"
                } else if (userDatas == 'bind-email') {
                  return "bindEmail"
                }
			},
		},
		methods : {
			...mapActions({
                setEventView : 'setEventView',
                setDialogView : 'setDialogView'
            }),
			getData () {
                api.ajax('user/findInfo',this.form).then(data =>{
                    this.data = data.data;
                },error =>{
                    errorMsg("请求数据失败");
                })
			},
			changeQQ () {
				this.form.qq = this.QQ;
				api.ajax('user/updateQQ',this.form).then(data =>{
                    succMsg(data.msg);
                },error =>{
                    errorMsg("请求数据失败");
                })
			},
			inMoney () {
				this.setEventView('in')
				this.$router.push({name : 'user-account'})
			},
			outMoney () {
				this.setEventView('out')
				this.$router.push({name: 'user-account'})
			},
			bankCard () {
				this.setEventView('add-card')
			},
			recordStat () {
				this.setEventView('person-record')
				this.$router.push({name : 'user-account'})
			},
			changeLoginPsw () {
				this.dialogTableVisible = true;
                this.title = "修改登录密码";
                this.setDialogView('change-login-psw');
			},
			changeMoneyPsw () {
				this.dialogTableVisible = true;
                this.title = "修改资金密码";
                this.setDialogView('change-money-psw')
			},
			bindEmail () {
				this.dialogTableVisible = true;
                this.title = "绑定安全邮箱";
                this.setDialogView('bind-email')
			},
			openHandle(){
                console.log('openHandle')
            },
            closeHandle(){
                console.log('closeHandle')
            },
            close(){
            	this.dialogTableVisible = false;
            },
		}
	}
</script>
<style scoped>
    a {
        text-decoration: none;
        color: inherit;
    }
    select {
        outline: none;
    }
    
    .zhanghao_top {
	    padding: 30px;
	}
	.zhanghao_top_left {
	    float: left;
	}
	.zhanghao_top_left div {
	    padding-bottom: 10px;
	}
	.zhanghao_top_right {
	    float: right;
	    width: 750px;
	}
	.zhanghao_top_right_top table td {
	    height: 28px;
	}
	.zhanghao_top_right_top table td.td2 {
	    padding-right: 30px;
	    text-align: right;
	    color: #888;
	    background: url(../../images/tableLine.gif) right top repeat-y;
	}
	.zhanghao_top_right_top table td.td3 {
	    padding-left: 30px;
	}
	.zhanghao_top_right_top table td.td4 {
	    padding-right: 30px;
	    text-align: right;
	    color: #888;
	    background: url(../../images/tableLine.gif) right top repeat-y;
	}
	.zhanghao_top_right_top table td.td5 {
	    padding-left: 30px;
	}
	.zhanghao_top_right_top table td.td6 {
	    text-align: right;
	} 
	.supQQ {
		padding-right: 53px
	}
	.personalQQ {
		width: 98px;
		margin-right: 5px;
	}
	.change {
		width: 45px;
		background:#9d9fa1;
		color: #fff;
	}
	.change:hover {
		background: #b7b9bb;
	}
	.zhanghao_top_right_bottom {
	    padding-top: 30px;
	}
	.zhanghao_top_right_bottom table {
	    width: 550px;
	}
	.zhanghao_top_right_bottom table td {
	    height: 28px;
	}
	.zhanghao_top_right_bottom table td.td2 {
	    padding-right: 30px;
	    text-align: right;
	    color: #888;
	    background: url(../../images/tableLine.gif) right top repeat-y;
	}
	.zhanghao_top_right_bottom table td.td3 {
	    padding-left: 30px;
	}
	.zhanghao_top_right_bottom table td.td4 {
	    text-align: right;
	    color: #888;
	}
	.zhanghao_bottom {
	    padding: 15px 30px 0 30px;
	}
	.zhanghao_bottom table td {
	    height: 40px;
	    border-bottom: solid 1px #eee;
	}
	.zhanghao_bottom table td.td1 {
	    width: 120px;
	    padding-left: 5px;
	}
	.zhanghao_bottom table td.td2 {
	    color: #888;
	}
	.zhanghao_bottom table td.td3 {
	    text-align: right;
	}
	.txtRed {
		color: #f00;
		margin-right: 5px;
	}
	.btnGreen4 {
		background: #3dcb00;
		color: #fff;
		width: 90px;
		border-radius: 20px;
		font-weight: bold;
	}
	.btnGreen4:hover {
		background: #4dd800;
	}
	.account {
		font-weight:bold;
		background: #03cbd7;
		width: 90px;
		border-radius: 20px;
	}
	.account:hover {
		background: #04dae3;
	}
	.btnRed4 {
		background: #ec0000;
		color: #fff;
		border-radius: 5px;
	}
	.btnRed4:hover {
		background: #fc0000;
	}
	.input_txt {
	    height: 23px;
	    line-height: 23px;
	    margin: 0 5px;
	    padding: 0 3px;
	    border: solid 1px #ccc;
	    background: #fff;
	}
	.wid92 {
		width: 92px;
	}
	.wid82 {
		width: 82px;
	}
</style>
