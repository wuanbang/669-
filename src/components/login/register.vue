 <template>
	<el-form :model="ruleForm2" ref="ruleForm2" label-width="100px" class="reg_content">
    <el-form-item prop="username" label="用户名">
      <el-input v-model="ruleForm2.username"></el-input>
    </el-form-item>
    <el-form-item label="登录密码" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认登录密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="取款密码" prop="twoPass">
      <el-input type="password" v-model="ruleForm2.twoPass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认取款密码" prop="checkTwoPass">
      <el-input type="password" v-model="ruleForm2.checkTwoPass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item prop="email" label="邮箱">
      <el-input v-model="ruleForm2.email"></el-input>
    </el-form-item>
    <el-form-item prop="qq" label="QQ号">
      <el-input v-model="ruleForm2.qq"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native.prevent="handleSubmit2">提交</el-button>
      <el-button @click.native.prevent="toLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="babel">
  import { mapGetters } from 'vuex'
  import api from '../../api'
  import { errorMsg,succMsg } from '../../tools/command'
  export default {
    data() {
      return {
        ruleForm2: {
          username: '',
          email: '',
          pass : '',
          checkPass : '',
          qq: '',
          twoPass: '',
          checkTwoPass: '',
        },
        form: {},
      }
    },
    computed : {
      ...mapGetters({
        username : 'getUsername'
      })
    },
    methods: {
            handleSubmit2() {
               if (!this.ruleForm2.username) {
                errorMsg("抱歉，请输入正确的用户名！")
               } else {
                if (!this.ruleForm2.username.match(/^[A-Za-z0-9]{6,20}$/)) {
                  errorMsg("抱歉，用户名的长度为6-20个字符组合！")
                } else {
                  if (!this.ruleForm2.pass) {
                    errorMsg("抱歉，请输入玩家的登录密码！")
                    } else {
                      if (!this.ruleForm2.pass.match(/^[A-Za-z0-9]{6,20}$/)) {
                        errorMsg("抱歉，密码的长度为6-20个字符组合！")
                      } else {
                        if (!this.ruleForm2.checkPass) {
                          errorMsg("抱歉，请输入确认登录密码登陆密码！")
                        } else{
                          if (this.ruleForm2.pass != this.ruleForm2.checkPass) {
                            errorMsg("抱歉，登陆密码和确认登录密码不一致！")
                          } else {
                            if (!this.ruleForm2.twoPass) {
                              errorMsg("抱歉，请输入玩家的取款密码！")
                            } else {
                              if (!this.ruleForm2.twoPass.match(/^[A-Za-z0-9]{6,20}$/)) {
                                errorMsg("抱歉，密码的长度为6-20个字符组合！")
                              } else {
                                if (!this.ruleForm2.checkTwoPass ) {
                                  errorMsg("抱歉，请输入确认取款密码！")
                                } else {
                                  if (this.ruleForm2.twoPass != this.ruleForm2.checkTwoPass) {
                                    errorMsg("抱歉，取款密码和确认取款密码不一致！")
                                  } else {
                                    if (!this.ruleForm2.email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
                                      errorMsg("抱歉，请输入正确的邮箱！")
                                    } else {
                                      if (!this.ruleForm2.qq.match(/^[0-9]{5,14}$/)) {
                                        errorMsg("抱歉，请输入正确的QQ号！")
                                      } else {
                                         this.form.username = this.ruleForm2.username;
                                         this.form.email = this.ruleForm2.email;
                                         this.form.password = this.ruleForm2.pass;
                                         this.form.fundPwd = this.ruleForm2.twoPass;
                                         this.form.qq = this.ruleForm2.qq;
                                         this.form.code = this.$store.state.useraction.code;
                                         api.ajax('reg',this.form).then(data =>{
                                          this.succMsg(data.msg)
                                         },error =>{
                                          this.errorMsg("请求数据失败")
                                         })
                                         this.$router.push('login')
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      } 
                    }
                  }
               }
            },
            toLogin(){
                this.$router.push('login')
            },
            succMsg(msg) {
                Message({
                  showClose: true,
                  duration:1500,
                  message: msg,
                  type: 'success'
                });
            },
            errorMsg(msg) {
                Message({
                  showClose: true,
                  duration:1500,
                  message: msg,
                  type: 'error'
                });
            },
        }
}
</script>
<style scoped>
 .reg_content{
        width: 600px;
        margin-left: auto;
        margin-right: auto;
        color: #000;
  }
  
</style>