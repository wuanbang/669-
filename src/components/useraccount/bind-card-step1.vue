<template>
	<div class="contentBox">
		<div class="dark_step">
            <div class="dark_step_pic" :class="{'step1':first , 'step3':second , 'step4':third}"></div> 
            <el-button size="small" type="text" class="btnRed4 myBankCard" @click.stop="myBankCard">我的银行卡></el-button>    
        </div>
        <div class="grey_box_top">
            <div class="grey_box_bottom">
                <div class="dark_kaihu_box" v-if="step1">
                    <ul class="form">
                        <li>
                            <span class="formTit">银行卡开户姓名：</span>
                            <input type="text" v-model="openingBankName" class="input_txt wid190" name="">
                        </li>
                        <li>
                            <span class="formTit"></span>
                            <el-button type="text" size="large" class="nextstep btnRed4" @click.stop="nextStep1">下一步</el-button>
                        </li>
                    </ul>
                </div>
                <div class="dark_kaihu_box2" v-if="step2">
                    <ul class="form">
                        <li class="bankli">
                            <span class="formTit">第一张银行卡：</span>
                            <span class="bank_ico ICBC"></span>尾号3775<span class="chuxuka">储蓄卡</span>
                        </li>
                        <li>
                            <span class="formTit"></span>
                            <span class="txtRed">您所绑定的银行卡未激活(成功提取自动激活银行卡)</span>
                        </li>
                        <li>
                            <span class="formTit">第一张银行卡全号：</span>
                            <input type="text" class="input_txt wid300" name="" v-model="firstBankCard">
                        </li>
                        <li>
                            <span class="formTit">银行卡开户姓名：</span>
                            <input type="text" class="input_txt wid300" name="" v-model="openingBankName">
                        </li>
                        <li>
                            <span class="formTit"></span>
                            <el-button type="text" size="large" class="nextstep btnRed4" @click.stop="nextStep0">下一步</el-button>
                        </li>
                    </ul>
                </div>
                <div class="dark_kaihu_box3" v-if="step3">
                    <ul class="form">
                        <li>
                            <span class="formTit">开户银行：</span>
                            <el-select class="select" v-model="openingBank" :placeholder="placeholder">
                                <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li>
                        <li>
                            <span class="formTit">开户银行地址：</span>
                            <input type="text" v-model="accountAddress" class="input_txt wid300" >
                        </li>
                        <li class="bankli_kong"></li>
                        <li>
                            <span class="formTit">银行卡帐号：</span>
                            <input type="text" v-model="accountNumber" class="input_txt wid300" name="" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            <span class="notice">银行账号由16位或19位数字组成</span>
                        </li>
                        <li>
                            <span class="formTit">确认银行卡号：</span>
                            <input type="text" v-model="confirmNumber" class="input_txt wid300" name="" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')" onpaste="return false" >
                            <span class="notice">银行卡号只能手动输入，不能粘贴</span>
                        </li>
                        <li>
                            <span class="formTit">开户人姓名：</span>{{openingBankName}}
                        </li>
                        <li>
                            <span class="formTit"></span>
                            <el-button type="text" size="large" class="nextstep btnRed4" @click.stop="nextStep2">下一步</el-button><el-button type="text" size="large" class="return btnRed4" @click.stop="returnStep1">返回</el-button>
                        </li>
                    </ul>
                </div>
                <div class="dark_kaihu_box4" v-if="step4">
                    <ul class="form">
                        <li><span class="formTit">开户银行：</span>{{openingBank}}</li>
                        <li><span class="formTit">开户银行省份/城市：</span>{{accountAddress}}</li>
                        <li class="bankli_kong"></li>
                        <li><span class="formTit">银行帐号：</span>{{accountNumber}}</li>
                        <li><span class="formTit">开户人姓名：</span>{{openingBankName}}</li>
                        <li><span class="formTit">资金密码确认：</span><input type="password" v-model="fundPwd" class="input_txt wid198"></li>
                        <li><span class="formTit"></span><el-button type="text" size="large" class="return btnRed4" @click.stop="submit">提交</el-button></li>
                    </ul>
                </div>
            </div>
        </div>
        <dl class="attention">
            <dt>使用提示：</dt>
            <dd>1.该信息一旦提交，不可更改。请如实填写，以免浪费银行卡栏位。</dd>
        </dl> 
	</div>
