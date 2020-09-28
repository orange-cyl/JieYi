<template>
  <div class="operator">
    <!--标题-->
    <p class="title">算子管理</p>
    <!--标题-->
    <!--分割线-->
    <div class="line"></div>
    <!--分割线-->
    <div>
      <el-button
        type="primary"
        style="margin-top:1em;margin-left:2em"
        @click="resetForm('ruleForm')"
        size="small"
      >新增算子</el-button>
      <span style="float:right;margin-top:1em;margin-right:2em">
        <el-select
          v-model="value1"
          placeholder="请选择算子类型"
          clearable
          size="small"
          style="margin-left:35em"
        >
          <el-option label="基础算子" value="1"></el-option>
          <el-option label="自定义算子" value="2"></el-option>
        </el-select>
        <el-select
          v-model="value2"
          placeholder="请选择所属分类"
          clearable
          size="small"
          style="margin-left:1.5em"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button size="small" @click="search" style="margin-left:1.5em">查询</el-button>
      </span>
      <!-- {{value1}} -->
      <!-- {{value2}} -->
    </div>
    <!-- {{operator}} -->
    <!-- {{options}} -->
    <el-table :data="operator.results" border style="width: 95%;margin:2em;" size="small">
      <el-table-column prop="id" label="编号" width="100px" align="center"></el-table-column>
      <el-table-column prop="operator_name" label="名称" align="center"></el-table-column>
      <el-table-column prop="operator_type" label="所属分类" align="center"></el-table-column>
      <el-table-column prop="operator_category" label="算子类型" align="center"></el-table-column>
      <el-table-column prop="operator_time" label="上传时间" align="center">
        <!-- <template slot-scope="scope">
				{{scope.row.operator_time | dateParse}}
        </template>-->
      </el-table-column>
      <!-- <el-table-column
			prop="operator_url"
			label="地址"
			align='center'>
		</el-table-column>
		<el-table-column
			prop="operator_describe"
			label="描述"
			align='center'>
      </el-table-column>-->
      <el-table-column label="操作" align="center" width="150%">
        <template slot-scope="scope">
          <el-button @click="detailsHandleClick(scope.row.id)" type="success" size="mini">预览</el-button>
          <el-button @click="deleteHandleClick(scope.row.id)" type="danger" size="mini">删除</el-button>
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
    <el-dialog title="新增算子" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        resetField
        size="small"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="算子名称:" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入算子名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="算子类型:" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio label="1">基础算子</el-radio>
            <el-radio label="2">自定义算子</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分类:" prop="category">
          <el-select v-model="ruleForm.category" clearable placeholder="请选择所属分类">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传文件:" prop="file" v-if="ruleForm.type == 2">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="http://172.16.0.43:8006/operators/file-upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
            >上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传c/java/py文件</div>
          </el-upload>
          <!-- <el-upload
					accept="text"
					drag
					:on-succsee="successHanhler"
					show-file-list
					action="http://172.16.0.43:8006/operators/file-upload">
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>-->
        </el-form-item>
        <el-form-item label="描述信息:" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc" placeholder="请填写关于数据集的用途描述信息"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close" size="small">取 消</el-button>
        <el-button type="primary" @click="submit('ruleForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
    <!-- 模态框 -->
    <!-- <el-dialog :title="part[0].operator_name" :visible.sync="lookFormVisible"> -->
    <el-dialog title="算子预览" :visible.sync="lookFormVisible">
      <el-link href="http://www.baidu.com">{{part_url}}</el-link>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lookFormVisible = false" size="small">关 闭</el-button>
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
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      page: 1,
      pageSize: 5,
      count: 0,
      value1: "",
      value2: "",
      dialogFormVisible: false,
      lookFormVisible: false,
      fileList: [],
      url: "string",
      ruleForm: {
        name: "",
        category: "",
        type: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请填写算子名称", trigger: "blur" },
          { min: 3, message: "长度在 3 个字符以上", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请选择所属分类", trigger: "change" }
        ],
        type: [
          { required: true, message: "请选择算子类型", trigger: "change" }
        ],
        desc: [
          { required: true, message: "请输入算子的描述信息", trigger: "blur" }
        ]
      }
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
  created() {
    //查询所有模型
    this.load();
    //查询所有分类
    this.findAllType();
  },
  computed: {
    //映射state
    ...mapState("operator", ["operator", "part", "part_url", "options"])
  },
  methods: {
    //映射actions
    ...mapActions("operator", [
      "findAllOperator",
      "findAllType",
      "findOperatorById",
      "deleteOperatorById",
      "setOperator"
    ]),
    // 按条件查询数据
    search() {
      let obj = {
        page: this.page,
        page_size: this.pageSize,
        operator_type: this.value1,
        operator_category: this.value2
      };
      this.findAllOperator(obj).then(r => {
        this.count = this.operator.count;
      });
    },
    //加载算子列表
    load() {
      let obj = {
        page: this.page,
        page_size: this.pageSize
      };
      this.findAllOperator(obj).then(r => {
        this.count = this.operator.count;
      });
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    //去添加，打开模态框
    resetForm() {
      // this.ruleForm= {
      // 	name: '',
      // 	category:'',
      // 	type:'',
      // 	desc: ''
      // },
      this.dialogFormVisible = true;
    },
    // 关闭模态框
    close() {
      this.dialogFormVisible = false;
      this.$message({
        message: "操作已取消",
        center: true
      });
    },
    //算子预览
    detailsHandleClick(id) {
      this.lookFormVisible = true;
      this.findOperatorById(id);
    },
    //文件上传成功操作
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 新增保存
    submit() {
      let form = {
        operator_name: this.ruleForm.name,
        operator_type: this.ruleForm.type,
        // operator_type:parseInt(this.ruleForm.type),
        operator_category: this.ruleForm.category,
        operator_describe: this.ruleForm.desc,
        operator_url: this.url
      };
      console.log("提交数据", form);
      this.setOperator(form).then(r => {
        this.count = this.operator.count;
        if (this.operator.code == 200) {
          this.$message({
            showClose: true,
            message: "新增成功",
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: this.operator.msg,
            type: "success"
          });
        }
      }),
        this.load(),
        (this.dialogFormVisible = false);
    },
    //删除
    deleteHandleClick(id) {
      this.$confirm("此操作将删除这条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteOperatorById(id), this.load();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
.title {
  margin-left: 28px;
  color: #000;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #eee;
}
.num {
  text-align: center;
  /* font-size: 12px; */
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
</style>