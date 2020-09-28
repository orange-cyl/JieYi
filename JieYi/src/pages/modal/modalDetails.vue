<template>
    <div class="modalDetails">
        <div class="modalDetails-title">模型管理 / 模型详情
            <span style="float:right;color:#036FE2;cursor: pointer;margin-right:2em;" @click='toBack'>返回</span>
        </div>
        <div class="modalDetails-content">
            <div class="modalDetails-btn">
                <div class="modalDetails-top">
                    <div>
                        <span>模型ID:</span>
                        <span>{{modalDetails.id}}</span>
                    </div>
                    <div>
                        <span>模型名称:</span>
                        <span>{{modalDetails.model_name}}</span>
                    </div>
                    <div>
                        <span>训练状态:</span>
                        <span>{{modalDetails.training_status}}</span>
                    </div>
                    <div>
                        <span>服务状态:</span>
                        <span>{{modalDetails.model_status}}</span>
                    </div>
                </div>
                <div class="modalDetails-bottom">
                     <div>
                        <span>部位名称:</span>
                        <span>{{modalDetails.model_part}}</span>
                    </div>
                     <div>
                        <span>模型准确率:</span>
                        <span>{{modalDetails.accuracy_rate}}%</span>
                    </div>
                     <div>
                        <span>描述信息:</span>
                        <span>{{modalDetails.model_describe}}</span>
                    </div>
                </div>
            </div>
            <div class="modalDetails-select">
                <div>评估报告</div>
                <div class="select">
                    <div>
                        <span>版本:</span>
                        <span>
                             <el-select @change="versionHandler" size="small" v-model="form.model_version" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                        </span>
                    </div>
                </div>
            </div>
            <div class="modalDetails-table">
                <div>
                    <div>
                        训练结果
                    </div>
                    <div>
                        效果优异，建议针对识别错误的图片示例继续优化模型效果
                    </div>
                </div>
                <div class="modalDetails-table-main">
                    <div class="main-left" v-for="result in  train_result" :key="result.id">
                        <div>
                            <span style="width:68px;">{{result.label}}:</span>
                            <div style="box-sizing: border-box;">
                               <!--  <div style="display:inline-block;width:50%;box-sizing: border-box;"> -->
                                     <el-progress :width='60' type="circle" :percentage=result.F1score></el-progress>
                                <!-- </div> -->
                                
                                <div style="float:right;margin-right:30%;height:100%;">
                                    <div style="height:50%;line-height:40px">f-score </div> 
                                    <div style="height:50%;"> {{result.F1score}}%</div>
                                </div>
                            </div>
                            <div>
                                 <el-progress :width='60' type="circle" :percentage=result.precision_rate></el-progress>
                                <div style="float:right;margin-right:30%;height:100%;">
                                    <div style="height:50%;line-height:40px">精确率</div> 
                                    <div style="height:50%;"> {{result.precision_rate}}%</div>
                                </div>
                            </div>
                            <div>
                                 <el-progress :width='60' type="circle" :percentage=result.recall_rate></el-progress>
                                <div style="float:right;margin-right:30%;height:100%;">
                                    <div style="height:50%;line-height:40px">召回率</div> 
                                    <div style="height:50%;">{{result.recall_rate}}%</div>
                                </div>
                            </div>
                            <div>
                                 <el-progress :width='60' type="circle" :percentage=result.Gscore></el-progress>
                                <div style="float:right;margin-right:30%;height:100%;">
                                    <div style="height:50%;line-height:40px">g-score</div> 
                                    <div style="height:50%;">{{result.Gscore}}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-right">
                        <el-progress type="circle" :width='100' :percentage=results.accuracy_rate></el-progress>
                         <div style="float:right;height:100%;margin-right:9%;">
                                    <div style="height:50%;line-height:400px">准确率</div> 
                                    <div style="height:50%;line-height:230px">{{results.accuracy_rate}}%</div>
                                </div>
                        
                    </div>
                </div>
            </div>
             <div class="modalDetails-details" v-if="show">
                <div>
                    <div>
                        详细评估
                    </div>
                    <div>
                        评估样本具体数据情况
                    </div>
                </div>
                <div>
                    <table class="table">
                        <thead style="background-color: #eaf6fe;">
                            <tr style="border-collapse: collapse;heigth:80px;">
                                <td style="border: 1px solid #eaf6fe;padding:10px;"></td>
                                <td style="border: 1px solid #eaf6fe;padding:10px;">随机测试集</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="2" style="border: 1px solid #eee;">预测表现</td>
                                <td style="border: 1px solid #eee;padding:10px;">正确数量:{{test_model.test_right_num}}</td>
                            </tr>
                            <tr>
                                <td style="padding:10px;">错误数量:{{test_model.test_error_num}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <div style="font-size: 13px;">
                        多个识别结果准确率效果
                    </div>
                    <div class="modalDetails-details-main">
                        <div v-for="test_model in test_model.test_result" :key="test_model.id">
                            <div style="float:left;">{{test_model.label}}</div>
                            <el-progress :text-inside="true" :stroke-width="16" :percentage=test_model.precision_rate></el-progress>
                        </div>
                    </div>
                </div>
                <div style="margin-top:20px;">
                     <div style="font-size: 13px;">
                        不同分类的F1-score及对应的识别错误的图片（不包含训练时可能勾选的“其他”类识别错误的图片）
                    </div>
                    <div class="last-one">
                        <div class="last-one-left">
                            <div v-for="test in test_model.test_result" :key="test.id">
                                 <div style="float:left;">{{test.label}}</div>
                                <el-progress :text-inside="true" :stroke-width="14" :percentage=test.F1score></el-progress>
                            </div>
                        </div>
                        <div class="last-one-right">
                            <div>
                                label-a的错误结果示例
                            </div>
                            <div style="width:180px;margin-right:10px;float:left;">
                                <div style="width:180px;">
                                    <img width="180px" height="100px" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">
                                </div>
                                <div style="text-align:center;">
                                    <span>正确结果：</span>
                                    <span>label-a</span>
                                </div>
                                <div style="text-align:center;">
                                    <span>预测结果：</span>
                                    <span>label-c</span>
                                </div>
                            </div>
                            <div style="width:180px;float:left;">
                                <div style="width:180px;">
                                    <img width="180px" height="100px" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">
                                </div>
                                <div style="text-align:center;">
                                    <span>正确结果：</span>
                                    <span>label-a</span>
                                </div>
                                <div style="text-align:center;">
                                    <span>预测结果：</span>
                                    <span>label-c</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="height:50px;"></div>
            </div>
        </div>
       
    </div>
</template>
<script type="text/javascript">
import {mapActions,mapState,mapGetters,mapMutations} from 'vuex'
    export default{
        data(){
            return {
                options:[],
                value1:'V1',
                form:{
                    id:this.$route.query.id
                },
                show:true,
                results:{},
                train_result:[],
                test_model:{}
            }
        },
        mounted(){
            this.form.model_version='V1'
            this.findAllModalByVesion(this.form).then((res)=>{
                res.data.results.forEach((item)=>{
                    this.results=item
                    this.train_result=item.train_result
                    this.test_model=item.test_model
                    item.test_model.forEach((item)=>{
                        this.test_model=item
                    })
                })
                if(this.test_model.length===0){
                this.show=false
                }else{
                    this.show=true
                }
            })
        },
        created(){
            this.findModalById(this.$route.query.id).then((res)=>{
                res.data.train_model.forEach((item)=>{
                    this.options.push(item.model_version)
                })
            });
        },  
        computed:{
        ...mapState('mymodal',['modalDetails'])
        },
        methods:{
            ...mapActions('mymodal',['findModalById','findAllModalByVesion']),
            //返回
            toBack(){
                 this.$router.push({name:'mymodal'})
            },
            //改变版本,查看此版本下的模型详情
            versionHandler(version){
                this.form.model_version=version
                this.findAllModalByVesion(this.form).then((res)=>{
                res.data.results.forEach((item)=>{
                    this.results=item
                    this.train_result=item.train_result
                    this.test_model=item.test_model
                    item.test_model.forEach((item)=>{
                        this.test_model=item
                    })
                })
                if(this.test_model.length===0){
                    this.show=false
                    // this.$message({
                    //     type:'warning',
                    //     message:'模型未评估!'
                    // })
                }else{
                    this.show=true
                }
            })
            }
        }
    }
</script>
<style type="text/css">
    .modalDetails{
        margin: 10px;
        max-height: calc(100vh - 50px);
        overflow-y: auto;
        width: 100.5%;
    }
    .modalDetails-title{
        padding-bottom: 3px;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
    }
    .modalDetails-btn,.modalDetails-select,.modalDetails-table,.modalDetails-details{
        margin-bottom: 10px;
        border-bottom: 1px solid #eee; 
        color: #606266;
        font-size: 14px;
        padding-bottom: 20px;

    }
    .el-progress-bar{
        width: 80%;
        margin-left: 1em;
    }
    .modalDetails-table > div:first-child div:first-child{
        margin-bottom: 10px;
    }
    .modalDetails-table > div:first-child div:last-child{
        font-size: 13px;
    }
    .modalDetails-details > div:first-child div:first-child{
        margin-bottom: 10px;
    }
    .modalDetails-details > div:first-child div:last-child{
        font-size: 13px;
    }
    .last-one{
        margin-top: 10px;
        height: 320px;
        width: 95%;
        border: 1px solid #eee;
        /*background-color: pink;*/
    }
    .last-one .last-one-left{
        width: 30%;
        height: 100%;
        float: left;
        overflow-y: auto;

    }
    .last-one-left > div{
         height: 40px;
         box-sizing: border-box;
         margin-top: 10px;
         /*background-color: yellow;*/
    }
    .last-one-left > div >div{
         height: 40px;
        line-height: 40px;
        padding-left: 10px;
        box-sizing: border-box;
    }
    .last-one .last-one-right{
        width: 70%;
        height: 100%;
        /*background-color: red;*/
        border-left: 1px solid #eee;
        margin-left: 30%;
        padding: 10px;
        font-size: 13px;
        overflow-y: auto;
    }
    .el-progress-bar{
        width: 60% !important;
    }
    .last-one .last-one-right > div{
        margin-bottom: 10px;
    }
    .modalDetails-select > div:first-child{
        margin-bottom: 20px;
    }
    .select{
        overflow: hidden;
    }
    .modalDetails-details .table{
    width: 260px;
    border: 1px solid #eee;
    border-collapse: collapse;
    box-sizing: border-box;
    color: #333;
    font-size: 12px;
    margin-left: 28px;
    margin-top: 22px;
    margin-bottom: 28px;
    text-align: center;
    line-height: 1.5;
    }
    .modalDetails-details-main{
        height: 290px;
        width: 30%;
        padding: 1em;
        margin-top: 10px;
        border: 1px solid #eee;
         box-sizing: border-box;
    }
    .modalDetails-details-main > div{
        height: 40px;
        /*background-color: red;*/
         box-sizing: border-box;
         margin-top: 10px;
    }

    .modalDetails-details-main > div > div{
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        box-sizing: border-box;
    }
    .modalDetails-table-main{
        overflow: hidden;
        margin-top: 1em;

    }
    .modalDetails-table-main > div{
        float: left;
    }
    .main-left{
        width: 83%;
        box-sizing: border-box;
    }
    .main-left > div > span{
        /*display: inline-block;*/
        float: left;
        width: 5%;
    }
    .main-left > div > div{
        height: 100%;
        width: 21%;
        line-height: 100%;
        /*background-color: red;*/
        /*border-right: 1px solid black;*/
        margin-right: 1em;
        float: left;
    }
    .main-left > div{
        line-height: 70px;
        height: 70px;
        padding-left: 10px;
        /*background-color: pink;*/
        /*border: 1px solid #fff;*/
        box-sizing: border-box;
        margin-top: 1em;
    }
    .main-right{
        width: 15%;
        height: 220px;
        float: right !important;
        margin-right: 1em;
        margin-top: -248px;
    }
    .main-right .el-progress--circle{
        margin-top: 147px;
    }
    .modalDetails-select .select div{
        display: inline-block;
        margin-right: 20px;
    }
    .modalDetails-top{
        height: 40px;
    }
    .modalDetails-top div{
        width: 25%;
        height: 100%;
        float: left;
        line-height: 40px;
        padding-left: 10px;
    }
    .modalDetails-bottom div{
        width: 25%;
        height: 100%;
        float: left;
        line-height: 40px;
        padding-left: 10px;
    }
    .modalDetails-bottom div:last-child{
        width: 50%;
    }
    .modalDetails-bottom{
        height: 40px;
    }
    .modalDetails-content{
        min-height:500px;
        /*background-color: red;*/
    }
    .modalDetails-page{
        float: right;
    }
    .main-left .el-progress-circle{
        /*width: 70% !important;*/

    }
    .main-left .el-progress--circle{
        /*width: 50%;*/
        /*float: left !important;*/
    }
    .main-left .el-progress--circle .el-progress__text{
        /*width: 70% !important;*/
    }
</style>