import request from '../plugins/axios'

/**
 * 获取鉴权 token
 */
export const ISetToken: any = (param: object) => {
    return request.get({ url: '/api/v1/csrf', param: param }, async (res: any) => {
        localStorage.setItem('csrfToken', res.data.csrfToken)
        return res
    })
}
