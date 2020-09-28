<template>
	<div class="deletemodal">
	<!--标题-->
	<p class="title">模型列表</p>
<!--标题-->
<!--分割线-->
	<div class="line"></div>
<!--分割线-->
<!--表格-->
<el-table
:data="tableData"
border
style="width: 96%;margin-left:28px;margin-top:20px;">
<el-table-column
  prop="date"
  label="模型ID"
  >
</el-table-column>
<el-table-column
  prop="name"
  label="模型名称"
  >
</el-table-column>
<el-table-column
  prop="bushu"
  label="部署方式"
  >
</el-table-column><el-table-column
  prop="xunlian"
  label="训练状态"
  >
</el-table-column><el-table-column
  prop="fuwu"
  label="服务状态"
  >
</el-table-column><el-table-column
  prop="xiaoguo"
  label="模型效果"
  >
</el-table-column>
<el-table-column
  label="操作"
  >
  <template slot-scope="scope">
	<el-button @click="handleClick" type="text" size="small">删除</el-button>
  </template>
</el-table-column>
</el-table>
<!--表格-->
	</div>
</template>
<script>
export default {
	data(){
		return{
			tableData:[{
				date:1001,
				name:'喷油嘴模型1',
				bushu:'公有云部署',
				xunlian:'训练中',
				fuwu:"已发布",
				xiaoguo:'准确率99%'
			},{
				date:1002,
				name:'进气道模型1',
				bushu:'公有云部署',
				xunlian:'训练中',
				fuwu:"未发布",
				xiaoguo:'未评估'
			},{
				date:1003,
				name:'喷油嘴模型2',
				bushu:'公有云部署',
				xunlian:'训练中',
				fuwu:"未发布",
				xiaoguo:'未评估'
			}]
		}
	},
	methods: {
		//停止训练
	handleClick(){
		this.$confirm('此操作将删除这条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
	},
	}
}
</script>
<style scoped>
	.title{
			margin-left:28px;
			color:#000;
		}
	.line{
        width:100%;
        height:1px;
        background-color: #eee;
    }
</style>