<template>
  <div class="details">
    <!--标题-->
    <p class="title">数据集管理</p>
    <!--标题-->
    <!--分割线-->
    <div class="line"></div>
    <!--分割线-->
    <!-- 按钮区域开始 -->
    <div class="data-btn">
      <div style="float:left;">
        <el-button type="primary" size="small" @click="createData">创建数据集</el-button>
        <el-button type="warning" size="small" @click="batchDel">批量删除</el-button>
      </div>
      <div style="float:right;">
        <el-input size="small" style="width:200px;" v-model="input" placeholder="请输入数据集名称"></el-input>
        <el-select size="small" clearable v-model="region" placeholder="请选择部位名称">
          <el-option label="汽车发动机进气道" value="4"></el-option>
          <el-option label="汽车发动机喷油嘴" value="2"></el-option>
          <el-option label="汽车发动机进气阀" value="1"></el-option>
          <el-option label="汽车发动机活塞顶" value="3"></el-option>
          <el-option label="汽车发动机缸壁" value="5"></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="toSearch">查询</el-button>
      </div>
    </div>
    <!-- 按钮区域结束 -->

    <el-table :data="data.list" border style="width: 95%;margin:2em;" size="small" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="datasetName" label="数据集名称" align="center"></el-table-column>
      <el-table-column prop="classifys" label="分类数" align="center"></el-table-column>
      <el-table-column prop="image_num" label="图片数" align="center"></el-table-column>
      <el-table-column prop="datasetPart" label="部位名称" align="center">
        <template slot-scope="scope">{{scope.row.datasetPart?scope.row.datasetPart.partName:''}}</template>
      </el-table-column>

      <el-table-column label="创建时间" width="200" align="center">
        <template slot-scope="scope">{{scope.row.datasetTime | dateParse}}</template>
      </el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button @click="detailsHandleClick(scope.row.id)" type="success" size="mini">查看</el-button>
          <el-button @click="updoneHandleClick(scope.row.id)" type="primary" size="mini">详情</el-button>
          <!-- <el-button type="warning" size="mini" @click="update(scope.row)">修改</el-button> -->
          <el-button type="danger" size="mini" @click="deleteDate(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[3, 5, 7, 9]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>

    <!-- 模态框 -->
    <el-dialog title="汽车发动机进气道图片集详情" :visible.sync="dialogFormVisible">
      <el-form
        size="small"
        label-width="130px"
        label-position="left"
        style="padding：0em"
        class="demo-form"
      >
        <el-form-item label="数据集名称:">{{sort.datasetName}}</el-form-item>
        <el-form-item label="图像识别部位:">{{sort.partName}}</el-form-item>
        <el-form-item label="上传者:">{{sort.datasetUser}}</el-form-item>
        <el-form-item label="分类数:">{{sort.classifys_num}}</el-form-item>
        <el-form-item label="图片数:">{{sort.image_num}}</el-form-item>
        <el-form-item label="数据集上传时间:">{{sort.datasetTime}}</el-form-item>
        <el-form-item label="分辨率:">{{sort.datasetRatio}}</el-form-item>
        <el-form-item label="数据集状态:">{{sort.datasetStatus}}</el-form-item>
        <el-form-item label="描述信息:">{{sort.datasetDescribe}}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close('form')" size="small">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- 模态框 -->
    <!-- <div class="num">
          <a href="http://www.miitbeian.gov.cn/">粤ICP备13074057号-2</a><br>
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502001574"> <span><img src="@/assets/guohui.png"></span>   粤公网安备 44030502001574</a>
    </div>-->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      page: 1,
      pageSize: 5,
      count: 0,
      dialogFormVisible: false,
      region: "",
      input: "",
      multipleSelection: []

      // tableData: [{
      // 	time: '2020-02-03',
      // 	name: '汽车发动机进气道图片',
      // 	sort: '图像分类',
      // 	sortnum: '5',
      // 	id: '550',
      // 	}, {
      // 		time: '2020-02-03',
      // 		name: '汽车发动机喷油嘴图片',
      // 		sort: '图像分类',
      // 		sortnum: '2',
      // 		id: '68',
      // 	}, {
      // 		time: '2020-02-03',
      // 		name: '汽车发动机进气阀图片',
      // 		sort: '图像分类',
      // 		sortnum: '4',
      // 		id: '678',
      // 	}, {
      // 		time: '2020-02-03',
      // 		name: '汽车发动机活塞顶图片',
      // 		sort: '图像分类',
      // 		sortnum: '5',
      // 		id: '537',
      // 	}, {
      // 	time: '2020-02-03',
      // 	name: '汽车发动机缸壁图片',
      // 	sort: '图像分类',
      // 	sortnum: '3',
      // 	id: '654',
      // }],
      // form: {
      //     name: '汽车发动机进气道图片',
      //     region: '汽车发动机进气道',
      //     desc: '数据集用于识别汽车进气道'
      // },
    };
  },
  watch: {
    pageSize: function(old, now) {
      this.load();
    },
    page: function(old, now) {
      this.load();
    }
  },
  computed: {
    //映射state
    ...mapState("data", ["data", "sort"])
  },
  created() {
    //查询所有模型
    this.load();
    this.findAllSort(id);
  },
  methods: {
    //映射actions
    ...mapActions("data", ["findAllData", "findAllSort", "delData"]),
    //加载数据集列表
    load() {
      let obj = {
        page: this.page,
        page_size: this.pageSize
      };
      this.findAllData(obj).then(r => {
        this.count = this.data.total;
      });
    },
    loadData(obj) {
      this.findAllData(obj).then(r => {
        this.count = this.data.total;
      });
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    //查看
    detailsHandleClick(id) {
      // console.log('数据集id',id)
      this.$router.push({ name: "sort", query: { id } });
    },
    //详情
    updoneHandleClick(id) {
      this.dialogFormVisible = true;
      this.findAllSort(id);
    },
    // 关闭模态框
    close() {
      this.dialogFormVisible = false;
    },
    // 新增数据集
    createData() {
      this.$router.push({ name: "ctdata" });
    },
    // 批量选择框
    handleSelectionChange(val) {
      let results = val.map(item => {
        return item.id;
      });
      this.multipleSelection = results;
    },
    // 删除数据集
    deleteDate(id) {
      this.$confirm("确定要删除该数据集, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delData(id + ",")
            .then(r => {
              this.load();
              this.$notify({
                title: "成功",
                message: "这是一条成功的提示消息",
                type: "success"
              });
            })
            .catch(e => {
              this.$notify.error({
                title: "失败",
                message: "这是一条错误的提示消息"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 批量删除数据集
    batchDel() {
      let str = this.multipleSelection.join(",") + ",";
      this.multipleSelection = [];
      this.$confirm("确定要删除该数据集, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delData(str)
            .then(r => {
              this.load();
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });
            })
            .catch(e => {
              this.$notify.error({
                title: "失败",
                message: "删除失败"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //根据条件查找数据集
    toSearch() {
      let obj = {
        page: this.page,
        page_size: this.pageSize,
        part_id: this.region,
        search: this.input
      };
      this.loadData(obj);
    }
  }
};
</script>

<style>
.title {
  margin-left: 28px;
  color: #000;
  margin-top: 6px;
  margin-bottom: 6px;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #eee;
}
.data-page {
  float: left;
  margin-bottom: 1.5em;
  margin-right: 2em;
}
.num {
  text-align: center;
  font-size: 12px;
  position: absolute;
  bottom: 12px;
  left: 0px;
  right: 0px;
  margin: auto;
  width: 100%;
  color: #ccc;
}
.num img {
  height: 12px;
  width: 12px;
  text-align: center;
  line-height: 48;
}
.data-btn {
  margin: 10px 38px 10px 28px;
  overflow: hidden;
}
</style>