/**
 * @description 公共表格数据方法,复用代码,提高效率.
 * @param {Object} publicTable mixin 混合
 */
export const publicTable = {
  data(){
    return {
      headerCellStyle: {'text-align': 'center','color':'#999999','background-color':'rgba(248,248,249,1)'},
      cellStyle: {'text-align': '','color':'#606266'},
      listLoading: false,
      //查询条件
      queryForm: {},
      //分页
      total: 0,//总条数
      pageSize:10,//当前页要展示多少条数据，默认10
      currentPage: 1,//当前页初始值设置为0
      /**
       *选择
       */
      multipleSelectionAll: [],   // 所有选中的数据包含跨页数据
      multipleSelection: [],      // 当前页选中的数据
      idKey: 'id',
      //列表数据
      tableData: [],
      /**
       *弹框操作属性
       */
      //弹框名称
      dialogName:"",
      //弹框操作
      dialogFormVisble:false,
      //是否表单禁用
      isView:false,
    }
  },
  methods: {
    //查询
    search() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.getData();
    },
    //刷新
    refresh(){
      this.multipleSelection = [];
      this.multipleSelectionAll = [];
      this.changePageCoreRecordData();
      this.search();
    },
    // 点击行设置勾选ifDetail
    handleClickCurrentRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
      setTimeout(()=>{
        this.changePageCoreRecordData();
      }, 50);
    },
    // 当选择项发生变化时
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页导航
    typeIndex(index){
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //改变每页显示条数
    handleSizeChange(val) {
      this.changePageCoreRecordData();
      this.pageSize = val;
      this.getData();
    },
    //改变页
    handleCurrentChange(val) {
      this.changePageCoreRecordData();
      this.currentPage = val;
      this.getData();
    },
    // 设置选中的方法
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return;
      }
      // 标识当前行的唯一键的名称
      let idKey = this.idKey;
      let selectAllIds = [];
      let that = this;
      this.multipleSelectionAll.forEach(row=>{
        selectAllIds.push(row[idKey]);
      });
      this.$refs.multipleTable.clearSelection();
      for(var i = 0; i < this.tableData.length; i++) {
        if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.multipleTable.toggleRowSelection(this.tableData[i], true);
        }
      }
    } ,
    // 记忆选择核心方法
    changePageCoreRecordData () {
      // 标识当前行的唯一键的名称
      let idKey = this.idKey;
      let that = this;
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection;
        return;
      }
      // 总选择里面的key集合
      let selectAllIds = [];
      this.multipleSelectionAll.forEach(row=>{
        selectAllIds.push(row[idKey]);
      });
      let selectIds = [];
      // 获取当前页选中的id
      this.multipleSelection.forEach(row=>{
        selectIds.push(row[idKey]);
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row);
        }
      });
      let noSelectIds = [];
      // 得到当前页没有选中的id
      this.tableData.forEach(row=>{
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey]);
        }
      });
      noSelectIds.forEach(id=>{
        if (selectAllIds.indexOf(id) >= 0) {
          for(let i = 0; i< that.multipleSelectionAll.length; i ++) {
            if (that.multipleSelectionAll[i][idKey] == id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1);
              break;
            }
          }
        }
      })
    },
    //实时记录选中的数据
    selection(){
      setTimeout(()=>{
        this.changePageCoreRecordData();
      }, 50);
    }
  }
};
/**
 * @description 获取当前时间,复用代码,提高效率.
 * @param {Object} publicDate mixin 混合
 */
