<template>
    <div class="contentBox" style="z-index: 3">
        <div class="grey_box_top">
            <div class="grey_box_bottom">
                <table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>代理用户名</th>
                            <th>类型</th>
                            <th>收入/支出</th>
                            <th>下变化后余额</th>
                            <th>时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="5" v-if="show">暂无数据..</td>
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
    import { errorMsg } from '../../tools/command';
    export default {
        data(){
            return {
                show: true,
                form : {
                    bDate : '2001-01-01',
                    eDate : '2016-10-20',
                    classId : '-1',
                    status : '-1',
                    pageNumber: 1,
                    pageSize : 10
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
        mounted (){
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
        methods :{
            search(){
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
    }
    input {
        outline: medium;
    }
    select {
        outline: none;
    }
    .contentBox {
        width: 580px;
        height: 418px;
    }
    .grey_box_top {
    	padding-top: 1px;
    }
    #thetable {
        width: 580px;
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
</style>