<template>
	<div class="contentBox">
		<div class="grey_box_top">
			<div class="grey_box_bottom">
				<div class="searchBar">
                   	时间:从<el-date-picker v-model="value1" type="date" class="myDate datePicker"></el-date-picker> 到
                    <el-date-picker v-model="value2" type="date" class="myDate datePicker"></el-date-picker>
                    操作类型:<div class="select">
                        <el-select v-model="value3" class="myDate" :placeholder="placeholder">
                            <el-option v-for="item in options" :label="item.label" :value="item.value" ></el-option>
                        </el-select></div>
                    用户名:<input type="text" v-model="value4" name="username" style="width:100px">
                    <input type="checkbox" name="checkbox" :checked="checked">包含下级
                    <el-button type="text" icon="search" class="btnGreen3" size="small" @click.native.prevent="search">查询</el-button>
                </div>
    			<table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                        	<th>流水ID</th>
                            <th>用户名</th>
                            <th>订单ID</th>
                            <th>类型</th>
                            <th>盈亏</th>
                            <th>余额</th>
                            <th>时间</th>
                            <th>说明</th>
                        </tr>
                    </thead>
                    <tbody>
                    	<tr>
                    		<td colspan="7" v-if="show">暂无数据..</td>
                    	</tr>
                        <tr v-for="item in tabList">
                            <td><span v-text="item.id"></span></td>
                            <td><span v-text="item.username"></span></td>
                            <td><span v-text="item.orderId"></span></td>
                            <td><span v-text="item.typeDesc"></span></td>
                            <td><span v-text="item.changeMoney"></span></td>
                            <td><span v-text="item.moneyA"></span></td>
                            <td><span v-text="item.addTime"></span></td>
                            <td><span v-text="item.remark"></span></td>
                        </tr>
                    </tbody>
                </table>
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
    import { mapActions } from 'vuex'
	export default {
		data () {
			return {
				show: true,
				value1 : '',
                value2 : '',
                value3: '',
                value4: '',
                value5: '',
                checked: true,
                placeholder : '==类型==',
                options: [{
                    value: '-1',
                    label: '全部'
                }, {
                    value: '0',
                    label: '充值'
                }, {
                    value: '1',
                    label: '取款'
                }, {
                    value: '7',
                    label: '取款撤单'
                }, {
                    value: '6',
                    label: '管理员加减钱'
                }, {
                    value: '9',
                    label: '投注'
                }, {
                    value: '8',
                    label: '个人返点'
                }, {
                    value: '10',
                    label: '下级返点'
                }, {
                    value: '11',
                    label: '中奖'
                }, {
                    value: '12',
                    label: '中奖停追'
                }, {
                    value: '13',
                    label: '撤单'
                }, {
                    value: '14',
                    label: '佣金'
                }, {
                    value: '44',
                    label: '分红转入'
                }, {
                    value: '45',
                    label: '转入彩票'
                }, {
                    value: '46',
                    label: '转入棋牌'
                }],
                form : {
                	bDate : '2001-01-01',
                    eDate : '2016-10-20',
                    operaType : '-1',
                    username : '',
                    pageNumber: 1,
                    pageSize: 10,
                },
                tabList : [],
                totalRow: '0', 
		        pageSize: '0',
                firstPage: true, 
                lastPage: true,
			}
		},
		mounted :function(){
            this.value1 = new Date();
            this.value2 = new Date();
            this.search()
            this.value4 = this.$store.state.useraction.personCount ;
        },
        beforeDestroy () {
            this.setPersonCount('')
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
            ...mapActions({
                setPersonCount : 'setPersonCount',
            }),
			search () {
				var date = datePick(this.value1,this.value2);
                this.form.bDate =  this.value1.getFullYear() + '-' + date.month1 + '-' + date.day1;
                this.form.eDate =  this.value2.getFullYear() + '-' + date.month2 + '-' + date.day2;
                this.form.operaType = this.value3;
                this.form.username = this.value4;
                this.form.pageNumber = 1; 
                if (this.checked ==false) {
                    this.form.withChild = '0'
                } else if (this.checked ==true) {
                    this.form.withChild = '1'
                }
                api.ajax('team/pageTeamMoneyChange',this.form).then(data => {
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
                api.ajax('team/pageTeamMoneyChange',this.form).then(data => {
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
	a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }
    ul {
    	list-style: none;
    }
    input {
        outline: medium;
    }
    table {
    	border-collapse: collapse;
    }
    .datePicker {
        width: 120px;
    }
    .select {
        width: 135px ; 
        display: inline-block;
    }
    #thetable td a:hover {
        color: #ec0000;
        cursor: pointer;
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