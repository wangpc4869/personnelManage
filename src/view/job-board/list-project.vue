<!--项目清单-->
<template>
  <div class="list-project common-div common-h1">
    <div class="common-div-title">
      <div class="left">
        项目清单
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
        <el-table-column prop="name" label="项目名称" show-overflow-tooltip></el-table-column>
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
<!--                <el-progress :percentage="parseInt(scope.row.county)" :stroke-width="6" :show-text="false" color="#CECECE" v-if="scope.row.type===2"></el-progress>-->
<!--                <el-progress :percentage="parseInt(scope.row.county)" :stroke-width="6" :show-text="false" color="#52C41A" v-else-if="scope.row.type===3"></el-progress>-->
<!--                <el-progress :percentage="parseInt(scope.row.county)" :stroke-width="6" :show-text="false" color="#1890FF" v-else></el-progress>-->
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="项目资源" show-overflow-tooltip></el-table-column>
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
    name: "listProject",
    mixins: [ publicTable,elementMethods ],
    components:{},
    computed:{},
    data() {
      return {
        pageSize:5,
        queryForm:'',
        options: [
          {
            value: '',
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
              name:'内部孵化项目',
              type:1,
              typeName:'进行中',
              county:'90',
              content:'我是内容我是内容我是内容我是内容',
            },
            {
              name:'内部孵化项目',
              type:1,
              typeName:'进行中',
              county:'90',
              content:'我是内容我是内容我是内容我是内容',
            },
            {
              name:'内部孵化项目',
              type:2,
              typeName:'未开始',
              county:'0',
              content:'我是内容我是内容我是内容我是内容',
            },
            {
              name:'内部孵化项目',
              type:3,
              typeName:'已完成',
              county:'100',
              content:'我是内容我是内容我是内容我是内容',
            },
            {
              name:'内部孵化项目',
              type:1,
              typeName:'进行中',
              county:'90',
              content:'我是内容我是内容我是内容我是内容',
            }
          ];
        }else if(this.currentPage === 2){
          this.tableData = [
            {
              name:'内部孵化项目',
              type:1,
              typeName:'进行中',
              county:'90',
              content:'我是内容我是内容我是内容我是内容',
            },
            {
              name:'内部孵化项目',
              type:1,
              typeName:'进行中',
              county:'90',
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
  .list-project{
  }
</style>

