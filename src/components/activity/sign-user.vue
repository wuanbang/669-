<template>
	<div class="contentBox">
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
		<div class="rule">
			<dl>
				<dt>活动规则：</dt>
				<dd>1、首次真实充值后，所有平台用户均可参加签到活动</dd>
				<dd>2、所有玩家只需每天登录平台，达到相应投注量即可领平台每日报到金</dd>
				<dd>3、每天登录的投注量以及所获得的礼金列表</dd>
				<dd>
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tbody>
							<colgroup>
								<col width="80">
								<col width="130">
								<col width>
							</colgroup>
							<tr>
								<td>第1天</td>
								<td>投注量1888元</td>
								<td>奖励8元</td>
							</tr>
							<tr>
								<td>第2天</td>
								<td>投注量2888元</td>
								<td>奖励15元</td>
							</tr>
							<tr>
								<td>第3天</td>
								<td>投注量3888元</td>
								<td>奖励28元</td>
							</tr>
							<tr>
								<td>第4天</td>
								<td>投注量5888元</td>
								<td>奖励38元</td>
							</tr>
							<tr>
								<td>第5天</td>
								<td>投注量5888元</td>
								<td>奖励48元</td>
							</tr>
							<tr>
								<td>第6天</td>
								<td>投注量5888元</td>
								<td>奖励58元</td>
							</tr>
							<tr>
								<td>第7天</td>
								<td>投注量5888元</td>
								<td>奖励88元</td>
							</tr>
						</tbody>
					</table>
				</dd>
				<dd>如果中间间断一天，连续签到将被重置，开始时间隔天计算</dd>
			</dl>
		</div>
		<div class="qiandao">
			<ul class="qiandao_top clearfix">
				<li>
					<span class="ts ts1">第一天</span>
					<span class="zt zt3"><el-button type="text" class="btnRed5" @click.stop="signIn">签到</el-button></span>
				</li>
				<li>
					<span class="ts ts3">第二天</span>
					<span class="zt zt1">未签到</span>
				</li>
				<li>
					<span class="ts ts3">第三天</span>
					<span class="zt zt1">未签到</span>
				</li>
			</ul>
			<ul class="clearfix">
				<li>
					<span class="ts ts3">第四天</span>
					<span class="zt zt1">未签到</span>
				</li>
				<li>
					<span class="ts ts3">第五天</span>
					<span class="zt zt1">未签到</span>
				</li>
				<li>
					<span class="ts ts3">第六天</span>
					<span class="zt zt1">未签到</span>
				</li>
				<li>
					<span class="ts ts3">第七天</span>
					<span class="zt zt1">未签到</span>
				</li>
			</ul>
		</div>
		<div class="qiandao_txt">
			你已经连续签到：
			<span>0</span>
			<span class="yuan">天</span>
			今日有效投注金额为：
			<span>0</span>
			<span class="yuan">元</span>
		</div>
		<div class="hd_qd_btn"><a @click.stop="sign">领取奖励明细</a></div>
		<div class="hd_qd_ts">完成活动可领取</div>
	</div>
</template>
<script lang="babel">
	import { mapActions } from 'vuex'
	import { setTime,errorMsg } from '../../tools/command'
	export default {
		data () {
			return {
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
			setInterval(function(){
				that.countDown()
			},1000)
			
		},
		methods: {
			...mapActions({
				setEventView : 'setEventView',
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
			signIn(){
				errorMsg("当天有效投注金额到达1888.00才能进行签到");
			},
			sign(){
				this.setEventView('sign-day-log')
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
	ul {
		list-style: none;
	}
	.contentBox {
        font-size: 12px;
    	background: #eee;
    	position: relative;
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
	.rule {
	    width: 320px;
	    line-height: 22px;
	    position: absolute;
	    top: 125px;
	    left: 20px;
	}
	.rule dt {
	    font-size: 14px;
	}
	.rule dd {
		margin: 0;
	    padding: 0;
	}
	.qiandao {
	    width: 556px;
	    position: absolute;
	    left: 375px;
	    top: 30px;
	}
	.qiandao ul.qiandao_top {
	    padding: 0 0 20px 101px;
	}
	.qiandao ul li {
	    float: left;
	    width: 98px;
	    height: 110px;
	    margin: 0 13px;
	    padding: 0 5px 4px 0;
	    background: url(../../images/hd_qd.png) left bottom no-repeat;
	}
	.qiandao ul li span.ts {
	    width: 98px;
	    height: 28px;
	    line-height: 28px;
	    text-align: center;
	    color: #fff;
	    display: block;
	}
	.qiandao ul li span.ts1 {
	    background: #ec0000;
	}
	.qiandao ul li span.ts3 {
	    background: #7e7e7e;
	}
	.qiandao ul li span.zt {
	    width: 98px;
	    height: 82px;
	    line-height: 82px;
	    text-align: center;
	    font-size: 18px;
	    font-weight: bold;
	    display: block;
	}
	.qiandao ul li span.zt1 {
	    color: #ccc;
	}
	.btnRed5 {
		border-radius: 12px;
		width: 66px;
		background: #ec0000;
		color: #fff;
		font-weight: bold;
		margin-top: 25px;
	}
	.btnRed5:hover {
		background: #fc0000;
	}
	.qiandao_txt {
	    width: 520px;
	    height: 30px;
	    line-height: 30px;
	    text-align: center;
	    position: absolute;
	    left: 385px;
	    top: 310px;
	}
	.qiandao_txt span {
	    font-size: 25px;
	    color: #ec0000;
	    font-family: "impact";
	    vertical-align: middle;
	}
	.qiandao_txt .yuan {
	    padding-left: 3px;
	    font-size: 19px;
	    font-weight: bold;
	    color: #ec0000;
	    vertical-align: middle;
	}
	.hd_qd_btn {
	    width: 520px;
	    position: absolute;
	    left: 385px;
	    top: 370px;
	}
	.hd_qd_btn a {
	    width: 276px;
	    height: 77px;
	    margin: 0 auto;
	    font-size: 0;
	    background: url(../../images/hd_qd_btn.png) 0 0 no-repeat;
	    display: block;
	}
	.hd_qd_btn a:hover {
		background: url(../../images/hd_qd_btn.png) 0 -100px no-repeat;
	}
	.hd_qd_ts {
	    width: 520px;
	    text-align: center;
	    color: #999;
	    position: absolute;
	    left: 385px;
	    top: 455px;
	}
</style>