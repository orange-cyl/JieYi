<template>
	<div class="opt_exmodal">
    <!--标题-->
		<p class="title">优化训练</p>
		<!-- <p class="gonglue">攻略帖</p> -->
    <!--标题-->
    <!--分割线-->
        <div class="line"></div>
    <!--分割线-->
    <!--表单-->
    <el-row>
        <el-col :span="7">
            <div class="grid-content bg-purple">
            <el-form  :model="form" label-width="90px">
                <el-form-item style="width:300px;margin-top:28px;margin-left:20px" label="选择模型:" prop="train_model_name">
                    <el-select @change="modelHandler" v-model="value" placeholder="请选择模型">
                    <el-option
                      v-for="item in modelends"
                      :key="item.id"
                      :label="item.model_name"
                      :value="item.id"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="grid-content bg-purple">
            <el-form  :model="form" label-width="90px">
                <el-form-item style="width:300px;margin-top:28px" label="选择版本:" prop="model_version">
						<el-select @change="vesionHandler" v-model="value1"  placeholder="请选择版本">
						 <el-option
                        v-for="item in arr"
                        :key="item"
                        :label="item"
                        :value="item"
                        ></el-option>
						</el-select>
                </el-form-item>
            </el-form>
            </div>
        </el-col>
    </el-row>
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
    <div v-if="table==true">
    <el-table
    :data="formData2"
    border
    style="width: 97%;margin-left:28px;margin-top:20px;margin-right:28px;">
    <el-table-column
      prop="id"
      label="编号">
    </el-table-column>
    <el-table-column
      prop="datasetName"
      label="数据集">
    </el-table-column>
    <el-table-column
      prop="classifys_num"
      label="分类数量">
    </el-table-column>
    <el-table-column
      label="操作"
      width="330">
      <template slot-scope="scope">
        <el-button @click="detailsHandleClick(scope.row)" type="text" size="small">查看详情</el-button>
        <el-button @click="deletebyidHandler(scope.row)" type="text" size="small">清空分类</el-button>
      </template>
    </el-table-column>
    </el-table>
        <div class="toadd_btn">
        <el-button @click="toAddHandler" size="small" type="primary">继续添加</el-button>
        <el-button @click="deleteHandler" size="small" type="primary">全部清空</el-button>
        <el-button style="float: right;margin-right:0.5em;" type="success" size="small" @click="xunlian">开始训练</el-button>
        </div>
    </div>
    <!--表格-->
    <!-- <div class="line_bottom"></div> -->
    <!--按钮-->
    <!--模态框-->
    <el-dialog title="选择分类" :visible.sync="dialogFormVisible">
    <el-form :model="form">
        <el-form-item label="数据集:">
        <el-select v-model="formData" collapse-tags multiple placeholder="请选择数据集">
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
		<el-dialog center title="发动机进气道轻微污染图片集详情" :visible.sync="dialogFormVisible2">
		 	<el-form  
			 size="small" label-width="120px" 
			 label-position="right" 
			 style="margin：1em"
			 class="demo-ruleForm">
				<el-form-item label="数据集名称:" prop="name" >发动机进气道轻微污染图片</el-form-item>
				<el-form-item label="图像识别部位:" prop="region">汽车发动机进气道</el-form-item>
				<el-form-item label="数据集文件地址:" prop="region" >http://114.134.153.23/group2/qichefadongji/</el-form-item>
				<el-form-item label="数据集上传时间:" prop="region" >2020-02-03</el-form-item>
				<el-form-item label="分辨率:" prop="region" >1920x1080</el-form-item>
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
    data(){
        return{
            form:{
                task_type:1,
                model_version:''
            },
            value:'',
            value1:'',
            formData:[],
            formData2:[],
            arr:[],
            dialogFormVisible:false,
            dialogFormVisible2:false,
            btn:true,
            table:false,
            tableData:[{
                date:'数据集1',
                name:'2'
            },{
                date:'数据集2',
                name:'3'
            }]
        }
    },
    created() {
        //查询可以优化的模型
        this.findAllModalend()
    },
    computed: {
       ...mapState('mymodal',['modelends','data']) 
    },
    methods: {
        //映射actions
        ...mapActions('mymodal',['findAllModalend','findModalById','findAllData','firstExmodal','findDataById']),
        //去添加打开模态框
        toAddHandler(){
            if(this.value===''){
                this.$message({
                    type:'warning',
                    message:'请选择模型'
                })
            }else if(this.value1===''){
                this.$message({
                    type:'warning',
                    message:'请选择版本'
                })
            }else{
                this.dialogFormVisible=true
                this.findAllData()
            }
        },
        //添加训练集
        submit(){
            if(this.formData.length===0){
                this.$message({
                    type:'warning',
                    message:'请选择数据集'
                })
            }else{
                var arr = [];
                this.formData.forEach((itme)=>{
                    this.findDataById(itme).then(res => {
                        arr.push({
                        id: res.data.results.id,
                        classifys_num: res.data.results.classifys_num,
                        datasetName: res.data.results.datasetName
                        });
                    });
                })
                this.formData2=arr
                //将数据集数组转换成字符串
                this.form.train_dataset_id=this.formData.join(',')
                this.btn=false
                this.table=true
                this.dialogFormVisible=false
                this.$message({
                    message:"添加成功",
                    type:"success"
                })
            }
        },
        //全部清空
        deleteHandler(){
            this.formData=[]
            this.table=false
            this.btn=true
        },
        //开始训练
        xunlian(){
            if(this.form.train_dataset_id===''){
                this.$message({
                    type:'warning',
                    message:'请选择数据集'
                })
            }else{
                let obj={list:this.form,id:this.value}
                this.firstExmodal(obj)
                this.$router.push({name:'mymodal'})
            }
        },
        //查看训练集详情
        detailsHandleClick(){
            this.dialogFormVisible2=true
        },
        //关闭数据集详情模态框
        close(){
            this.dialogFormVisible2=false
        },
        //清空分类
        deletebyidHandler(row){
            var arr = [row.id];
            var arr2=[];
            this.formData2= this.formData2.filter(item => !arr.includes(item.id));
            this.formData2.forEach((item)=>{
                arr2.push(item.id)
            })
            let str=arr2.join(',')
            this.form.train_dataset_id=str
        },
        //模型下拉框改变赋值
        modelHandler(id){
            let arr=[]
            this.findModalById(id).then((res)=>{
                res.data.train_model.forEach((item)=>{
                    arr.push(item.model_version)
                })
            })
            this.arr=arr
        },
        //版本下拉框改变赋值
        vesionHandler(){
            this.form.model_version=this.value1
        }
    }
}
</script>
<style scoped>
    .toadd_btn{
        margin-left:28px;
        margin-top:20px;
    }
    .title_bottom1{
        /* margin-left:-189px; */
        /* margin-top:20px; */
        font-size:12px;
        color:#666;
    }
    .title_bottom2{
        /* margin-left:-72px; */
        /* margin-top:20px; */
        font-size:12px;
        color:#666;
    }
    .btn{
        /* margin-left:436px; */
        padding-top: 80px;
        padding-bottom: 80px;
        margin: 0 auto;
        text-align: center;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
    }
    .title_content{
        font-size:14px;
        color:#606266;
        margin-left:28px;
    }
    .title{
        margin-left:28px;
        color:#000;
        margin-bottom: 6px;
        margin-top: 6px;
    }
    .gonglue{
        float: right;
        color: #036fe2;
        margin-top: -33px;
        margin-right: 18px;
        font-size: 12px;
    }
    .line{
        width:100%;
        height:1px;
        background-color: #eee;
    }
</style>