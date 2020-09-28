import axios from '@/http/axios'

export default {
    namespaced:true,
    state:{
        userName:localStorage.getItem('userName')
    },
    getters:{
        
    },
    mutations:{
     
    },
    actions:{
      // 登录
      async login(context,params){
        let res = await axios.post('/logins/phone_login',params)
        // console.log(res,'===========')
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('userName',res.data.username)
        let arr = res.data.user_group_permissions.filter((item)=>{
              return item.group_name == '建模工程师'
        })
        if(arr.length != 0){
          localStorage.setItem('isManager',true)

        }else{
          localStorage.setItem('isManager',false)

        }
        // console.log(localStorage.getItem('token'))
      },
     // 获取验证码
      async toGetCode(context,params){
        let res = await axios.post('/logins/send_phone_code',params) 
      }
    }
}