export const publicDate = {
  data(){
    return {
      //日期
      date:new Date(),
      //星期
      todayCurrentWeek:"",
      //当前时间
      todayCurrentTime:"",
      //当前年
      currentYear:'',
      //当前月
      currentMonth:'',
      //当前日
      currentDate:''
    }
  },
  methods: {
    /***
     * 获取当日是星期几
     */
    weekData(){
      let x = new Array("星期日", "星期一", "星期二","星期三","星期四", "星期五","星期六");
      let day = this.date.getDay();//获取星期
      this.todayCurrentWeek = x[day];
    },
    /***
     * 获取当前时间
     */
    timeData(){
      let year = this.date.getFullYear();//当前年份
      let month = this.date.getMonth();//当前月份
      let date = this.date.getDate();//当前日期
      let hours = this.date.getHours();//当前时
      let minute = this.date.getMinutes();//当前分
      let second = this.date.getSeconds();//当前秒
      let time =year+"-"+this.fillZero((month+1))+"-"+this.fillZero(date)+" "+this.fillZero(hours)+":"+this.fillZero(minute)+":"+this.fillZero(second);

      this.currentYear = year;
      this.currentMonth = month+1;
      this.currentDate = date;
      this.todayCurrentTime = time;
    },
    /***
     * @param 时间补零
     * @returns {string}
     */
    fillZero(str){
      let num; str>=10?num=str:num="0"+str;
      return num;
    }
  },
  created(){
    this.timeData();
  },
  mounted(){
  },
};
/**
 * @description 实现input框严重,复用代码,提高效率.
 * @param {Object} inputCheck mixin 混合
 */
export const inputCheck = {
  data(){
    return {
      //input只输入英文和空格
      inputEnglish:'value=value.replace(/[^\\w\\.\\s\\/]/ig,\'\')',
      //只能输入数字
      inputNumber:'value=value.replace(/[^\\d]/g,\'\')',
      //是能输入数字和-(座机电话使用)
      inputPhone:'value=value.replace(/[^\\d\\-\\d]/g,\'\')'
    }
  },
  methods: {},
  created(){},
  mounted(){},
};
/**
 * @description 实现页面等比例缩放
 * @param {Object} resolution mixin 混合
 */
export const resolution = {
  data(){
    return {
      scalseX: 1, //x坐标缩放比例
      scalseY: 1, //y坐标缩放比例
      width:null//宽
    }
  },
  methods: {
    //计算缩放比例
    resize_window() {
      //分辨率
      let w_resolution = window.screen.width;
      // let h_resolution = window.screen.height;
      //浏览器网页区域
      let w_width = document.documentElement.clientWidth;
      let w_height = document.documentElement.clientHeight;
      this.scalseX = Number(w_width / w_resolution);
      if(this.isFullScreen () === true){
        this.scalseY = Number(w_height / 1080);
      }else {
        this.scalseY = Number(w_height / 936);
      }
      this.width = w_resolution;
    },
    //判断是否是全屏
    isFullScreen () {
      //只监听高度不监听宽度
      //&& window.outerWidth === window.screen.width
      var explorer = window.navigator.userAgent.toLowerCase();
      if(explorer.indexOf('chrome')>0){//webkit
        if (document.body.scrollHeight === window.screen.height) {
          return true;
        } else {
          return false;
        }
      }else{//IE 9+  fireFox
        if (window.outerHeight === window.screen.height) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  created(){},
  mounted(){
    //计算缩放比例
    this.resize_window();
    window.addEventListener('resize', () => {
      this.resize_window();
    });
  },
};
/**
 * @description 实现element修改组件样式的方法,复用代码,提高效率.
 * @param {Object} elementMethods mixin 混合
 */
export const elementMethods = {
  data(){
    return {}
  },
  methods: {
    //获取表格的行与列
    getCellStyle({row, column, rowIndex, columnIndex}){
      if(columnIndex ===3){
        return 'border-right:none'
      }
    },
    // 进度条颜色
    customColorMethod(percentage){
      if (percentage === 0) {
        return '#CECECE';
      } else if (percentage === 100) {
        return '#52C41A';
      } else {
        return '#1890FF';
      }
    }
  },
  created(){},
  mounted(){},
};

/**
 * @description 实现点击当前元素之外执行方法,复用代码,提高效率.
 * @param {Object} outside mixin 混合
 */

const clickOutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
};

export const outside = {
  components:{},
  computed:{},
  directives: {
    clickOutside
  },
  data(){
    return {}
  },
  methods: {},
  created(){},
  mounted(){},
};
