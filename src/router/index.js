import Vue from 'vue'
import VueRouter from 'vue-router'
import cookies from 'js-cookie'
import store from '../store/'
import { Message } from 'element-ui'

Vue.use(VueRouter)

const scrollBehavior = (to) => {
    const position = {}
    if (to.hash) {
        position.selector = to.hash
    }
    if (to.matched.some(mm => mm.meta.scrollToTop)) {
        position.x = 0
        position.y = 0
    }
    return position
}

const guardRoute = (to, from, next) => {
    let isLogin = store.state.user.isLogin
    if (!isLogin) {
        next('/')
    } else {
        next()
    }
}

const login = resolve => {
    require.ensure(['components/login/login.vue'], () => {
        resolve(require('components/login/login.vue'))
    }, 'user')
}

const loading = resolve => {
    require.ensure(['components/login/loading.vue'], () => {
        resolve(require('components/login/loading.vue'))
    }, 'user')
}

const register = resolve => {
    require.ensure(['components/login/register.vue'], () => {
        resolve(require('components/login/register.vue'))
    }, 'user')
}

const retrievePassword = resolve => {
    require.ensure(['components/login/retrieve-password.vue'], () => {
        resolve(require('components/login/retrieve-password.vue'))
    }, 'user')
}

const main = resolve => {
    require.ensure(['components/main/index.vue'], () => {
        resolve(require('components/main/index.vue'))
    }, 'main')
}
//邮件消息
const emailMessage = resolve => {
    require.ensure(['components/emailmessage/email-message.vue'], () => {
        resolve(require('components/emailmessage/email-message.vue'))
    }, 'emailmessage')
}
//充值提现
const account = resolve => {
    require.ensure(['components/account/account.vue'], () => {
        resolve(require('components/account/account.vue'))
    }, 'account')
}
const moneyIn = resolve => {
    require.ensure(['components/account/money-in.vue'], () => {
        resolve(require('components/account/money-in.vue'))
    }, 'account')
}
const moneyOut = resolve => {
    require.ensure(['components/account/money-out.vue'], () => {
        resolve(require('components/account/money-out.vue'))
    }, 'account')
}
const transfer = resolve => {
    require.ensure(['components/account/transfer.vue'], () => {
        resolve(require('components/account/transfer.vue'))
    }, 'account')
}
const inRecord = resolve => {
    require.ensure(['components/account/in-record.vue'], () => {
        resolve(require('components/account/in-record.vue'))
    }, 'account')
}
const outRecord = resolve => {
    require.ensure(['components/account/out-record.vue'], () => {
        resolve(require('components/account/out-record.vue'))
    }, 'account')
}
const transferRecord = resolve => {
    require.ensure(['components/account/transfer-record.vue'], () => {
        resolve(require('components/account/transfer-record.vue'))
    }, 'account')
}
//游戏记录
const record = resolve => {
    require.ensure(['components/record/record.vue'], () => {
        resolve(require('components/record/record.vue'))
    }, 'record')
}
const gameRecord = resolve => {
    require.ensure(['components/record/game-record.vue'], () => {
        resolve(require('components/record/game-record.vue'))
    }, 'record')
}
const lotteryBet = resolve => {
    require.ensure(['components/record/lottery-bet.vue'], () => {
        resolve(require('components/record/lottery-bet.vue'))
    }, 'record')
}
const orderDetail = resolve => {
    require.ensure(['components/record/order-detail.vue'], () => {
        resolve(require('components/record/order-detail.vue'))
    }, 'record')
}
const chessBet = resolve => {
    require.ensure(['components/record/chess-bet.vue'], () => {
        resolve(require('components/record/chess-bet.vue'))
    }, 'record')
}
const immortalBet = resolve => {
    require.ensure(['components/record/immortal-bet.vue'], () => {
        resolve(require('components/record/immortal-bet.vue'))
    }, 'record')
}
const followRecord = resolve => {
    require.ensure(['components/record/follow-record.vue'], () => {
        resolve(require('components/record/follow-record.vue'))
    }, 'record')
}
const followDetail = resolve => {
    require.ensure(['components/record/follow-detail.vue'], () => {
        resolve(require('components/record/follow-detail.vue'))
    }, 'record')
}
const changeRecord = resolve => {
    require.ensure(['components/record/change-record.vue'], () => {
        resolve(require('components/record/change-record.vue'))
    }, 'record')
}
const lotteryChange = resolve => {
    require.ensure(['components/record/lottery-change.vue'], () => {
        resolve(require('components/record/lottery-change.vue'))
    }, 'record')
}
const chessChange = resolve => {
    require.ensure(['components/record/chess-change.vue'], () => {
        resolve(require('components/record/chess-change.vue'))
    }, 'record')
}
const immortalChange = resolve => {
    require.ensure(['components/record/immortal-change.vue'], () => {
        resolve(require('components/record/immortal-change.vue'))
    }, 'record')
}
const personRecord = resolve => {
    require.ensure(['components/record/person-record.vue'], () => {
        resolve(require('components/record/person-record.vue'))
    }, 'record')
}
//团队管理
const manage = resolve => {
    require.ensure(['components/manage/manage.vue'], () => {
        resolve(require('components/manage/manage.vue'))
    }, 'manage')
}
const addMember = resolve => {
    require.ensure(['components/manage/add-member.vue'], () => {
        resolve(require('components/manage/add-member.vue'))
    }, 'manage')
}
const memberList = resolve => {
    require.ensure(['components/manage/member-list.vue'], () => {
        resolve(require('components/manage/member-list.vue'))
    }, 'manage')
}
const userAction = resolve => {
    require.ensure(['components/manage/user-action.vue'], () => {
        resolve(require('components/manage/user-action.vue'))
    }, 'manage')
}
const rebatePromote = resolve => {
    require.ensure(['components/manage/rebate-promote.vue'], () => {
        resolve(require('components/manage/rebate-promote.vue'))
    }, 'manage')
}
const rebateRecord = resolve => {
    require.ensure(['components/manage/rebate-record.vue'], () => {
        resolve(require('components/manage/rebate-record.vue'))
    }, 'manage')
}
const pointUpEdit = resolve => {
    require.ensure(['components/manage/point-up-edit.vue'], () => {
        resolve(require('components/manage/point-up-edit.vue'))
    }, 'manage')
}
const fenhongPromote = resolve => {
    require.ensure(['components/manage/fenhong-promote.vue'], () => {
        resolve(require('components/manage/fenhong-promote.vue'))
    }, 'manage')
}
const fenhongRecord = resolve => {
    require.ensure(['components/manage/fenhong-record.vue'], () => {
        resolve(require('components/manage/fenhong-record.vue'))
    }, 'manage')
}
const teamBet = resolve => {
    require.ensure(['components/manage/team-bet.vue'], () => {
        resolve(require('components/manage/team-bet.vue'))
    }, 'manage')
}
const teamLotteryBet = resolve => {
    require.ensure(['components/manage/team-lottery-bet.vue'], () => {
        resolve(require('components/manage/team-lottery-bet.vue'))
    }, 'manage')
}
const teamChessBet = resolve => {
    require.ensure(['components/manage/team-chess-bet.vue'], () => {
        resolve(require('components/manage/team-chess-bet.vue'))
    }, 'manage')
}
const teamImmortalBet = resolve => {
    require.ensure(['components/manage/team-immortal-bet.vue'], () => {
        resolve(require('components/manage/team-immortal-bet.vue'))
    }, 'manage')
}
const teamChange = resolve => {
    require.ensure(['components/manage/team-change.vue'], () => {
        resolve(require('components/manage/team-change.vue'))
    }, 'manage')
}
const teamLotteryChange = resolve => {
    require.ensure(['components/manage/team-lottery-change.vue'], () => {
        resolve(require('components/manage/team-lottery-change.vue'))
    }, 'manage')
}
const teamChessChange = resolve => {
    require.ensure(['components/manage/team-chess-change.vue'], () => {
        resolve(require('components/manage/team-chess-change.vue'))
    }, 'manage')
}
const teamImmortalChange = resolve => {
    require.ensure(['components/manage/team-immortal-change.vue'], () => {
        resolve(require('components/manage/team-immortal-change.vue'))
    }, 'manage')
}
const teamStatement = resolve => {
    require.ensure(['components/manage/team-statement.vue'], () => {
        resolve(require('components/manage/team-statement.vue'))
    }, 'manage')
}
const teamData = resolve => {
    require.ensure(['components/manage/team-data.vue'], () => {
        resolve(require('components/manage/team-data.vue'))
    }, 'manage')
}
const teamMessage = resolve => {
    require.ensure(['components/manage/team-message.vue'], () => {
        resolve(require('components/manage/team-message.vue'))
    }, 'manage')
}
const teamYk = resolve => {
    require.ensure(['components/manage/team-yk.vue'], () => {
        resolve(require('components/manage/team-yk.vue'))
    }, 'manage')
}
const teamFenhong = resolve => {
    require.ensure(['components/manage/team-fenhong.vue'], () => {
        resolve(require('components/manage/team-fenhong.vue'))
    }, 'manage')
}
const fenhongSum = resolve => {
    require.ensure(['components/manage/fenhong-sum.vue'], () => {
        resolve(require('components/manage/fenhong-sum.vue'))
    }, 'manage')
}
const fenhongSumDialog = resolve => {
    require.ensure(['components/manage/fenhong-sum-dialog.vue'], () => {
        resolve(require('components/manage/fenhong-sum-dialog.vue'))
    }, 'manage')
}
const transferBalance = resolve => {
    require.ensure(['components/manage/transfer-balance.vue'], () => {
        resolve(require('components/manage/transfer-balance.vue'))
    }, 'manage')
}
const dividendDetail = resolve => {
    require.ensure(['components/manage/dividend-detail.vue'], () => {
        resolve(require('components/manage/dividend-detail.vue'))
    }, 'manage')
}
const fenhongDavLog = resolve => {
    require.ensure(['components/manage/fenhong-dav-log.vue'], () => {
        resolve(require('components/manage/fenhong-dav-log.vue'))
    }, 'manage')
}
const fenhongMonthLog = resolve => {
    require.ensure(['components/manage/fenhong-month-log.vue'], () => {
        resolve(require('components/manage/fenhong-month-log.vue'))
    }, 'manage')
}
const fenhongMonthLogDetail = resolve => {
    require.ensure(['components/manage/fenhong-month-log-detail.vue'], () => {
        resolve(require('components/manage/fenhong-month-log-detail.vue'))
    }, 'manage')
}
const fenhongAgentList = resolve => {
    require.ensure(['components/manage/fenhong-agent-list.vue'], () => {
        resolve(require('components/manage/fenhong-agent-list.vue'))
    }, 'manage')
}
//帐号管理
const userAccount = resolve => {
    require.ensure(['components/useraccount/user-account.vue'], () => {
        resolve(require('components/useraccount/user-account.vue'))
    }, 'useraccount')
}
const userData = resolve => {
    require.ensure(['components/useraccount/user-data.vue'], () => {
        resolve(require('components/useraccount/user-data.vue'))
    }, 'useraccount')
}
const inMoney = resolve => {
    require.ensure(['components/useraccount/in-money.vue'], () => {
        resolve(require('components/useraccount/in-money.vue'))
    }, 'useraccount')
}
const outMoney = resolve => {
    require.ensure(['components/useraccount/out-money.vue'], () => {
        resolve(require('components/useraccount/out-money.vue'))
    }, 'useraccount')
}
const recordStat = resolve => {
    require.ensure(['components/useraccount/record-stat.vue'], () => {
        resolve(require('components/useraccount/record-stat.vue'))
    }, 'useraccount')
}
const changeLoginPsw = resolve => {
    require.ensure(['components/useraccount/change-login-psw.vue'], () => {
        resolve(require('components/useraccount/change-login-psw.vue'))
    }, 'useraccount')
}
const changeMoneyPsw = resolve => {
    require.ensure(['components/useraccount/change-money-psw.vue'], () => {
        resolve(require('components/useraccount/change-money-psw.vue'))
    }, 'useraccount')
}
const bindEmail = resolve => {
    require.ensure(['components/useraccount/bind-email.vue'], () => {
        resolve(require('components/useraccount/bind-email.vue'))
    }, 'useraccount')
}
const addCard = resolve => {
    require.ensure(['components/useraccount/add-card.vue'], () => {
        resolve(require('components/useraccount/add-card.vue'))
    }, 'useraccount')
}
const bindCardStep1 = resolve => {
    require.ensure(['components/useraccount/bind-card-step1.vue'], () => {
        resolve(require('components/useraccount/bind-card-step1.vue'))
    }, 'useraccount')
}
//系统公告
const notice = resolve => {
    require.ensure(['components/notice/notice.vue'], () => {
        resolve(require('components/notice/notice.vue'))
    }, 'notice')
}
const detail = resolve => {
    require.ensure(['components/notice/detail.vue'], () => {
        resolve(require('components/notice/detail.vue'))
    }, 'notice')
}
//活动信息
const activity = resolve => {
    require.ensure(['components/activity/activity.vue'], () => {
        resolve(require('components/activity/activity.vue'))
    }, 'activity')
}
const pointExchange = resolve => {
    require.ensure(['components/activity/point-exchange.vue'], () => {
        resolve(require('components/activity/point-exchange.vue'))
    }, 'activity')
}
const exchangeCash = resolve => {
    require.ensure(['components/activity/exchange-cash.vue'], () => {
        resolve(require('components/activity/exchange-cash.vue'))
    }, 'activity')
}
const exchangeRecord = resolve => {
    require.ensure(['components/activity/exchange-record.vue'], () => {
        resolve(require('components/activity/exchange-record.vue'))
    }, 'activity')
}
const yjPoint = resolve => {
    require.ensure(['components/activity/yj-point.vue'], () => {
        resolve(require('components/activity/yj-point.vue'))
    }, 'activity')
}
const yjDetailList = resolve => {
    require.ensure(['components/activity/yj-detail-list.vue'], () => {
        resolve(require('components/activity/yj-detail-list.vue'))
    }, 'activity')
}
const signUser = resolve => {
    require.ensure(['components/activity/sign-user.vue'], () => {
        resolve(require('components/activity/sign-user.vue'))
    }, 'activity')
}
const signDayLog = resolve => {
    require.ensure(['components/activity/sign-day-log.vue'], () => {
        resolve(require('components/activity/sign-day-log.vue'))
    }, 'activity')
}

