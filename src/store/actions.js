/* global document, window */

import * as types from './mutation-types'
import api from '../api'


export const updateUsername = ({ commit, rootState }, data) => {
        commit(types.USER_USERNAME, data)
}

export const updateLoginStatus = ({ commit, state, rootState }, data) => {
        commit(types.USER_ISLOGIN, data)
}

export const setLoading = ({ commit, state, rootState }, data) => {
        commit(types.SET_LOADING, data)
}

export const setActivedLottery = ({ commit, state, rootState }, data) => {
        commit(types.LOTTERY_UNSHIFT, data)
}

export const setCurrentView = ({ commit, state, rootState }, data) => {
        commit(types.SET_CURRENTVIEW, data)
}

export const setCurrentLottery = ({ commit, state, rootState }, data) => {
        commit(types.SET_CURRENTLOTTERY, data)
}

export const clearAllActivedLottery = ({ commit, state, rootState }, data) => {
        commit(types.CLEARALL_LOTTERY, data)
}

export const setPlayMethod = ({ commit, state, rootState }, data) => {
        commit(types.SET_PLAY_METHOD, data)
}

export const setPlayMethodType = ({ commit, state, rootState }, data) => {
        commit(types.SET_PLAY_METHOD_TYPE, data)
}

export const clearSelected = ({ commit, state, rootState }, data) => {
        commit(types.CLEAR_SELECTED, data)
}

export const setSelected = ({ commit, state, rootState }, data) => {
        commit(types.SET_SELECTED, data)
}

export const setCurbetting = ({ commit, state, rootState }, data) => {
        commit(types.SET_CURBETTING, data)
}

export const clearBetting = ({ commit, state, rootState }, data) => {
        commit(types.CLEAR_CURBETTING, data)
}

export const setBetList = ({ commit, state, rootState }, data) => {
        commit(types.SET_BETLIST, data)
}

export const clearBetList = ({ commit, state, rootState }, data) => {
        commit(types.CLEAR_BETLIST, data)
}

export const setDiaView = ({ commit, state, rootState }, data) => {
        commit(types.SET_DIAVIEW, data)
}

export const setEventView = ({ commit, state, rootState }, data) => {
        commit(types.SET_EVENTVIEW, data)
}

export const setNextView = ({ commit, state, rootState }, data) => {
        commit(types.SET_NEXTVIEW, data)
}

export const setDialogView = ({ commit, state, rootState }, data) => {
        commit(types.SET_DIALOGVIEW, data)
}

export const setSecondView = ({ commit, state, rootState }, data) => {
        commit(types.SET_SECONDVIEW, data)
}

export const setDialogSecView = ({ commit, state, rootState }, data) => {
        commit(types.SET_DIALOGSECVIEW, data)
}

export const setUsername = ({ commit, state, rootState }, data) => {
        commit(types.SET_USERNAME, data)
}

export const setUserId = ({ commit, state, rootState }, data) => {
        commit(types.SET_USERID, data)
}

export const setBalance = ({ commit, state, rootState }, data) => {
        commit(types.SET_BALANCE, data)
}

export const setCoin = ({ commit, state, rootState }, data) => {
        commit(types.SET_COIN, data)
}

export const setUserAgent = ({ commit, state, rootState }, data) => {
        commit(types.SET_USERAGENCY, data)
}

export const setDirectAgent = ({ commit, state, rootState }, data) => {
        commit(types.SET_DIRECTAGENCY, data)
}

export const setAgentLevel = ({ commit, state, rootState }, data) => {
        commit(types.SET_AGENCYLEVEL, data)
}

export const setRate = ({ commit, state, rootState }, data) => {
        commit(types.SET_RATE, data)
}

export const setPoint = ({ commit, state, rootState }, data) => {
        commit(types.SET_POINT, data)
}

export const setAddTime = ({ commit, state, rootState }, data) => {
        commit(types.SET_ADDTIME, data)
}

export const setCurrentIp = ({ commit, state, rootState }, data) => {
        commit(types.SET_CURRENTIP, data)
}

export const setCurrentTime = ({ commit, state, rootState }, data) => {
        commit(types.SET_CURRENTTIME, data)
}

export const setLastLoginIp = ({ commit, state, rootState }, data) => {
        commit(types.SET_LASTLOGINIP, data)
}

export const setPersonCount = ({ commit, state, rootState }, data) => {
        commit(types.SET_PERSONCOUNT, data)
}

export const setLastLoginTime = ({ commit, state, rootState }, data) => {
        commit(types.SET_LASTLOGINTIME, data)
}

export const setUserMsgId = ({ commit, state, rootState }, data) => {
        commit(types.SET_USERMSGID, data)
}

export const setExchange = ({ commit, state, rootState }, data) => {
        commit(types.SET_EXCHANGE, data)
}

export const setMemberList = ({ commit, state, rootState }, data) => {
        commit(types.SET_MEMBERLIST, data)
}

export const setHisLottery = ({ commit, state, rootState }, data) => {
        commit(types.SET_HIS_LOTTERY, data)
}

export const setHisDate = ({ commit, state, rootState }, data) => {
        commit(types.SET_HIS_SDATE, data)
}

export const setHisType = ({ commit, state, rootState }, data) => {
        commit(types.SET_HIS_TYPE, data)
}

export const setNoticeId = ({ commit, state, rootState }, data) => {
        commit(types.SET_NOTICEID, data)
}

export const setCode = ({ commit, state, rootState }, data) => {
        commit(types.SET_CODE, data)
}
