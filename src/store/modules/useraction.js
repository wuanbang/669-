import {
	SET_DIAVIEW,
	SET_EVENTVIEW,
	SET_NEXTVIEW,
	SET_DIALOGVIEW,
	SET_SECONDVIEW,
	SET_DIALOGSECVIEW,
	SET_USERNAME,
	SET_USERID,
	SET_BALANCE,
	SET_COIN,
	SET_USERAGENCY,
	SET_DIRECTAGENCY,
	SET_AGENCYLEVEL,
	SET_RATE,
	SET_POINT,
	SET_USERMSGID,
	SET_ADDTIME,
	SET_CURRENTIP,
	SET_CURRENTTIME,
	SET_LASTLOGINIP,
	SET_LASTLOGINTIME,
	SET_PERSONCOUNT,
	SET_EXCHANGE,
	SET_MEMBERLIST,
    SET_NOTICEID,
    SET_CODE,
} from '../mutation-types'

const state = {
	diaView: '',
	eventView: '',
	nextView: '',
	dialogView: '',
	secondView: '',
	dialogSecView: '',
	username: '',
	userId: '',
	balance: '',
	coin: '',
	userAgent: '',
	directAgent: '',
	agentLevel: '',
	rate: '',
	point: '',
	addTime: '',
	currentIp: '',
	currentTime: '',
	lastLoginIp: '',
	lastLoginTime: '',
	personCount: '',
	id: '',
	integration: '',
	member: {},
    noticeId : '',
    code: '',
}

const mutations = {
	[SET_DIAVIEW](state,diaView) {
        state.diaView = diaView
    },
	[SET_EVENTVIEW](state, eventView) {
        state.eventView = eventView
    },
    [SET_NEXTVIEW](state, nextView) {
        state.nextView = nextView
    },
    [SET_DIALOGVIEW](state, dialogView) {
        state.dialogView = dialogView
    },
    [SET_SECONDVIEW](state, secondView) {
        state.secondView = secondView
    },
    [SET_DIALOGSECVIEW](state, dialogSecView) {
        state.dialogSecView = dialogSecView
    },
    [SET_USERAGENCY](state,userAgent) {
		state.userAgent = userAgent
	},
    [SET_DIRECTAGENCY](state,agent) {
		state.agent = agent
	},
	[SET_AGENCYLEVEL](state,agentLevel) {
		state.agentLevel = agentLevel
	},
	[SET_RATE](state,rate) {
		state.rate = rate
	},
    [SET_USERNAME](state,username) {
		state.username = username
	},
	[SET_USERID](state,userId) {
		state.userId = userId
	},
	[SET_BALANCE](state,balance) {
		state.balance = balance
	},
	[SET_COIN](state,coin) {
		state.coin = coin
	},
	[SET_POINT](state,point) {
		state.point = point
	},
	[SET_ADDTIME](state,addTime) {
		state.addTime = addTime
	},
	[SET_CURRENTIP](state,currentIp) {
		state.currentIp = currentIp
	},
	[SET_CURRENTTIME](state,currentTime) {
		state.currentTime = currentTime
	},
	[SET_LASTLOGINIP](state,lastLoginIp) {
		state.lastLoginIp = lastLoginIp
	},
	[SET_LASTLOGINTIME](state,lastLoginTime) {
		state.lastLoginTime = lastLoginTime
	},
	[SET_PERSONCOUNT](state,personCount) {
		state.personCount = personCount
	},
	[SET_USERMSGID](state,id) {
		state.id = id
	},
	[SET_EXCHANGE](state,integration) {
		state.integration = integration
	},
    [SET_MEMBERLIST](state,member) {
        state.member = member
    },	
    [SET_NOTICEID](state,id) {
		state.noticeId = id
	},
	[SET_CODE](state,code) {
		state.code = code
	},
}


export default {
	state,
	mutations
}
