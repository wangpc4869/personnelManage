<!--部门日志-->
<template>
  <div class="log-department common-div common-h1">
    <div class="common-div-title">
      <div class="left">
        部门日志
      </div>
      <div class="right">
        <el-date-picker
          v-model="queryForm.date"
          type="date"
          placeholder="选择时间"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
<!--
     datetime     format="yyyy-MM-dd HH:mm:ss"-->
<!--        value-format="yyyy-MM-dd HH:mm:ss"-->
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-select v-model="queryForm.name" clearable placeholder="请选择人员">
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
      <div class="statistical">
        <div v-for="(item,i) in liList" :key="i" :class="['bg'+i]">
          <p class="p1">
            {{item.name}}
          </p>
          <p class="p2">
            {{item.value}}
          </p>
        </div>
      </div>
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
        <el-table-column prop="name" label="名称" width="120" show-overflow-tooltip></el-table-column>
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
</template>

<script>
  import { publicTable,elementMethods } from '@/libs/mixin';
  export default {
    name: "logDepartment",
    mixins: [ publicTable,elementMethods ],
    components:{},
    computed:{},
    data() {
      return {
        pageSize:5,
        queryForm:{},

        options: [
          {
            value: '0',
            label: '张国庆'
          }, {
            value: '1',
            label: '王鹏程'
          }, {
            value: '2',
            label: '李明'
          }, {
            value: '3',
            label: '张三'
          }
        ],

        liList:[
          {
            name:'正常',
            value:22,
          },
          {
            name:'补填',
            value:6,
          },
          {
            name:'未填',
            value:1,
          },
          {
            name:'休假',
            value:2,
          },
          {
            name:'请假',
            value:0,
          }
        ],
      }
    },
    created() {
      this.getData();
    },
    mounted() {},
    watch: { },
    methods: {
      // 列表数据
      getData() {
        if(this.currentPage === 1){
          this.tableData = [
            {
              name:'王鹏程程',
              type:1,
              typeName:'正常',
              time:'2020.01.05',
              content:'我是内容我是内容我是内容我是内容',
            },
            {
              name:'王鹏程',
              type:2,
              typeName:'未填',
              time:'2020.01.05',
              content:'我是内容我是内容我是内容我是内容',
            },
            {
              name:'王鹏程',
              type:3,
              typeName:'补填',
              time:'2020.01.05',
              content:'我是内容我是内容我是内容我是内容',
            },
            {
              name:'王鹏程',
              type:4,
              typeName:'休假',
              time:'2020.01.05',
              content:'我是内容我是内容我是内容我是内容',
            },
            {
              name:'王鹏程',
              type:5,
              typeName:'请假',
              time:'2020.01.05',
              content:'我是内容我是内容我是内容我是内容',
            },
          ];
        }else if(this.currentPage === 2){
          this.tableData = [
            {
              name:'王鹏程',
              type:1,
              typeName:'正常',
              time:'2020.01.05',
              content:'我是内容我是内容我是内容我是内容',
            },
            {
              name:'王鹏程',
              type:2,
              typeName:'未填',
              time:'2020.01.05',
              content:'我是内容我是内容我是内容我是内容',
            },
          ];
        }
        this.total = 7;
      },
    }
  }
</script>
<style scoped lang="scss">
  @import '../../assets/styles/jobBoard.scss';
  @import '../../assets/styles/common.scss';
  .log-department{
    .multipleTable{
      margin-top: 20px;
    }
  }
</style>

