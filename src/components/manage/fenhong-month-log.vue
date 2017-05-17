<template>
    <div class="contentBox">
        <div class="grey_box_top">
            <div class="grey_box_bottom">
                <div class="searchBar">
                    查询时间:
                    <div class="select">
                        <el-select v-model="value" class="myDate" :placeholder="placeholder">  
                            <el-option v-for="item in options" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </div>
                    <el-button type="text" icon="search" size="small" class="btnGreen3" @click.native.prevent="search">查询</el-button>
                </div>
                <div class="scroll">
                    <table id="thetable" border="0" width="100%" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th>月份</th>
                                <th>总代代理</th>
                                <th>团队月充值</th>
                                <th>团队月取款</th>
                                <th>团队盈亏总计</th>
                                <th>分红比例</th>
                                <th>团队分红总额</th>
                                <th>我的分红总额</th>
                                <th>发送状态</th>
                                <th>分红明细</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="10" v-if="show">暂无数据..</td>
                            </tr>
                            <tr v-for="item in data"> 
                                <td><span v-text="item.monthStr"></span></td>
                                <td><span v-text="item.username"></span></td>
                                <td>
                                    <div v-text="item.cz" :title="item.cz" class="wid50"></div>
                                </td>
                                <td>
                                    <div v-text="item.qk" :title="item.qk" class="wid50"></div>
                                </td>
                                <td>
                                    <div v-if="item.tzyk*(-1) ==0" class="numRed wid60">0</div>
                                    <div v-if="item.tzyk >0" v-text="item.tzyk*(-1)" :title="item.tzyk*(-1)" class="numRed wid60"></div>
                                    <div v-if="item.tzyk <0" v-text="item.tzyk*(-1)" :title="item.tzyk*(-1)" class="numGreen wid60"></div>
                                </td>
                                <td>{{item.rate}}%</td>
                                <td>
                                    <div v-text="item.dividendNum" :title="item.dividendNum" class="wid60"></div>
                                </td>
                                <td>
                                    <div v-text="item.realDividend" :title="item.realDividend" class="wid60"></div>
                                </td>
                                <td>
                                    <span v-if="item.distributeFlag = 0">未发放</span>
                                    <span v-if="item.distributeFlag = 1">已发放</span>
                                    <span v-if="item.distributeFlag = -1">不满足条件</span>
                                </td>
                                <td><a class="txtRed" @click.stop="monthDavDetail">明细</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
	            
            </div>
        </div>
        <div class="WebSum">
        	<dl class="clearfix">
            	<dt>本页合计:</dt>
                <dd>
                	<table border="0" width="100%" cellpadding="0" cellspacing="0" style="padding-top: 10px">
                		<tbody>
                			<tr>
                				<td>分红结算次数：<span v-text="account"></span></td>
                				<td>团队分红金额总计：<span v-text="dividendNum"></span></td>
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
        data(){
            return {
                show: true,
                value: '',
                placeholder : '',
                options: [{
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
                form : {
                    year: '',
                },
                data: [],
                account: '',
            }
        },
        mounted :function(){
            this.value = new Date().getFullYear() + '年';
            this.search();
        },
        computed : {
            dividendNum: function(){
                var dividendNumAll = 0;
                for (var i = 0; i < this.data.length; i++) {
                    dividendNumAll += this.data[i].dividendNum;
                } 
                return dividendNumAll
            }
        },
        methods :{
            search(){
                this.form.year = this.value.slice(0,-1);
                api.ajax('team/dividend/listMonthlyReport',this.form).then(data => {
                    if(data && data.code == '0'){
                        this.show = false;
                        this.data = data.data;
                        this.account = this.data.length;
                    } else {
                        alert(data.msg);
                    }
                }, error => {
                    errorMsg("数据请求失败")
                })
            },
            monthDavDetail () {
                this.$router.push({name : 'fenhong-month-log-detail'})
            },
        }
    }
</script>
<style scoped>
    a {
        text-decoration: none;
        color: inherit;
    }
    input {
        outline: medium;
    }
    td {
    	height: 25px;
    }
    .contentBox {
        position: relative;
    }
    .select {
        width: 120px;
        margin-right: 5px ; 
        display: inline-block;
    }
    .scroll {
        height: 361px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    #thetable {
        table-layout: fixed;
    }
    #thetable td {
        word-break: keep-all;/* 不换行 */
        white-space: nowrap;/* 不换行 */
        overflow: hidden;/* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一 起使用。*/ 
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
    .txtRed {
        text-decoration: underline;
    }
    .txtRed:hover {
        color: #ec0000;
        cursor: pointer;
    }
    .wid50 {
        width: 50px;
    }
    .wid60 {
        width: 60px;
    }
    .numRed {
        color: #f00;
    }
    .numGreen {
        color: #090;
    }
</style>