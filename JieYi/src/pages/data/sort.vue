<template>
	<div class="soft" >
		<!--标题-->
	        <p class="title">数据集管理 / 数据集分类管理</p>
        <!--标题-->
        <!--分割线-->
            <div class="line"></div>
        <!--分割线-->
		 <div><el-button 
        icon="el-icon-arrow-left"
        type="text" 
        @click="backHandler" 
        style="margin-top:1em; margin-left:2em; margin-bottom:1em" 
        size="small">返回</el-button>
        </div>
		<el-table
		:data="sort.classifys"
		border
		max-height="600"
		style="width: 95%;margin:2em;"
		size="small">
		<el-table-column
			prop="id"
			label="编号"
			width="100px"
			align='center'>
		</el-table-column>
		<el-table-column
			prop="classifyName"
			label="分类名称"
			width="280"
			align='center'>
		</el-table-column>
		<el-table-column
			prop="dataset"
			label="所属数据集"
			align='center'>
		</el-table-column>
		<el-table-column
			prop="classifyQuantity"
			label="图片数量"
			align='center'>
		</el-table-column>
		<el-table-column
			prop="classifyTime"
			label="上传时间"
			align='center'>
		</el-table-column>
		<el-table-column
			prop="datasetStatus"
			label="数据集状态"
			align='center'>
		</el-table-column>
		<el-table-column
			label="操作"
			width="120"
			align='center'>
		<template slot-scope="scope">
			<el-button @click="detailsHandleClick(scope.row.id)" type="success" size="mini">查看</el-button>
			<!-- <el-button @click="updoneHandleClick(scope.row)" type="primary" size="mini">详情</el-button> -->
		</template>
		</el-table-column>
		</el-table>
		<!-- <div class="block">
			<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="page"
		      :page-sizes="[3, 5, 7, 9]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="count">
		    </el-pagination>
		</div> -->
		<!-- 模态框 -->
		<el-dialog title="发动机进气道轻微污染图片集详情" :visible.sync="dialogFormVisible">
		 	<el-form :model="ruleForm" 
		    ref="ruleForm" 
			 size="small" label-width="150px" 
			 label-position="left" 
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
import { mapState, mapActions } from 'vuex'
// import moment from 'moment'
export default {
	data() {
		return {
			dialogFormVisible:false,
			page:1,
			pageSize:5,
			count:0,
			dataId:'',
			// tableData: [{
			// 	time: '2020-02-03',
			// 	name: '发动机进气道轻微污染图片',
			// 	sort: '汽车发动机进气道图片',
			// 	sortnum: '572',
			// 	id: '1',
			// },{
			// 	time: '2020-02-03',
			// 	name: '发动机进气道轻度污染图片',
			// 	sort: '汽车发动机进气道图片',
			// 	sortnum: '672',
			// 	id: '2',
			// }, {
			// 	time: '2020-02-03',
			// 	name: '发动机进气道中度污染图片',
			// 	sort: '汽车发动机进气道图片',
			// 	sortnum: '518',
			// 	id: '3',
			// }, {
			// 	time: '2020-02-03',
			// 	name: '发动机进气道重度污染图片',
			// 	sort: '汽车发动机进气道图片',
			// 	sortnum: '520',
			// 	id: '4',
			// }, {
			// 	time: '2020-02-03',
			// 	name: '发动机进气道严重污染图片',
			// 	sort: '汽车发动机进气道图片',
			// 	sortnum: '520',
			// 	id: '5',
			// }],
			ruleForm:[],
		}
	},
	computed:{
		    ...mapState('data',['sort'])
		},
	created(){
		this.load()
	},
	watch:{
		pageSize:function(old,now){
			this.load()
		},
		page:function(old,now){
			this.load()
		},
	},
	methods:{
		...mapActions('data',['findAllSort']),
		//分页
		handleSizeChange(val) {
			this.pageSize = val
		},
		handleCurrentChange(val) {
			this.page = val
		},
		// 加载数据集详情
		load(){
			if(this.$route.query.id){
				this.id = this.$route.query.id
			} else {
				this.id = this.$route.query.dataId
			}
			console.log('传递id',this.id)
			let obj={
				page:this.page,
				page_size:this.pageSize
			}
			this.findAllSort(this.id).then(r=>{
				this.count = this.sort.classifys_num
				// console.log(this.count)
			})
		},
		//查看
		detailsHandleClick(id) {
			console.log(id)
			console.log(this.$route.query.id)
			this.$router.push({ name: 'details',query:{dataId:this.id,classId:id}})
		},
		//返回
		backHandler() {
			this.$router.push({ name: 'cldata'})
		},
		//详情
		updoneHandleClick(){
			this.dialogFormVisible = true
		},
		// 关闭模态框
		close(form) {
			this.dialogFormVisible = false
			this.$refs[form].resetFields()
		},
		// //时间戳转换
		// dateFormat(row,colnum){
        //     return moment(row[colnum.property]).format('YYYY-MM-DD HH:MM:SS')
        // },
    },
}
</script>

<style>
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
	.block{
		margin-bottom: 1.5em;
		margin-right: 2em;
	}
</style>