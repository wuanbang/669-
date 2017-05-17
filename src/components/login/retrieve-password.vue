 <template>
	<div class="login" :style="{top: contentheightHalf + 'px'}">
        <el-form :model="form" ref="form" label-width="100px" class="content">
            <el-form-item prop="email" label="游戏账号">
              <el-input v-model="form.username" ></el-input>
            </el-form-item>
            <el-form-item label="密保邮箱" prop="email">
              <el-input type="text" v-model="form.email"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native.prevent="retrieve">找回密码</el-button>       
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
        },
        data() {
            return {
                form: {
                   username : '',
                   email: '',
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
            retrieve() {
                if(!this.form.email || !this.form.email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)){
                    errorMsg("请输入正确的Email地址！")
                } else {
                	api.ajax('forgetPwd', this.form).then(data => {
	                    if(data && data.code == '0'){
	                        succMsg(data.msg)
	                    } else {
	                        errorMsg(data.msg)
	                    }
	                }, error => {
	                    errorMsg("登录报错，"+JSON.stringify(error))
	                })
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
</style>
