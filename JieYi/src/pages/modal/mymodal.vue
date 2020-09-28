<template>
	<div class="mymodal">
		<!--标题-->
		<p class="title">模型列表</p>
    <!-- {{modalDetails}} -->
    <!--标题-->
    <!--分割线-->
    <div class="line"></div>
    <!--分割线-->
    <!--模糊查询-->
    <el-row>
      <el-col :span="2">
          <p class="pro1">部位名称:</p>
      </el-col>
      <el-col :span="6">
        <div class="select1">
          <el-select @change="changeHandler" size="small" v-model="value1" placeholder="请选择部位名称">
            <el-option
              v-for="item in parts"
              :key="item.id"
              :label="item.part_name"
              :value="item.id">
            </el-option>
          </el-select>
          </div>
      </el-col>
      <el-col :span="2">
          <p class="pro2">服务状态:</p>
      </el-col>
      <el-col :span="6">
        <div class="select2">
            <el-select @change="changeHandler2" size="small" v-model="value2" placeholder="请选择服务状态">
              <el-option
                v-for="item2 in options2"
                :key="item2.value"
                :label="item2.value"
                :value="item2.id">
              </el-option>
            </el-select>
        </div>
      </el-col>
    </el-row>
    <!--模糊查询-->
	<!--表格-->
	<el-table
    :data="modals"
    border
    style="width: 96%;margin-left:28px;margin-top:20px;"
		size="small">
    <el-table-column
      align="center"
      prop="id"
      label="模型ID"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="model_name"
      label="模型名称"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="model_part"
      label="部位名称"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="model_status"
      label="服务状态"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="training_status"
      label="模型状态"
      >
    </el-table-column>
    <el-table-column
      align="center"
      prop="accuracy_rate"
      label="模型效果"
      >
    </el-table-column>
    <el-table-column
      align="center"
      width="350px"
      label="操作"
      >
      <template slot-scope="scope">
        <el-button @click="exmodalHandleClick(scope.row)"  size="mini">训练模型</el-button>
        <el-button @click="lisHandleClick(scope.row)" type="success" size="mini">历史版本</el-button>
        <el-button @click="editHandleClick(scope.row)"  type="primary" size="mini">详情</el-button>
        <el-button @click="deleteHandler(scope.row.id)" type="danger" size="mini">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
	<!--表格-->
  <!-- 分页 -->
  <div class="block">
			<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="page"
		      :page-sizes="[3, 5, 7, 9]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="count">
		    </el-pagination>
		</div>
  <!-- 分页 -->
  <!--历史版本模态框-->
  <el-dialog
  title="历史版本"
  :visible.sync="dialogVisible"
  width="60%">
  <div class="block">
  <el-timeline v-for="v in modalDetails.train_model" :key="v.id">
    <el-timeline-item placement="top">
      <el-card>
        <h4>{{v.model_version}}</h4>
        <p>训练于 {{v.training_time}}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>
