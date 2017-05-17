<template>
	<div class="contentBox">
		<div class="grey_box_top">
			<div class="grey_box_bottom">
				<div class="searchBar">
                   	查询月份时间:
                   	<div class="select">
                        <el-select v-model="value1" class="myDate" :placeholder="placeholder1">
                            <el-option v-for="item in options1" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </div>
                    <div class="select">
                        <el-select v-model="value2" class="myDate" :placeholder="placeholder2">
                            <el-option v-for="item in options2" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </div>
                    <div class="thetableTit">
                        <el-radio class="radio" v-model="radio" label="1">团队日报</el-radio><el-radio class="radio" v-model="radio" label="0">个人日报</el-radio>
                    </div>
                    <el-button type="text" icon="search" class="btnGreen3" size="small" @click.native.prevent="search">查询</el-button>
                </div>
			</div>
			<div class="scroll">
                <table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr v-show="show1">
                            <th>日期</th>
                            <th>充值总额</th>
                            <th>取款总额</th>
                            <th>当天注册</th>
                            <th>新充值</th>
                            <th>彩票投注额</th>
                            <th>彩票盈亏</th>
                            <th>棋牌盈亏</th>
                            <th>真人盈亏</th>
                            <th>团队总盈亏</th>
                        </tr>
                        <tr v-show="show2">
                            <th>日期</th>
                            <th>充值总额</th>
                            <th>取款总额</th>
                            <th>彩票投注额</th>
                            <th>彩票返点额</th>
                            <th>棋牌返点</th>
                            <th>彩票盈亏</th>
                            <th>棋牌盈亏</th>
                            <th>真人盈亏</th>
                            <th>个人综合盈亏</th>
                        </tr>
                    </thead>
                    <tbody>
                    	<tr>
                            <td colspan="11" v-show="show">暂无数据..</td>
                        </tr>
                        <tr v-for="item in data" v-show="show1"> 
                            <td><span v-text="item.dtDay"></span></td>
                            <td><div v-text="item.cz" :title="item.cz" class="wid60"></div></td>
                            <td><div v-text="item.qk" :title="item.qk" class="wid60"></div></td>
                            <td><span v-text="item.regNum"></span></td>
                            <td><span v-text="item.regCzNum"></span></td>
                            <td><div v-text="item.realTz" :title="item.realTz" class="wid70"></div></td>
                            <td>
                                <div v-show="item.cpyk ==0" :title="0" class="numRed wid60">0</div>
                                <div v-show="item.cpyk >0" v-text="item.cpyk" :title="item.cpyk" class="numRed wid60"></div>
                                <div v-show="item.cpyk <0" v-text="item.cpyk" :title="item.cpyk" class="numGreen wid60"></div>
                            </td>
                            <td>
                                <div v-show="item.qpyk ==0" :title="0" class="numRed wid60">0</div>
                                <div v-show="item.qpyk >0" v-text="item.qpyk" :title="item.qpyk" class="numRed wid60"></div>
                                <div v-show="item.qpyk <0" v-text="item.qpyk" :title="item.qpyk" class="numGreen wid60"></div>
                            </td>
                            <td>
                                <div v-show="item.zryk ==0" :title="0" class="numRed wid60">0</div>
                                <div v-show="item.zryk >0" v-text="item.zryk" :title="item.zryk" class="numRed wid60"></div>
                                <div v-show="item.zryk <0" v-text="item.zryk" :title="item.zryk" class="numGreen wid60"></div>
                            </td>
                            <td>
                                <div v-show="item.cpyk+item.qpyk+item.zryk ==0" :title="0" class="numRed wid70">0</div>
                                <div v-show="item.cpyk+item.qpyk+item.zryk >0" v-text="(item.cpyk+item.qpyk+item.zryk)" :title="(item.cpyk+item.qpyk+item.zryk)" class="numRed wid70"></div>
                                <div v-show="item.cpyk+item.qpyk+item.zryk <0" v-text="(item.cpyk+item.qpyk+item.zryk)" :title="(item.cpyk+item.qpyk+item.zryk)" class="numGreen wid70"></div>
                            </td>
                        </tr>
                        <tr v-for="item in data" v-show="show2"> 
                            <td><span v-text="item.dtDay"></span></td>
                            <td><div v-text="item.cz" :title="item.cz" class="wid60"></div></td>
                            <td><div v-text="item.qk" :title="item.qk" class="wid60"></div></td>
                            <td><div v-text="item.realTz" :title="item.realTz" class="wid70"></div></td>
                            <td><div v-text="(item.pointMoney+item.pointMoneyAgent)" :title="(item.pointMoney+item.pointMoneyAgent)" class="wid70"></div></td>
                            <td><div v-text="item.gamePointMoney" :title="item.gamePointMoney" class="wid60"></div></td>
                            <td>
                                <div v-show="item.cpyk ==0" :title="0" class="numRed wid60">0</div>
                                <div v-show="item.cpyk >0" v-text="item.cpyk" :title="item.cpyk" class="numRed wid60"></div>
                                <div v-show="item.cpyk <0" v-text="item.cpyk" :title="item.cpyk" class="numGreen wid60"></div>
                            </td>
                            <td>
                                <div v-show="item.qpyk ==0" :title="0" class="numRed wid60">0</div>
                                <div v-show="item.qpyk >0" v-text="item.qpyk" :title="item.qpyk" class="numRed wid60"></div>
                                <div v-show="item.qpyk <0" v-text="item.qpyk" :title="item.qpyk" class="numGreen wid60"></div>
                            </td>
                            <td>
                                <div v-show="item.zryk ==0" :title="0" class="numRed wid60">0</div>
                                <div v-show="item.zryk >0" v-text="item.zryk" :title="item.zryk" class="numRed wid60"></div>
                                <div v-show="item.zryk <0" v-text="item.zryk" :title="item.zryk" class="numGreen wid60"></div>
                            </td>
                            <td>
                                <div v-show="item.cpyk+item.qpyk+item.zryk ==0" :title="0" class="numRed wid80">0</div>
                                <div v-show="item.cpyk+item.qpyk+item.zryk >0" v-text="(item.cpyk+item.qpyk+item.zryk)" :title="(item.cpyk+item.qpyk+item.zryk)" class="numRed wid80"></div>
                                <div v-show="item.cpyk+item.qpyk+item.zryk <0" v-text="(item.cpyk+item.qpyk+item.zryk)" :title="(item.cpyk+item.qpyk+item.zryk)" class="numGreen wid80"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
		</div>
		<div class="WebSum">
        	<dl class="clearfix">
            	<dt>本页合计:</dt>
                <dd>
                	<table width="100%" border="0" cellpadding="0" cellspacing="0" style="padding-top: 10px">
                        <tbody v-show="show">
                            <tr>
                                <td>充值总额：</td>
                                <td>取款额：</td>
                                <td>彩票投注：</td>
                            </tr>
                            <tr>
                                <td>彩票盈亏：</td>
                                <td>棋牌盈亏：</td>
                                <td>真人盈亏：</td>
                                <td>综合盈亏：</span>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-show="show1">
                            <tr>
                                <td>充值总额：<span v-text="cz" :title="cz"></span></td>
                                <td>取款额：<span v-text="qk" :title="qk"></span></td>
                                <td>彩票投注：<span v-text="realTz" :title="realTz"></span></td>
                            </tr>
                            <tr>
                                <td>彩票盈亏：<span v-text="cpyk" :title="cpyk"></span></td>
                                <td>棋牌盈亏：<span v-text="qpyk" :title="qpyk"></span></td>
                                <td>真人盈亏：<span v-text="zryk" :title="zryk"></span></td>
                                <td>综合盈亏：<span v-text="zh" :title="zh" style="color:#f00"></span>
                                </td>
                            </tr>
                        </tbody>
                		<tbody v-show="show2">
                			<tr>
                				<td>充值总额：<span v-text="cz" :title="cz"></span></td>
                				<td>取款额：<span v-text="qk" :title="qk"></span></td>
                				<td>彩票投注：<span v-text="realTz" :title="realTz"></span></td>
                				<td>彩票返点：<span v-text="fd" :title="fd"></span></td>
                				<td>棋牌返点：<span v-text="gamePointMoney" :title="gamePointMoney"></span></td>
                			</tr>
                			<tr>
                				<td>彩票盈亏：<span v-text="cpyk" :title="cpyk"></span></td>
                				<td>棋牌盈亏：<span v-text="qpyk" :title="qpyk"></span></td>
                				<td>真人盈亏：<span v-text="zryk" :title="zryk"></span></td>
                				<td>综合盈亏：<span v-text="zh" :title="zh" style="color:#f00"></span>
                                </td>
                			</tr>
                		</tbody>
                	</table>
                </dd>
            </dl>
        </div>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
    import { errorMsg } from '../../tools/command';
	export default {
		data () {
			return {
				show: true,
                show1: false,
                show2: false,
				radio: '1',
				value1: '',
                placeholder1 : '',
                options1: [{
                    value: '2012年',
                    label: '2012年'
                }, {
                    value: '2013年',
                    label: '2013年'
                }, {
                    value: '2014年',
                    label: '2014年'
                }, {
                    value: '2015年',
                    label: '2015年'
                }, {
                    value: '2016年',
                    label: '2016年'
                }, {
                    value: '2017年',
                    label: '2017年'
                }, {
                    value: '2018年',
                    label: '2018年'
                }],
                value2: '',
                placeholder2 : '',
                options2: [{
                    value: '',
                    label: '全部'
                }, {
                    value: '1月',
                    label: '1月'
                }, {
                    value: '2月',
                    label: '2月'
                }, {
                    value: '3月',
                    label: '3月'
                }, {
                    value: '4月',
                    label: '4月'
                }, {
                    value: '5月',
                    label: '5月'
                }, {
                    value: '6月',
                    label: '6月'
                }, {
                    value: '7月',
                    label: '7月'
                }, {
                    value: '8月',
                    label: '8月'
                }, {
                    value: '9月',
                    label: '9月'
                }, {
                    value: '10月',
                    label: '10月'
                }, {
                    value: '11月',
                    label: '11月'
                }, {
                    value: '12月',
                    label: '12月'
                }],
                form : {
                    month : '201609',
                    type : '1'
                },
                data: [],
			}
		},
		mounted () {
            this.value1 = new Date().getFullYear()+ "年";
            this.value2 = new Date().getMonth() + 1+ "月";
            this.search();
        },
        computed : {
            cz: function() {
                var czAll = 0;
                for (var i = 0; i < this.data.length; i++) {
                    czAll+= this.data[i].cz;
                } 
                if (!czAll) {
                    return czAll
                }
                return czAll
            },
            qk: function() {
                var qkAll = 0;
                for (var i = 0; i < this.data.length; i++) {
                    qkAll += this.data[i].qk;
                } 
                if (!qkAll) {
                    return qkAll
                }
                return qkAll
            },
            realTz: function() {
                var realTzAll = 0;
                for (var i = 0; i < this.data.length; i++) {
                    realTzAll += this.data[i].realTz;
                } 
                if (!realTzAll) {
                    return realTzAll
                }
                return realTzAll
            },
            fd: function() {
                var fAll = 0;
                for (var i = 0; i < this.data.length; i++) {
                    fAll += this.data[i].pointMoney+this.data[i].pointMoneyAgent;
                } 
                if (!fAll) {
                    return fAll
                }
                return fAll
            },
            gamePointMoney: function() {
                var qpfAll = 0;
                for (var i = 0; i < this.data.length; i++) {
                    qpfAll += this.data[i].gamePointMoney;
                } 
                if (!qpfAll) {
                    return qpfAll
                }
                return qpfAll
            },
            cpyk: function() {
                var cpykAll = 0;
                for (var i = 0; i < this.data.length; i++) {
                    cpykAll += this.data[i].cpyk;
                } 
                if (!cpykAll) {
                    return cpykAll
                }
                return cpykAll
            },
            qpyk: function() {
                var qpykAll = 0;
                for (var i = 0; i < this.data.length; i++) { 
                    qpykAll += this.data[i].qpyk;
                } 
                if (!qpykAll) {
                    return qpykAll
                }
                return qpykAll
            },
            zryk: function() {
                var zrykAll = 0;
                for (var i = 0; i < this.data.length; i++) { 
                    zrykAll += this.data[i].zryk;
                } 
                if (!zrykAll) {
                    return zrykAll
                }
                return zrykAll
            },
            zh: function() {
                var zhAll = 0;
                for (var i = 0; i < this.data.length; i++) {
                    zhAll += (this.data[i].cpyk+this.data[i].qpyk+this.data[i].zryk);
                } 
                if (!zhAll) {
                    return zhAll
                }
                return zhAll
            },
        },
        methods :{
            search(){
                if (this.value2.slice(0,-1) >0 &&this.value2.slice(0,-1) <10) {
                    this.form.month = this.value1.slice(0,-1) +'0'+ this.value2.slice(0,-1);
                }else{
                    this.form.month = this.value1.slice(0,-1) +''+ this.value2.slice(0,-1);
                }
                this.show = false;
                this.form.type = this.radio;
                if (this.form.type == '1') {
                    this.show1 = true;
                    this.show2 = false;
                } else if (this.form.type == '0') {
                    this.show2 = true;
                    this.show1 = false;
                }
                api.ajax('team/listDailyProfit',this.form).then(data => {
                    if(data && data.code == '0'){
                        this.data = data.data;
                    } else {
                        alert(data.msg);
                    }
                }, error => {
                    errorMsg("数据请求失败");
                })
            },
        }
	}
