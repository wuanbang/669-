<template>
	<div class="contentBox">
		<div class="grey_box_top">
			<div class="grey_box_bottom">
				<div class="searchBar">
                   	时间:从<el-date-picker v-model="value1" type="date" class="myDate datePicker"></el-date-picker> 到
                    <el-date-picker v-model="value2" type="date" class="myDate datePicker"></el-date-picker>
                    游戏:<div class="select">
                        <el-select v-model="value3" class="myDate" :placeholder="placeholder">
                            <el-option v-for="item in options" :label="item.label" :value="item.value" ></el-option>
                        </el-select></div>
                    帐号:<input type="text" v-model="value4" name="username" class="inputWid"><input type="checkbox" name="checkbox">包含下级
                    <el-button type="text" icon="search" class="btnGreen3" size="small" @click.native.prevent="search">查询</el-button>
                </div>
                <div class="scroll">
    			<table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                        	<th>玩家ID</th>
                            <th>帐号</th>
                            <th>游戏名称</th>
                            <th>房间名称</th>
                            <th>输赢</th>
                            <th>税收</th>
                            <th>时长（秒）</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>游戏详情</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="9" v-if="show">暂无数据..</td>
                        </tr>
                        <tr v-for="item in tabList">
                        	<td><span v-text="item.userId"></span></td>
                            <td><span v-text="item.username"></span></td>
                            <td><span v-text="item.gameName"></span></td>
                            <td> </td>
                            <td><span v-text="item.coinChange"></span></td>
                            <td><span v-text="item.tax"></span></td>
                            <td> </td>
                            <td> </td>
                            <td><span v-text="item.addTime"></span></td>
                            <td class="td1"><span v-text="item.remark"></span></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
		</div>
		<!-- 分页 -->
        <div class="page clearfix">
            <div id="WebPager1">
                <el-pagination @current-change="handleCurrentChange" :page-size="page" layout="total, prev, pager, next, jumper" :total="totalPage" :current-page="form.pageNumber">
                </el-pagination>
            </div>
        </div>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
    import { datePick,errorMsg }from '../../tools/command'
	export default {
		data () {
			return {
                show: true,
				value1 : '',
                value2 : '',
                value3: '',
                value4: '',
                value5: '',
                placeholder : '==全部==',
                options: [{
                    value: '-1',
                    label: '全部'
                }, {
                    value: '3',
                    label: '德州扑克'
                }, {
                    value: '6',
                    label: '炸金花'
                }, {
                    value: '11',
                    label: '扯旋'
                }, {
                    value: '13',
                    label: '摇骰子'
                }, {
                    value: '15',
                    label: '十点半'
                }, {
                    value: '101',
                    label: '牛牛'
                }, {
                    value: '103',
                    label: '虎虎生威'
                }, {
                    value: '104',
                    label: '百人牛牛'
                }, {
                    value: '105',
                    label: '两张'
                }, {
                    value: '108',
                    label: '碰碰车'
                }, {
                    value: '110',
                    label: '百人梭哈'
                }, {
                    value: '122',
                    label: '新百家乐'
                }, {
                    value: '188',
                    label: '彩票'
                }, {
                    value: '200',
                    label: '斗地主'
                }, {
                    value: '205',
                    label: '四副升级'
                }, {
                    value: '208',
                    label: '火拼双扣'
                }, {
                    value: '226',
                    label: '干瞪眼'
                }, {
                    value: '302',
                    label: '血战麻将'
                }, {
                    value: '306',
                    label: '二人麻将'
                }, {
                    value: '307',
                    label: '温州麻将'
                }, {
                    value: '400',
                    label: '中国象棋'
                }, {
                    value: '401',
                    label: '五子棋'
                }, {
                    value: '403',
                    label: '围棋游戏'
                }, {
                    value: '500',
                    label: '深海捕鱼'
                }, {
                    value: '557',
                    label: '南昌视频麻将'
                }, {
                    value: '1000',
                    label: '按钮五张'
                }],
                form : {
                	bDate : '2001-01-01',
                    eDate : '2016-10-20',
                    pageNumber: 1,
                    pageSize: 10,  
                },
                tabList : [],
                totalRow: '0', 
		        pageSize: '0',
                firstPage: true, 
                lastPage: true,
                red: false,
                green: false,
			}
		},
		mounted :function(){
            this.value1 = new Date();
            this.value2 = new Date();
            this.value3 = '-1';
            this.search();
        },
        computed :{
            totalPage :function() {
                return parseInt(Math.ceil(this.totalRow))
            },
            page :function() {
                return parseInt(Math.ceil(this.pageSize))
            }
        },
		methods : {
			search () {
                var date = datePick(this.value1,this.value2);
                this.form.bDate =  this.value1.getFullYear() + '-' + date.month1 + '-' + date.day1;
                this.form.eDate =  this.value2.getFullYear() + '-' + date.month2 + '-' + date.day2;
                this.form.gameId = this.value3;
                this.form.username = this.value4;
                this.form.pageNumber = 1; 
                api.ajax('team/pageTeamGameRecord',this.form).then(data => {
                    if(data && data.code == '0'){
                        this.show = false;
                        this.tabList = data.data.list;
                        this.totalRow = data.data.totalRow;
                        this.pageSize = data.data.pageSize;
                    } else {
                        alert(data.msg);
                    }
                }, error => {
                    errorMsg("数据请求失败");
                })
			},
			handleCurrentChange(val) {
                this.form.pageNumber = val;
                api.ajax('team/pageTeamGameRecord',this.form).then(data => {
                    if(data && data.code == '0'){
                        this.show = false;
                        this.tabList = data.data.list;
                        this.totalRow = data.data.totalRow;
                        this.pageSize = data.data.pageSize;
                    } else {
                        alert(data.msg);
                    }
                }, error => {
                    errorMsg("数据请求失败");
                })
                console.log(`当前页: ${val}`);
            },
		}
	}
</script>
<style scoped>
    .datePicker {
        width: 120px;
    }
    .select {
        width: 130px ; 
        display: inline-block;
    }
    .inputWid {
        width: 80px;
    }
    .scroll {
        height: 376px; 
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .td1 {
        width: 300px;
    }
    #thetable td  {
        white-space: initial;
    }
    #thetable td a:hover {
        color: #ec0000;
        cursor: pointer;
    }
    .red {
        color : #f00;
    }
    .green {
        color : #090;
    }
    .page {
        text-align: center;
    }
    .btnGreen3 {
        width: 60px;
        background: #3dcb00;
        color: #fff;
        border-radius: 5px;
    }
    .btnGreen3:hover {
        background: #55df00;
    }
</style>