</template>
<script lang="babel">
    import api from '../../api'
    import { errorMsg,succMsg } from '../../tools/command';
    import { mapActions } from 'vuex'
    import addCard from './add-card'
    export default {
        components: {
            addCard
        }, 
        data(){
            return {
                step1: true,
                step2: false,
                step3: false,
                step4: false,
                first: true,
                second: false,
                third: false,
                firstBankCard: '',
                openingBankName: '',
                openingBank: '',
                placeholder : '==选择银行==',
                options: [{
                    value: '中国工商银行',
                    label: '中国工商银行'
                }, {
                    value: '中国农业银行',
                    label: '中国农业银行'
                }, {
                    value: '中国建设银行',
                    label: '中国建设银行'
                }, {
                    value: '招商银行',
                    label: '招商银行'
                }, {
                    value: '中国银行',
                    label: '中国银行'
                }, {
                    value: '交通银行',
                    label: '交通银行'
                }, {
                    value: '中国邮政储蓄银行',
                    label: '中国邮政储蓄银行'
                }, {
                    value: '中国光大银行',
                    label: '中国光大银行'
                }, {
                    value: '中国民生银行',
                    label: '中国民生银行'
                }, {
                    value: '广东发展银行',
                    label: '广东发展银行'
                }, {
                    value: '中信银行',
                    label: '中信银行'
                }, {
                    value: '深圳发展银行',
                    label: '深圳发展银行'
                }, {
                    value: '上海浦东发展银行',
                    label: '上海浦东发展银行'
                }, {
                    value: '兴业银行',
                    label: '兴业银行'
                }, {
                    value: '北京银行',
                    label: '北京银行'
                }, {
                    value: '平安银行',
                    label: '平安银行'
                }, {
                    value: '农村信用合作社',
                    label: '农村信用合作社'
                }, {
                    value: '华夏银行',
                    label: '华夏银行'
                }, {
                    value: '村镇银行',
                    label: '村镇银行'
                }, {
                    value: '上海农村商业银行',
                    label: '上海农村商业银行'
                }],
                accountAddress: '',
                accountNumber: '',
                confirmNumber: '',
                fundPwd: '',
                form: {},
            }
        },
        mounted () {
            //如果银行卡数量大于零的话，显示step2
            if (this.$store.state.useraction.integration =='1') {
                this.step1 = false
                this.step2 = true
            //如果银行卡数量等于零的话，显示step1
            } else {
                this.step1 = true
                this.step2 = false
            }
        },
        methods :{
            ...mapActions({
                setEventView : 'setEventView',
            }),
            myBankCard () {
                this.setEventView('add-card')
            },
            nextStep0 () {
                errorMsg("抱歉，您绑定的第一张银行卡尚未激活！无法继续添加。");
            },
            nextStep1 () {
                if (!this.openingBankName) {
                   errorMsg("抱歉，请输入正确开户名！");
                } else{
                    this.step1 = false;
                    this.step3 = true;
                    this.first = false;
                    this.second = true;
                }
            },
            returnStep1 () {
                this.step1 = true;
                this.step3 = false;
                this.first = true;
                this.second = false;
            },
            nextStep2 () {
                if (!this.accountNumber || !this.accountNumber.match(/^\d{16,19}$/)) {
                    errorMsg("抱歉，请输入正确银行账号！");
                } else {
                    if (!this.confirmNumber || this.confirmNumber!=this.accountNumber) {
                        errorMsg("抱歉，两次输入不一致！");
                    } else {
                        this.step3 = false;
                        this.step4 = true;
                        this.second = false;
                        this.third = true;
                    }
                }
            },
            submit () {
                this.form.bankName = this.openingBank
                this.form.kaihuName = this.openingBankName
                this.form.account = this.accountNumber
                this.form.address = this.accountAddress
                this.form.fundPwd = this.fundPwd
                api.ajax('bank/addCard',this.form).then(data =>{
                    succMsg(data.msg)
                })
            },
        }
    }
</script>
<style scoped>
    .dark_step {
	    padding: 10px 0 10px 0;
	    position: relative;
	}
	.step1 {
        background: url(../../images/step.png) 0 0 no-repeat;
    }
    .step3 {
        background: url(../../images/step.png) 0 -100px no-repeat;
    }
    .step4 {
        background: url(../../images/step.png) 0 -200px no-repeat;
    }
    .dark_step .dark_step_pic {
        width: 528px;
        height: 75px;
        margin: 0 auto;
        display: block;
    }
    .myBankCard {
        position: absolute;
        top: 20px;
        right: 20px;
        border-radius: 5px;
        width: 92px; 
    }
    .btnRed4 {
        background: #ec0000;
        color: #fff;
    }
    .btnRed4:hover {
        background: #fc0000;
    }
    .dark_kaihu_box {
        padding: 100px 0 100px 250px;
    }
    .dark_kaihu_box2 {
        padding: 30px 0 50px 180px;
    }
    .dark_kaihu_box3 {
        padding: 5px 0 5px 130px;
    }
    .dark_kaihu_box4 {
        padding: 5px 0 10px 155px;
    }
    .form {
        list-style: none;
    }
    .form li {
        height: 25px;
        line-height: 25px;
        padding-bottom: 14px;
    }
    .form li.bankli {
        height: 30px;
        line-height: 30px;
    }
    .form li span.formTit {
        width: 132px;
        text-align: right;
        display: inline-block;
    }
    .form li.bankli_kong {
        height: 10px;
        line-height: 10px;
    }
    .form li .notice {
        font-style: normal;
        color: #888;
    }
    .ICBC {
        background-position: 0 -2px;
        background: url(../../images/bank.jpg) no-repeat 0 0;
    }
    .bank_ico {
        display: inline-block;
        width: 155px;
        height: 38px;
        vertical-align: middle;
    }
    .chuxuka {
        width: 45px;
        text-align: center;
        color: #fff;
        display: inline-block;
        background: url(../../images/chuxuka.png) center center no-repeat;
    }
    .txtRed {
        color: #f00;
    }
    .input_txt {
        height: 23px;
        line-height: 23px;
        margin: 0 5px;
        padding: 0 3px;
        border: solid 1px #ccc;
        background: #fff;
        outline: none;
    }
    .select {
        width: 198px;
        display: inline-block;
    }
    .nextstep {
        border-radius: 10px;
        font-weight: bold;
        width: 98px;
    }
    .return {
        border-radius: 10px;
        font-weight: bold;
        width: 82px;
        margin-left: 5px;
    }
    .attention {
        padding-left: 30px;
        line-height: 1.8em;
    }
    .attention dt {
        padding-bottom: 5px;
        font-size: 14px;
    }
    .wid300 {
        width: 300px;
    }
    .wid190 {
        width: 190px;
    }
    .wid198 {
        width: 198px;
    }
</style>