<template>
	<div class="pbmodal">
		<!--标题-->
		<p class="title">发布模型</p>
    <!--标题--> 
    <!--分割线-->
        <div class="line"></div>
    <!--分割线-->
	<!--主体-->
	<el-row>
		<el-col :span="12">
			<div class="grid-content bg-purple">
				<el-form  :model="form" label-width="88px">
					<el-form-item  label="选择模型:" prop="id">
						<el-col :span="15">
						<el-select @change="changeHandler" style="width:100%" v-model="form.model_id" placeholder="请选择模型">
						<el-option
						v-for="item in modelends"
						:key="item.id"
						:label="item.model_name"
						:value="item.id">
						</el-option>
						</el-select>
						</el-col>
					</el-form-item>
					<el-form-item label="选择版本:" prop="model_version">
						<el-col :span="15">
						<el-select style="width:100%" @change="vesionHandler" @visible-change="vesionClick" v-model="form.model_version"  placeholder="请选择版本">
						<el-option
						v-for="item in arr"
						:key="item"
						:label="item"
						:value="item"
						></el-option>
						</el-select>
						</el-col>
					</el-form-item>
					<el-form-item label="模型描述" prop="model_describe">
						<el-col :span="15">
							<el-input v-model="form.model_describe" type="textarea" placeholder="请输入模型描述信息"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item >
						<el-button type="primary" size="small" @click="submitHandler()">申请发布</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-col>
		<el-col :span="12">
			<div class="grid-content bg-purple-light">
				<div class="right">
					<p>标准接口规范参考</p>
					<p style="color:#666">标准接口请求参考说明：</p>
					<el-table
						:data="tableData"
						border
						style="width: 100%">
						<el-table-column
						prop="name"
						label="字段名称"
						>
						</el-table-column>
						<el-table-column
						prop="bixu"
						label="必须"
						>
						</el-table-column>
						<el-table-column
						prop="leixing"
						label="类型"
						>
						</el-table-column>
						<el-table-column
						prop="shuoming"
						label="说明"
						width="200px"
						>
						</el-table-column>
						</el-table>
					<p style="color:#666">标准接口请求参考说明：</p>
					<el-table
						:data="tableData2"
						border
						style="width: 100%">
						<el-table-column
						prop="name"
						label="字段名称"
						>
						</el-table-column>
						<el-table-column
						prop="bixu"
						label="必须"
						>
						</el-table-column>
						<el-table-column
						prop="leixing"
						label="类型"
						>
						</el-table-column>
						<el-table-column
						prop="shuoming"
						label="说明"
						width="200px"
						>
						</el-table-column>
						</el-table>
				</div>
			</div>
		</el-col>
	</el-row>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
	data(){
		return{
			form:{
				model_id:'',
				model_version:'',
				model_describe:''
			},
			value:'',
			arr:[],
			rules: {
            id: [
                { required: true, message: '请选择模型名称', trigger: 'change' }
			],
			model_version: [
                { required: true, message: '请选择版本', trigger: 'change' }
			],
			model_describe:[
				{ required: true, message: '请输入模型描述信息', trigger: 'blur' },
			]
        },
		  tableData:[{
			  name:"image",
			  bixu:"是",
			  leixing:"string",
			  shuoming:"图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式"
		  },{
			  name:"top_num",
			  bixu:"否",
			  leixing:"number",
			  shuoming:"返回分类数量，默认为6个"
		  }],
		  tableData2:[{
			name:"log_id",
			bixu:"是",
			leixing:"number",
			shuoming:"唯一的log id，用于问题定位"
		},{
			name:"error_code",
			bixu:"否",
			leixing:"number",
			shuoming:"错误码，当请求错误时返回"
		},{
			name:"error_code",
			bixu:"否",
			leixing:"number",
			shuoming:"错误码，当请求错误时返回"
		},{
			name:"log_id",
			bixu:"是",
			leixing:"number",
			shuoming:"唯一的log id，用于问题定位"
		},
		{
			name:"log_id",
			bixu:"是",
			leixing:"number",
			shuoming:"唯一的log id，用于问题定位"
		},
		{
			name:"log_id",
			bixu:"是",
			leixing:"number",
			shuoming:"唯一的log id，用于问题定位"
		},
		{
			name:"log_id",
			bixu:"是",
			leixing:"number",
			shuoming:"唯一的log id，用于问题定位"
		},
		{
			name:"log_id",
			bixu:"是",
			leixing:"number",
			shuoming:"唯一的log id，用于问题定位"
		},
		{
			name:"log_id",
			bixu:"是",
			leixing:"number",
			shuoming:"唯一的log id，用于问题定位"
		},]
		}
	},
	created() {
		this.findAllModalend()
	},	
	computed: {
		//映射state
		...mapState('mymodal',['modelends','versions'])
	},
	methods: {
		//映射actions
		...mapActions('mymodal',['publishModal','findAllModalend','findModalById']),
		//提交申请
		submitHandler(){
			if(this.form.model_id===''){
				this.$message({
					type:'warning',
					message:'请选择模型'
				})
			}else if(this.form.model_version===''){
				this.$message({
					type:'warning',
					message:'请选择版本'
				})
			}else if(this.form.model_describe===''){
				this.$message({
					type:'warning',
					message:'请填写描述信息'
				})
			}else{
				let id=this.form.model_id
				let form={
					model_describe:this.form.model_describe,
					release_version:this.form.model_version
				}
				this.publishModal({id,form}).then((res)=>{
					if(res.data.code==200){
						//成功的消息
						this.$message({
							type:'success',
							message:res.data.msg
						})
						//页面跳转
						this.$router.push({name:'mymodal'})
					}
				}).catch((err)=>{
						console.log(err)
						this.$message({
							type:'error',
							message:'后台异常'
						})
				})
			}
		},
		// 	this.$refs[formName].validate((valid) => {
		// 	//如果验证成功
		// 	if (valid) {
		// 		let id=this.form.id
		// 		let form={
		// 			model_describe:this.form.model_describe,
		// 			release_version:this.form.model_version
		// 		}
		// 		this.publishModal({id,form}).then((res)=>{
		// 			if(res.data.code==200){
		// 				//成功的消息
		// 				this.$message({
		// 					type:'success',
		// 					message:res.data.message
		// 				})
		// 				//页面跳转
		// 				this.$router.push({name:'mymodal'})
		// 			}
		// 		}).catch((err)=>{
		// 				console.log(err)
		// 				this.$message({
		// 					type:'error',
		// 					message:'后台异常'
		// 				})
		// 		})
		// 	} else {
		// 		console.log('error submit!!');
		// 		return false;
		// 	}
		// 	});
		// },
		//选择模型之后选择版本
		changeHandler(id){
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
			if(this.form.model_id===''){
				this.$message({
					type:'warning',
					message:'请选择模型'
				})
			}else{
			}
		},
		//点击下拉框验证是否有选模型
		vesionClick(){
			if(this.form.model_id===''){
				this.$message({
					type:'warning',
					message:'请选择模型'
				})
			}else{
			}
		},
	},
}
</script>
<style scoped>
	.form{
		width: 100%;
		float: left;
	}
	.title{
        margin-left:28px;
        color:#000;
		margin-bottom: 6px;
		margin-top: 6px;
    }
	.line{
        width:100%;
        height:1px;
        background-color: #eee;
    }
	.right{
		color: #333;
		font-size: 12px;
		overflow-y: auto;
	}
	.el-row {
    &:last-child {
      margin-bottom: 0px;
    }
	}
	.el-col {
		height: 100%;
	}
	.bg-purple-dark {
		/* background: #99a9bf; */
	}
	.bg-purple {
		/* background: #d3dce6; */
		padding-top: 1.5em;
		padding-left: 1.5em;
		height: 100%;
	}
	.bg-purple-light {
		/* background: #e5e9f2; */
		height: 100%;
		padding-left: 1.5em;
		padding-top: 1.5em;
		padding-right: 1em;
		border-left: 1px solid #eee;
		overflow-y: auto;
        max-height: calc(100vh - 50px);
	}
	.grid-content {
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
		margin-bottom: 28px;
	}
</style>