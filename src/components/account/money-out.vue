<template>
	<div class="contentBox">
		<div class="grey_box_top pdt20">
			<div class="grey_box_bottom pdb30">
				<ul class="form_ul">
					<li>
						<span class="formTit w170">我的余额：</span>
                        <i><span class="txtGreen_big">{{balance}}</span>元</i>
					</li>
					<li>
						<span class="formTit w170">提款帐号：</span>
                        <div class="select">
                            <el-select v-model="value" class="myDate" :placeholder="placeholder">
                                <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </div>
					</li>
					<li>
						<span class="formTit w170">提款金额：</span>
                        <input type="text" v-model="moneyout" name="Money" id="Money" class="input_txt">
                        <span id="money_msg" class="txtRed"></span>
                        <i><span class="txtRed">*</span>&nbsp;必填 (单笔取款金额范围, 最低: <span id="minMoney">100</span>, 最高: <span id="maxMoney">500000</span>)</i>
					</li>
					<li>
						<span class="formTit w170">提款密码：</span>
                        <input type="password" v-model="pwdout" name="Bankpwd" id="Bankpwd" class="input_txt">
                        <span id="bankpwd_msg" class="txtRed"></span>
                        <i><span class="txtRed">*</span>&nbsp;必填</i>
					</li>
					<li>
						<div class="marLeft">
                            <el-button type="text" class="btnRed4" @click.native.prevent="submit">提交</el-button>
                        </div>
					</li>
				</ul>
			</div>
		</div>
		<dl class="attention">
            <dt>取款说明：</dt>
            <dd>1.提款时间：上午10:00-凌晨2:00（时间变更请关注系统公告)</dd>
            <dd>2.提款次数：10:00-2:00这个期间将有5次提现次数</dd>
            <dd>3.提款要求：由于受风控影响，杜绝洗钱活动，平台要求会员消费满充值的百分之二十才能申请提现</dd>
            <dd>4.提款到账时间：平台将进入全自动出款模式，资金将会秒出，高峰期将会在五分钟内到账，如未到账请及时联系客服咨询</dd>
        </dl>
	</div>
</template>
<script lang="babel">
	export default {
		data () {
			return {
                value: '',
                placeholder : '中国工商银行 尾号3775',
                options: [{
                    value: '1',
                    label: '中国工商银行 尾号3775'
                }],
                balance: '',
				moneyout : "",
				pwdout : "",
			}
		},
        mounted () {
            this.balance = this.$store.state.useraction.balance
        },
		methods :{
            submit(event){
            	var self = this;
            	var srcElement = document.getElementById("Money");
            	var srcElement_1 = document.getElementById("Bankpwd");
            	if (!self.moneyout) {
            		srcElement.nextElementSibling.innerHTML = "抱歉，请输入正确的金额!"
            	} else if (!self.moneyout.match(/^\d{0,6}$/)) {
            		srcElement.nextElementSibling.innerHTML = "抱歉，输入金额的格式不正确，请重新输入!"
            	} else {
            		if (!self.pwdout) {
            			srcElement_1.nextElementSibling.innerHTML = "抱歉，请输入正确的提款密码!"
            		} else if (!self.pwdout.match(/^([a-z0-9]+[-a-z0-9]*[a-z0-9]+)$/)) {
            			alert("抱歉，您输入的取款密码不符!")
            		} else {
            			if (self.moneyout < 100) {
                            srcElement.nextElementSibling.innerHTML = "";
                            self.pwdout = "";
                            srcElement_1.nextElementSibling.innerHTML = "";
            				alert("抱歉，单笔取款金额不能低于100元!");
            			} else if (true) {}
            		}
            	}
            }
        }
	}
</script>
<style scoped>
	* {
		margin: 0;
	}
	a {
        text-decoration: none;
        color: inherit;
    }
    ul {
    	list-style: none;
    }
    li {
    	display: list-item;
    	text-align: -webkit-match-parent;
    }
    option {
	    font-weight: normal;
	    display: block;
	    white-space: pre;
	    min-height: 1.2em;
	    padding: 0px 2px 1px;
	}
	input {
		outline: medium;
	}
    .pdt20 {
        padding-top: 20px;
    }
    .pdb30 {
        padding-bottom: 30px;
    }
    .select {
        width: 200px ; 
        display: inline-block ;
        margin-right: 10px;
    }
    .input_txt {
        width: 120px;
	    height: 23px;
	    line-height: 23px;
	    margin: 0 5px;
	    padding: 0 3px;
	    border: solid 1px #ccc;
	    background: #fff;
	}
    .form_ul {
    	padding-top: 10px;
    }
    .form_ul li {
	    height: 25px;
	    line-height: 25px;
	    padding-bottom: 15px;
	}
	.form_ul li span.formTit.w170 {
        width: 170px;
    }
    .form_ul li span.formTit {
        width: 110px;
        text-align: right;
        display: inline-block;
    }
    .form_ul li i {
        font-style: normal;
        color: #888;
        margin-left: 5px;
        display: inline-block;
    }
    .txtGreen_big {
        color: #3dcb00;
        font-size: 24px;
        font-family: "Microsoft YaHei";
        margin-right: 5px;
    }
	.txtRed {
		color: #f00;
	}
    .attention {
        padding: 20px 30px;
        line-height: 1.8em;
    }
    .attention dt {
        padding-bottom: 5px;
        font-size: 14px;
    }
    .btnRed4 {
        width: 82px;
        background: #ec0000;
        color: #fff;
        border-radius: 10px;
        font-weight: bold;
    }
    .btnRed4:hover {
        background: #fc0000;
    }
    .marLeft {
        margin-left: 170px;
    }
</style>