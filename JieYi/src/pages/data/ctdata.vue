<template>
  <div class="ctdata">
    <div class="ctdata-title">
      创建数据集
      <span style="float:right;color:#036FE2;cursor: pointer;" @click="toBack">返回</span>
    </div>
    <div class="ctdata-content">
      <el-row :span="24" class="form">
        <el-col :span="16" style="border-right:1px solid #ededed;" size="small">
          <el-form
            :rules="rules"
            ref="form"
            :model="form"
            label-width="150px"
            style="margin-top:2em;"
            :hide-required-asterisk="true"
          >
            <el-form-item label="数据集名称:" prop="dataset_name" style="padding:0 1em">
              <el-input v-model="form.dataset_name"></el-input>
            </el-form-item>
            <el-form-item label="所属部位名称:" style="padding:0 1em" prop="part_id">
              <el-select v-model="form.part_id" placeholder="请选择所属部位" style="width:100%;">
                <el-option
                  :label="item.partName"
                  :value="item.id"
                  v-for="item in part"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上传数据集:" style="padding:0 1em">
              <div class="upload" @click="toAdd">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">点击上传</div>
              </div>
              <el-progress v-if="proc" :percentage="uploadPercent"></el-progress>
            </el-form-item>
            <el-form-item label="描述信息:" style="padding:0 1em" required>
              <el-input placeholder="该数据集主要是用于xxx" type="textarea" v-model="form.describe"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                style="float:right;margin-right:1em;"
                type="primary"
                size="small"
                @click="onSubmit('form')"
              >保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8" style="border-left:1px solid #ededed;padding:1em">
          <div style="color:#aaaaaa;padding:1.5em 1em">常见问题</div>
          <el-collapse accordion>
            <el-collapse-item title=" 1.如何设计分类" name="1">
              <p>每个标签就是对这张图片希望识别出的全部结果。标签的上限为1000种。</p>
              <p>标签名需要以字母或数字或下划线的格式，不支持中文命名。</p>
            </el-collapse-item>
            <el-collapse-item title="2.图片的具体格式要求" name="2">
              <p>目前支持图片类型为png、jpg、bmp、jpeg，图片大小限制在4M以内。</p>
              <p>图片长宽比在3:1以内，其中最长边小于4096px，最短边大于30px。</p>
            </el-collapse-item>
            <el-collapse-item title="3.批量上传压缩包格式要求" name="3">
              <p>训练图片和实际场景要识别的图片拍摄环境一致，举例：如果实际要识别的图片是摄像头俯拍的，训练图片就不能用网上下载的目标正面图片。</p>
              <p>每个标签的图片需要覆盖实际场景里面的可能性，如拍照角度、光线明暗的变化，训练集覆盖的场景越多，模型的泛化能力越强。</p>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </div>
    <!-- 模态框 -->
    <el-dialog title="上传压缩包" :visible.sync="dialogVisible" width="40%">
      <div class="all">
        <div class="all-top">
          <p>请认真阅读以下说明并按照示例压缩包要求的格式上传标注文件，否则标注结果可能无法正确解析。</p>
          <p>对压缩包内存在多个内容完全一致的图片，将会做去重处理。</p>
          <p>为保证模型训练效果，所上传的图片应与实际业务场景的图片（ 光线、角度、采集设备）尽可能一致。</p>
        </div>
        <div class="all-content">
          <img src="@/assets/aaa.png" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer" style="text-align:center;">
        <!--  <el-upload
              class="upload-demo"
              ref="upload"
              action=""
              :file-list="fileList"
              :auto-upload="false"
              :on-change='changeData'
              :on-progress="handleProgress"
              :on-success="handleSuccess"
              :show-file-list='showfile'
        >-->
        <input
          type="file"
          @change="getFile($event,'file_avatar')"
          style="display:none;"
          id="unloadFile"
        />
        <el-button type="primary" size="small" @click="toUploadFile">已阅读并上传</el-button>
        <!-- </el-upload> -->
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import axioss from "@/http/axiosFile";
export default {
  data() {
    return {
      formData: new FormData(),
      fileList: [],
      showfile: false,
      uploadPercent: 0,
      proc: false,
      dialogVisible: false,
      form: {},
      rules: {
        dataset_name: [
          { required: true, message: "请输入数据集名称", trigger: "blur" }
        ],
        part_id: [
          { required: true, message: "请选择所属部位", trigger: "change" }
        ]
      }
    };
  },
  created() {
    // 加载部位
    this.loadPart(); 
    //在页面加载时读取localStorage里的状态信息（防止浏览器刷新后state丢失）
    localStorage.getItem("userMsg") &&
      this.$store.replaceState(
        Object.assign(
          this.$store.state,
          JSON.parse(localStorage.getItem("userMsg"))
        )
      );

    //在页面刷新时将vuex里的信息保存到localStorage里（防止浏览器刷新后state丢失）
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("userMsg", JSON.stringify(this.$store.state));
    });
  },
  computed: {
    ...mapState("data", ["part"])
  },
  methods: {
    ...mapActions("data", ["ctData", "loadPart"]),

    // 模拟点击文件选择input
    toUploadFile() {
      let btn = document.getElementById("unloadFile");
      btn.click();
      this.dialogVisible = false;
      this.uploadPercent = 0;
    },
    // 选择文件
    getFile(event, input_file_name) {
      this.formData.append("dataset_file", event.target.files[0]);
      this.proc = true;
      let that = this;
      setTimeout(function() {
        that.uploadPercent = 100;
      }, 2000);
    },

    // 添加文件后弹出提示框
    toAdd() {
      this.dialogVisible = true;
    },
    // 创建
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.formData.append("dataset_name", this.form.dataset_name);
          this.formData.append("describe", this.form.describe);
          this.formData.append("part_id", this.form.part_id);

          axioss
            .post("/datasets/", this.formData)
            .then(r => {
              this.$notify({
                title: "成功",
                message: "成功创建数据集",
                type: "success"
              });
              this.$router.push({ path: "/cldata/list" });
            })
            .catch(e => {
              this.$notify.error({
                title: "失败",
                message: "创建数据集失败"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    toBack() {
      this.$router.push({ path: "/cldata/list" });
    }
  }
};
</script>
<style type="text/css">
* {
  padding: 0px;
  margin: 0px;
}
.ctdata {
  margin: 10px;
}
.ctdata-title {
  padding-bottom: 3px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
.el-dialog__body {
  padding-top: 10px !important;
}
.ctdata-content {
  min-height: 500px;
  /*background-color: red;*/
}
.ctdata-page {
  float: right;
}
.upload {
  margin-bottom: 1em;
  height: 180px;
  text-align: center;
  border: 1px dashed #d5d8de;
}
.upload i {
  font-size: 67px;
  color: #c0c4cc;
  margin: 40px 0 16px;
  line-height: 50px;
  cursor: pointer;
}
.upload div {
  font-size: 20px;
  color: #bbb;
}
.all-content img {
  width: 100%;
}
.all-content {
  border-bottom: 1px solid #ddd;
  padding-bottom: 1em;
}
.all-top {
  padding: 1em;
  background-color: #ffe9cc;
  color: #f38900;
  margin-bottom: 1em;
}

.el-dialog__footer {
  text-align: center;
}
</style>