import request from '../plugins/axios'

/**
 * 获取拼图验证码
 */
export const IGetCaptcha: any = (param: any) => {
    return request.get({ url: '/api/v1/captcha', param }, async (res: any) => {
        return res.data
    })
}

/**
 * 校验拼图验证码
 */
export const IValidateCaptcha: any = (param: any) => {
    return request.post({ url: '/api/v1/captcha', param }, async (res: any) => {
        return res
    })
}
