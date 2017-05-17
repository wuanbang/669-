<template>
	<div class="contentBox" style="z-index: 3">
		<div class="grey_box_top">
			<div class="grey_box_bottom">
				<div class="searchBar" >
					用户名:<input type="text" name="txtUsername" v-model="txtUsername" class="input_txt">
					用户ID:<input type="text" name="txtUserId" v-model="txtUserId" class="input_txt">
					用户级别:<div class="select" style="width:75px">
						<el-select v-model="value1" class="myDate" :placeholder="placeholder1">
							<el-option v-for="item in options1" :label="item.label" :value="item.value" ></el-option>
						</el-select></div>
					<input type="checkbox" name="ckdIsOnline" class="v_mid">在线会员 余额:<div class="select" style="width:105px">
						<el-select v-model="value2" class="myDate" :placeholder="placeholder2">
							<el-option v-for="item in options2" :label="item.label" :value="item.value" ></el-option>
						</el-select></div>
					列表排序:<div class="select" style="width:117px">
						<el-select v-model="value3" class="myDate" :placeholder="placeholder3">
							<el-option v-for="item in options3" :label="item.label" :value="item.value" ></el-option>
						</el-select></div>
					<el-button type="text" icon="search" size="small" class="btnGreen3" @click.native.prevent="search">查询</el-button>
				</div>
				<div class="thetableTit">
					<div>
						<a @click.stop="refresh">
							<strong>{{username}}({{userId}})</strong>
						</a> > 
						<strong>{{showName}}</strong>
					</div>
				</div>
				<table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
					<thead>
						<tr>
							<th>用户名(ID)</th>
							<th>类型</th>
							<th>返点</th>
							<th>余额</th>
							<th>团队余额</th>
							<th>下级人数</th>
							<th>用户QQ</th>
							<th>状态</th>
							<th>在线</th>
							<th>注册时间</th>
							<th>最后登入</th>
							<th>团队数据</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colspan="12" v-if="showData">暂无数据..</td>
						</tr>
						<tr v-for="item in tabList">
							<td>
								<el-tooltip class="item" effect="light" content="点击查看下级用户列表" placement="right-start">
									<a @click.stop="checkoutsub(item.username,item.id)">{{item.username}}({{item.id}})</a>
								</el-tooltip>
							</td>
							<td>代理</td>
							<td><span v-text="item.point"></span></td>
							<td>
								<div class="numFixed" v-text="item.balance" :title="item.balance"></div>
							</td>
							<td>
								<div class="numFixed" v-text="item.teamBalance" :title="item.teamBalance"></div>
							</td>
							<td><span v-text="item.teamCount-1"></span></td>
							<td><span v-text="item.qq"></span></td>
							<td>
								<span v-if="item.isDisabled == '0'" >正常</span>
								<span v-else >禁用</span>
							</td>
							<td><img src="../../images/onLine.png"></td>
							<td><span v-text="item.addTime"></span></td>
							<td><span v-text="item.lastLoginTimeStr"></span></td>
							<td><a @click.stop="check(item.id)">查看</a></td>
							<td><a @click.stop="openDialog(item.id,item.isDirectAgent,item.agentLevel)">编辑</a></td>
							
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
        <div style="margin:0px; z-index: 9999 ">
            <el-dialog custom-class="dialog-cus-cls-1" size="70%" :title="title" v-model="dialogTableVisible" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape" @open="openHandle" @close="closeHandle" :modal="cancelModal">
                <component :is="userActionView"></component>
            </el-dialog>
        </div>
	</div>		
