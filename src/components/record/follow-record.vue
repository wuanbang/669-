<template>
    <div class="contentBox" style="z-index: 3">
        <div class="grey_box_top">
            <div class="grey_box_bottom">
                <div class="searchBar">
                    时间:从&nbsp;
                    <el-date-picker v-model="value1" type="date" class="myDate datePicker"></el-date-picker>
                    &nbsp;到&nbsp;
                    <el-date-picker v-model="value2" type="date" class="myDate datePicker"></el-date-picker>
                    &nbsp;彩种:
                    <div class="select">
                        <el-select v-model="value3" class="myDate" :placeholder="placeholder">
                            <el-option v-for="item in options" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </div>
                    追号编码:
                    <input type="text" v-model="value4" name="followNumber">
                    <el-button type="text" icon="search" class="btnGreen3" size="small" @click.native.prevent="search">查询</el-button>
                </div>
                <table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>追号编号</th>
                            <th>游戏</th>
                            <th>玩法</th>
                            <th>开始时间</th>
                            <th>开始期号</th>
                            <th>投注内容</th>
                            <th>追号总额</th>
                            <th>完成金额</th>
                            <th>中奖金额</th>
                            <th>追号期数</th>
                            <th>完成期数</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="12" v-if="show">暂无数据..</td>
                        </tr>
                        <tr v-for="item in tabList" @click.stop="openDialog(item.id)">
                            <td><span v-text="item.id"></span></td>
                            <td><span v-text="item.className"></span></td>
                            <td><span v-text="item.typeName"></span></td>
                            <td><span v-text="item.addTime"></span></td>
                            <td><span v-text="item.numTitle"></span></td>
                            <td>
                                <div style="width: 60px;margin-left:16px;white-space:nowrap;overflow: hidden;text-overflow:ellipsis;" v-text="item.orderValue" :title="item.orderValue">
                                </div>
                            </td>
                            <td><span v-text="item.amount"></span></td>
                            <td><span v-text="item.kjMoney"></span></td>
                            <td><span v-text="item.bingoMoney"></span></td>
                            <td><span v-text="item.actCount"></span></td>
                            <td><span v-text="item.kjCount"></span></td>
                            <td>
                                <span v-if="item.state == 0">进行中</span>
                                <span v-if="item.state == 1">完成</span>
                                <span v-if="item.state == 2">撤销</span>
                            </td>
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
        <!-- 订单详情弹框 -->
        <div style="margin:0px; z-index= 9999">
            <el-dialog custom-class="dialog-cus-cls-1" size="70%" top="5%" :title="title" v-model="dialogTableVisible" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape" @open="openHandle" @close="closeHandle" :modal="cancelModal">
                <component :is="followDetailView"></component>
            </el-dialog>
        </div>
    </div>
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
    import api from '../../api'
    import { datePick,errorMsg }from '../../tools/command'
    import followDetail from '../record/follow-detail'
    import orderDetail from '../record/order-detail'
    export default {
        components : {
            followDetail,
            orderDetail,
        },
        data(){
            return {
                show: true,
                value1 : '',
                value2 : '',
                placeholder : '==选择彩种==',
                options: [{
                    value: '-1',
                    label: '全部'
                }, {
                    value: '1',
                    label: '重庆彩'
                }, {
                    value: '2',
                    label: '江西彩'
                }, {
                    value: '3',
                    label: '龙江彩'
                }, {
                    value: '6',
                    label: '新疆彩'
                }, {
                    value: '7',
                    label: '天津彩'
                }, {
                    value: '8',
                    label: '广东11选5'
                }, {
                    value: '9',
                    label: '江西11选5'
                }, {
                    value: '10',
                    label: '山东11选5'
                }, {
                    value: '4',
                    label: '福彩3D'
                }, {
                    value: '5',
                    label: '排列3'
                }, {
                    value: '11',
                    label: '五分彩'
                }, {
                    value: '12',
                    label: '分分彩'
                }, {
                    value: '13',
                    label: '北京赛车PK10'
                }, {
                    value: '14',
                    label: '香港六合彩'
                }, {
                    value: '15',
                    label: '三分彩'
                }],
                value3: '',
                value4: '',
                form: {
                    bDate : '2001-01-01',
                    eDate : '2016-10-20',
                    classId : '-1',
                    pageNumber : 1,
                    followId : '',
                    pageSize : 10,
                },
                tabList : [],
                totalRow: '0',
                pageSize: '0',
                firstPage: true, 
                lastPage: true,
                dialogTableVisible : false,
                closeOnClickModal : false,
                closeOnPressEscape : false,
                cancelModal : false,
                title : '订单详情',
            }
        },
        mounted :function(){
            this.value1 = new Date();
            this.value2 = new Date();
            this.search()
            this.$root.$on("closeHandle-init",this.close)
        },
        beforeDestroy () {
            this.$root.$off("closeHandle-init",this.close)
        },
        computed :{
            followDetailView () {
                var dialog = this.$store.state.useraction.dialogView; 
                if (dialog == 'follow-detail') {
                    return "followDetail"
                } else if (dialog == 'order-detail') {
                    return "orderDetail"
                }
            },
            totalPage :function() {
                return parseInt(Math.ceil(this.totalRow))
            },
            page :function() {
                return parseInt(Math.ceil(this.pageSize))
            }
        },
        methods :{
            ...mapActions({
                setUserMsgId : 'setUserMsgId',
                setDialogView : 'setDialogView'
            }),
            search(){
                var date = datePick(this.value1,this.value2);
                this.form.bDate =  this.value1.getFullYear() + '-' + date.month1 + '-' + date.day1;
                this.form.eDate =  this.value2.getFullYear() + '-' + date.month2 + '-' + date.day2;
                this.form.classId = this.value3;
                this.form.followId = this.value4;
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
                    errorMsg("数据请求失败");
                })
            },
            openDialog(id){
                this.setUserMsgId(id);
                this.dialogTableVisible = true;
                this.title = "追号详情";
                var that = this;
                this.$nextTick(function(){
                    that.$root.$emit("follow-detail-init")
                })
                this.setDialogView('follow-detail')
            },
            openHandle(){
                console.log('openHandle')
            },
            closeHandle(){
                console.log('closeHandle')
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
                    errorMsg("数据请求失败");
                }) 
                console.log(`当前页: ${val}`);
            },
            close () {
                this.dialogTableVisible = false;
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
        width: 100px;
        margin-right: 5px;
    }
    .contentBox {
        position: relative;
    }
    .datePicker {
        width: 120px
    }
    .select {
        width:140px ; 
        display: inline-block;
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
