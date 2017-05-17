<template>
    <div class="contentBox">
        <div class="grey_box_top pdt20">
            <div class="grey_box_bottom pdb30">
                <ul class="form_ul">
                    <li>
                        <span class="formTit w300">余&nbsp;&nbsp;额：</span>
                        <i class="txtGreen_big" v-text="data.balance"></i>元
                    </li>
                    <li>
                        <span class="formTit w300">棋牌余额：</span>
                        <i class="txtGrey_normal" v-text="data.coin"></i> 元
                        <a class="txtRed" @click.stop="refresh"><img class="v_mid" src="../../images/frash.png">刷新</a>
                    </li>
                    <li>
                        <span class="formTit w300">转入方式：</span>
                        <el-radio v-model="radio1" label="1">转入棋牌账户</el-radio>
                        <el-radio v-model="radio1" label="2">棋牌账户转出</el-radio>
                    </li>
                    <li class="transfer">
                        <span class="formTit w300">金额：</span>
                        <dl class="clearfix">
                            <dd><a class="hover"  @click.stop="inMoney">50元</a></dd>
                            <dd><a class="" @click.stop="inMoney"  >100元</a></dd>
                            <dd><a class="" @click.stop="inMoney" >300元</a></dd>
                            <dd><a class="" @click.stop="inMoney" >500元</a></dd>
                            <dd><a class="" @click.stop="inMoney" >1000元</a></dd>
                            <dd><a class="" @click.stop="inMoney" >3000元</a></dd>
                            <dd><a class="" @click.stop="inMoney" >5000元</a></dd>
                            <dd><a class="" @click.stop="inMoney" >10000元</a></dd>
                            <dd><a class="" @click.stop="inMoney" >转一半</a></dd>
                            <dd><a class="" @click.stop="inMoney" >全部转</a></dd>
                            <i>其它:<input type="text" v-model="changeMoney" class="input_txt wid70" name="">元</i>
                        </dl>
                    </li>
                    <li>
                        <span class="formTit w300">资金密码：</span><input type="password" class="input_txt wid120" v-model="fundPwd">
                    </li>
                    <li>
                        <div class="marLeft"><el-button type="text" class="btnRed4" @click.native.prevent="exchangeMoney">额度转账</el-button></div>
                    </li>
                </ul>
            </div>
        </div>
        <dl class="attention">
            <dt>额度转账使用需知：</dt>
            <dd>1.请确保您是转出还是入，请勿选择错误，如遇到由于个人操作失误引起的纠纷，平台概不负责。</dd>
            <dd>2.由于平台与真人平台之间网络延迟，可能会遇害到短暂无法上下分的情况，请耐心等待或联系客服。</dd>
        </dl>
    </div>
</template>
<script lang="babel">
    import api from '../../api'
    import { errorMsg,succMsg } from '../../tools/command';
	export default {
        data(){
            return {
                radio1: '1',
                changeMoney: '50',
                fundPwd: '',
                form: {},
                data: {},
            }
        },
        mounted () {
            this.getData()
        },
        methods :{
            getData () {
                api.ajax('user/money/findBalance',this.form).then(data =>{
                    this.data = data.data;
                },error =>{
                    errorMsg("请求数据失败")
                })
            },
            refresh () {
                this.getData();
            },
            inMoney (event) {
                this.changeMoney = event.target.innerText.slice(0,-1);
                if (this.changeMoney == '全部' ) {
                    this.changeMoney = this.data.balance;
                } else if (this.changeMoney == '转一') {
                    this.changeMoney = this.data.balance/2;
                }
                let srcElement = event.target;
                if (srcElement.className =="") {
                    for (var i = 1; i < document.getElementsByTagName('a').length; i++) {
                        document.getElementsByTagName('a')[i].className = document.getElementsByTagName('a')[i].className.replace('hover','')
                    }
                    srcElement.className = srcElement.className + 'hover'
                } else if(srcElement.className =="hover"){
                    srcElement.className = srcElement.className.replace('hover','')
                    this.changeMoney = ''
                }
            },
            exchangeMoney () {
                if (this.radio1 =='1') {
                    this.form.fundPwd = this.fundPwd;
                    this.form.amount = this.changeMoney;
                    api.ajax('user/money/transferToCoin',this.form).then(data =>{
                        succMsg(data.msg);
                        this.getData()
                    },error =>{
                        errorMsg("请求数据失败")
                    })
                } else {
                    this.form.fundPwd = this.fundPwd;
                    this.form.amount = this.changeMoney;
                    api.ajax('user/money/transferToBalance',this.form).then(data =>{
                        succMsg(data.msg);
                        this.getData()
                    },error =>{
                        errorMsg("请求数据失败")
                    })
                }
            },
        }
    }
</script>
<style scoped>
    * {
        margin: 0;
    }
    ul {
        list-style: none;    
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    a:hover {
        cursor: pointer;
    }
    li {
        display: list-item;
        text-align: -webkit-match-parent;
    }
    input {
        outline: medium;
    }
    .input_txt {
        height: 23px;
        line-height: 23px;
        margin: 0 5px;
        padding: 0 3px;
        border: solid 1px #ccc;
        background: #fff;
    }
    .pdt20 {
        padding-top: 20px;
    }
    .pdb30 {
        padding-bottom: 30px;
    }
    .form_ul {
        padding-top: 10px;
    }
    .form_ul li {
        height: 25px;
        line-height: 25px;
        padding-bottom: 15px;   
    }
    .form_ul li span.formTit.w300 {
        width: 300px;
    }
    .form_ul li span.formTit {
        width: 110px;
        text-align: right;
        display: inline-block;
    }
    .form_ul li i {
        font-style: normal;
        margin-left: 5px;
    }
    .txtRed {
        color: #f00;
        margin-left: 10px;
    }
    .txtRed:hover {
        text-decoration: underline;
    }
    .v_mid {
        vertical-align: middle;
        margin: 0 5px;
    }
    .form_ul li.transfer {
        height: 84px;
    }
    .form_ul li.transfer span {
        float: left;
    }
    .form_ul li.transfer dl {
        float: left;
        width: 320px;
        height: 84px;
        overflow: hidden;
        position: relative;
        margin-left: 5px;
    }
    .form_ul li.transfer dl dd {
        float: left;
        width: 80px;
        height: 30px;
        position: relative;
    }
    .form_ul li.transfer dl dd a {
        width: 68px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        color: #000;
        display: inline-block;
        border: solid 3px #ec0000;
        background-color: #fff;
        text-decoration: none;
    }
    .form_ul li.transfer dl dd a.hover,.form_ul li.transfer dl dd a:hover {
        color: #ec0000;
        background: url(../../images/selected.gif) right bottom no-repeat #fff;
    }
    .form_ul li.transfer i {
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .txtGrey_normal {
        color: #888;
    }
    .txtGreen_big {
        color: #3dcb00;
        font-size: 24px;
        font-family: "Microsoft YaHei";
        margin-right: 5px;
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
        background: #ec0000;
        color: #fff;
        font-weight: bold;
        width: 114px;
        border-radius: 10px;
    }
    .btnRed4:hover {
        background: #fc0000;
    }
    .wid70 {
        width: 70px;
    }
    .wid120 {
        width: 120px;
    }
    .marLeft {
        margin-left: 300px;
    }
</style>