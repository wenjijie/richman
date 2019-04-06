import axios from 'axios'
import { Message, Notification } from 'element-ui'
// import store from '../store'
import router from '../router'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 30000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (localStorage.richman_token) {
      config.headers['token'] = localStorage.richman_token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.errno !== 1000 && res.status !== 0 && res.status !== 200) {
      // Message({
      //   message: res.errmsg,
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 1010:token缺失; 1012:查无此token;  1014:token不匹配;
      if (res.errno === 1010 || res.errno === 1012 || res.errno === 1014) {
        Notification({
          title: '登录认证',
          message: '你已被登出，请重新登录'
        })
        router.push({ path: '/login' })
        return Promise.reject('登录认证失败')
      }
      return response.data
    } else {
      return response.data
    }
  },
  error => {
    console.log('err:' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
