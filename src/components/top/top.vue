<template>
    <div>
      <div class="top">
          <div class="top-left"></div>
          <div class="top-right">
              <ul>
                  <li class="top-li1" v-popover:popover1>
                       <span class="top-li1-icon"></span><i>用户：{{userInfo.username}}</i>
                       <el-popover popper-class="pop-cus-class"
                          ref="popover1"
                          placement="bottom"
                          width="250"
                          trigger="hover">
                            <div class="tanBox1" >
                                <div class="tanBox1_top">
                                    <dl class="clearfix m-tb-0">
                                        <dt style="display: inline-block;">
                                            <img src="../../images/user_56x56.png">
                                        </dt>
                                        <dd style="display: inline-block;position: relative;top: -5px; margin-left: 10px;">
                                            <h2>
                                                <img src="../../images/onLine.png">{{userInfo.username}}</h2>
                                            <p>
                                                ID:{{userInfo.id}}
                                                (已注册{{userInfo.registerDays}}天)
                                            </p>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="tanBox1_mid">
                                    <ul class="tanUl m-tb-0">
                                        <li><span>用户类型</span><em>玩家</em></li>
                                        <li><span>上次登录时间</span><em>{{userInfo.lastLoginTime}}</em></li>
                                        <li><span>上次登录地点</span><em>{{userInfo.lastLoginIp}}</em></li>
                                    </ul>
                                </div>
                                <div class="tanBox1_foot m-t-10">
                                    <a href="javascript:void(0);" @click.stop="userDetail" class="tan1-left-but bot-button">账号详情</a>
                                    <a href="javascript:void(0);" @click.stop="changeUser" class="tan1-rigt-but bot-button">更换账号</a>
                                </div>
                            </div>
                        </el-popover>
                  </li>
                  <li class="top-li1" v-popover:popover2>
                      <span class="top-li2-icon"></span><i>余额：{{balance}}</i>
                      <el-popover popper-class="pop-cus-class"
                          ref="popover2"
                          placement="bottom"
                          width="200"
                          trigger="hover">
                          <div class="tanBox2">
                              <div class="tanBox2_top">
                                  <a href="javascript:void(0);" @click.stop="accountDetail" class="tab2-account-detail-but">账变详情</a>
                              </div>
                              <div class="tanBox2_mid">
                                  <ul class="tanUl">
                                      <li><span>平台余额</span>
                                          <em>
                                            <span>{{balance}}</span>
                                            <a title="点击刷新" class="hover" href="javascript:void(0);" @click.stop="refresh">刷新</a>
                                          </em>
                                      </li>
                                      <li><span></span><em></em></li>
                                      <li>
                                          <span>资金密码</span>
                                          <em v-if="userInfo.fundPwd == -1">未设置</em>
                                          <em v-if="userInfo.fundPwd == 0">未修改</em>
                                          <em v-else>已修改</em>
                                      </li>
                                      <li><span>今日提现次数</span><em id="todayqkcount">{{userInfo.moneyOutCountMe}}次/总{{userInfo.moneyOutCountAllow}}次</em></li>
                                      <li><span></span><em></em></li>
                                      <li><span>充值状态</span><em id="todaycztype" v-if="userInfo.lastMoneyIn == -1">未发现</em><em id="todaycztype" v-if="userInfo.lastMoneyIn == 0">未支付</em><em id="todaycztype" v-if="userInfo.lastMoneyIn == 1">已到账</em></li>
                                      <li><span>提现状态</span><em id="todayqktype" v-if="userInfo.lastMoneyOut == -1">未发现</em><em id="todayqktype" v-if="userInfo.lastMoneyOut == 0">审核中</em><em id="todayqktype" v-if="userInfo.lastMoneyOut == 1">已完成</em><em id="todayqktype" v-if="userInfo.lastMoneyOut == 2">已撤单</em></li>
                                  </ul>
                              </div>
                              <div class="tanBox2_foot">
                                  <a href="javascript:void(0);" @click.stop="moneyIn" class="tan2-left-but bot-button">充值</a>
                                  <a href="javascript:void(0);" @click.stop="moneyOut" class="tan2-rigt-but bot-button">提现</a>
                              </div>
                          </div>
                        </el-popover>
                  </li>
                  <li class="top-li1" v-popover:popover3>
                      <span class="top-li3-icon"></span><i>额度币：{{coin}}</i>
                      <el-popover popper-class="pop-cus-class"
                          ref="popover3"
                          placement="bottom"
                          width="180"
                          trigger="hover">
                          <div class="tanBox3">
                              <div class="tanBox3_top">
                                  <a href="javascript:void(0);" @click.stop="accountDetail" class="balance-currency-but">额度账变</a></div>
                              <div class="tanBox3_mid">
                                  <ul class="tanUl">
                                      <li><span>AG余额</span><em>{{coin}}</em></li>
                                      <li><span>棋牌余额</span><em><span>0</span>
                                       <a title="点击刷新" class="refa hover" href="javascript:void(0);" @click.stop="refresh">刷新</a>
                                      </em></li>
                                      <li><span>资金密码</span><em v-if="userInfo.fundPwd == -1">未设置</em>
                                          <em v-if="userInfo.fundPwd == 0">未修改</em>
                                          <em v-else>已修改</em></li>
                                  </ul>
                              </div>
                              <div class="tanBox3_foot">
                                  <a href="javascript:void(0);" @click.stop="moneyIn" class="tan3-left-but bot-button">充值</a>
                                  <a href="javascript:void(0);" @click.stop="moneyOut" class="tan3-rigt-but bot-button">提现</a>
                              </div>
                          </div>
                        </el-popover>
                  </li>
                  <li class="top-li1" v-popover:popover4>
                      <span class="top-li4-icon"></span><i>消息：{{unread}}</i><span class="new_ico" v-if="newEmails"
                      <el-popover popper-class="pop-cus-class"
                          ref="popover4"
                          placement="bottom"
                          width="400"
                          trigger="hover">
                          <div class="tanBox4">
                                  <div class="grey_box_foothd">
                                      <table id="theTable" width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <colgroup>
                                              <col width="30">
                                              <col width="30">
                                              <col width="60">
                                              <col width="">
                                              <col width="80">
                                          </colgroup>
                                          <thead>
                                              <tr>
                                                  <th>
                                                      <input name="" type="checkbox" @click.stop="checkAll" value="" id="all_mail" class="" style="margin-top:6px">
                                                  </th>
                                                  <th>
                                                      <img src="../../images/xin1.gif" class="m-t-3">
                                                  </th>
                                                  <th>
                                                      发件人
                                                  </th>
                                                  <th>
                                                      主题
                                                  </th>
                                                  <th>
                                                      时间
                                                  </th>
                                              </tr>
                                          </thead>
                                          <colgroup>
                                              <col width="30">
                                              <col width="30">
                                              <col width="60">
                                              <col width="">
                                              <col width="80">
                                          </colgroup>
                                          <tbody class="tbody" id="myEmail">
                                             <tr v-for="item in userMsg.list">
                                               <td class="td1">
                                                 <input name="" type="checkbox" value="" class="each_mail" style="margin-top:6px">
                                               </td>
                                               <td class="td1">
                                                 <img class="m-t-3" v-if="item.isRead ==1" src="../../images/xin3.gif">
                                                 <img class="m-t-3" v-else src="../../images/xin2.gif">
                                               </td>
                                               <td class="td1">{{item.senderName}}</td>
                                               <td class="td1">
                                                <div class="wid120">
                                                  <a class="emaila" @click.stop="openEmail(item.id,item.isRead)" v-text="item.title" :title="item.title"></a>
                                                </div>
                                               </td>
                                               <td class="td1 pd5">{{item.addTime}} </td>
                                             </tr>
                                          </tbody>
                                      </table>
                                  </div>
                                  <div class="tanBox4_page" >
                                    <a @click.stop="allEmails">全部</a>
                                    <a @click.stop="readEmails">已读</a>
                                    <a @click.stop="unreadEmails">未读</a>
                                    <!-- 分页 -->
                                    <div class="page clearfix">
                                        <div id="WebPager1">
                                            <el-pagination
                                                @current-change="handleCurrentChange"
                                                :page-size="page"
                                                layout="total, prev, pager, next, jumper"
                                                :total="totalPage"
                                                :current-page="form.pageNumber">
                                            </el-pagination>
                                        </div>
                                    </div>
                                  </div>
                                  <div class="tanBox4_foot" >
                                      <el-button size="small" @click.stop="deleteEmail" type="text" class='colorRed'>删除</el-button>
                                      <el-button size="small" type="text" class='colorRed' @click.stop="setEmailRead">全部标记已读</el-button></div>
                              </div>
                        </el-popover>
                  </li>
                  <li class="top-li5" @click.stop="logout">
                      <span class="top-li5-icon"></span><i>退出</i>
                  </li>
              </ul>
          </div>
      </div>
      <div class="top-menu">
          <div class="whiteLine"></div>
          <ul @click.stop="openDialog">
              <li class="li1">
                  <a class="hover" ><span></span>游戏大厅</a>
              </li>
              <li class="li2">
                  <a><span></span>充值提现</a>
              </li>
              <li class="li3">
                  <a><span></span>游戏记录</a>
              </li>
              <li class="li4">
                  <a><span></span>团队管理</a>
              </li>
              <li class="li5">
                  <a><span></span>账号管理</a>
              </li>
              <li class="li6">
                  <a><span></span>系统公告</a>
              </li>
              <li class="li7">
                  <a><span></span>活动信息</a>
              </li>
              <li class="li8">
                  <a href="http://Route.yinhu3399.me:17369/Route.aspx?ModID=1" target="_blank"><span></span>在线客服</a>
              </li>
          </ul>
          <div class="whiteLine"></div>
      </div>
      <div>
        <el-dialog custom-class="dialog-cus-cls" :title="title" v-model="dialogTableVisible" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape" @open="openHandle" @close="closeHandle">
           <component :is="dialogView"></component>
        </el-dialog>
      </div>
    </div>
