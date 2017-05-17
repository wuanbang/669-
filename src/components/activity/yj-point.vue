<template>
	<div class="contentBox">
		<div class="time_box">
			<div class="yx">有效期：2015-11-01至2016-12-31</div>
			<div class="sy">活动已结束</div>
		</div>
		<a @click.stop="yjList"></a>
		<div class="rule">
			<dl>
				<dt>积分兑换规则：</dt>
				<dd>1.当日下级消费满2000元，上级可获得8元，上上级获得5元，上上级获得3元。</dd>
				<dd>2.禁止一切刷活动行为，对持平台将实时监控，请各位会员及代理谨记。</dd>
				<dd>3.银狐娱乐保留对持活动最终解释权。</dd>
			</dl>
		</div>
	</div>
</template>
<script lang="babel">
	import { mapActions } from 'vuex'
	export default {
		data () {
			return {

			}
		},
		methods: {
			...mapActions({
				setEventView : 'setEventView',
			}),
			yjList () {
				this.setEventView('yj-detail-list')
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
    	background: url(../../images/hd_bg_yj.jpg) 0 0 no-repeat;
    }
    .time_box {
	    width: 329px;
	    height: 81px;
	    background: url(../../images/hd_time_bg.png) 0 0 no-repeat;
	    position: absolute;
	    top: 20px;
	    left: 20px;
	}
    .yx {
	    padding: 14px 0 10px 20px;
	}
	.sy {
	    line-height: 28px;
	    padding: 0 0 0 20px;
	}
	.sy span {
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
    .contentBox a {
	    width: 362px;
	    height: 132px;
	    font-size: 0;
	    background: url(../../images/hd_yj_btn.png) 0 0 no-repeat;
	    display: block;
	    position: absolute;
	    left: -7px;
	    top: 130px;
	}
	.contentBox a:hover {
		cursor: pointer;
		background: url(../../images/hd_yj_btn.png) 0 -150px no-repeat;
	}
	.rule {
	    width: 700px;
	    height: 90px;
	    line-height: 22px;
	    position: absolute;
	    left: 20px;
	    bottom: 15px;
	    color: #fff;
	}
	.rule dt {
	    font-size: 14px;
	}
	.rule dd {
		margin: 0;
	    padding: 0;
	}
</style>