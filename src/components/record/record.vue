<template>
    <div style="height: 563px;">
        <div class="account-tabs">
            <el-tabs :active-name="defaultActive" @tab-click="handleClick">
                <el-tab-pane name="game-record" label="游戏记录"></el-tab-pane>
                <el-tab-pane name="follow-record" label="追号记录"></el-tab-pane>
                <el-tab-pane name="change-record" label="变帐记录"></el-tab-pane>
                <el-tab-pane name="person-record" label="个人盈亏日报"></el-tab-pane>
            </el-tabs>
        </div>
        <div>
            <component :is="recordView"></component>
        </div>
    </div>
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
    import gameRecord from './game-record'
    import followRecord from './follow-record'
    import changeRecord from './change-record'
    import personRecord from './person-record'
	export default {
        components : {
          gameRecord,
          followRecord,
          changeRecord,
          personRecord,
        },
        data(){
            return {
            }
        },

        methods :{
            ...mapActions({
              setEventView : 'setEventView',
              setNextView : 'setNextView'
            }),
            handleClick(tab){
                console.log(tab)
                switch (tab.name) {
                      case "game-record":
                        this.setEventView('game-record')
                        this.setNextView('lottery-bet')
                        break
                      case "follow-record":
                        this.setEventView('follow-record')
                        break
                      case "change-record":
                        this.setEventView('change-record')
                        this.setNextView('lottery-change')
                        break
                      case "person-record":
                        this.setEventView('person-record')
                        break
                      default:
                        break
                    }
            },
        },
        computed : {
          recordView () {
            var records = this.$store.state.useraction.eventView;
            if (records == 'game-record') {
              return "gameRecord"
            } else if (records == 'follow-record') {
              return "followRecord"
            } else if (records == 'change-record') {
              return "changeRecord"
            } else if (records == 'person-record') {
              return "personRecord"
            }
          },
          defaultActive (){
            return this.$store.state.useraction.eventView;
          }
        },
    }
</script>
<style scoped>
    .account-tabs {
        margin-left: auto;
        margin-right: auto;
        width: 400px;
        margin-bottom: -17px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>