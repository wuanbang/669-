<template>
	<div class="contentBox" style="z-index: 3">
		<div class="time_box">
			<div class="yx">有效期：2016-11-01至2017-12-31</div>
			<div class="sy">剩余：<span>{{dayFirst}}</span><span>{{daySecond}}</span><span>{{dayThird}}</span>
				天
				<span>{{houFirst}}</span><span>{{houSecond}}</span>
				时
				<span>{{minFirst}}</span><span>{{minSecond}}</span>
				分
				<span>{{secFirst}}</span><span>{{secSecond}}</span>
				秒
			</div>
		</div>
		<div class="jf_box">
			<dl>
				<dt>您目前的累计积分：</dt>
				<dd class="jf_dd1"><input type="text" v-model="value"></dd><dd class="jf_dd2"><a @click.stop="exchange" class="btn1"></a><a @click.stop="exchangeRecord" class="btn2"></a></dd>
			</dl>
		</div>
		<div class="rule">
			<dl>
				<dt>积分兑换规则：</dt>
				<dd>1.尊敬的银狐会员，即日起您在银狐娱乐平台的有效彩票投注金额将累计成活动积分，1RMB=1积分。</dd>
				<dd>2.积分兑换比例500:1汇率。退换成现金。</dd>
				<dd>3.每天5000积分起兑换，每天账户只能兑换一次。</dd>
			</dl>
		</div>
		<!-- 兑换现金弹框 -->
        <div style="margin:0px; z-index: 4 ">
            <el-dialog custom-class="dialog-cus-cls-3" size="70%" :title="title" v-model="dialogTableVisible" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape" @open="openHandle" @close="closeHandle" :modal="cancelModal">
                <component :is="pointExchangeView"></component>
            </el-dialog>
        </div>
	</div>
</template>
<script lang="babel">
	import { mapActions } from 'vuex'
	import exchangeCash from './exchange-cash'
	import { setTime } from '../../tools/command'
	export default {
		components : {
			exchangeCash
		},
		data () {
			return {
				interval: '',
				dayFirst: '',
				daySecond: '',
				dayThird: '',
				houFirst: '',
				houSecond: '',
				minFirst: '',
				minSecond: '',
				secFirst: '',
				secSecond: '',
				value: '0',
				dialogTableVisible : false,
                closeOnClickModal : false,
                closeOnPressEscape : false,
                cancelModal : false,
                title : '兑换现金',
			}
		},
		mounted () { 
			var that = this;
			this.interval = setInterval(function(){
				that.countDown()
			},1000)
		},
		computed : {
			pointExchangeView () {
				var pointexchanges = this.$store.state.useraction.dialogView;
                if (pointexchanges == 'exchange-cash') {
                  return "exchangeCash"
                }
			}
		},
		methods: {
			...mapActions({
				setEventView : 'setEventView',
				setDialogView : 'setDialogView',
				setExchange : 'setExchange',
			}),
			countDown () {
				var data = setTime();
				this.dayFirst = data.dayFirst,
				this.daySecond = data.daySecond,
				this.dayThird = data.dayThird,
				this.houFirst = data.houFirst,
				this.houSecond = data.houSecond,
				this.minFirst = data.minFirst,
				this.minSecond = data.minSecond,
				this.secFirst = data.secFirst,
				this.secSecond = data.secSecond
			},
			exchange () {
				this.setExchange(this.value);
				this.dialogTableVisible = true;
				this.setDialogView('exchange-cash')
			},
			openHandle(){
                console.log('openHandle')
            },
            closeHandle(){
                console.log('closeHandle')
            },
            exchangeRecord () {
            	this.setEventView('exchange-record')
            	this.$router.push({name : 'activity'})
            }
		},
	}
</script>
<style scoped>
	a {
	    text-decoration: none;
	    color: inherit;
	}
	.contentBox {
        font-size: 12px;
        position: relative;
    	background: url(../../images/hd_bg_jf.jpg) 0 0 no-repeat;
    }
    .time_box {
	    width: 329px;
	    height: 81px;
	    background: url(../../images/hd_time_bg.png) 0 0 no-repeat;
	    position: absolute;
	    top: 20px;
	    left: 20px;
	}
	.time_box .yx {
	    padding: 14px 0 10px 20px;
	}
	.time_box .sy {
	    line-height: 28px;
	    padding: 0 0 0 20px;
	}
	.time_box .sy span {
	    width: 18px;
	    height: 28px;
	    line-height: 28px;
	    margin: 0 1px;
	    color: #fff;
	    text-align: center;
	    font-size: 14px;
	    font-family: Arial;
	    background: url(../../images/hd_time_black.png) 0 0 no-repeat;
	    display: inline-block;
	}
	.contentBox .jf_box {
	    width: 635px;
	    height: 150px;
	    position: absolute;
	    left: 0;
	    bottom: 0;
	}
	.jf_box dl {
	    padding-left: 10px;
	}
	.jf_box dl dt {
	    padding: 0 0 5px 10px;
	    font-size: 17px;
	    font-weight: bold;
	}
	.contentBox .jf_box dl dd {
		margin: 0;
	    float: left;
	}
	.jf_box dl dd.jf_dd1 {
	    width: 304px;
	    height: 104px;
	    background: url(../../images/hd_jf_txt.png) 0 0 no-repeat;
	}
	.jf_box dl dd.jf_dd1 input {
	    width: 264px;
	    height: 71px;
	    line-height: 71px;
	    margin: 11px 0 0 15px;
	    padding-left: 10px;
	    color: #ff0;
	    font-size: 55px;
	    border: 0;
	    font-family: "impact";
	    background: none;
	    outline: none;
	}
	.jf_box dl dd.jf_dd2 {
	    width: 304px;
	    height: 101px;
	    margin-top: 3px;
	    background: url(../../images/hd_jf_btn.png) 0 0 no-repeat;
	}
	.jf_box dl dd.jf_dd2 .btn1 {
	    float: left;
	    width: 208px;
	    height: 78px;
	    margin-left: 8px;
	    font-size: 0;
	    display: inline-block;
	}
	.jf_box dl dd.jf_dd2 .btn1:hover {
		cursor: pointer;
		background: url(../../images/hd_jf_btn.png) -8px -150px no-repeat;
	}
	.jf_box dl dd.jf_dd2 .btn2 {
	    width: 80px;
	    height: 78px;
	    font-size: 0;
	    display: inline-block;
	}
	.jf_box dl dd.jf_dd2 .btn2:hover {
		cursor: pointer;
		background: url(../../images/hd_jf_btn.png) -216px -150px no-repeat;
	}
	.rule {
	    width: 280px;
	    height: 115px;
	    line-height: 22px;
	    position: absolute;
	    right: 20px;
	    bottom: 15px;
	}
	.rule dt {
	    font-size: 14px;
	}
	.rule dd {
		margin: 0;
	    padding: 0;
	}
</style>