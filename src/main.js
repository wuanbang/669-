import Vue from 'vue'
import { Button, Row, Col, Form, FormItem, Input, Loading, Table, TableColumn, Popover, Dialog,
          Tabs, TabPane , DatePicker, Select, Option, Radio, Slider, Pagination, Tooltip, Checkbox} from 'element-ui'
import router from './router'
import { sync } from 'vuex-router-sync'
import index from 'components/index/index.vue'
import store from './store'
import './css/common.css';

Vue.component(Button.name, Button)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Popover.name, Popover)
Vue.component(Dialog.name, Dialog)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Radio.name,Radio)
Vue.component(Slider.name,Slider)
Vue.component(Pagination.name,Pagination)
Vue.component(Tooltip.name,Tooltip)
Vue.component(Checkbox.name,Checkbox)

Vue.use(Loading)
//处理字符长度过长
Vue.filter('hanlerBetString', function (value) {
    if(value && value.length > 40){
        value = value.substring(0, 40) + '...'
    }
    return value
})

//处理银行卡号加密
Vue.filter('bankCard', function (account) {
    var a = '****';
    var b = '';
    if ((account.length)%4!==0) {
        for(var i=0;i<parseInt(account.length/4);i++){
            b += a
        }
        account = b + account.substr(-((account.length)%4),(account.length)%4+1);
    } else {
        for(var j=0;j<parseInt(account.length/4-1);j++){
            b += a
        }
        account = b + account.substr(-4,4);
    }
    return account.replace(/\s/g, '').replace(/(.{4})/g, "$1 ")
})

//处理账户名加密
Vue.filter('kaihu', function (kaihuName) {
    var a = '*';
    var b = '';
    for(var i=1;i<parseInt(kaihuName.length);i++){
       b += a
    }
    kaihuName = b + kaihuName.substr(-1,1);
    return kaihuName
})

//六合彩生肖
Vue.filter('lhcsx', function (value) {
    var data = ["鼠", "虎", "龙", "马", "猴", "狗", "牛", "兔", "蛇", "羊", "鸡", "猪"]
    var cdata = ["shu","hu","long","ma","hou","gou","niu","tu","she","yang","ji","zhu"]
    var ind = cdata.indexOf(value+"")
    return data[ind]
})
//六合彩色波
Vue.filter('lhcsb', function (value, data) {
    if(!value || !data){ 
        return ''
    }
    var ss = typeof value
    if(ss === "number" && value < 10){
        value = '0'+value+''
    } 
    if(ss === "string" && value.length < 2){
        value = '0'+value+''
    } 
    if(data.lvbo.indexOf(value+"") > -1){
        return "green"
    } else if(data.lanbo.indexOf(value+"") > -1) {
        return "blue"
    }
    return "red"
})

//开奖号码
Vue.filter('openNumSplit', function (value, ind) {
    if(!value){
        return ''
    }
    var openNum = value.split(',')
    var len = openNum.length
    if(ind > len-1){
        return ''
    }
    return openNum[ind]
})

//六合彩生肖
Vue.filter('lhcSxOpen', function (value, data) {
    if(!value || !data){
        return ''
    }
    var ss = typeof value
    if(ss === "number" && value < 10){
        value = '0'+value+''
    } 

    if(ss === "string" && value.length < 2){
        value = '0'+value+''
    } 
    value = value + ""
    if(data.shu.indexOf(value) > -1){
        return "鼠"
    } else if(data.niu.indexOf(value) > -1) {
        return "牛"
    } else if (data.hu.indexOf(value) > -1) {
        return "虎"
    } else if (data.tu.indexOf(value) > -1) {
        return "兔"
    } else if (data.long.indexOf(value) > -1) {
        return "龙"
    } else if (data.she.indexOf(value) > -1) {
        return "蛇"
    } else if (data.ma.indexOf(value) > -1) {
        return "马"
    } else if (data.yang.indexOf(value) > -1) {
        return "羊"
    } else if (data.hou.indexOf(value) > -1) {
        return "猴"
    } else if (data.ji.indexOf(value) > -1) {
        return "鸡"
    } else if(data.gou.indexOf(value) > -1){
        return "狗"
    } else if (data.zhu.indexOf(value) > -1) {
        return "猪"
    }
    return ""
})

//处理期号，获取'-'后面的内容
Vue.filter('subTitleCode', function (value) {
    if(!value){
        return value
    }
    var ind = value.indexOf('-')
    if(ind === -1){
        return value
    }
    return value.substring(ind + 1)
})

//彩票历史记录 返回彩票的pattern的class
Vue.filter('hisPatternStyle', function (value) {
    if(!value){
        return value
    }
    if(value === '组三') {
        return 'z3'
    } else if(value === '组六') {
        return 'z6'
    } else if(value === '豹子') {
        return 'bz'
    } else if(value === '对子') {
        return 'dz'
    }
    return ''
})

sync(store, router)

const app = new Vue({
	router,
    store,
    ...index,
})

app.$mount('#app')
