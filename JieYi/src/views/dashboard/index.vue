<template>
  <div id="index">
    <div>
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in images" :key="item.id">
            <img class="img" :src="item.url">
          </el-carousel-item>
        </el-carousel>
    </div>
    <div style="text-align:center;margin-top:1em;">

      <el-card class="box-card">
        <div slot="header" class="clearfix">
           <div class="clearfix_top">
              <span @click='toModal'>模型管理</span>
          </div>
        </div>
        <div  class="text item">
          
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="clearfix_top">
            <span @click='toData'>数据集管理</span>
          </div>
         
        </div>
        <div  class="text item">
         
        </div>
      </el-card>
       
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="clearfix_top">
            <span @click='toOperator'>算子管理</span>
          </div>
        </div>
        <div  class="text item">
         
        </div>
      </el-card>
    </div>
    <div class="index_bottom">
       <div>
          <a href="http://www.miitbeian.gov.cn/">粤ICP备13074057号-2</a><br>
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502001574"> <span><img src="@/assets/guohui.png"></span>   粤公网安备 44030502001574</a>
       </div>
       
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  computed: {
   
  },
  data(){
    return {
      images:[
        {url:'http://120.24.178.4:8081/web/config/homePage/getImage?name=homepage1.jpg'},
        {url:'http://120.24.178.4:8081/web/config/homePage/getImage?name=homepage2.jpg'},
        {url:require('@/assets/111.png')},

      ]
    };
  },
  mounted() {
    this.toDraw();
  },
  methods:{
    toData(){
      this.$router.push({path:'/cldata/list'})
    },
    toModal(){
      this.$router.push({path:'/modal/setModal'})
    },
    toOperator(){
      this.$router.push({path:'/operator/list'})
      
    }
    }
}
</script>

<style lang="scss" scoped>
.el-card__header{
  padding:0px 0px !important;
}
.index_bottom > div{
   
  width:400px;
  position: relative;
  padding-top: 10em;
  left: 0px;
  right: 0px;
  margin: auto;
  }
  #index{
    .text {
    font-size: 14px;
    height:10px;
  }
  .index_bottom{
    width:100%;
    height:150px;
    color:blue;
    position: relative;
    bottom:0;
    text-align:center;
     img{
      height: 15px;
      width: 15px;
      text-align: center;
      line-height: 48;
    }
  }
  
  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix{
    height:40px;
  }
  .clearfix:after {
    clear: both
  }
  .clearfix_top{
    width:70%;
    margin:0 auto;
    height:40px;
    background:#079FD8;
    border-radius: 5px;
    text-align:center;
    line-height:40px;
    color:#fff;
    span{
      cursor:pointer;
    }
  }
  .box-card {
    width: 20%;
    display:inline-block;
    margin:5px;
  }
  	margin:10px;
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .img{
    height:300px;
    width:100%;
  }
  }

</style>
