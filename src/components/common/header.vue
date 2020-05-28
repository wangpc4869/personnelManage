<template>
  <div class="header">
    <div class="header-left">
      <div class="point"></div>
      交付中心管理平台
    </div>
    <div class="header-right">
      <div class="right">
        <img src="/static/images/header/exit_01.svg" @click="exitLogin">
      </div>
      <div :class="['left',isShow===true?'active':'']" v-clickOutside="close">
        <div class="left-text" @click="clickOpen">
          <img :src="imgPath" class="img1">
          <span>{{userName}}</span>
        </div>
<!--        <el-collapse-transition>-->
          <div class="personal">
            <div class="close" v-if="isShow">
              <img src="/static/images/header/icon_01.svg" @click.stop="close">
            </div>
            <div class="content" v-if="isShow">
              <div class="content-head">
                <img :src="imgPath">
              </div>
              <div class="content-name">
                {{userName}}
              </div>
              <div class="content-text">
                <img src="/static/images/header/icon_03.svg">
                Serati Ma@tiza.com.cn
              </div>
              <div class="content-text">
                <img src="/static/images/header/icon_02.svg">
                13776694334
              </div>
              <div class="content-text border">
                <img src="/static/images/header/icon_04.svg">
                1980年08月20日
              </div>
              <div class="content-button">
                <el-upload
                  class="button"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :on-change="onChange"
                  :file-list="fileList"
                  :show-file-list="false"
                  >
                  上传照片
                </el-upload>
                <div class="button" @click="clickChange">
                  修改密码
                </div>
              </div>
            </div>
          </div>
<!--        </el-collapse-transition>-->
      </div>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisble"
      width="640px"
      :close-on-click-modal="false"
      :modal-append-to-body='false'
      :before-close="closeDialog">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogRules" label-width="100px">
        <el-form-item label="原密码：" prop="originalpw">
          <el-input v-model="dialogForm.originalpw" clearable placeholder="请输入原密码" class="handle-input"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newpw">
          <el-input v-model="dialogForm.newpw" clearable show-password placeholder="请输入新密码" class="handle-input"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmpw">
          <el-input v-model="dialogForm.confirmpw" clearable show-password placeholder="请输入确认密码" class="handle-input"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">关闭</el-button>
          <el-button type="primary" @click="saveFormInfo">保存</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import { outside } from '@/libs/mixin';
  export default {
    name: "headers",
    mixins:[ outside ],
    components:{},
    computed:{},
    data() {
      return {
        userName:'Serati Ma',
        imgPath:'/static/images/header/img_01.png',
        fileList:[],
        isShow:false,

        dialogFormVisble:false,
        dialogForm:{
          originalpw:'',
          newpw:'',
          confirmpw:''
        },
        dialogRules:{
          originalpw: [
            { required: true, message: '请输入原密码', trigger: 'blur' },
          ],
          newpw: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
          ],
          confirmpw: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
          ]
        }
      }
    },
    created() {},
    mounted() {},
    watch: { },
    methods: {
      // 查看个人信息
      clickOpen(){
        if(this.isShow){
          this.close();
        }else {
          this.isShow = true;
          let imgDiv = $('.personal');
          imgDiv.eq(0).animate({'height':'345px'},500);
        }
      },
      // 关闭个人信息
      close(){
        setTimeout(()=>{
          this.isShow = false;
        },400)
        let imgDiv = $('.personal');
        imgDiv.eq(0).animate({'height':'0'},500);
      },
      // 退出登录
      exitLogin(){
        this.$router.push({
            path:'/login'
        });
      },
      //限制上传文件个数
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择 1 个文件，本次选择了 ${
            files.length
          } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        );
      },
      //上传文件添加
      onChange(file, fileList){
        const isLt2M = file.size / 1024 / 1024 < 5;
        if(!isLt2M) {
          fileList.splice(fileList.length-1, 1);
          this.$message({
            message: '上传文件大小不能超过 5MB!',
            type: 'warning'
          });
          return;
        }
        console.log(file.raw,'1111');
        console.log(fileList,'222');
        // var that = this;
        // const reader = new FileReader();
        // reader.readAsDataURL(file.raw);
        // reader.onload = function (e) {
        //   let fileObj = {name: file.name, url: reader.result};
        //   that.drivingsList.push(fileObj)
        // }
      },
      // 修改密码
      clickChange(){
        this.dialogFormVisble =true;
      },
      // 关闭弹框
      closeDialog(){
        this.dialogFormVisble = false;
        setTimeout(()=>{
          this.dialogForm={
            originalpw:'',
            newpw:'',
            confirmpw:''
          };
          this.$refs.dialogForm.resetFields();
        },500);
      },
      // 保存修改
      saveFormInfo(){
        let that = this;
        this.$refs.dialogForm.validate(valid => {
          if (valid) {


            this.closeDialog();
          }
        });
      }
    }
  }
