<template>
  <div class="opt_exmodal">
    <!--标题-->
    <p class="title">初始化训练</p>
    <!-- <p class="gonglue">攻略帖</p> -->
    <!--标题-->
    <!--分割线-->
    <div class="line"></div>
    <!--分割线-->
    <!--表单-->
    <div class="form">
      <p v-if="tishi" class="tishi">以下参数是推荐配置,可手动选择参数</p>
      <el-form :model="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item style="margin-top:28px;" label="选择模型:" prop="id">
                <el-col :span="11">
                  <el-select
                    style="width:100%;"
                    @change="titlHandler"
                    v-model="value"
                    placeholder="请选择模型"
                  >
                    <el-option
                      v-for="item in modeling"
                      :key="item.id"
                      :label="item.model_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="迭代次数:" prop="iterate_times">
                <el-col :span="11">
                  <el-select
                    @change="tishiHandler"
                    style="width:100%"
                    v-model="form.iterate_times"
                    placeholder="请选择迭代次数"
                  >
                    <el-option
                      v-for="item in region"
                      :key="item.id"
                      :label="item.operator_name"
                      :value="item.operator_url"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="网络结构:" prop="network_structure">
                <el-col :span="11">
                  <el-select
                    @change="tishiHandler"
                    style="width:100%"
                    v-model="form.network_structure"
                    placeholder="请选择网络结构"
                  >
                    <el-option
                      v-for="item in application"
                      :key="item.id"
                      :label="item.operator_name"
                      :value="item.operator_url"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="优化器:" prop="optimizer">
                <el-col :span="11">
                  <el-select
                    @change="tishiHandler"
                    style="width:100%"
                    v-model="form.optimizer"
                    placeholder="请选择优化器"
                  >
                    <el-option
                      v-for="item in optimizers"
                      :key="item.id"
                      :label="item.operator_name"
                      :value="item.operator_url"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="损失值:" prop="loss_value">
                <el-col :span="11">
                  <el-select
                    @change="tishiHandler"
                    style="width:100%"
                    v-model="form.loss_value"
                    placeholder="请选择损失值"
                  >
                    <el-option
                      v-for="item in losses"
                      :key="item.id"
                      :label="item.operator_name"
                      :value="item.operator_url"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="回调函数:">
                <el-col :span="11">
                  <el-select
                    style="width:100%"
                    @change="callbackHandler"
                    collapse-tags
                    multiple
                    v-model="value1"
                    placeholder="请选择回调函数"
                  >
                    <el-option
                      v-for="item in callback"
                      :key="item.id"
                      :label="item.operator_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="度量器:">
                <el-col :span="11">
                  <el-select
                    style="width:100%"
                    @change="measurerHandler"
                    collapse-tags
                    multiple
                    v-model="value2"
                    placeholder="请选择度量器"
                  >
                    <el-option
                      v-for="item in measurer"
                      :key="item.id"
                      :label="item.operator_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--表单-->
    <!--标题-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <p class="title_content">参与训练的分类</p>
        </div>
      </el-col>
    </el-row>
    <!-- <div class="line"></div> -->
    <!--标题-->
    <!--按钮-->
    <div v-if="btn==true" class="btn">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button @click="toAddHandler" type="primary">添加训练数据</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <p class="title_bottom1">您可以选择多个数据集的数据同时训练，若多个数据集勾选了重复分类，则训练数据会默认合并。</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <p class="title_bottom2">若不希望数据合并，请在数据集管理修改分类名称</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--按钮-->
    <!--表格-->
    <div class="table" v-if="table==true">
      <el-table
        :data="formData"
        border
        style="width: 97%;margin-left:28px;margin-top:20px;margin-right:28px;"
      >
        <el-table-column align="center" prop="id" label="id" hidden="true"></el-table-column>
        <el-table-column align="center" prop="datasetName" label="数据集"></el-table-column>
        <el-table-column align="center" prop="classifys_num" label="分类数量"></el-table-column>
        <el-table-column align="center" label="操作" width="330">
          <template slot-scope="scope">
            <el-button @click="detailsHandleClick(scope.row)" type="text" size="small">查看详情</el-button>
            <el-button @click="deletebyidHandler(scope.row)" type="text" size="small">清空分类</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="toadd_btn">
        <el-button @click="toAddHandler" size="small" type="primary">继续添加</el-button>
        <el-button @click="deleteHandler" size="small" type="primary">全部清空</el-button>
        <el-button
          style="float: right;margin-right:0.5em;"
          type="success"
          size="small"
          @click="xunlian"
        >开始训练</el-button>
      </div>
    </div>
    <!--表格-->
    <!-- <div class="line_bottom"></div> -->
    <!--按钮-->
    <!--模态框-->
    <el-dialog title="选择分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="数据集:" prop="train_dataset_id">
          <el-select
            v-model="formData"
            placeholder="请选择数据集"
            @change="dataHandler"
            collapse-tags
            multiple
          >
            <el-option
              v-for="item in data"
              :key="item.id"
              :label="item.datasetName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">添 加</el-button>
      </div>
    </el-dialog>
    <!--模态框-->
    <!-- 模态框 -->
    <el-dialog title="发动机进气道轻微污染图片集详情" :visible.sync="dialogFormVisible2">
      <el-form
        size="small"
        label-width="150px"
        label-position="left"
        style="margin：1em"
        class="demo-ruleForm"
      >
        <el-form-item label="数据集名称:" prop="name">发动机进气道轻微污染图片</el-form-item>
        <el-form-item label="图像识别部位:" prop="region">汽车发动机进气道</el-form-item>
        <el-form-item label="数据集文件地址:" prop="region">http://114.134.153.23/group2/qichefadongji/</el-form-item>
        <el-form-item label="数据集上传时间:" prop="region">2020-02-03</el-form-item>
        <el-form-item label="分辨率:" prop="region">1920x1080</el-form-item>
        <el-form-item label="数据集状态:" prop="region">未训练</el-form-item>
        <el-form-item label="描述信息:" prop="desc">数据集用于识别汽车发动机进气道轻微污染程度</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close('ruleForm')" size="small">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 模态框 -->
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      tishi: false,
      form: {},
      value: "",
      value1: "",
      value2: "",
      id: "",
      formData: [],
      formData2:'',
      dialogFormVisible: false,
      dialogFormVisible2: false,
      btn: true,
      table: false,
      form_task_id:{
        
      },
      list:{
        model_part: "",
        model_status: ""
      }
      //     rules: {
      //     id: [
      //         { required: true, message: '请选择模型', trigger: 'change' }
      //     ],
      //     region: [
      //         { required: true, message: '请选择迭代次数', trigger: 'change' }
      //     ],
      //     application: [
      //         { required: true, message: '请选择网络结构', trigger: 'change' }
      //     ],
      //     optimizers: [
      //         { required: true, message: '请选择优化器', trigger: 'change' }
      //     ],
      //     losses: [
      //         { required: true, message: '请选择损失值', trigger: 'change' }
      //     ],
      //     train_dataset_id:[
      //         { reqired: true, message: '请选择数据集', trigger: 'change' }
      //     ]
      // }
    };
  },
  mounted(){
    console.log(this.form_task_id)
    if(this.task_id!=null){
      let fun=setInterval(()=>{
      console.log('999')
    },1000)
    }else{
      return false
    }
  },
  created() {
    //查询所有模型
    this.findAllModal(this.list);
    //查询所有算子
    this.findAlloperators();
    //查看已经训练过的模型
    this.findAllModalend();
    //查看算子
    this.findoPeratorsBycategory();
    //查看所有数据集
    this.findAllData();
    //轮询查询训练后状态
      // setInterval(()=>{
      //           this.findModalstatus(this.task_id).then((res)=>{
      //             console.log(res.data)
      //           })
      //       },1000)
  },
  computed: {
    //映射state
    ...mapState("mymodal", [
      "modals",
      "operators",
      "modeling",
      "region",
      "application",
      "optimizers",
      "losses",
      "callback",
      "measurer",
      "data"
    ])
  },
  methods: {
    //映射actions
    ...mapActions("mymodal", [
      "firstExmodal",
      "findAllModal",
      "findAlloperators",
      "findAllModalend",
      "findoPeratorsBycategory",
      "findAllData",
      "findDataById",
      "findModalstatus"
    ]),
    //隐藏提示
    tishiHandler() {
      this.tishi = false; 
    },
    //选中提示(推荐参数)
    titlHandler(i) {
      let form2 = {
        task_type: 0,
        iterate_times: "100",
        network_structure: "Xception",
        optimizer: "RMSprop",
        loss_value: "mean_squared_error"
      };
      this.id = i;
      this.form = form2;
      this.tishi = true;
    },
    //选择回调函数
    callbackHandler() {
      this.form.callback = this.value1.join(",");
    },
    //选择度量器
    measurerHandler() {
      this.form.measurer = this.value2.join(",");
    },
    //选择数据集
    dataHandler() {
      this.form.train_dataset_id = this.formData;
      },
    //去添加打开模态框添加数据集
    toAddHandler() {
      var arr1=[]
      if (this.value === "") {
        this.$message({
          type: "warning",
          message: "请选择模型"
        });
      } else {
        this.dialogFormVisible = true;
        this.formData.forEach(itme => {
          arr1.push(itme.id)
        });
      }
        this.formData2=this.formData.join(',')
        this.form.train_dataset_id=this.formData2
        this.formData = arr1;
    },
    //添加训练集
    submit() {
      if (this.formData.length===0) {
        this.$message({
          message: "请选择数据集",
          type: "warning"
        });
      } else {
        var arr = [];
        this.formData.forEach(itme => {
          this.findDataById(itme).then(res => {
            arr.push({
              id: res.data.results.id,
              classifys_num: res.data.results.classifys_num,
              datasetName: res.data.results.datasetName
            });
          });
        });
        this.formData2=this.formData.join(',')
        this.form.train_dataset_id=this.formData2
        this.formData = arr;
        this.btn = false;
        this.table = true;
        this.dialogFormVisible = false;
        this.$message({
          message: "添加成功",
          type: "success"
        });
      }
    },
    //全部清空
    deleteHandler() {
      this.formData=[];
      this.table = false;
      this.btn = true;
    },
    //开始训练
    xunlian() {
      if(this.form.train_dataset_id===''){
        this.$message({
          type:'warning',
          message:'请选择数据集'
        })
      }else{
      let obj = { list: this.form, id: this.id };
      this.firstExmodal(obj).then((res)=>{
        this.form_task_id.task_id=res.data.task_id
          // this.findModalstatus(res.data.task_id).then((res)=>{
          //   console.log(res.data.training_status)
          //   if(res.data.training_status===1){
          //     console.log('-----------')
          //   }
          // })
      });
      this.$router.push({ name: "mymodal" });
      console.log(this.task_id)
      }
    },
    //查看训练集详情
    detailsHandleClick() {
      this.dialogFormVisible2 = true;
    },
    //关闭数据集详情模态框
    close() {
      this.dialogFormVisible2 = false;
    },
    //清空分类
    deletebyidHandler(row) {
      var arr = [row.id];
      var arr1=[]
      this.formData= this.formData.filter(item => !arr.includes(item.id));
        this.formData.forEach(itme => {
          arr1.push(itme.id)
        });
      this.form.train_dataset_id=arr1.join(',')
    }
  }
};
</script>
<style scoped>
.opt_exmodal {
  overflow: auto;
  max-height: calc(100vh - 50px);
}
.table {
  margin-bottom: 28px;
}
.el-row {
  margin-left: 16px;
}
.form > p {
  font-size: 10px;
  margin-left: 121px;
  margin-top: 76px;
  position: absolute;
  color: #036fe2;
}
.toadd_btn {
  margin-left: 28px;
  margin-top: 20px;
}
.title_bottom1 {
  /* margin-left:-189px; */
  /* margin-top:20px; */
  font-size: 12px;
  color: #666;
}
.title_bottom2 {
  /* margin-left:-72px; */
  /* margin-top:20px; */
  font-size: 12px;
  color: #666;
}
.btn {
  padding-top: 80px;
  padding-bottom: 80px;
  margin: 0 auto;
  text-align: center;
  border-top: 1px solid #eee;
  /* border-bottom: 1px solid #eee; */
}
.title_content {
  font-size: 14px;
  color: #606266;
  margin-left: 28px;
}
.title {
  margin-left: 28px;
  color: #000;
  margin-bottom: 6px;
  margin-top: 6px;
}
.gonglue {
  float: right;
  color: #036fe2;
  margin-top: -33px;
  margin-right: 18px;
  font-size: 12px;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #eee;
}
.line_bottom {
  width: 100%;
  height: 1px;
  background-color: #eee;
  margin-top: 68px;
}
</style>
