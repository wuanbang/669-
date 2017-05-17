<template>
    <div class="contentBox">
        <div class="grey_box_top">
            <div class="grey_box_bottom">
                <div class="cardBox2">
                    <ul class="clearfix cardBox2_ul" v-for="item in data">
                        <li>
                            <div class="card_tit clearfix">
                                <div class="card_tit_left"><img src="../../images/ICBC.png"></div>
                                <div class="card_tit_right"><span class="chuxuka">储蓄卡</span></div>
                            </div>
                            <div class="card_box">
                                <h1>{{item.account | bankCard}}</h1>
                                <div>{{item.kaihuName | kaihu}}</div>
                            </div>
                            <div class="card_foot">
                                <div class="card_foot_left">添加时间：{{item.addTime}}</div>
                                <div class="card_foot_right"><span></span></div>
                            </div>
                        </li>
                    </ul>
                    <ul class="cardBox2_ul">
                        <li id="liAdd">
                            <a class="addCard" @click.stop="addCard"></a>
                        </li>
                    </ul>
                    <div class="cardInfo">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td class="td_img"><img src="../../images/card_ico1.png"></td>
                                    <td class="td_name">账户姓名</td>
                                    <td class="td_other" align="right">{{accountName | kaihu}}</td>
                                    <td class="td_btn">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="td_img"><img src="../../images/card_ico2.png"></td>
                                    <td class="td_name">总银行卡</td>
                                    <td class="td_other" align="right"><span class="txtRed">{{cardNum}}</span>&nbsp;张</td>
                                    <td class="td_btn"><a class="btn_s black" @click.stop="addCard"><span>添加</span></a></td>
                                </tr>
                                <tr>
                                    <td class="td_img"><img src="../../images/card_ico3.png"></td>
                                    <td class="td_name">锁定状态</td>
                                    <td class="td_other" align="right"><span class="txtRed">未锁定</span></td>
                                    <td class="td_btn"><a class="btn_s black" href="#"><span>锁定</span></a></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="cardInfo_note">注：最多可添加5张银行卡</div>
                    </div>
                </div>
            </div>
        </div> 
        <dl class="attention">
            <dt>使用提示：</dt>
            <dd>1.银行卡添加成功后，平台任何区域都不会出现您的完整银行卡号、开户姓名等信息。</dd>
            <dd>2.一个账户只能绑定同一个开户人姓名的银行卡。</dd>
        </dl>  
    </div>
</template>
<script lang="babel">
    import api from '../../api'
    import { errorMsg } from '../../tools/command';
    import { mapActions } from 'vuex'
    import bindCardStep1 from './bind-card-step1'
	export default {
        components : {
            bindCardStep1
        },
        data(){
            return {
                data: [],
                form: {},
                accountName:'',
            }
        },
        mounted () {
            this.getData()
        },
        computed: {
            cardNum () {
                return this.data.length
            },
        },
        methods :{
            ...mapActions({
                setEventView : 'setEventView',
                setExchange : 'setExchange',
            }),
            getData () {
                api.ajax('bank/listCards',this.form).then(data =>{
                    this.data = data.data;
                    if (this.data.length>0) {
                        this.accountName =this.data[0].kaihuName  
                    }
                },error =>{
                    errorMsg("数据请求失败")
                })
            },
            addCard () {
                if (this.data.length > 0) {
                    this.setExchange('1')
                    this.setEventView('bind-card-step1')
                } else {
                    this.setExchange('0')
                    this.setEventView('bind-card-step1')
                    
                }
            },
        }
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    ul {
        list-style: none;
    }
    table {
        border-collapse: collapse;
    }
    td, th {
        display: table-cell;
        vertical-align: inherit;
    }
    .txtRed {
        color: #f00;
    }
    .cardBox2 {
        width: 880px;
        height: 340px;
        margin: 0 auto;
        padding-top: 20px;
        overflow: hidden;
        position: relative;
    }
    .cardBox2 ul {
        display: inline-block;
    }
    #liAdd {
        display: inline-block;
    }
    .cardBox2 ul li {
        float: left;
        width: 270px;
        height: 170px;
        padding-right: 35px;
        background: url(../../images/card_bg.png) 0 0 no-repeat;
    }
    .cardBox2 ul li .card_tit {
        height: 40px;
        padding: 0 10px;
    }
    .cardBox2 ul li .card_tit_left {
        float: left;
    }
    .cardBox2 ul li .card_tit_right {
        float: right;
        padding-top: 10px;
    }
    .cardBox2 ul li .card_tit_right span {
        width: 45px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        color: #fff;
        display: inline-block;
        background: url(../../images/chuxuka.png) center center no-repeat;
    }
    .cardBox2 ul li .card_box {
        height: 73px;
        padding: 0 10px;
        font-size: 14px;
        color: #000;
        border-top: solid 1px #eee;
        border-bottom: solid 1px #eee;
        background: #fbfbfb;
    }
    .cardBox2 ul li .card_box h1 {
        padding: 12px 0 8px 0;
        font-size: 18px;
        font-weight: normal;
    }
    .cardBox2 ul li .card_foot {
        height: 35px;
        line-height: 35px;
        padding: 0 10px;
    }
    .cardBox2 ul li .card_foot_left {
        float: left;
        color: #888;
    }
    .cardBox2 ul li .card_foot_right {
        float: right;
    }
    .cardBox2 ul li .card_foot_right span {
        width: 35px;
        height: 35px;
        display: inline-block;
        background: url(../../images/yinlian.gif) right center no-repeat;
    }
    .cardBox2 ul li a.addCard {
        width: 270px;
        height: 150px;
        display: inline-block;
        background: url(../../images/add_card.png) 0 0 no-repeat;
    }
    .cardBox2 ul li a.addCard:hover {
        width: 270px;
        height: 150px;
        display: inline-block;
        background: url(../../images/add_card.png) 0 -150px no-repeat;
    }
    .cardBox2_ul {
        float: left;
    }
    .cardInfo {
        width: 250px;
        height: 145px;
        padding: 5px 10px 0 10px;
        position: absolute;
        right: 0;
        bottom: 20px;
        background: url(../../images/card_bg.png) 0 0 no-repeat;
    }
    .cardInfo table td {
        height: 35px;
        border-bottom: solid 1px #eee;
    }
    .cardInfo .td_img {
        width: 25px;
    }
    .cardInfo .td_name {
        width: 98px;
    }
    .cardInfo .td_other {
        width: 74px;
    }
    .cardInfo .td_btn {
        width: 53px;
        padding-left: 10px;
    }
    .btn_s {
        width: 45px;
        height: 25px;
        line-height: 25px;
        display: inline-block;
        text-align: center;
        border: 0;
        cursor: pointer;
    }
    .btn_s.black {
        color: #fff;
        background: url(../../images/btnBlack_s.png) 0 0 no-repeat;
    }
    .btn_s.black:hover {
        color: #fff;
        background: url(../../images/btnBlack_s.png) 0 -25px no-repeat;
    }
    .cardInfo_note {
        padding-top: 10px;
        color: #888;
    }
    .attention {
        padding: 20px 30px;
        line-height: 1.8em;
    }
    .attention dt {
        padding-bottom: 5px;
        font-size: 14px;
    }
</style>