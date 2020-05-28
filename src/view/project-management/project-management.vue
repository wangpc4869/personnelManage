<!--项目管理-->
<template>
  <div class="project-management common-div common-h2">
    <div class="common-div-title">
      <div class="left">
        项目管理
      </div>
      <div class="right">
        <el-select v-model="queryForm" clearable placeholder="请选择项目状态">
          <el-option
            v-for="(item,i) in options"
            :key="i"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="common-div-content">
      <div class="button">
        <el-button type="primary" icon="el-icon-plus"  @click="tableAdd">新增</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="tableEdit" :disabled="multipleSelectionAll.length === 1?false:true">编辑</el-button>
        <el-button icon="el-icon-delete" @click="delAll" :disabled="multipleSelectionAll.length>0?false:true">删除</el-button>
        <el-button :disabled="multipleSelectionAll.length === 1?false:true" @click="tableRelate">关联资源</el-button>
        <el-button :disabled="multipleSelectionAll.length === 1?false:true" @click="tableProgres">进度管理</el-button>
      </div>
      <div class="table-div">
        <el-table
          :data="tableData"
          class="multipleTable"
          ref="multipleTable"
          :highlight-current-row="true"
          @row-click="handleClickCurrentRow"
          @selection-change="handleSelectionChange"
          :cell-style="getCellStyle"
          @select="selection"
          @select-all="selection"
        >
          <el-table-column type="selection" :reserve-selection="false" width="" align="center"></el-table-column>
          <el-table-column prop="name"  label="项目名称" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="time"  label="项目周期" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column label="项目状态" width="100">
            <template slot-scope="scope">
              <div class="table-point">
                <div :class="['point-left','pbg'+scope.row.type]"></div>
                <div class="point-right">
                  <p>{{scope.row.typeName}}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="项目进度" width="160">
            <template slot-scope="scope">
              <div class="table-progress">
                <div class="progress-left">
                  {{scope.row.county}}%
                </div>
                <div class="progress-right">
                  <el-progress :percentage="parseInt(scope.row.county)" :stroke-width="6" :show-text="false" :color="customColorMethod"></el-progress>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name"  label="项目经理" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="content" label="项目资源" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name"  label="项目描述" show-overflow-tooltip></el-table-column>
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
    <!--     新增修改 操作弹框-->
    <el-dialog
      :title="dialogName"
      :visible.sync="dialogFormVisble"
      width="686px"
      class="dialog-form"
      :close-on-click-modal="false"
      :modal-append-to-body='false'
      :before-close="closeDialog"
    >
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogRules" label-width="100px">
        <el-form-item label="项目名称:" prop="projectName">
          <el-input v-model="dialogForm.projectName" clearable placeholder="请输入项目名称" class="handle-input"></el-input>
        </el-form-item>
        <el-form-item label="项目周期:" prop="projectTime">
          <el-date-picker
            v-model="dialogForm.projectTime"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="handle-input"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目经理:" prop="projectManager">
          <el-select v-model="dialogForm.projectManager" clearable placeholder="请选择项目经理" class="handle-input">
            <el-option
              v-for="(item,i) in options"
              :key="i"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目描述:" prop="projectDescribe">
          <el-input type="textarea" v-model="dialogForm.projectDescribe" clearable placeholder="请输入项目描述" :rows="4" class="handle-input"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="saveFormInfo">提交</el-button>
        </span>
    </el-dialog>
    <!--      关联资源操作弹框-->
    <el-dialog
      title="关联资源"
      :visible.sync="relateVisble"
      width="839px"
      :close-on-click-modal="false"
      :modal-append-to-body='false'
      :before-close="closeRelate"
    >
      <div class="job-list">
        <div v-for="(item,i) in positionList" :key="i"  @click="choose(item)" :class="[i===0?'div1':i===positionList.length-1?'div2':'',item.isShow === true?'div3':'','pc-text']">
          {{item.name}}
        </div>
      </div>
      <div class="transfer">
        <Transfer
          :data="transferData"
          :target-keys="targetKeys"
          filterable
          :filter-method="filterMethod"
          @on-change="handleChange">
        </Transfer>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeRelate">取消</el-button>
          <el-button type="primary" @click="saveRelateInfo">提交</el-button>
        </span>
    </el-dialog>
    <!--     进度管理操作弹框-->
    <el-dialog
      title="进度管理"
      :visible.sync="progressVisble"
      width="686px"
      class="progress-form"
      :close-on-click-modal="false"
      :modal-append-to-body='false'
      :before-close="closeProgress"
    >
      <el-form ref="progresForm" :model="progressForm" :rules="dialogRules" label-width="100px">
        <el-form-item label="项目名称:" prop="projectName">
          <el-input v-model="progressForm.projectName" clearable placeholder="请输入项目名称" class="handle-input"></el-input>
        </el-form-item>
        <el-form-item label="当前进度:">
          <div class="slider">
            <el-slider v-model="progressForm.value" @input="sliderInput" ></el-slider>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeProgress">取消</el-button>
          <el-button type="primary"  @click="saveProgressInfo">保存</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import { publicTable,elementMethods } from '@/libs/mixin';
  export default {
    name: "projectManagement",
    mixins: [ publicTable,elementMethods ],
    components:{},
    computed:{},
    data() {
      return {
        //表格一页显示多少条
        pageSize:5,
        //查询参数
        queryForm:'',
        // 下拉框数据
        options: [
          {
            value: '0',
            label: '全部'
          }, {
            value: '1',
            label: '进行中'
          }, {
            value: '2',
            label: '未开始'
          }, {
            value: '3',
            label: '已完成'
          }
        ],

        /**
         * 新增编辑操作
         */
        //弹框名称
        dialogName:"",
        //弹框操作
        dialogFormVisble:false,
        //表单参数
        dialogForm:{
          projectName:'',
          projectTime:'',

        },
        //表单验证
        dialogRules:{
          projectName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
          ],
          projectTime: [
            { required: true, message: '请选择项目周期', trigger: 'change' }
          ],
        },
        /**
         * 关联资源操作
         */
        //弹框操作
        relateVisble:false,
        //职位类别
        positionList:[
          {
            id:1,
            name:'项目经理',
            isShow:false,
          },
          {
            id:2,
            name:'产品经理',
            isShow:false,
          },
          {
            id:3,
            name:'开发经理',
            isShow:false,
          },
          {
            id:4,
            name:'测试经理',
            isShow:false,
          },
          {
            id:5,
            name:'WEB前端',
            isShow:false,
          },
          {
            id:6,
            name:'WEB后端',
            isShow:false,
          },
          {
            id:7,
            name:'大数据开发',
            isShow:false,
          },
          {
            id:8,
            name:'APP开发',
            isShow:false,
          },
          {
            id:9,
            name:'软件测试',
            isShow:false,
          }
        ],

        // 穿梭框数据
        transferData: this.getMockData(),
        targetKeys: [],

        /**
         * 进度管理
         */
        progressVisble:false,
        progressForm:{
          projectName:'',
          value:10
        },
      }
    },
    created() {
      this.getData();
    },
    mounted() {},
    watch: { },
    methods: {
      //获取表格的行与列
      getCellStyle({row, column, rowIndex, columnIndex}){
        if(columnIndex ===7){
          return 'border-right:none'
        }
      },
      // 列表数据
      getData() {
        if(this.currentPage === 1){
          this.tableData = [
            {
              id:1,
              name:'内部孵化项目',
              type:1,
              typeName:'进行中',
              county:'90',
              content:'我是内容我是内容我是内容我是内容',
              time:'2020.01.05-2020.01.05'
            },
            {
              id:2,
              name:'内部孵化项目',
              type:1,
              typeName:'进行中',
              county:'90',
              content:'我是内容我是内容我是内容我是内容',
              time:'2020.01.05-2020.01.05'
            },
            {
              id:3,
              name:'内部孵化项目',
              type:2,
              typeName:'未开始',
              county:'0',
              content:'我是内容我是内容我是内容我是内容',
              time:'2020.01.05-2020.01.05'
            },
            {
              id:4,
              name:'内部孵化项目',
              type:3,
              typeName:'已完成',
              county:'100',
              content:'我是内容我是内容我是内容我是内容',
              time:'2020.01.05-2020.01.05'
            },
            {
              id:5,
              name:'内部孵化项目',
              type:1,
              typeName:'进行中',
              county:'90',
              content:'我是内容我是内容我是内容我是内容',
              time:'2020.01.05-2020.01.05'
            }
          ];
        }else if(this.currentPage === 2){
          this.tableData = [
            {
              id:6,
              name:'内部孵化项目',
              type:1,
              typeName:'进行中',
              county:'90',
              content:'我是内容我是内容我是内容我是内容',
              time:'2020.01.05-2020.01.05'
            },
            {
              id:7,
              name:'内部孵化项目',
              type:1,
              typeName:'进行中',
              county:'90',
              content:'我是内容我是内容我是内容我是内容',
              time:'2020.01.05-2020.01.05'
            },
          ];
        }
        this.total = 7;
        setTimeout(()=>{
          this.setSelectRow();
        }, 200)
      },
      //查询
      search() {
        this.getData();
      },

      /**
       * 新增编辑操作
       */
      //新增
      tableAdd(){
        this.dialogName = '新增';
        this.dialogFormVisble = true;
      },
      //编辑
      tableEdit(){
        this.dialogName = '编辑';
        this.dialogFormVisble = true;
      },
      // 批量删除
      delAll () {
        // 原方法缺少一次增加，本页面选中数据未添加
        this.changePageCoreRecordData();
        this.$confirm('确认删除选中的 [ ' + this.multipleSelectionAll.length + ' ] 条记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.multipleSelection = [];
          this.multipleSelectionAll = [];
          this.getData()
        }, () => {
          this.multipleSelection = [];
          this.multipleSelectionAll = [];
          // 点击取消
        })
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
          this.dialogForm={};
          this.$refs.dialogForm.resetFields();
        },500);
      },

      /**
       * 关联资源操作
       */
      tableRelate(){
        this.relateVisble = true;
      },
      //提交
      saveRelateInfo(){
        this.closeRelate();
      },
      //弹框关闭
      closeRelate(){
        this.relateVisble = false;
      },
      // 选择岗位类型
      choose(item){
        item.isShow = !item.isShow;
      },
      // 穿梭框方法
      // 左边数据
      getMockData () {
        let mockData = [];
        for (let i = 1; i <= 20; i++) {
          mockData.push({
            key: i.toString(),
            label: 'Content ' + i,
          });
        }
        return mockData;
      },
      // 右边数据
      getTargetKeys () {
        return this.getMockData()
          .filter(() => Math.random() * 2 > 1)
          .map(item => item.key);
      },
      handleChange (newTargetKeys) {
        this.targetKeys = newTargetKeys;
      },
      // 搜索
      filterMethod (data, query) {
        return data.label.indexOf(query) > -1;
      },
      /**
       * 进度管理
       */
      // 查看进度管理
      tableProgres(){
        this.progressVisble = true;
      },
      //保存
      saveProgressInfo(){
        this.$refs.progresForm.validate(valid => {
          if (valid) {


            this.closeProgress();
          }
        })
      },
      //关闭弹框
      closeProgress(){
        this.progressVisble = false;
      },
      sliderInput(val){
        const slider__bar = document.getElementsByClassName('el-slider__bar');
        const slider__button = document.getElementsByClassName('el-slider__button');
        if (val === 0) {
          slider__bar[0].style.backgroundColor = '#CECECE';
          slider__button[0].style.border = '2px solid #CECECE';
        } else if(val === 100) {
          slider__bar[0].style.backgroundColor = '#52C41A';
          slider__button[0].style.border = '2px solid #52C41A';
        }else {
          slider__bar[0].style.backgroundColor = '#1890FF';
          slider__button[0].style.border = '2px solid #1890FF';
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../assets/styles/jobBoard.scss';
  @import '../../assets/styles/common.scss';
  .project-management{
    width: 100%;
    position:relative;
    /deep/ .button{
      margin-bottom: 20px;
      .el-button{
        height: 32px;
        padding: 0 15px;
        i{
          margin-right: 8px;
        }
      }
    }
    /deep/ .dialog-form{
      .el-dialog__body {
        padding: 30px 130px 20px 90px;
        .el-icon-date{
          position: absolute;
          right: 10px;
          margin-top: 2px;
        }
      }
    }
    /deep/ .progress-form{
      .el-dialog__body {
        padding: 30px 130px 0 90px;
      }
    }
    .job-list{
      display: flex;
      div{
        width: 11.1%;
        height: 32px;
        line-height: 32px;
        padding: 0 8px;
        font-size: 14px;
        color: rgba(0,0,0,0.65);
        text-align: center;
        cursor: pointer;
        border: 1px solid #D9D9D9;
        border-left: none;
      }
      .div1{
        border-radius: 4px 0 0 4px;
        border-left: 1px solid #D9D9D9;
      }
      .div2{
        border-radius: 0 4px 4px 0;
      }
      .div3{
        color: #1890FF;
        border: 1px solid #1890FF;
      }
    }
    /deep/ .transfer{
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
      .ivu-transfer-list{
        width: 246px;
        height: 289px;
        &-header{
          display: none;
        }
        &-body{
          border: 1px solid rgba(0,0,0,0.15);
          border-top: 1px solid rgba(0,0,0,0.15);
          border-radius: 5px;
          background: #F9F9F9;
          &-search-wrapper{
            height: 50px;
            border-bottom: 1px solid rgba(0,0,0,0.15);
            .ivu-input{
              height: 32px;
              line-height: 32px;
              border: 1px solid rgba(0,0,0,0.15);
              border-radius: 4px;
            }
            .ivu-input-icon{
              height: 32px;
              line-height: 32px;
              font-size: 18px;
            }
          }
        }
        &-content{
          margin-top: 20px;
          &-item{
            font-family: "PFR";
            font-size: 14px;
            color: rgba(0,0,0,0.65);
            .ivu-checkbox-inner{
              width: 16px;
              height: 16px;
              &:after{
                top: 2px;
                left: 5px;
              }
            }
            .ivu-checkbox-wrapper{
              margin-right: 2px;
            }
          }
        }
      }
      .ivu-transfer-operation{
        position: relative;
        top: 20px;
        .ivu-btn{
          width: 24px;
          height: 24px;
          padding: 0 0 1px 1px;
          text-align: center;
          border-radius: 50%;
        }
      }
    }
    /deep/ .slider{
      .el-slider__runway{
        height: 9px;
        border-radius: 5px;
      }
      .el-slider__bar{
        height: 9px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      .el-slider__button{
        width: 18px;
        height: 18px;
        margin-top: 2px;
      }
    }
  }
</style>

