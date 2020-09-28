import axios from 'axios';
import router from '@/router'

axios.defaults.baseURL = 'http://172.16.0.43:8008'
if(localStorage.getItem('token')){
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
}

axios.interceptors.response.use(response => Promise.resolve(response),
  error => { // 这里对 error 预期结果是包含具体错误信息和状态码
    // if (error && error.response && error.response.status) {
		if (error.response.status === 401) {
		    console.log('token失效，请重新登录');
		    router.push({path:'/login'})
		  }
    // }
  })


export default axios;