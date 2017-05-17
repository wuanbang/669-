<template>
    <div class="contentBox">
        <div class="grey_box_top">
            <div class="grey_box_bottom">
                <div class="searchBar">
                    查询月份时间:
                    <div class="select" style="width:120px">
                        <el-select v-model="value1" class="myDate" :placeholder="placeholder1">
                            <el-option v-for="item in options1" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </div>
                    <div class="select" style="width:100px">
                        <el-select v-model="value2" class="myDate" :placeholder="placeholder2">
                            <el-option v-for="item in options2" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </div>
                    <el-button type="text" icon="search" size="small" class="btnGreen3" @click.native.prevent="search">查询</el-button>
                </div>
            </div>
            <div class="scroll">
                <table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>日期</th>
                            <th>充值总额</th>
                            <th>取款总额</th>
                            <th>彩票投注额</th>
                            <th>彩票返点额</th>
                            <th>棋牌返点</th>
                            <th>总佣金</th>
                            <th>彩票盈亏</th>
                            <th>棋牌盈亏</th>
                            <th>真人盈亏</th>
                            <th>个人综合盈亏</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="11" v-if="show">暂无数据..</td>
                        </tr>
                        <tr v-for="item in data"> 
                            <td><span v-text="item.dtDay"></span></td>
                            <td>
                                <span v-text="item.cz" :title="item.cz"></span>
                            </td>
                            <td>
                                <span v-text="item.qk" :title="item.qk"></span>
                            </td>
                            <td>
                                <span v-text="item.realTz" :title="item.realTz"></span> 
                            </td>
                            <td>
                                <span v-text="(item.pointMoneyAgent+item.pointMoney)" :title="(item.pointMoneyAgent+item.pointMoney)"></span>
                            </td>
                            <td>
                                <span v-text="item.gamePointMoney" :title="item.gamePointMoney"></span>
                            </td>
                            <td>
                                <span v-text="item.yj" :title="item.yj"></span>
                            </td>
                            <td>
                                <span v-if="item.cpyk == 0" class="numRed">0</span>
                                <span v-if="item.cpyk > 0" v-text="item.cpyk" :title="item.cpyk" class="numRed"></span>
                                <span v-if="item.cpyk < 0" v-text="item.cpyk" :title="item.cpyk" class="numGreen"></span>
                            </td>
                            <td>
                                <span v-if="item.qpyk == 0" class="numRed">0</span>
                                <span v-if="item.qpyk > 0" v-text="item.qpyk" :title="item.qpyk" class="numRed"></span>
                                <span v-if="item.qpyk < 0" v-text="item.qpyk" :title="item.qpyk" class="numGreen"></span>
                            </td>
                            <td>
                                <span v-if="item.zryk == 0" class="numRed">0</span>
                                <span v-if="item.zryk > 0" v-text="item.zryk" :title="item.zryk" class="numRed"></span>
                                <span v-if="item.zryk < 0" v-text="item.zryk" :title="item.zryk" class="numGreen"></span>
                            </td>
                            <td>
                                <span v-if="item.cpyk+item.qpyk+item.zryk == 0" v-text="0" class="numRed"></span>
                                <span v-if="item.cpyk+item.qpyk+item.zryk > 0" v-text="(item.cpyk+item.qpyk+item.zryk)" :title="(item.cpyk+item.qpyk+item.zryk)" class="numRed"></span>
                                <span v-if="item.cpyk+item.qpyk+item.zryk < 0" v-text="(item.cpyk+item.qpyk+item.zryk)" :title="(item.cpyk+item.qpyk+item.zryk)" class="numGreen"></span>
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
                	<table width="100%" border="0" cellpadding="0" cellspacing="0">
                		<tbody>
                			<tr>
                				<td>充值总额：<span v-text="cz" :title="cz"></span></td>
                				<td>取款额：<span v-text="qk" :title="qk"></span></td>
                				<td>彩票投注：<span v-text="realTz" :title="realTz"></span></td>
                				<td>彩票返点：<span v-text="fd" :title="fd"></span></td>
                				<td>棋牌返点：<span v-text="gamePointMoney" :title="gamePointMoney"></span></td>
                				<td>总佣金：<span v-text="yj" :title="yj"></span></td>
                			</tr> 
                			<tr>
                				<td>彩票盈亏：<span v-text="cpyk" :title="cpyk"></span></td>
                				<td>棋牌盈亏：<span v-text="qpyk" :title="qpyk"></span></td>
                				<td>真人盈亏：<span v-text="zryk" :title="zryk"></span></td>
                				<td>综合盈亏：<span v-text="zh" class="numRed" :title="zh"></span>
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
    import { errorMsg,datePick } from '../../tools/command';
    export default {
        data(){
            return {
                show: true,
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
                    month : '201610'
                },
                data: [],
            }
        },
        mounted :function(){
            this.value1 = new Date().getFullYear() + '年';
            this.value2 = new Date().getMonth() + 1 + '月';
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
            yj: function() {
                var yjAll = 0;
                for (var i = 0; i < this.data.length; i++) {
                    yjAll += this.data[i].yj;
                } 
                if (!yjAll) {
                    return yjAll
                }
                return yjAll
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
                api.ajax('report/listDailyProfit',this.form).then(data => {
                    if(data && data.code == '0'){
                        this.show = false;
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
    .select {
        display: inline-block;
        margin-right: 10px;
    }
    .scroll {
        height: 390px; 
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .WebSum {
	    padding: 8px 10px 0 10px;
	    line-height: 25px;
	}
    .WebSum table  {
        table-layout: fixed;
    }
    .WebSum table td {
        word-break:keep-all;/* 不换行 */
        white-space:nowrap;/* 不换行 */
        overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一 起使用。*/ 
        padding-right: 5px;
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
        padding-top: 7px;
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
    .numRed {
        color: #f00;
    }
    .numGreen {
        color: #090;
    }
</style>