<template>
	<div class="contentBox">
		<div class="grey_box_top">
			<div class="grey_box_bottom">
				<div class="searchBar">
                   	兑换时间:从 <el-date-picker v-model="value1" type="date" class="myDate datePicker"></el-date-picker> 到 <el-date-picker v-model="value2" type="date" class="myDate datePicker"></el-date-picker>
                    下级玩家ID：
                    <input type="text" v-model="value3">
                    下级帐号： 
                    <input type="text" v-model="value4">
                    <el-button type="text" icon="search" class="btnGreen3" size="small" @click.native.prevent="search">查询</el-button>
                </div>
			</div>
			<table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                    	<th>ID</th>
                        <th>下级玩家ID</th>
                        <th>下级玩家帐号</th>
                        <th>变化前佣金</th>
                        <th>变化佣金</th>
                        <th>兑换后佣金</th>
                        <th>获得时间</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="8" v-if="show">暂无数据..</td>
                    </tr>
                </tbody>
            </table>
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
                form : {
                	bDate : '2001-01-01',
                    eDate : '2016-10-20',
                    classId : '-1',
                    numTitle : '',
                    username : '',
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
                this.form.classId = this.value3;
                this.form.numTitle = this.value4;
                this.form.username = this.value5;
                this.form.pageNumber = 1; 
                api.ajax('team/pageTeamLotteryBet',this.form).then(data => {
                    if(data && data.code == '0'){
                        this.show = false;
                        this.tabList = data.data.list;
                        this.totalRow = data.data.totalRow;
                        this.pageSize = data.data.pageSize;
                    } else {
                        alert(data.msg);
                    }
                }, error => {
                    errorMsg("数据请求失败")
                })
			},
			handleCurrentChange(val) {
                this.form.pageNumber = val;
                api.ajax('team/pageTeamLotteryBet',this.form).then(data => {
                    if(data && data.code == '0'){
                        this.show = false;
                        this.tabList = data.data.list;
                        this.totalRow = data.data.totalRow;
                        this.pageSize = data.data.pageSize;
                    } else {
                        alert(data.msg);
                    }
                }, error => {
                    errorMsg("数据请求失败")
                })
                console.log(`当前页: ${val}`);
            },
		}
	}
</script>
<style scoped>
	a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }
    ul {
    	list-style: none;
    }
    input {
        width: 140px;
        outline: medium;
    }
    table {
    	border-collapse: collapse;
    }
    .datePicker {
        width: 120px;
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
        width: 75px;
        background: #3dcb00;
        color: #fff;
        border-radius: 5px;
    }
    .btnGreen3:hover {
        background: #55df00;
    }
</style>
