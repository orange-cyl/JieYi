<template>
  <div class="login-container">
    <div class="content">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" :hide-required-asterisk='true'   class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <img src="../../../public/logo.png" alt="">
        <span class="title">登录</span>
      </div>

      <el-form-item style="background-color: #fff;" prop='tel_num'>
        <el-input
          style="color:#333"
          v-model="loginForm.tel_num"
          placeholder="请输入手机号"
          type="text"
        />
        <span class="show-pwd">
          <!-- <svg-icon icon-class="eye" /> -->
          <el-button type="success" plain @click="toCode('loginForm')">{{content}}</el-button>
        </span>
      </el-form-item>

        
      <el-form-item style="background-color: #fff;">
        <el-input
          style="color:#333"
          ref="password"
          v-model="loginForm.tel_code"
          type="text"
          placeholder="请输入验证码"
        />
      </el-form-item>

      <el-button :loading="loading"  
      style="width:100%;height:47px;background-color: #19b394;border:none;color:#fff;margin-top:20px;" 
      @click="handleLogin('loginForm')">登录</el-button>


    </el-form>
      <div class="num">
        <p><a href="http://www.miitbeian.gov.cn/">粤ICP备13074057号-2</a></p>
        <p><img src="../../assets/guohui.png" alt="-_-"><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502001574">粤公网安备44030502001574</a></p>
      </div>
    </div>
    
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import {mapActions,mapState,mapGetters,mapMutations} from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      rules: {
            tel_num: [
              // { required: true, message: '请输入手机号', trigger: 'blur' },
              // { validator:function(rule,value,callback){
              //                 if(/^1[34578]\d{9}$/.test(value) == false){
              //                        callback(new Error("请输入正确的手机号"));
              //                 }else{
              //                        callback();
              //                 }
              //               }, trigger: 'blur'
              //     }
            ],
               
      },
      loginForm: {
      },
      content:'获取验证码',
      loading: false,
    }
  },
  watch: {
   
  },
  methods: {
      ...mapActions('login',['toGetCode','login']),
    // 点击登录按钮
    handleLogin(loginForm){
      this.$refs[loginForm].validate((valid) => {
                  if (valid) {
                        if(this.loginForm.tel_code != undefined && this.loginForm.tel_code !='' && this.loginForm.tel_num != undefined && this.loginForm.tel_num != ''){
                          this.login(this.loginForm).then(r=>{
                                if(localStorage.getItem("isManager") == 'true'){
                                      this.$router.push({ name: 'Dashboard'})
                                      location.reload()
                                }else{
                                      this.$message({
                                        type: 'info',
                                        message: '不好意思,您不是建模工程师'
                                      });
                                }
                          }).catch(e=>{
                             this.$message({
                              type: 'info',
                              message: '请输入正确的验证码'
                            });
                          })
                        }else{
                          this.$message({
                            type: 'info',
                            message: '请补全登录信息'
                          });    
                        }
                     } else {
                      this.$message({
                            type: 'info',
                            message: '请输入正确的手机号'
                          });
                  return false;
                }
        })
    },
    // 点击获取验证码按钮后
    getCode(){
        let count = 60
        this.toGetCode(this.loginForm).then(r=>{
           setInterval(()=>{
            if(count > 0){
              count--
               this.content = '重新获取('+count+'s)'
            }else{
               this.content = '获取验证码'
            }

         },1000)
        }).catch(e=>{
          // console.log(e)
          this.$message({
                type: 'info',
                message: '请输入正确的手机号 或 稍后再进行尝试'
              });
        })
    },
    // 点击获取验证码按钮
    toCode(loginForm){
      this.$refs[loginForm].validate((valid) => {
                  if (valid) {
                       if(this.content == '获取验证码'){
                          this.getCode()
                        }else{
                                this.$message({
                                  type: 'info',
                                  message: '请稍等......'
                                });    
                        }
                     } else {
                  return false;
                }
        })
    }

  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#3d4e66;
$light_gray:#fff;
$cursor: black;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #333;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#3d4e66;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 100px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .content{
    width: 490px;
    height: 560px;
    background-image: url(../../../public/bg.png);
    background-repeat: no-repeat;
    margin: 0 auto;
    margin-top: 60px;
  }
  .title-container{
    margin-bottom: 30px;
    line-height: 41px;
    text-align: center;
  }
  .title-container span{
    text-align: center;
    height: 41px;
    margin-top:0px;
    font-size: 16px;
    font-weight: 100;
    line-height: 41px;
  }
  .title-container img{
    margin-bottom: -7px;
  }
}
 .num{
    text-align: center;
     position: absolute;
    bottom:5px;
    font-size: 14px;
    color:#fff;
    margin-left:162px;
  }
  .num img{
    height: 12px;
    width: 12px;
    text-align: center;
    line-height: 48;
  }
  .login-container .show-pwd{
    height:100% !important;
    top:-1px;
    right:-1px;
  }
  .el-button--success.is-plain{
    height:104%;
    border:none;

  }
</style>