</template>
<script lang="babel">

  import { mapActions } from 'vuex'
  import { errorMsg } from '../../tools/command'
  import api from '../../api'
  import emailMessage from '../emailmessage/email-message'
  import account from '../account/account'
  import moneyIn from '../account/money-in'
  import record from '../record/record'
  import gameRecord from '../record/game-record'
  import lotteryBet from '../record/lottery-bet'
  import manage from '../manage/manage'
  import addMember from '../manage/add-member'
  import userAccount from '../useraccount/user-account'
  import userData from '../useraccount/user-data'
  import notice from '../notice/notice'
  import activity from '../activity/activity'
  import pointExchange from '../activity/point-exchange'
	export default {
        components : {
          emailMessage,
          account,
          moneyIn,
          record,
          gameRecord,
          lotteryBet,
          manage,
          addMember,
          userAccount,
          userData,
          notice,
          activity,
          pointExchange,
        },
        mounted() {
          this.getData();
          var that = this;
          this.$root.$on("triggerNotice", this.triggerNotice)
          this.interval =  setInterval(function(){
            that.refresh()
          },60000)
        },
        beforeDestroy(){
           this.$root.$off("triggerNotice", this.triggerNotice)
          clearInterval(this.interval)
        },
        data(){
            return {
                interval: '',
                userInfo: {},
                balanceInfo: {},
                userMsg: {},
                countUnread: -1,
                visited: false,
                unvisited: true,
                newEmails: false,
                dialogTableVisible : false,
                closeOnClickModal : false,
                closeOnPressEscape : false,
                title : '充值提现',
                form: {
                  pageNumber: 1,
                  pageSize: 10,
                },
                totalRow: '0',
                pageSize: '0',
                firstPage: true,
                lastPage: true,
            }
        },

        computed: {
            unread () {
              return this.countUnread
            },
            balance () {
                return this.balanceInfo.balance
            },
            coin () {
              return this.balanceInfo.coin
            },
            dialogView () {
                var dialogs = this.$store.state.useraction.diaView;
                if (dialogs == 'email-message') {
                  return "emailMessage"
                } else if (dialogs == 'account') {
                  return "account"
                } else if (dialogs == 'record') {
                  return "record"
                } else if (dialogs == 'manage') {
                  return "manage"
                } else if (dialogs == 'user-account') {
                  return "userAccount"
                } else if (dialogs == 'notice') {
                  return "notice"
                } else if (dialogs == 'activity') {
                  return "activity"
                }
            },
            totalPage :function() {
                return parseInt(Math.ceil(this.totalRow))
            },
            page :function() {
                return parseInt(Math.ceil(this.pageSize))
            }
        },

         methods: {
                ...mapActions({
                  updateLoginStatus : 'updateLoginStatus',
                  setCurrentView : 'setCurrentView',
                  clearAllActivedLottery : 'clearAllActivedLottery',
                  setCurrentLottery : 'setCurrentLottery',
                  setDiaView : 'setDiaView',
                  setEventView : 'setEventView',
                  setNextView : 'setNextView',
                  setUsername : 'setUsername',
                  setUserId : 'setUserId',
                  setBalance : 'setBalance',
                  setCoin : 'setCoin',
                  setPoint : 'setPoint',
                  setAddTime : 'setAddTime',
                  setCurrentIp : 'setCurrentIp',
                  setCurrentTime : 'setCurrentTime',
                  setLastLoginIp : 'setLastLoginIp',
                  setLastLoginTime : 'setLastLoginTime',
                  setUserAgent : 'setUserAgent',
                  setAgentLevel : 'setAgentLevel',
                  setRate : 'setRate',
                  setUserMsgId : 'setUserMsgId',
                }),
                getData(){
                  api.ajax('user/findInfo',this.form).then(data =>{
                    this.userInfo = data.data;
                  },error =>{
                    errorMsg("数据请求失败")
                  })
                  api.ajax('refresh',this.form).then(data =>{
                    this.balanceInfo = data.data;
                    if(data.code != '0'){
                       return
                    }
                    this.countUnread = data.data.newMsgCount;
                    api.ajax('msg/list',this.form).then(data =>{
                      this.userMsg = data.data;
                      this.totalRow = data.data.totalRow;
                      this.pageSize = data.data.pageSize;
                    },error =>{
                    })
                  },error =>{
                    errorMsg("数据请求失败")
                  })
                },
                refresh(){
                  api.ajax('refresh',this.form).then(data =>{
                    this.balanceInfo = data.data;
                    if( data.data.newMsgCount !=  this.countUnread){
                      api.ajax('msg/list',this.form).then(data =>{
                        this.userMsg = data.data;
                        this.totalRow = data.data.totalRow;
                        this.pageSize = data.data.pageSize;
                      },error =>{
                        errorMsg("数据请求失败")
                      })
                    }
                    this.countUnread = data.data.newMsgCount;
                  },error =>{
                    errorMsg("数据请求失败")
                  })
                },
                userDetail(){
                  this.dialogTableVisible = true
                  this.setDiaView('user-account')
                  this.setEventView('user-data')
                },
                changeUser(){
                  this.logout()
                },
                moneyIn(){
                  this.dialogTableVisible = true
                  this.setDiaView('account')
                  this.setEventView('in')
                },
                moneyOut(){
                  this.dialogTableVisible = true
                  this.setDiaView('account')
                  this.setEventView('out')
                },
                checkAll () {
                  var checkall = document.getElementById('all_mail');
                  if (checkall.checked == true) {
                    for (var i = 0; i < document.getElementsByClassName('each_mail').length; i++) {
                      document.getElementsByClassName('each_mail')[i].checked = true;
                    }
                  } else {
                    for (var i = 0; i < document.getElementsByClassName('each_mail').length; i++) {
                      document.getElementsByClassName('each_mail')[i].checked = false;
                    }
                  }
                },
                openEmail(id,isRead){
                  this.setUserMsgId(id);
                  this.dialogTableVisible = true;
                  this.title = "邮件消息";
                  var that  = this;
                  this.$nextTick(function(){
                      that.$root.$emit("top-init")
                  })
                  this.setDiaView('email-message')
                },
                deleteEmail(){
                  var emailId = '';
                  for (var i = 0; i < document.getElementsByClassName('each_mail').length; i++) {
                      if(document.getElementsByClassName('each_mail')[i].checked == true){
                        emailId += this.userMsg.list[i].id + ',';
                      }
                    }
                  this.form.ids = emailId;
                  api.ajax('msg/delete',this.form).then(data =>{
                    this.getData();
                  },error =>{
                    errorMsg("数据请求失败")
                  })
                },
                setEmailRead(){
                  for (var i=0; i<this.userMsg.length; i++) {
                    this.userMsg[i].isRead = '1';
                  }
                  var emailId = '';
                  for (var i = 0; i < document.getElementsByClassName('each_mail').length; i++) {
                      if(document.getElementsByClassName('each_mail')[i].checked == true){
                        emailId += this.userMsg.list[i].id + ',';
                      }
                    }
                  this.form.ids = emailId;
                  api.ajax('msg/read',this.form).then(data =>{
                    this.getData();
                  },error =>{
                    errorMsg("数据请求失败")
                  })
                },
                allEmails(){
                  this.form.isRead = '';
                  api.ajax('msg/list',this.form).then(data =>{
                    this.userMsg = data.data;
                  },error =>{
                    errorMsg("数据请求失败")
                  })
                },
                readEmails(){
                  this.form.isRead = 1;
                  api.ajax('msg/list',this.form).then(data =>{
                    this.userMsg = data.data;
                  },error =>{
                    errorMsg("数据请求失败")
                  })
                },
                unreadEmails(){
                  this.form.isRead = 0;
                  api.ajax('msg/list',this.form).then(data =>{
                    this.userMsg = data.data;
                  },error =>{
                    errorMsg("数据请求失败")
                  })
                },
                handleCurrentChange(val) {
                  this.form.pageNumber = val;
                  api.ajax('msg/list',this.form).then(data =>{
                    this.userMsg = data.data;
                    this.totalRow = data.data.totalRow;
                    this.pageSize = data.data.pageSize;
                  },error =>{
                    errorMsg("数据请求失败")
                  })
                  console.log(`当前页: ${val}`);
                },
                logout(index){
                    this.updateLoginStatus(false)
                    this.clearAllActivedLottery()
                    this.setCurrentView("game")
                    this.setCurrentLottery('')
                    clearInterval(this.interval)
                    api.ajax('logout',this.form).then(data =>{
                      this.$router.push({name : "login"})
                    },error =>{
                      errorMsg("数据请求失败")
                    })
                },
                openDialog(event){
                    var srcElem = event.target
                    var clsName = ''
                    if(srcElem.tagName.toLowerCase() === 'span'){
                       clsName = srcElem.parentElement.parentElement.className
                    } else if(srcElem.tagName.toLowerCase() === 'a'){
                       clsName = srcElem.parentElement.className
                    }
                    var hash = location.hash
                    switch (clsName.toLowerCase()) {
                      case "li1":
                        this.setCurrentView('game')
                        break
                      case "li2":
                         this.dialogTableVisible = true
                         this.title = "充值提现"
                         if(hash && hash.indexOf("main/account") > -1){
                            let path = hash.slice(hash.lastIndexOf("/")+1)
                            this.$router.push({name : path})
                         }else {
                            this.setBalance(this.userInfo.balance)
                            this.setCoin(this.userInfo.coin)
                            this.setDiaView('account')
                            this.setEventView('in')
                         }
                         break
                      case "li3":
                         this.dialogTableVisible = true
                         this.title = "游戏记录"
                         if(hash && hash.indexOf("main/useraccount") > -1){
                            let path = hash.slice(hash.lastIndexOf("/")+1)
                            this.$router.push({name : path})
                         }else {
                            this.setDiaView('record')
                            this.setEventView('game-record');
                            this.setNextView('lottery-bet');
                         }
                        break
                      case "li4":
                         this.dialogTableVisible = true
                         this.title = "团队管理"
                         if(hash && hash.indexOf("main/useraccount") > -1){
                            let path = hash.slice(hash.lastIndexOf("/")+1)
                            this.$router.push({name : path})
                         }else {
                            this.setDiaView('manage')
                            this.setEventView('add-member');
                            this.setUsername(this.userInfo.username)
                            this.setUserId(this.userInfo.id)
                            this.setUserMsgId(this.userInfo.id)
                            this.setPoint(this.userInfo.point)
                            this.setUserAgent(this.userInfo.isDirectAgent)
                            this.setAgentLevel(this.userInfo.agentLevel)
                            this.setRate(this.userInfo.rate)
                         }
                        console.log(clsName.toLowerCase())
                        break
                      case "li5":
                         this.dialogTableVisible = true
                         this.title = "帐号管理"
                         if(hash && hash.indexOf("main/useraccount") > -1){
                            let path = hash.slice(hash.lastIndexOf("/")+1)
                            this.$router.push({name : path})
                         }else {
                            this.setDiaView('user-account')
                            this.setEventView('user-data');
                            this.setUsername(this.userInfo.username)
                            this.setUserId(this.userInfo.id)
                            this.setPoint(this.userInfo.point)
                            this.setAddTime(this.userInfo.addTime)
                            this.setCurrentIp(this.userInfo.currentIp)
                            this.setCurrentTime(this.userInfo.currentTime)
                            this.setLastLoginIp(this.userInfo.lastLoginIp)
                            this.setLastLoginTime(this.userInfo.lastLoginTime)
                            this.setUserAgent(this.userInfo.isDirectAgent)
                         }
                        console.log(clsName.toLowerCase())
                        break
                      case "li6":
                         this.dialogTableVisible = true
                         this.title = "系统公告"
                         this.setDiaView('notice')
                        console.log(clsName.toLowerCase())
                        break
                      case "li7":
                         this.dialogTableVisible = true
                         this.title = "活动信息"
                         if(hash && hash.indexOf("main/useraccount") > -1){
                            let path = hash.slice(hash.lastIndexOf("/")+1)
                            this.$router.push({name : path})
                         }else {
                            this.setDiaView('activity')
                            this.setEventView('point-exchange')
                         }
                       console.log(clsName.toLowerCase())
                        break
                      default:
                        console.log(clsName.toLowerCase())
                        break
                    }
                },
                openHandle(){
                    console.log('openHandle')
                },
                closeHandle(){
                  this.dialogTableVisible = false
                  this.setDiaView('account')
                  this.setNextView('lottery-bet')
                  this.refresh()
                },
                accountDetail(){
                    this.dialogTableVisible = true
                    this.setDiaView('record')
                    this.setEventView('change-record')
                    this.setNextView('lottery-change')

                },
                triggerNotice(){
                  this.dialogTableVisible = true
                  this.title = "系统公告"
                  this.setDiaView('notice')
                }
            }
	}
