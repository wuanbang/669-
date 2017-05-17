 <template>
	<div class="login" :style="{top: contentheightHalf + 'px'}">
        <el-form :model="form" ref="form" label-width="100px" class="content">
            <el-form-item prop="email" label="用户名">
              <el-input v-model="form.username" :autofocus="true" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="form.password" placeholder="请输入密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="" prop="checkbox">
              <el-checkbox v-model="form.rememberMe" true-label="1" false-label="0">记住我</el-checkbox>&nbsp;<a @click.stop="forgetPassword" class="password">忘记密码？</a>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native.prevent="submitLogin">登录</el-button>
              <el-button @click.native.prevent="toRegister">注册</el-button>
            </el-form-item>
          </el-form>
	</div>
</template>
<script lang="babel">
    import api from '../../api'
    import { mapActions, mapGetters } from 'vuex'
    import { Message } from 'element-ui'
    import { winHeight, errorMsg } from "../../tools/command"
    export default {
        name : "login",
        mounted: function () {
            this.form.username = this.$store.state.user.username
            document.addEventListener("keyup", this.enterSubmit, false)
        },
        beforeDestroy(){
            document.removeEventListener("keyup", this.enterSubmit, false)
        },
        data() {
            return {
                form: {
                    username:'',
                    password: '',
                    rememberMe: '0',
                }
            }
        },
        computed : {
            ...mapGetters({
                getUsername : 'getUsername'
            }),
            contentheightHalf: function () {
                return Math.round(winHeight()/2) - 152
            }
        },
        methods: {
            ...mapActions({
              updateUsername: 'updateUsername',
              updateLoginStatus : 'updateLoginStatus'
            }),
            submitLogin() {
                if(!this.form.username || !this.form.password){
                    errorMsg("请输入用户名和密码")
                    return false
                }
                api.ajax('login', this.form).then(data => {
                    if(data && data.code == '0'){
                        this.updateUsername(this.form.username)
                        this.updateLoginStatus(true)
                        this.$router.push({name : "main"})
                    } else {
                        errorMsg(data.msg)
                    }
                }, error => {
                    errorMsg("登录报错，"+JSON.stringify(error))
                })

            },
            toRegister(){
                this.$router.push({name: 'regi'})
            },
            enterSubmit(event){
                if(event.keyCode == 13){
                    this.submitLogin()
                }
            },
            forgetPassword(){
                if(!this.form.username){
                    errorMsg("游戏帐号不存在！")
                } else {
                    this.updateUsername(this.form.username)
                    this.$router.push({name : "retrieve-password"})  
              }
            }
        },
    }
</script>
<style scoped>
    .login {
        width: 600px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
    }
    .content {
        width: 400px;
        margin-left: auto;
        margin-right: auto;
    }
    a {
        text-decoration: none;
        color: #fff;
    }
    a:hover {
        text-decoration: underline;
        cursor: pointer;
    }
</style>
