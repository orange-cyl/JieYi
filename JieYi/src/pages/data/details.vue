<template>
	<div class="details" >
		<!--标题-->
	        <p class="title">数据集管理 / 数据集分类管理 / 图片详情</p>
        <!--标题-->
        <!--分割线-->
            <div class="line"></div>
        <!--分割线-->
		 <div><el-button 
        icon="el-icon-arrow-left"
        type="text" 
        @click="backHandler" 
        style="margin-top:1em; margin-left:2em" 
        size="small">返回</el-button>
        </div>
		<div class="block">
			<div class="item" v-for='item in images' :key="item.id" style="margin-left:2em;display:inline;">
				<img :src="item.image_src" style="width:200px;">
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {
			page:1,
			pageSize:3,
			count:0,
	      };
	},
	computed:{
		...mapState('data',['images'])
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
	methods: {
		...mapActions('data',['findAllPicture']),
		//分页
		handleSizeChange(val) {
			this.pageSize = val
		},
		handleCurrentChange(val) {
			this.page = val
		},
		//返回
		backHandler() {
			this.$router.push({ name: 'sort',query:{dataId:this.$route.query.dataId}})
		},
		//加载数据
		load(){
			// console.log(this.$route.query.dataId)
			// console.log(this.$route.query.classId)
			let obj = {
				dataset_id:this.$route.query.dataId,
				tag_id:this.$route.query.classId,
				page:this.page,
				page_size:this.pageSize
			}
			this.findAllPicture(obj).then(r=>{
				this.count = this.images.total
			})
		},
    },
}
</script>

<style>
	.details{
		/* overflow-y: scroll !important; */
		height: 100%;
		/* position: relative; */
	}
	.title{
			margin-left:28px;
			color:#000;
		}
	.line{
        width:100%;
        height:1px;
        background-color: #eee;
    }
	/* .block{
		overflow-y: scroll !important;
		height: 90%;
		position: absolute;
		top: 15%;
		bottom: 5%;
	}
   #image{
		height: 350px;
		width: 200px;
	} */
</style>