</script>
<style type="text/css" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .top {
        width: 1000px;
        height: 80px;
        position: relative;
        margin: 0px auto;
    }

    .top-left {
        width: 210px;
        height: 60px;
        position: absolute;
        top: 10px;
        left: 0;
        background: url(../../images/logo.png) 0 0 no-repeat;
    }
    .hover:hover {
      text-decoration: underline;
    }
    .top-right {
        float: right;
        padding-top: 15px;
    }
    .tanBox4_page {
      height: 22px;
      line-height: 27px;
      padding: 7px 5px 12px 10px;
    }
    .tanBox4_page a {
      color: #ce0000;
      text-decoration: none;
      cursor: pointer;
    }
    .tanBox4_page a:hover {
      text-decoration: underline;
    }
    .tanBox4_foot {
      padding: 10px 10px 0 10px;
      border-top: solid 1px #eee;
    }
    #theTable thead th {
      height: 26px;
      line-height: 26px;
      font-size: 13px;
      text-align: center;
      border-bottom: solid 1px #e1e1e1;
      background: url(../../images/tableLine.gif) right top repeat-y;
    }
    #theTable td div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .wid120 {
      width: 120px;
    }
    #myEmail .td1 {
      height: 26px;
      line-height: 26px;
      font-size: 13px;
      text-align: center;
      white-space: nowrap;
      background: url(../../images/tableLine.gif) right top repeat-y;
    }
    .pd5 {
      padding: 0 5px;
    }
    .emails {
      text-decoration: underline;
      cursor: pointer;
    }
    .emails:hover {
      color: #ec0000;
    }
    #myEmail tr:nth-child(2n) {
        background: #f7f7f7;
    }
    #myEmail tr:hover {
        background: #e5e5e5;
    }
    .colorRed {
        background: #ec0000;
        color: #fff;
        border-radius: 5px;
        padding: 5px ;
    }
    .colorRed:hover {
        background: #fc0000;
    }

    ul {
        list-style: none;
        padding-left: 0;
    }

    ul li i { font-size: 14px; color: #fff; font-style: normal; cursor: pointer; font-family: "Microsoft YaHei";}

    .top-li1 {
        float: left;
        height: 24px;
        line-height: 24px;
        margin: 0 10px;
        padding-right: 22px;
        background: url(../../images/arrowDown.gif) right center no-repeat;
    }

    .top-li5 {
        float: left;
        height: 24px;
        line-height: 24px;
        margin: 0 10px;
        margin-right: 0;
        padding-right: 0;
        background: none;
    }

    .top-li1-icon {
        background: url(../../images/topIco1.png) 0 0 no-repeat;
    }
    .top-li2-icon {
        background: url(../../images/topIco2.png) 0 0 no-repeat;
    }
    .top-li3-icon {
        background: url(../../images/topIco3.png) 0 0 no-repeat;
    }
    .top-li4-icon {
        background: url(../../images/topIco4.png) 0 0 no-repeat;
    }
    .top-li5-icon {
        background: url(../../images/topIco5.png) 0 0 no-repeat;
    }
    .new_ico {
      width: 23px;
      height: 12px;
      display: inline-block;
      background: url(../../images/new.gif) 0 0 no-repeat;
      position: absolute;
      top: 15px;
      left: 860px;
    }
    .top-right ul li span:nth-child(1) {
        float: left;
        width: 24px;
        height: 24px;
        margin-right: 8px;
        display: inline-block;
    }

    .whiteLine {
        height: 1px;
        margin: 0;
        padding: 0;
        border: 0;
        background: url(../../images/nav.png) 0 0 repeat-x;
    }

    .top-menu {
        width: 1000px;
        height: 50px;
        position: relative;
        margin: 0px auto;
    }
    .top-menu ul {
        height: 48px;
        line-height: 48px;
        font-size: 16px;
        color: #fff;
        font-family: "Microsoft YaHei";
        margin-bottom: 0px;
        margin-top: 0px;
    }

    .top-menu ul li {
        float: left;
        width: 125px;
        text-align: center;
    }
    .top-menu ul li a.hover, .top-menu ul li a:hover {
        text-decoration: none;
        background: url(../../images/nav.png) 0 0 repeat;
        cursor: pointer;
    }

    .top-menu ul li a {
        width: 100%;
        height: 48px;
        display: block;
        color: #fff;
    }

    .top-menu ul li a span {
        width: 30px;
        height: 30px;
        margin-right: 4px;
        display: inline-block;
        vertical-align: middle;
        _vertical-align: baseline;
    }

    .top-menu ul li.li1 a span {
        background: url(../../images/navIco1.png) 0 0 no-repeat;
    }
    .top-menu ul li.li2 a span {
        background: url(../../images/navIco2.png) 0 0 no-repeat;
    }
    .top-menu ul li.li3 a span {
        background: url(../../images/navIco3.png) 0 0 no-repeat;
    }
    .top-menu ul li.li4 a span {
        background: url(../../images/navIco4.png) 0 0 no-repeat;
    }
    .top-menu ul li.li5 a span {
        background: url(../../images/navIco5.png) 0 0 no-repeat;
    }
    .top-menu ul li.li6 a span {
        background: url(../../images/navIco6.png) 0 0 no-repeat;
    }
    .top-menu ul li.li7 a span {
        background: url(../../images/navIco7.png) 0 0 no-repeat;
    }
    .top-menu ul li.li8 a span {
        background: url(../../images/navIco8.png) 0 0 no-repeat;
    }

    .tanUl {
        border-top: solid 1px #eee;
        position: relative;
    }

    .tanUl li {
        height: 25px;
        line-height: 25px;
        padding: 0;
        border-bottom: solid 1px #eee;
    }
    .m-tb-0 {
        margin-bottom: 0;
        margin-top: 0;
    }
    .f-r {
        float: right;
    }
    .tanUl li em {
        float: right;
        color: #888;
        font-style: normal;
    }
    .tan1-left-but {
        float: left;
        width: 100px;
        margin-left: 15px;
        margin-top: 10px;
    }

    .tan1-rigt-but {
        float: right;
        width: 100px;
        margin-right: 15px;
        margin-top: 10px;
    }
    .tab2-account-detail-but {
        text-decoration: none;
        color: white;
        background-color: red;
        display: block;
        text-align: center;
        height: 20px;
        padding-top: 5px;
        border-radius: 12px;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

     .tan2-left-but {
        float: left;
        width: 90px;
        margin-left: 0;
    }

    .tan2-rigt-but {
        float: right;
        width: 90px;
        margin-right: 0;
    }

    .balance-currency-but {
        display: block;
        text-align: center;
        background-color: red;
        padding: 5px 0;
        border-radius: 11px;
        margin: auto 5px;
        color: white;
    }

     .tan3-left-but {
        float: left;
        width: 85px;
        margin-left: 0;
    }

    .tan3-rigt-but {
        float: right;
        width: 85px;
        margin-right: 0;
    }

    .bot-button {
        text-decoration: none;
        display: inline-block;
        height: 20px;
        margin-top: 0;
        background-color: #D3DCE6;
        text-align: center;
        padding-top: 5px;
        border-radius: 5px;
        color: black;
    }
    .bot-button:hover {
      text-decoration: underline;
    }

    .m-t-10 {
        margin-top: 10px;
    }
    .m-t-3 {
        margin-top: 3px;
    }
    .page {
        display: inline-block;
    }
</style>