const history = resolve => {
    require.ensure(['components/history/index.vue'], () => {
        resolve(require('components/history/index.vue'))
    }, 'history')
}


const router = new VueRouter({
    mode: 'hash',
    base: '/',
    scrollBehavior,
    routes: [
        { name:'index', path: '/', component: login },
        { name:'login', path: '/login', component: login },
        { name:'loading', path: '/loading', component: loading },
        { name:'history', path: '/history', component: history },
        { name:'regi', path: '/register', component: register},
        { name:'retrieve-password', path: '/retrieve-password', component: retrievePassword},
        { name:'main', path: '/main', component: main,
            children: [
                { name:'email-message', path: 'emailMessage', components:{ top : emailMessage } },
                { name:'account', path: 'account', components: {top : account }, children: [
                    { name:'money-in', path: 'moneyIn', components:{ account : moneyIn } },
                    { name:'money-out', path: 'moneyOut', components:{ account : moneyOut } },
                    { name:'transfer', path: 'transfer', components:{ account : transfer } },
                    { name:'in-record', path: 'inRecord', components:{ account : inRecord } },
                    { name:'out-record', path: 'outRecord', components:{ account : outRecord } },
                    { name:'transfer-record', path: 'transferRecord', components:{ account : transferRecord } },
                ] },
                { name:'notice', path: 'notice', components: {top : notice },children: [
                    { name:'detail',path: 'detail', components:{ notice : detail } },
                ] },
                { name:'record', path: 'record', components: {top : record }, children: [
                    { name:'game-record', path: 'gameRecord', components: { record : gameRecord },children: [
                        { name:'lottery-bet', path: 'lotteryBet', components: { gameRecord : lotteryBet},children: [
                            { name:'order-detail', path: 'orderDetail', components: { lotteryBet : orderDetail} },
                        ]},
                        { name:'chess-bet', path: 'chessBet', components: { gameRecord : chessBet} },
                        { name:'immortal-bet', path: 'immortalBet', components: { gameRecord : immortalBet} },
                    ] },
                    { name:'follow-record', path: 'followRecord', components: { record : followRecord },children: [
                        { name:'follow-detail', path: 'followDetail', components: { followRecord : followDetail} },
                    ] },
                    { name:'change-record', path: 'changeRecord', components: { record : changeRecord },children: [
                        { name:'lottery-change', path: 'lotteryChange', components: { changeRecord : lotteryChange} },
                        { name:'chess-change', path: 'chessChange', components: { changeRecord : chessChange} },
                        { name:'immortal-change', path: 'immortalChange', components: { changeRecord : immortalChange} },
                    ] },
                    { name:'person-record', path: 'personRecord', components: { record : personRecord} },
                ] },
                { name:'manage', path: 'manage', components: {top : manage }, children: [
                    { name:'add-member', path: 'addMember', components: { manage : addMember } },
                    { name:'member-list', path: 'memberList', components: { manage : memberList },children: [
                        { name:'user-action', path: 'userAction', components: { memberList : userAction },children: [
                            { name:'rebate-record', path: 'rebateRecord', components: { userAction : rebateRecord } },
                            { name:'rebate-promote', path: 'rebatePromote', components: { userAction : rebatePromote } },
                            { name:'point-up-edit', path: 'pointUpEdit', components: { userAction : pointUpEdit } },
                            { name:'fenhong-promote', path: 'fenhongPromote', components: { userAction : fenhongPromote } },
                            { name:'fenhong-record', path: 'fenhongRecord', components: { userAction : fenhongRecord } },
                        ] }
                    ] },
                    { name:'team-bet', path: 'teamBet', components: { manage : teamBet },children: [
                        { name:'team-lottery-bet', path: 'teamLotteryBet', components: { teamBet : teamLotteryBet } },
                        { name:'team-chess-bet', path: 'teamChessBet', components: { teamBet : teamChessBet } },
                        { name:'team-immortal-bet', path: 'teamImmortalBet', components: { teamBet : teamImmortalBet } },
                    ] },
                    { name:'team-change', path: 'teamChange', components: { manage : teamChange },children: [
                        { name:'team-lottery-change', path: 'teamLotteryChange', components: { teamChange : teamLotteryChange } },
                        { name:'team-chess-change', path: 'teamChessChange', components: { teamChange : teamChessChange } },
                        { name:'team-immortal-change', path: 'teamImmortalChange', components: { teamChange : teamImmortalChange } },
                    ] },
                    { name:'team-statement', path: 'teamStatement', components: { manage :teamStatement } },
                    { name:'team-data', path: 'teamData', components: { manage : teamData },children: [
                        { name:'team-message', path: 'teamMessage', components: { teamData : teamMessage } },
                        { name:'team-yk', path: 'teamYk', components: { teamData : teamYk } },
                    ] },
                    { name:'team-fenhong', path: 'teamFenhong', components: { manage : teamFenhong },children: [
                        { name:'fenhong-sum', path: 'fenhongSum', components: { teamFenhong : fenhongSum },children: [
                            { name:'fenhong-sum-dialog', path: 'fenhongSumDialog', components: { fenhongSum : fenhongSumDialog },children: [
                                { name:'transfer-balance', path: 'transferBalance', components: { fenhongSumDialog  : transferBalance } },
                                { name:'dividend-detail', path: 'dividendDetail', components: { fenhongSumDialog  : dividendDetail } },
                            ]} 
                        ] },
                        { name:'fenhong-dav-log', path: 'fenhongDavLog', components: { teamFenhong : fenhongDavLog } },
                        { name:'fenhong-month-log', path: 'fenhongMonthLog', components: { teamFenhong : fenhongMonthLog } },
                        { name:'fenhong-month-log-detail', path: 'fenhongMonthLogDetail', components: { teamFenhong : fenhongMonthLogDetail } },
                        { name:'fenhong-agent-list', path: 'fenhongAgentList', components: { teamFenhong : fenhongAgentList } },
                    ] },
                ] },
                { name:'user-account', path: 'userAccount', components: {top : userAccount }, children: [
                    { name:'user-data', path: 'userData', components: { userAccount : userData }, children: [
                        { name:'change-login-psw', path: 'changeLoginPsw', components: { userData : changeLoginPsw } },
                        { name:'change-money-psw', path: 'changeMoneyPsw', components: { userData : changeMoneyPsw } },
                        { name:'bind-email', path: 'bindEmail', components: { userData : bindEmail } },
                    ] },
                    { name:'in-money', path: 'inMoney', components: { userAccount : moneyIn } },
                    { name:'out-money', path: 'outMoney', components: { userAccount : moneyOut } },
                    { name:'record-stat', path: 'recordStat', components: { userAccount : personRecord } },
                    { name:'add-card', path: 'addCard', components: { userAccount : addCard } },
                    { name:'bind-card-step1', path: 'bindCardStep1', components: { userAccount : bindCardStep1 } },
                ] },
                { name:'activity', path: 'activity', components: { top : activity },children: [
                    { name:'point-exchange', path: 'pointExchange', components: { activity : pointExchange },children: [
                        { name:'exchange-cash', path: 'exchangeCash', components: { pointExchange : exchangeCash } },  
                    ] },
                    { name:'exchange-record', path: 'exchangeRecord', components: { activity : exchangeRecord } },
                    { name:'yj-point', path: 'yjPoint', components: { activity : yjPoint } },
                    { name:'yj-detail-list', path: 'yjDetailList', components: { activity : yjDetailList } },
                    { name:'sign-user', path: 'signUser', components: { activity : signUser } },
                    { name:'sign-day-log', path: 'signDayLog', components: { activity : signDayLog } },
                ] },
            ],  beforeEnter: guardRoute, meta: {requiresAuth: true }}
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.length > 0) {
       next()
   } else {
       next({name: "main"})
   }
})

router.afterEach((to, from, next) => {
    console.log('router.afterEach')
})

export default router