</script>
<style scoped lang="scss">
  .header{
    display: flex;
    height: 64px;
    padding: 0 20px 0 30px;
    background: #FFFFFF;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,0.15);
    &-left{
      display: flex;
      align-items: center;
      width: 50%;
      font-size: 20px;
      color: rgba(0,0,0,0.85);
      .point{
        float: left;
        width: 30px;
        height: 30px;
        margin-right: 5px;
        border-radius: 50%;
        background: #E1E1E1;
      }
    }
    &-right{
      width: 50%;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      .left{
        height: 64px;
        line-height: 64px;
        padding: 0 7px;
        color: rgba(0,0,0,0.8);
        font-size: 14px;
        /*text-align: right;*/
        &-text{
          cursor: pointer;
        }
        .img1{
          width: 28px;
          height: 28px;
        }
        .personal{
          position: absolute;
          z-index: 99;
          width: 240px;
          height: 0;
          /*height: 345px;*/
          margin-top: 5px;
          margin-left: -130px;
          border-radius: 4px;
          background: #FFFFFF;
          box-shadow: 0 1px 6px 0 rgba(0,0,0,0.15);
          .close{
            height: 30px;
            line-height: 30px;
            text-align: right;
            padding-right: 10px;
            img{
              width: 10px;
              height: 10px;
              cursor: pointer;
            }
          }
          .content{
            padding: 0 20px;
            &-head{
              width: 116px;
              height: 116px;
              margin: 0 auto;
              margin-top: -8px;
              border-radius: 50%;
              img{
                width: 100%;
                height: 100%;
              }
            }
            &-name{
              height: 24px;
              line-height: 24px;
              margin-top: 5px;
              margin-bottom: 10px;
              font-size: 16px;
              font-family: "SNM";
              color: rgba(0,0,0,0.85);
              text-align: center;
            }
            &-text{
              height: 14px;
              line-height: 22px;
              margin-bottom: 15px;
              padding: 0 10px;
              color: rgba(0,0,0,0.65);
              font-size: 14px;
              img{
                vertical-align:middle;
              }
            }
            .border{
              padding-bottom: 38px;
              border-bottom: 1px dashed rgba(0,0,0,0.15);
            }
            &-button{
              display: flex;
              justify-content: center;
              .button{
                width: 82px;
                height: 32px;
                line-height: 32px;
                margin: 0 6px;
                color: #1890FF;
                font-size: 14px;
                text-align: center;
                cursor: pointer;
                border-radius: 4px;
                border: 1px solid #1890FF;
                background: #FFFFFF;
              }
            }
          }
        }
      }
      .right{
        width: 45px;
        text-align: right;
        img{
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
      }
      img{
        vertical-align:middle;
      }
      .active{
        background: #F9F9F9;
      }
    }
    /deep/
    .el-dialog{
      .el-dialog__header{
        padding: 15px 10px 15px 20px;
        border-bottom: 1px solid rgba(0,0,0,0.15);
        .el-dialog__title{
          font-family: "SNM";
          font-size: 20px;
          color: rgba(0,0,0,0.85);
        }
        .el-icon-close{
          font-size: 22px;
        }
      }
      .el-dialog__body{
        padding: 30px 90px;
        font-size: 14px;
        color: rgba(0,0,0,0.85);
        .el-form-item__label{
          font-family: "SNM";
        }
      }
      .el-dialog__footer{
        padding: 15px 10px 15px 20px;
        border-top: 1px solid rgba(0,0,0,0.15);
        .el-button{
          width: 65px;
          height: 32px;
          padding: 0;
          padding-left: 2px;
          letter-spacing: 2px;
        }
      }
    }
  }
</style>

