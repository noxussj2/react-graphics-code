import axios from 'axios'

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
            const param = option.param

            axios({
                method,
                url: option.url,
                params: method === 'get' ? param : {},
                data: method === 'post' ? param : {},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;',
                    ...option.headers
                },
                withCredentials: true, // 携带cookie
                timeout: 30000
            }).then((res) => {
                resolve(fn(res.data))
            })
        } else {
            resolve(fn(null))
        }
    })
}

export default {
    get: (option: any, fn: Function = (x: any) => x) => request('get', option, fn),
    post: (option: any, fn: Function = (x: any) => x) => request('post', option, fn),
    put: (option: any, fn: Function = (x: any) => x) => request('put', option, fn)
}
