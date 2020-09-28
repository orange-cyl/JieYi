<template>
    <div class="setModal">
        <!--标题-->
            <p class="title">创建模型</p>
        <!--标题-->
        <!--分割线-->
            <div class="line"></div>
        <!--分割线-->
        <!--表单-->
        <div class="form">
            <el-form :rules="rules" ref="form" :model="form" label-width="85px">
            <el-form-item label="模型名称:" prop="model_name">
                <el-col :span="8">
                <el-input v-model="form.model_name" placeholder="请输入模型名称"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="部位名称:" prop="model_part">
                <el-col :span="8">
                <el-select style="width:100%" v-model="form.model_part" placeholder="请选择部位名称">
                <el-option label="喷油嘴" value='1'></el-option>
                <el-option label="进气阀" value='2'></el-option>
                <el-option label="进气道" value='3'></el-option>
                <el-option label="缸壁" value='4'></el-option>
                <el-option label="活塞顶" value='5'></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="功能描述:" prop="model_describe">
                <el-col :span="8">
                <el-input type="textarea" v-model="form.model_describe" placeholder="请输入模型功能描述"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="submitHandler('form')">立即创建</el-button>
            </el-form-item> 
            </el-form>
        </div>
    <!-- 表单 -->
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data(){
        return{
            form:{},
			rules: {
            model_name: [
                { required: true, message: '请输入模型名称', trigger: 'blur' },
            ],
            model_part: [
                { required: true, message: '请选择部位名称', trigger: 'change' }
            ],
            model_describe: [
                { required: true, message: '请填写功能描述', trigger: 'blur' }
            ]
        }
    }
    },
    methods:{
        //映射actions
        ...mapActions('mymodal',['setModal']),
        //创建模型
		submitHandler(formName){
            this.form.model_part=parseInt(this.form.model_part) 
            this.$refs[formName].validate((valid) => {
			//如果验证成功
			if (valid) {
            this.setModal(this.form).then((res)=>{
					if(res.data.code==200){
						//成功的消息
						this.$message({
							type:'success',
							message:res.data.msg
						})
						//页面跳转
						this.$router.push({name:'mymodal'})
					}
				}).catch((res)=>{
						this.$message({
							type:'error',
							message:'模型已存在'
						})
				})
			} else {
				console.log('error submit!!');
				return false
			}
			});
		}
    }
}
</script>
<style scoped>
    .form{
        margin-left: 48px;
        margin-top: 18px;
    }
    .titlep{
        margin-left: 30px;
        margin-top: 25px;
        font-size: 14px;
        font-weight: 700;
        color: #666;
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
</style>