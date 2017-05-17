<template>
    <div class="contentBox">
        <div class="grey_box_top">
            <div class="grey_box_bottom">
                <div class="searchBar">
                    时间:从&nbsp;
                    <el-date-picker v-model="value1" type="date" class="myDate datePicker"></el-date-picker>
                    &nbsp;到&nbsp;
                    <el-date-picker v-model="value2" type="date" class="myDate datePicker"></el-date-picker>
                    &nbsp;游戏:
                    <div class="select">
                        <el-select v-model="value3" class="myDate" :placeholder="placeholder">
                            <el-option v-for="item in options" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </div>
                    <el-button type="text" icon="search" size="small" class="btnGreen3" @click.native.prevent="search">查询</el-button>
                </div>
                <div class="scroll">
                <table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>游戏名称</th>
                            <th>房间名称</th>
                            <th>输赢</th>
                            <th>税收</th>
                            <th>游戏时长</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>游戏详情</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="7" v-if="show">暂无数据..</td>
                        </tr>
                        <tr v-for="item in tabList">
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
        data(){
            return {
                show: true,
                value1 : '',
                value2 : '',
                value3: '',
                placeholder : '==全部==',
                options: [{
                    value: '-1',
                    label: '全部'
                }, {
                    value: '1',
                    label: '百家乐'
                }, {
                    value: '2',
                    label: '牛牛'
                }],
                form : {
                    bDate : '2001-01-01',
                    eDate : '2016-10-20',
                    gameId : '',
                    pageNumber: 1,
                    pageSize : 10,
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
            this.value3 = '-1';
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
                var date = datePick(this.value1,this.value2);
                this.form.bDate =  this.value1.getFullYear() + '-' + date.month1 + '-' + date.day1;
                this.form.eDate =  this.value2.getFullYear() + '-' + date.month2 + '-' + date.day2;
                this.form.gameId = this.value3;
                this.form.pageNumber = 1;
                api.ajax('record/pageGameRecord',this.form).then(data => {
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
                api.ajax('record/pageGameRecord',this.form).then(data => {
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
        display: inline-block ; 
        margin-right: 10px;
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