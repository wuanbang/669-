<template>
    <div class="contenBox" style="z-index: 3">
        <div class="grey_box_top">
            <div class="grey_box_bottom">
                <div class="searchBar">
                    时间:从
                    <el-date-picker v-model="value1" type="date" class="myDate datePicker"></el-date-picker> 到
                    <el-date-picker v-model="value2" type="date" class="myDate datePicker"></el-date-picker>
                    彩种: <div class="select w140">
                        <el-select v-model="value3" class="myDate" :placeholder="placeholder1">
                            <el-option v-for="item in options1" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </div>
                    状态: <div class="select w105">
                        <el-select v-model="value4" class="myDate" :placeholder="placeholder2">
                            <el-option v-for="item in options2" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </div>
                    <el-button type="text" icon="search" size="small" class="btnGreen3" @click.native.prevent="search">查询</el-button>
                </div>
                <table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>订单号</th>
                            <th>游戏</th>
                            <th>玩法</th>
                            <th>下单时间</th>
                            <th>游戏期号</th>
                            <th>投注内容</th>
                            <th>总额</th>
                            <th>倍数</th>
                            <th>模式</th>
                            <th>状态</th>
                            <th>开奖号码</th>
                            <th>盈亏</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="13" v-if="show">暂无数据..</td>
                        </tr>
                        <tr v-for="item in tabList">
                            <td><span v-text="item.id"></span></td>
                            <td><span v-text="item.className"></span></td>
                            <td><span v-text="item.typeName"></span></td>
                            <td><span v-text="item.addTime"></span></td>
                            <td><span v-text="item.numTitle"></span></td>
                            <td>
                                <div v-if="item.typeName =='前二大小单双'" class="orderValue" v-text="filter(item.orderValue)" :title="filter(item.orderValue)"></div>
                                <div v-if="item.typeName =='后二大小单双'" class="orderValue" v-text="filter(item.orderValue)" :title="filter(item.orderValue)"></div>
                                <div v-if="item.typeName =='特码大小单双'" class="orderValue" v-text="filter(item.orderValue)" :title="filter(item.orderValue)"></div>
                                <div v-if="item.typeName !='前二大小单双' && item.typeName !='特码大小单双' && item.typeName !='后二大小单双'" class="orderValue" v-text="item.orderValue" :title="item.orderValue"></div>
                            </td>
                            <td><span v-text="item.amount"></span></td>
                            <td><span v-text="item.multiple"></span></td>
                            <td>
                                <span v-if="item.singleMoney >= 1">元</span>
                                <span v-if="item.singleMoney == 0.2">角</span>
                                <span v-if="item.singleMoney == 0.02">分</span>
                            </td>
                            <td>
                                <span v-if="item.bingoFlag == 0" class="isBingoRed">未开奖</span>
                                <span v-if="item.bingoFlag == 1" class="isBingoRed">已中奖</span>
                                <span v-if="item.bingoFlag == 2" class="isBingoGreen">未中奖</span>
                                <span v-if="item.bingoFlag == 3" class="isBingoRed">中奖停追</span>
                                <span v-if="item.bingoFlag == 4" class="isBingoGrey">已撤单</span>
                            </td>
                            <td><div v-text="item.openNum" :title="item.openNum" class="orderValue"></div></td>
                            <td>
                                <div v-if="item.resultMoney == 0" v-text="0" :title="0" class="resultMoneyRed"></div>
                                <div v-if="item.resultMoney > 0" v-text="item.resultMoney" :title="item.resultMoney" class="resultMoneyRed"></div>
                                <div v-if="item.resultMoney < 0" v-text="item.resultMoney" :title="item.resultMoney" class="resultMoneyGreen"></div>
                            </td>
                            <td><a @click.stop="openDialog(item.id)">详情</a> <a @click.stop="cancelorder(item.id)" v-if="item.bingoFlag == 0">撤单</a></td>
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
        <div style="margin:0px; z-index= 4">
            <el-dialog custom-class="dialog-cus-cls-1" size="70%" top="5%" :title="title" v-model="dialogTableVisible" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape" @open="openHandle" @close="closeHandle" :modal="cancelModal">
                <component :is="orderDetailView"></component>
            </el-dialog>
        </div>
    </div>
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
	import api from '../../api'
    import { datePick,exchange,succMsg,errorMsg }from '../../tools/command'
    import orderDetail from './order-detail'
    import followDetail from '../record/follow-detail'
    export default {
        components : {
            orderDetail,
            followDetail,
        },
        data(){
            return {
                show: true,
                value1 : '',
                value2 : '',
                value3: '',
                placeholder1 : '==选择彩种==',
                options1: [{
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
                value4: '',
                placeholder2 : '==全部==',
                options2: [{
                  value: '-1',
                  label: '全部'
                }, {
                  value: '0',
                  label: '未开奖'
                }, {
                  value: '1',
                  label: '已中奖'
                }, {
                  value: '2',
                  label: '未中奖'
                }, {
                  value: '3',
                  label: '中奖停追'
                }, {
                  value: '4',
                  label: '已撤单'
                }],
                form : {
                    bDate : '2001-01-01',
                    eDate : '2016-10-20',
                    classId : '-1',
                    status : '-1',
                    pageNumber: 1,
                    pageSize: 10,
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
        mounted () {
            this.value1 = new Date();
            this.value2 = new Date();
            this.search()
            this.$root.$on("closeHandle-init",this.close)
        },
        beforeDestroy () {
            this.$root.$off("closeHandle-init",this.close)
        },
        computed :{
            orderDetailView () {
                var dialog = this.$store.state.useraction.dialogView; 
                if (dialog == 'order-detail') {
                    return "orderDetail"
                } else if (dialog == 'follow-detail') {
                    return "followDetail"
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
                this.form.status = this.value4;
                this.form.pageNumber = 1; 
                api.ajax('record/pageLotteryBet',this.form).then(data => {
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
            filter (val) {
                return exchange(val)
            },
            handleCurrentChange(val) {
                this.form.pageNumber = val;
                api.ajax('record/pageLotteryBet',this.form).then(data => {
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
            openDialog(id){
                this.setUserMsgId(id);
                this.dialogTableVisible = true;
                this.title = "订单详情";
                var that = this;
                this.$nextTick(function(){
                    that.$root.$emit("order-detail-init")
                })
                this.setDialogView('order-detail')
            },
            cancelorder (id) {
                this.form.orderId = id;
                api.ajax('order/cancel',this.form).then(data => {
                    succMsg(data.msg)
                    this.search();
                }, error => {
                    errorMsg("数据请求失败");
                })
            },
            openHandle(){
                console.log('openHandle')
            },
            closeHandle(){
                console.log('closeHandle')
            },
            close(){
                this.dialogTableVisible = false;
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
    input {
        outline: medium;
    }
    select {
        outline: none;
    }
    .contentBox {
        position: relative;
    }
    .datePicker {
        width: 120px;
    }
    .select {
        display:inline-block ; 
        margin-right:10px ;
    }
    #thetable td div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    #thetable td a{
        text-decoration: underline;
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
    .orderValue {
        width: 60px;
    }
    .isBingoRed {
        color: #f00;
        font-weight: bold;
    }
    .isBingoGreen {
        color: #090;
        font-weight: bold;
    }
    .isBingoGrey {
        color: #888;
        font-weight: bold;
    }
    .resultMoneyRed {
        color: #f00;
        width: 40px;
    }
    .resultMoneyGreen {
        color: #090;
        width: 40px;
    }
    .w105 {
        width: 105px;
    }
    .w140 {
        width: 140px;
    }
</style>
