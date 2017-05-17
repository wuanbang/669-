<template>
    <div style="height: 563px;">
        <div class="account-tabs">
            <el-tabs v-model="defaultActive" @tab-click="handleClick">
                <el-tab-pane name="in" label="平台充值"></el-tab-pane>
                <el-tab-pane name="out" label="平台取款"></el-tab-pane>
                <el-tab-pane name="transfer" label="额度转账"></el-tab-pane>
                <el-tab-pane name="in-record" label="平台充值记录"></el-tab-pane>
                <el-tab-pane name="out-record" label="平台取款记录"></el-tab-pane>
                <el-tab-pane name="transfer-record" label="额度转账记录"></el-tab-pane>
            </el-tabs>
        </div>
        <div>
            <component :is="accountView"></component>
        </div>
    </div>
</template>
<script lang="babel">
  import { mapActions } from 'vuex'
  import moneyIn from './money-in'
  import moneyOut from './money-out'
  import inRecord from './in-record'
  import outRecord from './out-record'
  import transfer from './transfer'
  import transferRecord from './transfer-record'
	export default {
        components : {
          moneyIn,
          moneyOut,
          inRecord,
          outRecord,
          transfer,
          transferRecord
        },
        data(){
            return {
            }
        },
        mounted () {
          this.defaultActive = this.$store.state.useraction.eventView
        },
        methods :{
            ...mapActions({
              setEventView : 'setEventView'
            }),
            handleClick(tab){
                switch (tab.name) {
                      case "in": 
                        this.setEventView('in')
                        break
                      case "out":
                        this.setEventView('out')
                        break
                      case "transfer":
                        this.setEventView('transfer')
                        break
                      case "in-record":
                        this.setEventView('in-record')
                        break
                      case "out-record":
                        this.setEventView('out-record')
                        break
                      case "transfer-record":
                        this.setEventView('transfer-record')
                        break
                      default:
                        break
                    }
            },
        },
        computed : {
          accountView () {
            var accounts = this.$store.state.useraction.eventView;
            if (accounts == 'in') {
              return "moneyIn"
            } else if (accounts == 'out') {
              return "moneyOut"
            } else if (accounts == 'transfer') {
              return "transfer"
            } else if (accounts == 'in-record') {
              return "inRecord"
            } else if (accounts == 'out-record') {
              return "outRecord"
            } else if (accounts == 'transfer-record') {
              return "transferRecord"
            }
          },
          defaultActive (){
            return this.$store.state.useraction.eventView || 'in'
          }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
            })
        },

    }
</script>
<style scoped>
    .account-tabs {
        margin-left: auto;
        margin-right: auto;
        width: 650px;
        margin-bottom: -17px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>