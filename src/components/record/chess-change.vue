<template>
    <div class="contentBox">
        <div class="grey_box_top">
            <div class="grey_box_bottom">
                <div class="searchBar">
                    时间:从&nbsp;
                    <el-date-picker v-model="value1" type="date" class="myDate datePicker"></el-date-picker>
                    &nbsp;到&nbsp;
                    <el-date-picker v-model="value2" type="date" class="myDate datePicker"></el-date-picker>
                    &nbsp;操作类型:
                    <div class="select">
                        <el-select v-model="value3" class="myDate" :placeholder="placeholder">
                            <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <el-button type="text" icon="search" size="small" class="btnGreen3" @click.native.prevent="search">查询</el-button>
                </div>
                <table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>用户名</th>
                            <th>类型</th>
                            <th>变化金额</th>
                            <th>变化后金额</th>
                            <th>时间</th>
                            <th>说明</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="6" v-if="show">暂无数据..</td>
                        </tr>
                        <tr v-for="item in tabList">
                            <td><span v-text="item.username"></span></td>
                            <td><span v-text="item.typeDesc"></span></td>
                            <td><span v-text="item.changeCoin"></span></td>
                            <td><span v-text="item.coinA"></span></td>
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
    export default {
        data(){
            return {
                show: true,
                value1 : '',
                value2 : '',
                placeholder : '==类型==',
                options: [{
                    value: '-1',
                    label: '全部'
                }, {
                    value: '1',
                    label: '存款'
                }, {
                    value: '2',
                    label: '取款'
                }, {
                    value: '3',
                    label: '转出'
                }, {
                    value: '4',
                    label: '转入'
                }, {
                    value: '5',
                    label: '返点'
                }, {
                    value: '6',
                    label: '游戏输赢'
                }],
                value3: '',
                form : {
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
        methods :{
            search(){
                var date = datePick(this.value1,this.value2);
                this.form.bDate =  this.value1.getFullYear() + '-' + date.month1 + '-' + date.day1;
                this.form.eDate =  this.value2.getFullYear() + '-' + date.month2 + '-' + date.day2;
                this.form.operaType = this.value3;
                this.form.pageNumber = 1;
                api.ajax('record/pageCoinChange',this.form).then(data => {
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
                api.ajax('record/pageCoinChange',this.form).then(data => {
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
        width: 125px ; 
        display:inline-block ; 
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