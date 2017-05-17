<template>
    <div class="container">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <div v-loading.fullscreen="fullscreenLoading"></div>
    </div>
</template>
<script lang="babel">
	import { winHeight,errorMsg } from "../../tools/command"
    import api from '../../api'
    import { mapActions } from 'vuex'
	export default {
        name : "main",

        created() {
            if(location.hash != '#/login'){
                this.checkLogin()
            }
        },

        computed: {
            contentheight: function () {
                return winHeight()
            },
            fullscreenLoading: function(){
            	return this.$store.state.loading
            },
            loginStatus(){
                return this.$store.state.user.isLogin
            },
        },
        methods : {
            ...mapActions({
              updateUsername: 'updateUsername',
              updateLoginStatus : 'updateLoginStatus'
            }),
            checkLogin(){
                api.ajax('checkLogin', {}).then(data => {
                    if(data && data.code != '0'){
                        this.updateLoginStatus(false)
                    } 
                }, error => {
                    errorMsg("登录报错，"+JSON.stringify(error))
                })
            },
        },
        watch : {
           "loginStatus" : function(value, old){
                if(value == false){
                    this.$router.push({name : "login"})
                }
           }
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
</style>
