import axios from '../../http/axios'
import app from './app'
export default{
    namespaced:true,
    state:{
        //评估结果
        test_result:[],
        //图片错误数量与正确数量
        test_num:{},
        modals:[],
        results:{},
        modalDetails:{},
        modalDetailsByversion:[],
        data:[],
        assessres:[],
        operators:[],
        parts:[],
        versions:[],
        modelends:[],
        modeling:[],
        //算子
        region:[],
        application:[],
        optimizers:[],
        losses:[],
        callback:[],
        measurer:[]
    },
    mutations:{
        //设置评估结果
        SET_TEST_RESULT(state,test_result){
            state.test_result=test_result
        },
        //设置图片正确数量和错误数量
        SET_TEST_NUM(state,test_num){
            state.test_num=test_num
        },
        //设置训练结果
        SET_RESULTS(state,results){
            state.results=results
        },
        //设置根据版本查出来的模型详情信息
        SET_MODALDETAILSBYVERSION(state,modalDetailsByversion){
            state.modalDetailsByversion=modalDetailsByversion
        },
        //设置算子
        SET_REGION(state,region){
            state.region=region
        },
        SET_APPLICATION(state,application){
            state.application=application
        },
        SET_OPTIMIZERS(state,optimizers){
            state.optimizers=optimizers
        },
        SET_LOSSES(state,losses){
            state.losses=losses
        },
        SET_CALLBACK(state,callback){
            state.callback=callback
        },
        SET_MEASURER(state,measurer){
            state.measurer=measurer
        },
        //设置modals
        SET_MODALS(state,modals){
            state.modals=modals
        },
        //设置模型详情到modalDetails
        SET_MODALDETAILS(state,modalDetails){
            state.modalDetails=modalDetails
        },
        //设置部位place
        SET_PLACE(state,place){
            state.place=place
        },
        //设置数据集training
        SET_DATA(state,data){
            state.data=data
        },
        //设置评估结果
        SET_ASSESSRES(state,assessres){
            state.assessres=assessres
        },
        //设置算子operators
        SET_OPERATORS(state,operators){
            state.operators=operators
        },
        //设置部位parts
        SET_PARTES(state,parts){
            state.parts=parts
        },
        //设置版本
        SET_VERSIONS(state,versions){
            state.versions=versions
        },
        //将训练完成的模型添加到模型列表中
        SET_MODELS_END(state,models_end){
            state.models_end=models_end
        },
        //将训练好的模型添加到modelends中
        SET_MODELENDS(state,modelends){
            state.modelends=modelends
        },
        //将未训练的模型添加到modeling中
        SET_MODELING(state,modeling){
            state.modeling=modeling
        }
    },
    actions:{
        //查询已经训练过的模型和未训练的模型
        async findAllModalend({commit}){
            let response=await axios.get('/models/')
            let res=response.data.results
            let arrend=[]
            let arring=[]
            res.forEach((itme)=>{
                if(itme.training_status==="训练完成"||itme.training_status==="优化完成"||itme.training_status==="优化失败"||itme.training_status==="评估完成"||itme.training_status==="评估失败"){
                    arrend.push(itme)
                }else if(itme.training_status==="未训练"||itme.training_status==="训练失败"){
                    arring.push(itme)
                }
            })
            commit('SET_MODELENDS',arrend)
            commit('SET_MODELING',arring)
        },
        //查询所有模型
        async findAllModal({commit},list){
            let res=await axios.get('/models/?model_part='+list.model_part+'&model_status='+list.model_status).then((res)=>{
                commit('SET_MODALS',res.data.results)
                let response=res.data.results
            })
        },
        //根据id查询模型详情
        async findModalById({commit},id){
            let response=await axios.get('/models/'+id)
            commit('SET_MODALDETAILS',response.data)
            return response
        },
        //根据id删除模型
        async deleteModalById({dispatch},id){
            let response=await axios.delete('/models/'+id)
            dispatch('findAllModal',{model_part:'',model_status:''})
            return response
        },
        //创建模型
        async setModal({dispatch},list){
            let response=await axios.post('/models/',list)
            dispatch('findAllModal',{model_part:'',model_status:''})
            return response
        },
        //初始化训练,优化训练,评估模型
        async firstExmodal({dispatch},list){
            let response=await axios.post('/models/tmodels/'+list.id,list.list)
            dispatch('findAllModal',{model_part:'',model_status:''})
            return response
        },
        //查询所有部位
        findAllPlace({commit}){
            axios.get('jiekou').then((res)=>{
                commit('SET_PLACE',res.data)
            })
        },
        //评估模型
         async assessModal({dispatch},list){
            let response=await axios.post('/models/emodels',list)
            dispatch('findAllModal')
            return response
         },
         //查看评估结果
         async findAssessRes({commit},id){
             let response=await axios.get('/models/emodels/'+id)
             commit('SET_ASSESSRES',response.data.result)
             return response
         },
         //发布模型
         async publishModal({dispatch},{id,form}){
            let response=await axios.patch('/models/'+id,form)
            dispatch('findAllModal',{model_part:'',model_status:''})
            return response
         },
         //查看数据集
         async findAllData({commit}){
             let response=await axios.get('/datasets/')
             commit('SET_DATA',response.data.results.list)
         },
         //根据id查询数据集
         async findDataById({commit},id){
             let response=await axios.get('/datasets/'+id,'/')
             return response
         },
         //查看算子
         async findAlloperators({commit}){
             let response=await axios.get('/operators/category-operators')
             commit('SET_OPERATORS',response.data.result)
         },
         //查询所有部位
         findAllParts({commit}){
             axios.get('/models/parts').then((res)=>{
                commit('SET_PARTES',res.data.results)
                let response=res.data.results
                response.unshift({id:'',part_name:'全部'})
             })
         },
         //根据模型id查看版本信息
         async findAllvesionById({commit},id){
             let response=await axios.get('/models/versions/'+id)
             commit('SET_VERSIONS',response.data.results)
             return response
         },
         //按照类型查看算子
         async findoPeratorsBycategory({commit}){
             let response=await axios.get('/operators/category-operators')
             let res=response.data.results
                 let Region=[]
                 let Application=[]
                 let Optimizers=[]
                 let Losses=[]
                 let Callback=[]
                 let Measurer=[]
             res.forEach((itme)=>{
                 if(itme.category_name==='网络结构'){
                    itme.operators.forEach((index)=>{
                        Application.push(index)
                    })
                 }else if(itme.category_name==='回调函数'){
                    itme.operators.forEach((index)=>{
                        Callback.push(index)
                    })
                 }else if(itme.category_name==='优化器'){
                    itme.operators.forEach((index)=>{
                        Optimizers.push(index)
                    })
                 }else if(itme.category_name==='度量器'){
                    itme.operators.forEach((index)=>{
                        Measurer.push(index)
                    })
                 }else if(itme.category_name==='迭代次数'){
                    itme.operators.forEach((index)=>{
                        Region.push(index)
                    })
                 }else if(itme.category_name==='损失值'){
                    itme.operators.forEach((index)=>{
                        Losses.push(index)
                    })
                 }
             })
             commit('SET_REGION',Region)
             commit('SET_APPLICATION',Application)
             commit('SET_OPTIMIZERS',Optimizers)
             commit('SET_LOSSES',Losses)
             commit('SET_CALLBACK',Callback)
             commit('SET_MEASURER',Measurer)
         },
         //根据模型版本查看模型详情
        //  async findAllModalByVesion({commit},list){
        //      let response =await axios.get('/models/version/'+list.id+'?model_version='+list.model_version).then((res)=>{
        //          commit('SET_MODALDETAILSBYVERSION',res.data.results)
        //          let arr=[]
        //          let test_result=[]
        //          commit('SET_TEST_RESULT',test_result)
        //          res.data.results.forEach((item)=>{
        //              item.train_result.forEach((item)=>{
        //                    arr.push(item)           
        //              })
        //              commit('SET_RESULTS',arr)
        //          });
        //          res.data.results.forEach((item)=>{
        //              item.test_model.forEach((item)=>{
        //                  test_result.push(item.test_result)
        //              })
        //              item.test_model.forEach((item)=>{
        //                  commit('SET_TEST_NUM',item)
        //              })
        //          })
        //      })
        //  },
         //根据版本查看模型详情
         async findAllModalByVesion({commit},list){
             let response=await axios.get('/models/version/'+list.id+'?model_version='+list.model_version)
             return response
         },
         //查看模型训练状态
         async findModalstatus({commit},task_id){
             let response=await axios.get('/models/tmodels/status/'+task_id)
             return response
         }
    }
}