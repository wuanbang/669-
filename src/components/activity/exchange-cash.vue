<template>
	<div class="exchangebox">
		<div class="grey_box_top">
			<ul class="form">
				<li>
					<span class="formTit">积分伙伴获取方式：</span>投注总额1元＝1积分，派奖成功后自动计入积分内！
				</li>
				<li>
					<span class="formTit">积分兑换比例：</span>500积分＝1元。
				</li>
				<li>
					<span class="formTit">兑换金额：</span><input type="text" v-model="value" class="input_txt"> 元<span class="tip">（最低兑换10元起）</span>
				</li>
				<li>
					<span class="formTit"></span><el-button type="text" class="btnRed4" @click.stop="exchangeMoney">兑换</el-button><span class="notice">{{notice}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script lang="babel">
	export default {
		data () {
			return {
				value: '10',
				notice : '',
			}
		},
		methods : {
			exchangeMoney () {
				if (!this.value) {
					this.notice = '兑换失败'
				} else {
					if (!this.value.match(/^\+?[1-9][0-9]*$/)) {
					this.notice = '最低兑换10元起'
					} else {
						if (this.value > this.$store.state.useraction.integration) {
							this.notice = '兑换积分不能大于您当前积分'
						}
					}
				}
				
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
	.exchangebox {
		width: 580px;
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
	    width: 190px;
	    text-align: right;
	    display: inline-block;
	}
	.input_txt {
		width: 88px;
	    height: 23px;
	    margin: 0;
	    line-height: 23px;
	    margin: 0 5px;
	    padding: 0 3px;
	    border: solid 1px #ccc;
	    background: #fff;
	}
	.btnRed4 {
		margin-right: 5px;
		border-radius: 12px;
		width: 82px;
		background: #ec0000;
		color: #fff;
		font-weight: bold;
	}
	.btnRed4:hover {
		background: #fc0000;
	}
	.tip {
		color: #888;
		margin-left: 5px;
	}
	.notice {
		color: #f00;
		margin-left: 5px;
	}
</style>