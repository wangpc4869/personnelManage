<!--人员管理-->
<template>
  <div class="personnel-management common-div common-h2">
    <div class="common-div-title">
      <div class="left">
        人员管理
      </div>
      <div class="right">
        <el-select v-model="queryForm" clearable placeholder="请选择职位">
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
          <el-table-column
            v-for="(item,index) in tableFormat"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="center"
            show-overflow-tooltip
            :key="index"
          >
          </el-table-column>
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
      :close-on-click-modal="false"
      :modal-append-to-body='false'
      :before-close="closeDialog"
    >
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogRules" label-width="100px">
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="dialogForm.name" clearable placeholder="请输入姓名" class="handle-input"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-select v-model="dialogForm.gender" class="handle-input">
            <el-option
              v-for="(item,i) in genderOptions"
              :key="i"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生年月日:" prop="birthday">
          <el-date-picker
            v-model="dialogForm.birthday"
            type="date"
            class="handle-input"
            format="yyyy.MM.dd"
            value-format="yyyy-MM-dd"
            placeholder="选择出生年月日"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="管理人员:">
          <el-select v-model="dialogForm.isManager"class="handle-input">
            <el-option
              v-for="(item,i) in managerOptions"
              :key="i"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="dialogForm.email" clearable placeholder="请输入邮箱" class="handle-input"></el-input>
        </el-form-item>
        <el-form-item label="手机号码:" prop="Mobile">
          <el-input v-model="dialogForm.Mobile" clearable placeholder="请输入手机号码" class="handle-input"></el-input>
        </el-form-item>
        <el-form-item label="技能标签:">
          <ul>
            <li v-for="(item,i) in skillsOptions" :key="i" @click="choose(item)" :class="[item.isShow === true?'active':'','pc-text']">
              {{item.label}}
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="saveFormInfo">提交</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import { publicTable,elementMethods } from '@/libs/mixin';
  export default {
    name: "personnelManagement",
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
            label: '产品经理'
          }, {
            value: '2',
            label: '开发经理'
          }, {
            value: '3',
            label: '测试经理'
          }
        ],
        // 性别数据
        genderOptions:[
          {
            value: '1',
            label: '男'
          }, {
            value: '2',
            label: '女'
          }
        ],
        // 是否管理人员
        managerOptions:[
          {
            value: '1',
            label: '是'
          }, {
            value: '0',
            label: '否'
          }
        ],
        //技能标签
        //列表内容
        skillsOptions:[
          {
            value: '1',
            isShow:false,
            label: '项目经理'
          }, {
            value: '2',
            isShow:false,
            label: '产品经理'
          },
          {
            value: '3',
            isShow:false,
            label: '开发经理'
          }, {
            value: '4',
            isShow:false,
            label: '测试经理'
          }
        ],
        tableFormat:[
          {prop:"name", label:"姓名", width:120},
          {prop:"gender", label:"性别", width:70},
          {prop:"birthday", label:"出生年月日", width:120},
          {prop:"email", label:"邮箱", width:180},
          {prop:"Mobile", label:"手机号码", width:120},
          {prop:"Skills", label:"技能标签", width:''},
        ],
        // 新增编辑操作
        //弹框名称
        dialogName:"",
        //弹框操作
        dialogFormVisble:false,
        //表单参数
        dialogForm:{
          name:'',
          gender:'1',
          birthday:'',
          isManager:'0',
          email:'',
          Mobile:''
        },
        //表单验证
        dialogRules:{
          name: [
            { required: true, message: '请填写姓名', trigger: 'blur' },
          ],
          birthday: [
            { required: true, message: '请选择出生年月日', trigger: 'change' }
          ],
          email: [
            { required: true, message: '请填写邮箱', trigger: 'blur' },
          ],
          Mobile: [
            { required: true, message: '请填写手机号码', trigger: 'blur' },
          ],
        }
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
        if(columnIndex ===6){
          return 'border-right:none'
        }
      },
      // 列表数据
      getData() {
        if(this.currentPage === 1){
          this.tableData = [
            {
              id:1,
              name:'内部孵',
              gender:'男',
              birthday:'2020.01.05',
              email:'1609231224@qq.com',
              Mobile:'15351618604',
              Skills:'我是内容我是内容我是内容我是内容'
            },
            {
              id:2,
              name:'内部孵啊',
              gender:'男',
              birthday:'2020.01.05',
              email:'1609231224@qq.com',
              Mobile:'15351618604',
              Skills:'我是内容我是内容我是内容我是内容'
            },
            {
              id:3,
              name:'内部孵',
              gender:'男',
              birthday:'2020.01.05',
              email:'1609231224@qq.com',
              Mobile:'15351618604',
              Skills:'我是内容我是内容我是内容我是内容'
            },
            {
              id:4,
              name:'内部孵',
              gender:'男',
              birthday:'2020.01.05',
              email:'1609231224@qq.com',
              Mobile:'15351618604',
              Skills:'我是内容我是内容我是内容我是内容'
            },
            {
              id:5,
              name:'内部孵',
              gender:'男',
              birthday:'2020.01.05',
              email:'1609231224@qq.com',
              Mobile:'15351618604',
              Skills:'我是内容我是内容我是内容我是内容'
            }
          ];
        }else if(this.currentPage === 2){
          this.tableData = [
            {
              id:6,
              name:'内部孵',
              gender:'男',
              birthday:'2020.01.05',
              email:'1609231224@qq.com',
              Mobile:'15351618604',
              Skills:'我是内容我是内容我是内容我是内容'
            },
            {
              id:7,
              name:'内部孵',
              gender:'男',
              birthday:'2020.01.05',
              email:'1609231224@qq.com',
              Mobile:'15351618604',
              Skills:'我是内容我是内容我是内容我是内容'
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
      //选择技能标签
      choose(item){
        item.isShow = !item.isShow;
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../assets/styles/jobBoard.scss';
  @import '../../assets/styles/common.scss';
  .personnel-management{
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
    /deep/ .el-dialog{
      .el-dialog__body {
        padding: 30px 130px 20px 90px;
      }
      ul{
        overflow: hidden;
        li{
          float: left;
          list-style: none;
          width: 76px;
          height: 30px;
          line-height: 30px;
          margin-right: 13px;
          margin-top: 6px;
          font-size: 14px;
          color: rgba(0,0,0,0.65);
          text-align: center;
          cursor: pointer;
          border: 1px solid #D9D9D9;
          border-radius: 4px;
          background: #FFFFFF;
        }
        .active{
          color: #1890FF;
          border: 1px solid #1890FF;
        }
      }
    }
  }
</style>
