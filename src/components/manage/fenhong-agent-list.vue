<template>
	<div class="contentBox" style="z-index: 3">
		<div class="grey_box_top">
			<div class="grey_box_bottom">
				<div class="searchBar">
                    代理ID:
                    <input type="text" v-model="value">
                    <el-button type="text" icon="search" class="btnGreen3" size="small" @click.native.prevent="search">查询</el-button>
                </div>
				<table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
	                <thead>
	                    <tr>
	                    	<th>总代ID</th>
	                        <th>总代帐号</th>
	                        <th>代理等级</th>
	                        <th>分红级别</th>
	                        <th>分红比例</th>
	                        <th>生效时间</th>
	                        <th>上月平均日量</th>
	                        <th>分红余额</th>
	                        <th>状态</th>
	                        <th>操作</th>
	                    </tr>
	                </thead>
	                <tbody>
	                	<tr>
	                		<td colspan="10" v-if="show">暂无数据..</td>
	                	</tr>
	                    <tr v-for="item in data">
                            <td><span v-text="item.userId"></span></td>
	                        <td><span v-text="item.username"></span></td>
	                        <td>代理</td>
	                        <td><span v-text="item.agentLevel"></span>级</td>
	                        <td><span v-text="item.rate"></span>%</td>
	                        <td><span v-text="item.effectiveDate"></span></td>
	                        <td><span v-text="item.pjRealTz"></span></td>
	                        <td><div v-text="item.balance" :title="item.balance" class="wid60"></div></td>
	                        <td>
                                <span v-if="item.isDisabled == 0">正常</span>
                                <span v-if="item.isDisabled == 1">禁用</span>
                            </td>
                            <td>
                                <a class="txtRed" @click.stop="operate(item.userId,item.agentLevel,item.rate)">操作</a>
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
        <!-- 用户操作弹框 -->
        <div style="margin:0px; z-index: 4">
            <el-dialog custom-class="dialog-cus-cls-1" size="70%" :title="title" v-model="dialogTableVisible" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape" @open="openHandle" @close="closeHandle" :modal="cancelModal">
                <component :is="userActionView"></component>
            </el-dialog>
        </div>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
    import { mapActions, mapGetters } from 'vuex'
    import { errorMsg } from '../../tools/command';
    import userAction from './user-action'
	export default {
        components: {
            userAction
        },
		data () {
			return {
				show: true,
				value : '',
                form : {
                	agentId: '1000',
                    pageNumber : 1,
                    pageSize : 10,
                },
                data : [],
                totalRow: '0', 
		        pageSize: '0',
                firstPage: true, 
                lastPage: true,
                red: false,
                green: false,
                dialogTableVisible : false,
                closeOnClickModal : false,
                closeOnPressEscape : false,
                lockScroll : true, 
                cancelModal : false,
                title : '用户操作',
			}
		},
        computed :{
            userActionView () {
                var dialog = this.$store.state.useraction.dialogView; 
                if (dialog == 'user-action') {
                    return "userAction"
                }
            },
            totalPage :function() {
                return parseInt(Math.ceil(this.totalRow))
            },
            page :function() {
                return parseInt(Math.ceil(this.pageSize))
            }
        },
		methods : {
            ...mapActions({
                setUserMsgId : 'setUserMsgId',
                setDirectAgent : 'setDirectAgent',
                setAgentLevel : 'setAgentLevel',
                setRate : 'setRate',
                setDialogView : 'setDialogView',
                setSecondView : 'setSecondView',
            }),
			search () {
                this.form.agentId = this.value;
                this.form.pageNumber = 1; 
                api.ajax('team/dividend/pageMemberList',this.form).then(data => {
                    if(data && data.code == '0'){
                    	this.show = false;
                        this.data = data.data.list;
                        this.totalRow = data.data.totalRow;
                        this.pageSize = data.data.pageSize;
                    } else {
                        alert(data.msg);
                    }
                }, error => {
                    errorMsg("数据请求失败")
                })
			},
            operate (userId,agentLevel,rate) {
                this.setUserMsgId(userId+'') ;
                this.dialogTableVisible = true;
                this.title = "用户操作";
                this.setDirectAgent('1')
                this.setAgentLevel(agentLevel+'')
                this.setRate(rate+'')
                var that = this ;
                this.$nextTick(function(){
                    that.$root.$emit("user-action-init")
                })
                this.setDialogView('user-action')
                this.setSecondView('fenhong-promote')
            },
            openHandle () {
                console.log('openHandle')
            },
            closeHandle () {
                console.log('closeHandle')
            },
			handleCurrentChange(val) {
                this.form.pageNumber = val;
                api.ajax('team/dividend/pageMemberList',this.form).then(data => {
                    if(data && data.code == '0'){
                        this.show = false;
                        this.data = data.data.list;
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
        text-decoration: underline;
        color: inherit;
        cursor: pointer;
    }
    ul {
    	list-style: none;
    }
    input {
        outline: medium;
        width: 100px;
        margin-right: 5px;
    }
    table {
    	border-collapse: collapse;
    }
    .contentBox {
        position: relative;
    }
    #thetable td div {
        word-break: keep-all;/* 不换行 */
        white-space: nowrap;/* 不换行 */
        overflow: hidden;/* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一 起使用。*/ 
        margin-left: 6px;
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
    .txtRed {
        text-decoration: underline;
    }
    .txtRed:hover {
        color: #ec0000;
        cursor: pointer;
    }
    .wid60 {
        width: 60px;
    }
</style>