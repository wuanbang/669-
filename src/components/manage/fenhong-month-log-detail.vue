<template>
    <div class="contentBox">
        <div class="grey_box_top">
            <div class="grey_box_bottom">
                <div class="searchBar">
                    查询时间:
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
                    <el-button type="text" icon="search" size="small" class="btnGreen3" @click.native.prevent="search">查询</el-button>
                </div>
                <div class="scroll">
	            <table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
	                <thead>
	                    <tr>
	                        <th>月份</th>
	                        <th>团队代理</th>
	                        <th>分红等级</th>
	                        <th>团队投注总额</th>
	                        <th>日量平均</th>
	                        <th>团队盈亏总额</th>
	                        <th>分红比例</th>
	                        <th>团队分红总额</th>
	                        <th>实际分红总额</th>
	                        <th>发送状态</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    <tr>
	                        <td colspan="10" v-if="show">暂无数据..</td>
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
                	<table border="0" width="100%" cellpadding="0" cellspacing="0">
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
                    value: '-1',
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
                account: '',
            }
        },
        mounted :function(){
            this.value1 = new Date().getFullYear()+ "年";
            this.value2 = new Date().getMonth() + 1+ "月";
            this.search();
        },
        computed : {
            dividendNum: function(){
                for (var i = 0; i < this.data.length; i++) {
                    var dividendNumAll = 0;
                    dividendNumAll += this.data[i].dividendNum;
                } 
                return dividendNumAll
            }
        },
        methods :{
            search(){
                if (this.value2.slice(0,-1) >0 &&this.value2.slice(0,-1) <10) {
                    this.form.month = this.value1.slice(0,-1) +'0'+ this.value2.slice(0,-1);
                }else{
                    this.form.month = this.value1.slice(0,-1) +''+ this.value2.slice(0,-1);
                }
                api.ajax('team/dividend/listMonthlyDetail',this.form).then(data => {
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
    select {
        outline: none;
    }
    td {
    	height: 25px;
    }
    .contentBox {
        position: relative;
    }
    .select {
        width: 120px ; 
        display: inline-block ; 
        margin-right: 10px;
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
    .webSum {
	    padding: 8px 10px 0 10px;
	    line-height: 25px;
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
	.clearfix td {
		padding: 5px 26px;
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
</style>