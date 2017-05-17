<template>
    <div style="height: 563px;">
        <div class="account-tabs">
            <el-tabs :active-name="defaultActive" @tab-click="handleClick">
                <el-tab-pane name="user-data" label="账户信息"></el-tab-pane>
                <el-tab-pane name="add-card" label="银行卡绑定"></el-tab-pane>
            </el-tabs>
        </div>
        <div>
            <component :is="userAccountView"></component>
        </div>
    </div>
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
    import userData from './user-data'
    import addCard from './add-card'
    import moneyIn from '../account/money-in'
    import moneyOut from '../account/money-out'
    import recordStat from './record-stat'
    import personRecord from '../record/person-record'
    import bindCardStep1 from './bind-card-step1'
	export default {
        components : {
            userData,
            addCard,
            moneyIn,
            moneyOut,
            recordStat,
            personRecord,
            bindCardStep1,
        },
        data(){
            return {
            }
        },
        methods :{
            ...mapActions({
              setEventView : 'setEventView'
            }),
            handleClick(tab){
                console.log(tab)
                switch (tab.name) {
                      case "user-data":
                        this.setEventView('user-data')
                        break
                      case "add-card":
                        this.setEventView('add-card')
                        break
                      default:
                        break
                    }
            },
        },
        computed : {
            userAccountView () {
                var userAccounts = this.$store.state.useraction.eventView;
                if (userAccounts == 'user-data') {
                  return "userData"
                } else if (userAccounts == 'add-card') {
                  return "addCard"
                } else if (userAccounts == 'in') {
                  return "moneyIn"
                } else if (userAccounts == 'out') {
                  return "moneyOut"
                } else if (userAccounts == 'person-record') {
                    return "personRecord"
                } else if (userAccounts == 'bind-card-step1') {
                    return "bindCardStep1"
                }
            },
            defaultActive (){
                return this.$store.state.useraction.eventView
            }
        },
    }
</script>
<style scoped>
    .account-tabs {
        margin-left: auto;
        margin-right: auto;
        width: 200px;
        margin-bottom: -17px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>