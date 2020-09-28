<template>
	<div class="testmodal">
		<!--标题-->
		<p class="title">评估模型</p>
    <!--标题-->
    <!--分割线-->
        <div class="line"></div>
    <!--分割线-->
	<!--表单-->
    <el-form :model="form" label-width="90px">
		<el-row>
		<el-col :span="6">
			<div class="grid-content bg-purple">
				<el-form-item label="选择模型:" prop="id">
					<el-select v-model="id" @change="modelHandelr" placeholder="请选择模型">
					<el-option
					v-for="item in modelends"
					:key="item.id"
					:label="item.model_name"
					:value="item.id">
					</el-option>
					</el-select>
				</el-form-item>
			</div>
		</el-col>
		<el-col :span="6">
			<div class="grid-content bg-purple-light">
				<el-form-item style="width:300px;" label="数据集:" prop="train_dataset_id">
					<el-select v-model="formData" collapse-tags multiple placeholder="请选择数据集">
					<el-option
					v-for="item in data"
					:key="item.id"
					:label="item.datasetName"
					:value="item.id">
					</el-option>
					</el-select>
				</el-form-item>
			</div>
		</el-col>
		<el-col :span="6">
			<div class="grid-content bg-purple">
				<el-form-item label="选择版本:" prop="model_version">
					<el-select @change="vesionHandler" @visible-change="vesionClick" v-model="value1"  placeholder="请选择版本">
					<el-option
					v-for="item in arr"
					:key="item"
					:label="item"
					:value="item"
					></el-option>
				</el-select>
				</el-form-item>
			</div>
		</el-col>
		<el-col :span="6">
			<div class="grid-content bg-purple-light">
				<el-form-item>
				<el-button style="margin-top:2px;" type="primary" :loading="loading"  @click="submitForm">{{button_txt}}</el-button>
				</el-form-item>
			</div>
		</el-col>
		</el-row>
    </el-form>
	<!--识别结果-->
	<div class="jyhou">
		<!-- <el-row v-if="show">
			<el-col :span="3">
				<div class="grid-content bg-purple">
					<p>当前模型准确率 92.68%</p>
				</div>
			</el-col>
			<el-col :span="3">
				<div class="grid-content bg-purple-light">
					<p style="cursor:pointer;color:#036fe2;" @click="detailsHandler">评估报告</p>
				</div>
			</el-col> -->
		</el-row>
		<div class="upload">
		</div>
		<div class="right">
		<p>识别结果</p>
		<div class="right_tab">
			<div class="title_b">
				<p class="left1_title">实际分类</p>
				<p class="left2_title">预测分类</p>
				<p class="right_title">置信度</p>
				<p v-if='content_title' class="content_title">请上传文件后查看识别结果</p>
				<table v-if='table' class="table">
					<tbody>
						<tr>
							<td>1. label-a</td>
							<td>1. label-a</td>
							<td>90.11%</td>
						</tr>
						<tr>
							<td  style="padding-top:10px">2. label-b</td>
							<td  style="padding-top:10px">2. label-b</td>
							<td  style="padding-top:10px">89.22%</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
        <el-button  style="margin-top:10px" type="primary" size="small" @click="submitHandler">申请上线</el-button>
		</div>
	</div>
	<!--识别结果-->
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
	data(){
		return{
			button_txt:'开始评估',
			loading:false,
			form:{
				task_type:2,
				model_version:''
			},
			// rules: {
			// model_id: [
			// 	{ required: true, message: '请选择模型', trigger: 'change' }
			// ],
			// train_dataset_id: [
			// 	{ required: true, message: '请选择数据集', trigger: 'change' }
			// ],
			// model_version: [
			// 	{ required: true, message: '请选择版本', trigger: 'change' }
			// ],
			// },
			formData:[],
			arr:[],
			value1:'',
			id:'',
			befor:true,
			jyhou:false,
			tableData1:{

			},
			table:false,
			content_title:true,
			show:false,
			status_list:{
				model_status:'申请发布'
			}
		}
	},
	created() {
		this.findAllData(),
		this.findAllModalend()
	},
	computed: {
		//映射state
		...mapState('mymodal',['modals','data','assessres','modelends'])
	},
	methods: {
		//映射actions
        ...mapActions('mymodal',['findAllModal','findAllData','assessModal','findAssessRes','publishModal','findAllModalend','findModalById','firstExmodal']),
		//申请上线
		submitHandler(formName){
			if(this.show==true){
				this.publishModal(this.form.model_id,this.status_list)
				this.$router.push({name:'pbmodal'})
			}else{
				this.$message({
					type:'error',
					message:'请先进行模型评估'
				})
			}
		},
		//校验评估
		submitForm() {
			if(this.form.model_id===''){
				this.$message({
					type:'warning',
					message:'请选择模型'
				})
			}else if(this.form.train_dataset_id===''){
				this.$message({
					type:'warning',
					message:'请选择数据集'
				})
			}else if(this.form.model_version===''){
				this.$message({
					type:'warning',
					message:'请选择版本'
				})
			}else{
				this.form.train_dataset_id=this.formData.join(',')
				let obj={list:this.form,id:this.id}
				this.firstExmodal(obj).then((res)=>{
					if(res.status===200){
						// this.$message({
						// 	type:'success',
						// 	message:'操作成功'
						// })
						this.button_txt='评估中'
						this.loading=true
						this.show=true
					// this.$router.push({name:'mymodal'})
					}else{
						this.$message({
							type:'error',
							message:res.data.msg
						})
					}
				})
			}
		},
		//产看评估报告
		detailsHandler(){
			this.findAssessRes(this.form.model_id)
			this.$router.push({name:'modalDetails',query:{id:this.form.model_id}})
		},
		//点击下拉框验证是否有选模型
		vesionClick(){
			if(this.form.model_id===''){
				this.$message({
					type:'warning',
					message:'请选择模型'
				})
			}else{
				this.form.model_version=this.value1
			}
		},
        //版本下拉框改变赋值
		vesionHandler(){
			if(this.form.model_id===''){
				this.$message({
					type:'warning',
					message:'请选择模型'
				})
			}else{
				this.form.model_version=this.value1
			}
		},
		//模型下拉框变化查看版本
		modelHandelr(id){
			let arr=[]
            this.findModalById(id).then((res)=>{
                res.data.train_model.forEach((item)=>{
                    arr.push(item.model_version)
                })
            })
            this.arr=arr
		}
	},
}
</script>
<style scoped>
	.table{
		width: 379px;
		position: absolute;
		margin-top: 38px;
		font-size: 14px;
		text-align: center;
		padding-top: 10px;
	}
	table>tr>td{
		border: 1px solid #eaf6fe;
	}
	.left1_title{
		float: left;
		margin-left:39px;
	}
	.left2_title{
		float: left;
		margin-left:86px;
	}
	.right_title{
		float: right;
		margin-right:43px;
	}
	.title_b{
		width: 100%;
		height: 38px;
		background-color:rgb(247,247,247);
	}
	.title{
        margin-left:28px;
        color:#000;
		margin-top: 6px;
		margin-bottom: 6px;
    }
	.line{
        width:100%;
        height:1px;
        background-color: #eee;
    }
	.jyhou{
		color:#333;
		font-size:12px;
		margin-left:28px;
	}
	.jyhou .el-row{
		margin-top: 2px;
		margin-left: 0px;
	}
	.upload{
		height:360px;
		margin-left: 578px;
		margin-top: -89px;
	}
	.upload-demo{
		position: absolute !important;
		margin-left:105px !important;
		margin-top:112px !important;
	}
	.right{
		position:absolute;
		margin-top:-268px;
	}
	.right_tab{
		width:380px;
		height:360px;
		border: 1px solid #eee;
	}
	.content_title{
		position:absolute;
		margin-left:119px;
		margin-top:205px;
	}
	.testmodal{
		height: 650px;
	}
	.el-row{
		margin-top: 1em;
		margin-left: 0.5em;
	}
</style>