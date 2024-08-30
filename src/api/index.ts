import request from '../plugins/axios'

/**
 * 获取图片验证码
 */
export const IGetCaptcha: any = (param: any) => {
    return request.get({ url: '/api/v1/captcha', param }, async (res: any) => {
        return res.data
    })
}
