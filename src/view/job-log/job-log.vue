<!--工作日志-->
<template>
  <div class="job-log common-div common-h2">
    <div class="common-div-title">
      <div class="left">
        工作日志
      </div>
    </div>
    <div class="common-div-content">
      <div class="button">
        <el-button  @click="tableAdd">填写日志</el-button>
      </div>
      <div class="table-div">
        <el-table
          :data="tableData"
          class="multipleTable table-left"
          ref="multipleTable"
          :highlight-current-row="true"
          @row-click="handleClickCurrentRow"
          @selection-change="handleSelectionChange"
          @select="selection"
          @select-all="selection"
          :cell-style="getCellStyle"
        >
          <el-table-column prop="time" label="日期" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="日志类型" width="100">
            <template slot-scope="scope">
              <div class="table-point">
                <div :class="['point-left','dbg'+scope.row.type]"></div>
                <div class="point-right">
                  <p>{{scope.row.typeName}}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="日志详情" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 20, 30 ,40]"
            :page-size="pageSize"
            layout="prev, pager, next, sizes, jumper"
            :total="parseInt(total)">
          </el-pagination>
        </div>
      </div>
    </div>
    <!--      操作弹框-->
    <el-dialog
      title="填写日志"
      :visible.sync="dialogFormVisble"
      width="480px"
      class="dialog-form"
      :close-on-click-modal="false"
      :modal-append-to-body='false'
      :before-close="closeDialog">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogRules" label-width="100px">
        <el-form-item label="日志日期:" prop="date">
          <el-date-picker
            v-model="dialogForm.date"
            type="date"
            placeholder="选择日期"
            format="yyyy.MM.dd"
            value-format="yyyy-MM-dd"
            class="handle-input"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="日志类型:">
          <ul>
            <li v-for="(item,i) in logList" :key="i" :class="[i===logList.length-1?'':'ma-r',i===active?'active':'']" @click="choose(item,i)">
              {{item.label}}
            </li>
          </ul>
        </el-form-item>
        <div class="project-list" v-for="(item,i) in dialogForm.content" :key="i"  v-if="active < 2">
          <el-form-item :label="item.label">
            <el-date-picker
              v-if="active === 0"
              v-model="item.projectTime"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="handle-input"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <div class="project-form">
            <div>
              <el-input v-model="item.time" clearable placeholder="请填写耗时" style="width: 120px"></el-input>
              <span>小时</span>
            </div>
            <div>
              <el-input type="textarea" v-model="item.projectDescribe" clearable placeholder="请填写内容" :rows="4" class="handle-input"></el-input>
            </div>
          </div>
        </div>
        <div class="form-btn" v-if="active < 2" @click="addForm">
          <img src="/static/images/icon/icon_01.svg"/>添加项目
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary"  @click="saveFormInfo">提交</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import { publicTable } from '@/libs/mixin';
  import {formatDate} from '@/utility/utility';
  export default {
    name: "jobLog",
    mixins: [ publicTable ],
    components:{},
    computed:{},
    data() {
      return {
        dialogFormVisble:false,
        dialogForm:{
          date:formatDate(new Date(), 'yyyy.MM.dd'),
          content:[
            {
              label:'项目001:',
              projectTime:'',
              time:'',
              projectDescribe:''
            }
          ]
        },
        dialogRules:{
          date: [
            { required: true, message: '请选择日志日期', trigger: 'change' }
          ],
        },

        logList:[
          {
            value:'1',
            label:'正常'
          },
          {
            value:'3',
            label:'补填'
          },
          {
            value:'4',
            label:'休假'
          },
          {
            value:'5',
            label:'请假'
          }
        ],
        active:0,
      }
    },
    created() {
      // this.dialogForm.date = formatDate(new Date(), 'yyyy.MM.dd');
      this.getData();
    },
    mounted() {},
    watch: { },
    methods: {
      //获取表格的行与列
      getCellStyle({row, column, rowIndex, columnIndex}){
        if(columnIndex ===2){
          return 'border-right:none'
        }
      },
      // 列表数据
      getData() {
        if(this.currentPage === 1){
          this.tableData = [
            {
              type:1,
              typeName:'正常',
              time:'2020.01.05',
              content:'我是内容我是内容我是内容我是内容',
            },
            {
              type:1,
              typeName:'正常',
              time:'2020.01.05',
              content:'我是内容我是内容我是内容我是内容',
            },
            {
              type:3,
              typeName:'补填',
              time:'2020.01.05',
              content:'我是内容我是内容我是内容我是内容',
            },
            {
              type:4,
              typeName:'休假',
              time:'2020.01.05',
              content:'我是内容我是内容我是内容我是内容',
            },
            {
              type:5,
              typeName:'请假',
              time:'2020.01.05',
              content:'我是内容我是内容我是内容我是内容',
            },
          ];
        }else if(this.currentPage === 2){
          this.tableData = [
            {
              type:1,
              typeName:'正常',
              time:'2020.01.05',
              content:'我是内容我是内容我是内容我是内容',
            },
            {
              type:1,
              typeName:'正常',
              time:'2020.01.05',
              content:'我是内容我是内容我是内容我是内容',
            },
          ];
        }
        this.total = 7;
      },
      // 填写日志
      tableAdd(){
        this.dialogFormVisble = true;
      },
      //保存
      saveFormInfo(){
        this.$refs.dialogForm.validate(valid => {
          if (valid) {


            this.closeDialog();
          }
        })
      },
      //弹框关闭
      closeDialog(){
        this.dialogFormVisble = false;
        setTimeout(()=>{
          this.dialogForm={
            date:formatDate(new Date(), 'yyyy.MM.dd'),
            content:[
              {
                label:'项目001:',
                projectTime:'',
                time:'',
                projectDescribe:''
              }
            ]
          };
          this.$refs.dialogForm.resetFields();
        },500);
      },
      // 选择日志类型
      choose(item,i){
        this.active = i;
      },
      // 新增项目
      addForm(){
        let content = this.dialogForm.content;
        let index = content.length + 1;
        let label = '';
        if(index<10){
          label = '项目00'+index+':';
        }else if(index>=10 && index<100){
          label = '项目0'+index+':';
        }else {
          label = '项目'+index+':';
        }
        let obj =  {
          label:label,
          projectTime:'',
          time:'',
          projectDescribe:''
        }
        content.push(obj);
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../assets/styles/jobBoard.scss';
  @import '../../assets/styles/common.scss';
  .job-log{
    width: 100%;
    position:relative;
    /deep/ .button{
      margin-bottom: 20px;
      .el-button{
        height: 32px;
        padding: 0 15px;
      }
    }
    /deep/ .dialog-form{
      .el-dialog__body {
        padding: 30px 60px 20px 40px;
        max-height: 610px;
        overflow: auto;
        ul{
          overflow: hidden;
          margin-top: 5px;
          li{
            float: left;
            list-style: none;
            width:calc(25% - 10px);
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: rgba(0,0,0,0.65);
            text-align: center;
            cursor: pointer;
            border: 1px solid #D9D9D9;
            border-radius: 4px;
            background: #FFFFFF;
          }
          .ma-r{
            margin-right: 13px;
          }
          .active{
            color: #1890FF;
            border: 1px solid #1890FF;
          }
        }
        .project-list{
          margin-bottom: 30px;
          .project-form{
            padding-left: 30px;
            margin-top: -10px;
            div{
              margin-bottom: 7px;
              span{
                font-size: 14px;
                color: rgba(0,0,0,0.85);
              }
            }
          }
        }
        .form-btn{
          width: 352px;
          height: 32px;
          line-height: 32px;
          margin-left: 29px;
          font-size: 14px;
          color: rgba(0,0,0,0.65);
          text-align: center;
          cursor: pointer;
          border: 1px dashed #D9D9D9;
          border-radius: 4px;
          img{
            position: relative;
            top: -2px;
            margin-right: 7px;
            vertical-align:middle;
          }
        }
      }
    }
  }
</style>

