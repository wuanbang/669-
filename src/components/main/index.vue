<template>
    <div class="container">
      <el-row>
          <el-col :span="24">
              <div :style="{ height: topheight + 'px' }"  class="grid-top">
                  <top></top>
              </div>
          </el-col>
      </el-row>
      <el-col :span="24">
          <div style="height: 635px;" class="grid-right">
              <transition name="fade" mode="out-in">
                  <component :is="currentView">
                  </component>
              </transition>
          </div>
      </el-col>
      <el-col :span="24">
          <div style="height: 95px;">
               <foot></foot>
          </div>
      </el-col>
    </div>
</template>
<script lang="babel">
  import top from "../top/top.vue"
  import foot from "../footer/index.vue"
  import { winHeight } from "../../tools/command"
  import { Notification } from 'element-ui'
  import {errorMsg,succMsg} from '../../tools/command'
  import api from '../../api'
  import lottery from '../lottery/index.vue'
  import game from './game.vue'
/*  const lottery = resolve => {
      require.ensure(['../lottery/index.vue'], () => {
          resolve(require('../lottery/index.vue'))
      }, 'lottery')
  }

  const game = resolve => {
      require.ensure(['./game.vue'], () => {
          resolve(require('./game.vue'))
      }, 'game')
  }*/

	export default {

    name : "games",

    mounted(){
        this.findPopup()
    },

    components : {
      top, foot, lottery, game
    },

    data() {
      return {
         userRouter : true,
         uniqueOpened : false,
         topheight : 130,
      }
    },

    computed: {
      contentheight: function () {
        return winHeight() - this.topheight
      },
      currentView : function(){
        return this.$store.state.lottery.currentView
      }
    },

     methods: {
            handleselect(index, indexPath) {
              console.log("handleselect", index)
              this.$router.push(index)
            },
            handleopen(index){
              console.log("handleopen", index)
            },
            handleclose(index){
              console.log("handleclose index", index)
            },
            findPopup(){
                api.ajax('notice/findPopup', {}).then(data => {
                    if(data && data.code == '0'){
                        console.log('findPopup', data)
                        if(data.data != null){
                            Notification({
                                type : 'info',
                                title: data.data.title,
                                message: data.data.content,
                                duration : 5000
                            })
                        }
                    } else {
                        errorMsg(data.msg)
                    }
                }, error => {
                    errorMsg("登录报错，"+JSON.stringify(error))
                })
            },
        }
	}
</script>
<style type="text/css" scoped>
	.container {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
  }
  .fade-enter-active, .fade-leave-active {
	  transition: all .1s ease 0;
	}
	.fade-enter, .fade-leave-active {
      opacity: 0;
	}
  .grid-top {
      width: 100%
  }
  .bg-top {
      background-color: #475669;
  }
  .grid-left {
      width: 100%
  }
  .bg-left {
      background-color: #D3DCE6;
  }
  .grid-right {
      width: 100%
  }
   {
      background-color: #F9FAFC;
  }
  .el-menu-item.is-active {
    color: #20a0ff;
  }
</style>