</el-dialog>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
	data(){
		return{
      value1:{id:'',value:'全部'},
      value2:{id:'',value:'全部'},
      dialogVisible:false,
      options2:[{id:'',value:'全部'},{id:'1',value:'未发布'},{id:'2',value:'申请发布中'},{id:'3',value:'已通过'},{id:'4',value:'已拒绝'}],
      list:{
        model_part:'',
        model_status:''
      },
      form:{
        model_version:'V1'
      }
		}
  },
  created(){
    //查询所有模型
    this.findAllModal(this.list)
    //查询所有部位
    this.findAllParts()
  },
  computed:{
    //映射state
    ...mapState('mymodal',['modals','parts','modalDetails'])
  },
	methods: {
    //映射actions
    ...mapActions('mymodal',['findAllModal','deleteModalById','deleteModalById','findAllParts','findAllModalByVesion','findModalById']),
    //详细信息
    editHandleClick(row){
       this.findAllModalByVesion(this.form).then((res)=>{
                res.data.results.forEach((item)=>{
                    this.results=item
                    this.train_result=item.train_result
                    this.test_model=item.test_model
                    item.test_model.forEach((item)=>{
                        this.test_model=item
                    })
                })
            })
      this.form.id=row.id
      this.findAllModalByVesion(this.form)
      if(row.training_status==='未训练'){
        this.$message({
          type:'warning',
          message:'模型未训练,请先训练模型!'
        })
      }else if(row.training_status==='准备训练'){
        this.$message({
          type:'warning',
          message:'模型正在准备训练!'
        })
      }else if(row.training_status==='训练中'){
        this.$message({
          type:'warning',
          message:'模型正在训练中!'
        })
      }else if(row.training_status==='训练失败'){
        this.$message({
          type:'warning',
          message:'模型训练失败,请重新训练!'
        })
      }else{
        this.$router.push({name:'modalDetails',query: { id: row.id }})
      }
    },
    //历史版本
    lisHandleClick(row){
      if(row.training_status==='未训练'){
        this.$message({
          type:'warning',
          message:'模型未训练,请先训练模型!'
        })
      }else if(row.training_status==='准备训练'){
        this.$message({
          type:'warning',
          message:'模型正在准备训练!'
        })
      }else if(row.training_status==='训练中'){
        this.$message({
          type:'warning',
          message:'模型正在训练中!'
        })
      }else if(row.training_status==='训练失败'){
        this.$message({
          type:'warning',
          message:'模型训练失败,请重新训练!'
        })
      }else{
        this.dialogVisible=true
        this.findModalById(row.id)
      }
    },
    //删除
    deleteHandler(id){
      this.$confirm('此操作将删除这条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteModalById(id).then((res)=>{
            if(res.status==200){
              this.$message({
                type: 'success',
                message: '删除成功'
              });  
            }else{
              this.$message({
                type: 'error',
                message: '删除失败'
              }); 
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    //训练模型
    exmodalHandleClick(row){
      if(row.training_status==='未训练'){
        this.$router.push({name:'first_exmodal'})
      }else if(row.training_status==='训练完成'||row.training_status==='准备优化'||row.training_status==='优化中'||row.training_status==='优化完成'||row.training_status==='优化失败'||row.training_status==='准备评估'||row.training_status==='评估完成'||row.training_status==='评估失败'){
        this.$router.push({name:'opt_exmodal',})
      }else if(row.training_status==='训练中'||row.training_status==='准备训练'||row.training_status==='准备优化'||row.training_status==='优化中'){
        this.$message({
          type:'warning',
          message:'模型正在'+row.training_status
        })
      }
    },
    //下拉菜单筛选
    changeHandler(itme){
      this.list.model_part=itme
      this.findAllModal(this.list).then((res)=>{
      })
    },
    changeHandler2(itme){
      this.list.model_status=itme
      this.findAllModal(this.list)
    }
    }
}
</script>
<style  scoped>
  .block{
    margin-top: 18px;
    margin-left: 1em;
  }
  .el-row{
    margin-top: 6px;
    margin-left: 28px;
    margin-right: 28px;
    /* background-color: #666; */
  }
  .title1{
    font-size: 14px;
    color: #666;
  }
  .title2{
    position: relative;
    margin-top: -15px;
    margin-left: 350px;
    font-size: 14px;
    color: #666;
  }
  .title3{
    font-size: 14px;
    color: #666;
    margin-top: 28px;
  }
  .title4{
    position: relative;
    margin-top: -15px;
    margin-left: 350px;
    font-size: 14px;
    color: #666;
  }
  .title5{
    font-size: 14px;
    color: #666;
    margin-top: 28px;
  }
  .title6{
    position: relative;
    margin-top: -15px;
    margin-left: 350px;
    font-size: 14px;
    color: #666;
  }
  .title7{
    font-size: 14px;
    color: #666;
    margin-top: 28px;
  }
  .pro1{
    font-size: 14px;
    color: #666;
    float: left;
  }
  .select1{
    margin-top: 6px;
    margin-left: -30px;
  }
  .pro2{
    font-size: 14px;
    color: #666;
    float: left;
  }
  .select2{
    margin-top: 6px;
    margin-left: -30px;
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
</style>