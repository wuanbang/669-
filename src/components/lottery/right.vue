<template>
  <div id="right">
      <component :is="currentTopView">
      </component>
      <game-play-method></game-play-method>
      <div class="game-switchtab-content clearfix">
        <div class="game_show" id="betting">
           <example></example>
           <play-method-type></play-method-type>
           <component :is="currentBetView">
           </component>
        </div>
        <betting-bar></betting-bar>
        <betting-bar-list></betting-bar-list>
      </div>
  </div>
</template>
<script lang="babel">
import righttop from './right-top'
import righttopbjsc from './right-top-bjsc'
import righttoplhc from './right-top-lhc'
import gamePlayMethod from './game-play-method'
import bettingBar from './betting-bar'
import bettingBarList from './betting-bar-list'
import selectPlate from './select-plate'
import singlePlate from './single-plate'
import playMethodType from './play-method-type'
import example from './example'
import lhcAll from './lhc/lhc-all'
import lhcTmsx from './lhc/lhc-tmsx'
import lhcDxds from './lhc/lhc-dxds'
import lhcTmsb from './lhc/lhc-tmsb'
    export default {

        components : {
          righttop,
          gamePlayMethod,
          bettingBar,
          bettingBarList,
          selectPlate,
          singlePlate,
          playMethodType,
          example,
          righttopbjsc,
          lhcAll,
          lhcTmsx,
          lhcDxds,
          lhcTmsb,
          righttoplhc,
        },

        methods :{
        },
        computed : {
          currentTopView(){
            var lottery = this.$store.state.lottery.currentLottery
            if(lottery == 'cai13'){
                return "righttopbjsc"
            } else if(lottery == 'cai14'){
                return "righttoplhc"
            }
            return 'righttop'
          },
          currentBetView(){
            var lottery = this.$store.state.lottery.currentLottery
            var type = this.$store.state.lottery.playMethodType
            var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
            if(type && type.indexOf('single') > -1){
                return 'singlePlate'
            } else if(lottery == 'cai14'){  
                if("lhc_tmsx" == gamePlayMethod){
                    return 'lhcTmsx'
                } else if("lhc_tmdxds" == gamePlayMethod){
                    return 'lhcDxds'
                } else if("lhc_tmsb" == gamePlayMethod){
                    return 'lhcTmsb'
                } else {
                    return 'lhcAll'
                }
            }
            return 'selectPlate'
          },
        },

    }
</script>
<style scoped>

</style>