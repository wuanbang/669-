<template>
	<div class="contentBox">
		<div class="grey_box_top">
			<div class="grey_box_bottom">
				<div class="searchBar">
                   	时间:从 <el-date-picker v-model="value1" type="date" class="myDate datePicker"></el-date-picker> 到 
                    <el-date-picker v-model="value2" type="date" class="myDate datePicker"></el-date-picker>
                   	排序内容: <div class="select" style="width:105px">
                        <el-select v-model="value3" class="myDate" :placeholder="placeholder1">
                            <el-option v-for="item in options1" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </div>
                   	排序升降: <div class="select" style="width:75px">
                        <el-select v-model="value4" class="myDate" :placeholder="placeholder2">
                            <el-option v-for="item in options2" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </div>
                    用户名: <input type="text" v-model="value5" name="username">
                    <el-button type="text" icon="search" class="btnGreen3" size="small" @click.native.prevent="search">查询</el-button>
                </div>
    			<table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                        	<th>用户名</th>
                            <th>充值</th>
                            <th>取款</th>
                            <th>彩票投注</th>
                            <th>彩票返点</th>
                            <th>棋牌返点</th>
                            <th>佣金</th>
                            <th>彩票盈亏</th>
                            <th>棋牌盈亏</th>
                            <th>真人盈亏</th>
                            <th>总盈亏</th>
                            <th>变帐明细</th>
                        </tr>
                    </thead>
                    <tbody>
                    	<tr>
                    		<td colspan="12" v-if="show">暂无数据..</td>
                    	</tr>
                        <tr v-for="item in data">
                            <td><span v-text="item.username"></span></td>
                            <td>
                                <div v-text="item.cz" :title="item.cz" class="wid40"></div>
                            </td>
                            <td>
                                <div v-text="item.qk" :title="item.qk" class="wid40"></div>
                            </td>
                            <td>
                                <div v-text="item.realTz" :title="item.realTz" class="wid60"></div>
                            </td>
                            <td>
                                <div v-text="(item.pointMoney+item.pointMoneyAgent)" :title="(item.pointMoney+item.pointMoneyAgent)" class="wid60"></div>
                            </td>
                            <td>
                                <div v-text="item.gamePointMoney" :title="item.gamePointMoney" class="wid60"></div>
                            </td>
                            <td>
                                <div v-text="item.yj" :title="item.yj" class="wid40"></div>
                            </td>
                            <td>
                                <div v-if="item.cpyk ==0" :title="0" class="numRed wid60">0</div>
                                <div v-if="item.cpyk >0" v-text="item.cpyk" :title="item.cpyk" class="numRed wid60"></div>
                                <div v-if="item.cpyk <0" v-text="item.cpyk" :title="item.cpyk" class="numGreen wid60"></div>
                            </td>
                            <td>
                                <div v-if="item.qpyk ==0" :title="0" class="numRed wid60">0</div>
                                <div v-if="item.qpyk >0" v-text="item.qpyk" :title="item.qpyk" class="numRed wid60"></div>
                                <div v-if="item.qpyk <0" v-text="item.qpyk" :title="item.qpyk" class="numGreen wid60"></div>
                            </td>
                            <td>
                                <div v-if="item.zryk ==0" :title="0" class="numRed wid60">0</div>
                                <div v-if="item.zryk >0" v-text="item.zryk" :title="item.zryk" class="numRed wid60"></div>
                                <div v-if="item.zryk <0" v-text="item.zryk" :title="item.zryk" class="numGreen wid60"></div>
                            </td>
                            <td>
                                <div v-if="item.cpyk+item.qpyk+item.zryk ==0" :title="0" class="numRed wid50">0</div>
                                <div v-if="item.cpyk+item.qpyk+item.zryk >0" v-text="(item.cpyk+item.qpyk+item.zryk)" :title="(item.cpyk+item.qpyk+item.zryk)" class="numRed wid50"></div>
                                <div v-if="item.cpyk+item.qpyk+item.zryk <0" v-text="(item.cpyk+item.qpyk+item.zryk)" :title="(item.cpyk+item.qpyk+item.zryk)" class="numGreen wid50"></div>
                            </td>
                            <td><a @click.stop="personAccount(item.username)">个人</a> <a @click.stop="teamAccount(item.username)">团队</a></td>
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
                placeholder1 : '投注',
                options1: [{
                    value: 'cz',
                    label: '充值'
                }, {
                    value: 'qk',
                    label: '取款'
                }, {
                    value: 'realTz',
                    label: '投注'
                }, {
                    value: 'tzyk',
                    label: '彩票盈亏'
                }, {
                    value: 'qpyk',
                    label: '棋牌盈亏'
                }],
                placeholder2: '降序',
                options2: [{
                	value: 'desc',
                    label: '降序'
                }, {
                	value: 'asc',
                    label: '升序'
                }],
                form : {
                	bDate : '2001-01-01',
                    eDate : '2016-10-20',
                    username : '',
                    pageNumber: 1,
                    pageSize: 10,
                },
                data : [],
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
            this.value3 = 'cz'
            this.value4 = 'desc'
            this.search()
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
                setEventView : 'setEventView',
                setNextView : 'setNextView',
                setPersonCount : 'setPersonCount',
            }),
			search () {
				var date = datePick(this.value1,this.value2);
                this.form.bDate =  this.value1.getFullYear() + '-' + date.month1 + '-' + date.day1;
                this.form.eDate =  this.value2.getFullYear() + '-' + date.month2 + '-' + date.day2;
                this.form.orderBy = this.value3;
                this.form.order = this.value4;
                this.form.username = this.value5;
                this.form.pageNumber = 1;
                api.ajax('team/pageTeamReport',this.form).then(data => {
                    if(data && data.code == '0'){
                    	this.show = false;
                        this.data = data.data.list;
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
                api.ajax('team/findTeamReport',this.form).then(data => {
                    if(data && data.code == '0'){
                        this.show = false;
                        this.data = data.data.list;
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
            personAccount (username) {
                this.setEventView('team-change')
                this.setNextView('team-lottery-change')
                this.setPersonCount(username)
            },
            teamAccount (username) {
                this.personAccount(username) 
            },
		}
	}
</script>
<style scoped>
	a {
        text-decoration: underline;
        color: inherit;
        cursor: pointer;
    }
    ul {
    	list-style: none;
    }
    input {
        width: 100px;
        outline: medium;
    }
    table {
    	border-collapse: collapse;
    }
    .datePicker {
        width: 120px;
    }
    .select {
        display: inline-block;
    }
    #thetable td div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 16px;
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
    .wid40 {
        width: 40px;
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