</template>
<script lang= "babel">
	import { mapActions } from 'vuex'
	import api from '../../api'
	import { errorMsg } from '../../tools/command';
	import userAction from './user-action'
	export default {
		components: {
			userAction
		},
		mounted : function() {
			this.username = this.$store.state.useraction.username;
			this.userId = this.$store.state.useraction.userId;
			this.search()
			this.$root.$on("closeHandle-init",this.close)
		},
		beforeDestroy () {
            this.$root.$off("closeHandle-init",this.close)
        },
		data () {
			return {
				username: '',
				userId: '',
				showName: '',
				showData: true,
				txtUsername: '',
				txtUserId: '',
				value1 :'',
				placeholder1 : '全部',
				options1 : [{
					value : '-1',
					label : '全部',
				}, {
					value : '1',
					label : '代理',
				}, {
					value : '0',
					label : '用户',
				}],
				value2 : '',
				placeholder2 : '全部',
				options2 : [{
					value : '-1',
					label : '全部',
				}, {
					value : '0',
					label : '无额用户',
				}, {
					value : '1',
					label : '有额用户',
				}],
				value3 : '',
				placeholder3 : '按注册时间',
				options3 : [{
					value : 'addTime',
					label : '按注册时间',
				}, {
					value : 'balance',
					label : '按余额',
				}],
				form: {
					orderby: 'addTime',
					hasmoney: '-1',
					userId: '',
					username: '',
					agentId: '',
					pageNumber: 1, 
					pageSize: 10,
				},
				tabList :[],
				totalRow: '0', 
		        pageSize : '0',
		        firstPage: true, 
                lastPage: true,
                red: true,
                green: true,
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
              	setEventView : 'setEventView',
              	setNextView : 'setNextView',
              	setDialogView : 'setDialogView',
              	setDirectAgent : 'setDirectAgent',
              	setAgentLevel : 'setAgentLevel',
              	setSecondView : 'setSecondView',
			}),
			search () {
				this.form.hasmoney = this.value2;
				this.form.orderby = this.value3;
				this.form.username = this.txtUsername;
				this.form.userId = this.txtUserId;
				this.form.pageNumber = 1; 
				api.ajax('team/member/pageUserList',this.form).then(data => {
					if(data && data.code == '0') {
						this.showData = false;
						this.tabList = data.data.list;
						this.totalRow = data.data.totalRow;
						this.pageSize = data.data.pageSize;
						this.form.agentId = '';
					} else {
						alert(data.msg);
					}
				},error => {
					this.showData = true;
					errorMsg("数据请求失败")
				})
			},
			refresh () {
				this.search();
				this.setEventView('member-list');
				this.showName = '';
			},
			checkoutsub (username,userId) {
				this.showName = username + '(' + userId + ')';
				this.form.agentId = userId + '';
				this.search();
				this.setEventView('member-list');
			},
			check (userId) {
				this.setUserMsgId(userId+'');
				var that = this;
				this.$nextTick(function(){
                    that.$root.$emit("team-message-init")
                })
                this.setEventView('team-data')
                this.setNextView('team-message')
			},
			openDialog (userId,directAgent,agentLevel) {
				this.setUserMsgId(userId+'') ;
				this.dialogTableVisible = true;
                this.title = "用户操作";
				this.setDirectAgent(directAgent+'')
				this.setAgentLevel(agentLevel+'')
                var that = this ;
                this.$nextTick(function(){
                	that.$root.$emit("user-action-init")
                })
                this.setDialogView('user-action')
                this.setSecondView('rebate-promote')
            },
            openHandle () {
                console.log('openHandle')
            },
            closeHandle () {
                console.log('closeHandle')
            },
			handleCurrentChange (val) {
                this.form.pageNumber = val
                api.ajax('team/member/pageUserList',this.form).then(data => {
					if(data && data.code == '0') {
						this.showData = false;
						this.tabList = data.data.list;
						this.totalRow = data.data.totalRow;
						this.pageSize = data.data.pageSize;
						this.form.agentId = '';
					} else {
						alert(data.msg);
					}
				},error => {
					this.showData = true;
					errorMsg("数据请求失败")
				})
                console.log(`当前页: ${val}`);
            },
            close(){
                this.dialogTableVisible = false;
            },
		},
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
    .contentBox {
    	position: relative;
    }
    .select { 
    	display: inline-block;
    }
	.input_txt {
		width: 65px;
	    height: 23px;
	    line-height: 23px;
	    margin: 0 5px;
	    padding: 0 3px;
	    border: solid 1px #ccc;
	    background: #fff;
	}
	.mid {
		vertical-align: middle;
	}
	.thetableTit {
	    height: 28px;
	    line-height: 28px;
	    padding: 0 10px;
	    border-bottom: solid 2px #ccc;
	    background: url(../../images/thBg.png) 0 0 repeat-x;
	}
	.thetableTit a:hover {
	    text-decoration: underline;
	}
	.thetableTit strong {
		color: #ec0000;
	}
	#thetable a {
	    text-decoration: underline;
	}
	#thetable a:hover {
	    color : #ec0000;
	    cursor: pointer;
	}
	.checkout {
		position:absolute; 
		top:130px; 
		left:130px;
		display:none;
		z-index: 3;
	}
	.checkout_1 {
		position:absolute; 
		top:130px; 
		left:130px;
		display: block;
		z-index: 3;
	}
	#thetable td .numFixed {
		width: 60px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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