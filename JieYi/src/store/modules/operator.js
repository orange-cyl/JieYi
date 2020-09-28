import axios from '../../http/axios'
export default {
    namespaced: true,
    state: {
        operator: [],
        part: [],
        options: [],
        url: [],
        part_url: [],
    },
    mutations: {
        //设置operator
        SET_OPERATOR(state, operator) {
            state.operator = operator
        },
        //part
        SET_PART(state, part) {
            state.part = part;
            state.part_url = part[0].operator_url;
        },
        //options
        SET_OPTIONS(state, options) {
            state.options = options
        },
        //options
        SET_URL(state, url) {
            state.url = url
        }
    },
    actions: {
        //查询所有算子
        async findAllOperator(context, params) {
            let res = await axios.get('/operators/', { params })
            // console.log("算子",res)
            context.commit('SET_OPERATOR', res.data)
        },
        //查询下拉列表算子类型
        async findAllType(context) {
            let res = await axios.get('/operators/categories')
            // console.log("算子列表",res.data)
            context.commit('SET_OPTIONS', res.data.results)
        },
        //根据id查询算子
        async findOperatorById(context, params) {
            let res = await axios.get('/operators/' + params)
            // console.log("算子预览",res)
            context.commit('SET_PART', res.data.results)
        },
        //根据id删除算子
        async deleteOperatorById(context, id) {
            let res = await axios.delete('/operators/' + id)
            context.dispatch('findAllOperator')
            // console.log("删除成功")
        },
        //新增算子
        async setOperator(context, params) {
            let res = await axios.post('/operators/', params)
            context.dispatch('findAllOperator')
            // console.log("新增成功")
        },
    }
}