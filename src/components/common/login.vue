<template>
  <div class="login">
<!--      <div class="box" :style="{-->
<!--	            'transformOrigin':'left top',-->
<!--	            'transform':`scale(${scalseX},${scalseY})`,-->
<!--	            '-webkit-transform':`scale(${scalseX},${scalseY})`,-->
<!--	            '-moz-transform':`scale(${scalseX},${scalseY})`,-->
<!--	            '-o-transform':`scale(${scalseX},${scalseY})`,-->
<!--	            '-ms-transform':`scale(${scalseX},${scalseY})`,-->
<!--	            'width':`${width}px`,-->
<!--	        }">-->
      <div class="login-div">
        <div class="title">
          欢迎登录
        </div>
        <div class="subtitle">
          交付中心管理平台
        </div>
        <div class="form">
          <el-form>
            <transition name="el-fade-in">
              <div class="login-input validation" v-if="isError">
                <img src="/static/images/login/icon_04.svg"  @click="closeError"/>
                {{errorText}}
              </div>
            </transition>
            <div class="login-input">
              <el-input
                v-model="userInfo.userName"
                placeholder="账户"
                class="user-name"
                clearable
                @keyup.enter.native="login"
              />
            </div>
            <div class="login-input">
              <el-input
                v-model="userInfo.passWord"
                show-password
                placeholder="密码"
                clearable
                class="pass-word"
                auto-complete="new-password"
                @keyup.enter.native="login"
              />
            </div>
            <div class="login-input code-input">
              <div class="left">
                <el-input
                  v-model="userInfo.code"
                  placeholder="验证码"
                  class="code"
                  clearable
                  @keyup.enter.native="login"
                />
              </div>
              <div class="right" @click="refreshCode">
                <identify :identifyCode="identifyCode"></identify>
              </div>
            </div>
            <div class="login-check">
              <el-checkbox v-model="isRemember">记住密码</el-checkbox>
            </div>
            <el-button size="large" type="primary" class="login-btn" @click="login">登陆</el-button>
          </el-form>
        </div>
      </div>
<!--    </div>-->
  </div>
</template>

<script>
  // import { resolution } from '@/libs/mixin';
  //验证码组件
  import Identify from "@/components/code/identify";
  export default {
    name: "login",
    // mixins: [ resolution ],
    components:{
      Identify
    },
    computed:{},
    data() {
      return {
        isError:false,
        errorText:'',

        userInfo:{
          userName: '',
          passWord: '',
          code:''
        },
        isRemember:false,
        identifyCode: "",//验证码
        identifyCodes: "1234567890ABCDEFGHIJKHYJKLMNOPQRSTUVWXYZ",
      }
    },
    created() {
      // 获取记住的账号密码
      if (!window.localStorage) {
        message({
          type: "warning",
          message: "浏览器不支持本地存储"
        });
      } else {
        let storage = window.localStorage;
        if(storage.getItem("isRemember") == 'true'){
          this.isRemember = true;
          this.userInfo.userName = storage.getItem("userName");
          this.userInfo.passWord = storage.getItem("passWord");
        }
      }
      // 调用验证码
      this.refreshCode();
    },
    mounted() {},
    watch: { },
    methods: {
      // 生成验证码
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      // 登录操作
      login(){
        if (this.userInfo.code.toUpperCase() != this.identifyCode){
          this.errorText = '验证码错误';
          this.isError =true;
          this.refreshCode();
          return;
        }
        //账号密码严重
        if(this.userInfo.userName === '' || this.userInfo.userName.trim() === '' || this.userInfo.passWord === '' || this.userInfo.passWord.trim() === ''){
          this.errorText = '账号或密码不正确';
          this.isError =true;
          this.refreshCode();
        }else {
          if(this.userInfo.userName == 'admin' && this.userInfo.passWord == '123456'){
            let storage = window.localStorage;
            //是否记住账号密码
            if (this.isRemember){
              // 存储账号密码等信息
              if (!window.localStorage) {
                this.$message({
                  type: "warning",
                  message: "浏览器不支持本地存储"
                });
              } else {
                storage.setItem("isRemember", this.isRemember);
                storage.setItem("userName", this.userInfo.userName);
                storage.setItem("passWord", this.userInfo.passWord);
              }
            }else {
              // 清空账号密码等信息
              storage.setItem("isRemember",this.isRemember);
              storage.setItem("userName", '');
              storage.setItem("passWord", '');
            }
            this.$Message.info('登陆成功,正在跳转!');
            this.$router.push({
              path:'/home'
            });
          }else {
            this.errorText = '账号或密码不正确';
            this.isError =true;
            this.refreshCode();
          }
        }
      },
      //关闭账号密码提示信息
      closeError(){
        this.isError =false;
      }
    }
  }
</script>
<style scoped lang="scss">
  .login{
    position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    min-width: 1366px;
    min-height: 750px;
    background: url("/static/images/login/login_bg.png") no-repeat center;
    background-size:100% 100%;
    .login-div{
      width: 400px;
      height: 480px;
      padding: 10px;
      margin-left: 20%;
      font-family: "PFR";
      .title{
        height: 43px;
        line-height: 38px;
        color: rgba(0,0,0,1);
        font-weight: 500;
        font-size: 30px;
      }
      .subtitle{
        height: 28px;
        line-height: 28px;
        color: rgba(0,0,0,1);
        font-weight: 500;
        font-size: 20px;
      }
      /deep/ .form{
        margin-top: 22px;
        .validation{
          line-height: 40px;
          color: rgba(0,0,0,0.65);
          font-size: 16px;
          font-weight: 500;
          border: 1px solid #FF5651;
          border-radius: 4px;
          background: #FFF1F0;
          box-shadow: 0 1px 6px 0 rgba(250,173,20,0.15);
          img{
            position: relative;
            top: -1px;
            width: 18px;
            height: 18px;
            margin: 0 10px;
            cursor: pointer;
            vertical-align:middle;
          }
        }
        .login-input,.login-check,.validation{
          width: 368px;
          height: 40px;
          margin-bottom: 25px;
          .user-name {
            .el-input__inner{
              background:url("/static/images/login/icon_01.svg") no-repeat 0 0 !important;
              background-position: 15px 12px !important;
            }
          }
          .pass-word{
            .el-input__inner{
              background:url("/static/images/login/icon_02.svg") no-repeat 0 0 !important;
              background-position: 15px 12px !important;
            }
          }
          .code{
            .el-input__inner{
              background:url("/static/images/login/icon_03.svg") no-repeat 0 0 !important;
              background-position: 15px 12px !important;
            }
          }
          .el-input__inner{
            color: rgba(0,0,0,0.65);
            font-size: 16px !important;
            text-indent: 25px;
          }
          input{
            font-family: "PFR";
            &::-webkit-input-placeholder {
              color: rgba(0,0,0,0.25);
            }
          }
          .el-checkbox{
            color: rgba(0,0,0,0.65);
            &__inner{
              width: 18px;
              height: 18px;
              &::after {
                height: 10px;
                left: 6px;
              }
            }
            &__label{
              font-size: 16px;
            }
          }
        }
        .code-input{
          display: flex;
          .left{
            width: 246px;
          }
          .right{
            width: 114px;
            margin-left: 8px;
            cursor: pointer;
            background-color: #f5f5f5;
          }
        }
        .login-btn{
          width: 368px;
          height: 40px;
          margin-top: -30px;
          font-size: 16px;
          letter-spacing: 5px;
          border-radius: 4px;
          border: none;
          background: #1890FF;
        }
      }
    }
  }
</style>

