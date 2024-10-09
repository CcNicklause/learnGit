import axios from 'axios'
import { message } from './AntdGlobal'
import storage from './storage'
import { Result } from '@/types/api'

// 创建实例
const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  // 允许跨域
  withCredentials: true,
  headers: {
    icode: 'A527DED224AEC8D6'
  }
})

// 添加请求拦截器
/* axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
}); */

// 添加响应拦截器
/* axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
}); */

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    if (import.meta.env.VITE_MOCK === true) {
      config.baseURL = import.meta.env.VITE_MOCK_API
    } else {
      config.baseURL = import.meta.env.VITE_BASE_API
    }
    return { ...config }
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    // 根据后端接口状态码
    if (data.code === 500001) {
      message.error(data.msg)
      storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    } else if (data.code != 0) {
      message.error(data.msg)
      return Promise.reject(data)
    }
    return data.data
  },
  error => {
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

export default {
  get<T>(url: string, params?: object): Promise<T> {
    return instance.get(url, { params })
  },
  post<T>(url: string, params?: object): Promise<T> {
    return instance.post(url, params)
  }
}
