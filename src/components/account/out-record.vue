<template>
    <div class="contentBox">
        <div class="grey_box_top">
            <div class="grey_box_bottom">
                <div class="searchBar">
                    充值时间:从&nbsp;
                    <el-date-picker v-model="value1" type="date" class="myDate datePicker"></el-date-picker>
                    &nbsp;到&nbsp;
                    <el-date-picker v-model="value2" type="date" class="myDate datePicker"></el-date-picker>
                    &nbsp;状态:&nbsp;
                    <div class="select">
                        <el-select v-model="value3" class="myDate" :placeholder="placeholder">
                            <el-option v-for="item in options" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </div>
                    <el-button type="text" icon="search" size="small" class="btnGreen3" @click.stop="search">查询</el-button>
                </div>
                <table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>订单号</th>
                            <th>提款帐号</th>
                            <th>提款金额</th>
                            <th>时间</th>
                            <th>状态</th>
                            <th>说明</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="7" v-if="show">暂无数据..</td>
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
    import { datePick,errorMsg }from '../../tools/command'
    import api from '../../api'
    export default {
        data(){
            return {
                show : true,
                value1 : '',
                value2 : '',
                placeholder: '==状态==',
                options: [{
                    value: '0',
                    label: '正常'
                }, {
                    value: '1',
                    label: '完成'
                }, {
                    value: '2',
                    label: '撤单'
                }],
                value3: '',
                form : {
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
                var date = datePick(this.value1,this.value2);
                this.form.bDate =  this.value1.getFullYear() + '-' + date.month1 + '-' + date.day1;
                this.form.bDate =  this.value2.getFullYear() + '-' + date.month2 + '-' + date.day2;
                this.form.classId = this.value3;
                this.form.pageNumber = 1; 
                api.ajax('record/pageLotteryFollow',this.form).then(data => {
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
                api.ajax('record/pageLotteryFollow',this.form).then(data => {
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
    * {
        margin: 0;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    .datePicker {
        width: 120px
    }
    .select {
        width: 110px ; 
        display: inline-block ; 
        margin-right: 10px;
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