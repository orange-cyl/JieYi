import axioss from 'axios';
import qs from 'qs'
import {getToken} from '../utils/auth'


axioss.defaults.baseURL = 'http://172.16.0.43:8008'
axioss.defaults.headers.common['Authorization'] = getToken()
axioss.defaults.headers.post['Content-Type']='multipart/form-data'
// axios.interceptors.request.use((config)=>{
	// if(config.method == 'post'){
	// 	config.data = qs.stringify(config.data,{arrayFormat:'repeat'});
	// }
	// return config;
// })

export default axioss;