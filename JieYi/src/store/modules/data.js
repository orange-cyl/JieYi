import axios from '../../http/axios'
export default {
    namespaced: true,
    state: {
        data: [],
        sort: [],
        images: [],
    },
    mutations: {
        //设置DATA
        SET_DATA(state, data) {
            state.data = data
        },
        //设置SORT
        SET_SORT(state, sort) {
            console.log(sort.classifys)
            state.sort = sort
        },
        //设置PICTURE
        set_Image(state, images) {
            let arr = []
            state.total = images.count
            images.result.forEach((item, index) => {
                let imageName = item.name.split('.')[1]
                let image = item.name.split('|')[3]
                let a = 'data:image/' + imageName + ';base64,' + item.image
                let b = {
                    image_src: a,
                    image_name: image
                }
                arr.push(b)
            })
            state.images = arr;
        },
        // 设置部位
        setPart(state, data) {
            state.part = data;
            console.log(state.part)
        },
    },
    actions: {
        //查询所有数据
        async findAllData(context, params) {
            let res = await axios.get('/datasets/', { params })
            // console.log('数据集',res.data)
            context.commit('SET_DATA', res.data.results)
        },
        //根据id查询数据集分类
        async findAllSort(context, params) {
            let res = await axios.get('/datasets/' + params)
            // console.log(res.data.results)
            context.commit('SET_SORT', res.data.results)
        },
        //根据id查询数据集图片详情
        async findAllPicture(context, params) {
            let dataId = params.dataset_id
            let classId = params.tag_id
            let res = await axios.get('/datasets/' + dataId + '/tags' + classId + '?page=' + params.page + '&page_size=' + params.page_size)
            console.log('图片详情', res.data.results)
            context.commit('set_Image', res.data.results)
        },
        // 加载部位
        async  loadPart(context, params) {
            let res = await axios.get('/datasets/parts')
            context.commit('setPart', res.data.results)
        },
        // 删除数据集
        async delData(context, params) {
            let res = await axios.delete('/datasets/' + params)
        },
    }
}