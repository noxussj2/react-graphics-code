import axios from 'axios'
import { url as _url } from 'config/api'

/**
 * 请求拦截器
 */
axios.interceptors.request.use((config: any) => {
    return config
})

/**
 * 响应拦截器
 */
axios.interceptors.response.use((response: any) => {
    return response
})

/**
 * 接口请求方法
 */
const request = (method: string, option: any, fn: Function = (x: any) => x) => {
    return new Promise((resolve) => {
        if (option.url) {
            if (typeof window !== 'undefined') {
                option.param = option.param || {}

                axios({
                    method: method,
                    url: _url + option.url,
                    params: method === 'get' ? option.param : {},
                    data: method === 'post' ? option.param : {},
                    headers: {
                        ...{
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'x-csrf-token': localStorage.getItem('csrfToken') || ''
                        },
                        ...(option.headers || {})
                    },
                    withCredentials: false, // 携带cookie
                    timeout: 60000,
                    responseType: option.responseType || ''
                })
                    .then((res: any) => {
                        resolve(fn(res.data))
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }
        } else {
            resolve(fn(false))
        }
    })
}

export default {
    get: (option: any, fn: Function = (x: any) => x) => request('get', option, fn),
    post: (option: any, fn: Function = (x: any) => x) => request('post', option, fn),
    put: (option: any, fn: Function = (x: any) => x) => request('put', option, fn)
}