</script>
<style scoped>
    .thetableTit {
	    height: 28px;
	    line-height: 28px;
	    padding: 0 10px;
        display: inline-block;
	}
    .select {
        width: 120px ; 
        display: inline-block ; 
        margin-right: 10px;
    }
    .scroll {
        overflow-y: scroll;
        overflow-x: hidden;
        height: 350px;
    }
    #thetable td div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 16px;
    }
    .WebSum {
	    padding: 8px 10px 0 10px;
	    line-height: 25px;
	}
    .WebSum table  {
        table-layout: fixed;
    }
    .WebSum table td {
        word-break: keep-all;/* 不换行 */
        white-space: nowrap;/* 不换行 */
        overflow: hidden;/* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一 起使用。*/ 
    }
    .clearfix {
        margin: 0;
    }
	.clearfix dt {
	    float: left;
	    width: 70px;
	    height: 25px;
	    padding: 10px;
	    display: inline-block;
	}
	.clearfix dd {
	    padding-left: 50px;
	}
    .btnGreen3 {
        width: 75px;
        background: #3dcb00;
        color: #fff;
        border-radius: 5px;
    }
    .btnGreen3:hover {
        background: #55df00;
    }
    .wid60 {
        width: 60px;
    }
    .wid70 {
        width: 70px;
    }
    .wid80 {
        width: 80px;
    }
    .numRed {
        color: #f00;
    }
    .numGreen {
        color: #090;
    }
</style>