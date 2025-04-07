import { originURL } from './mixin.js'
import { v3, v4 } from 'uuid'
import { createReadStream } from 'fs'
import FormData from 'form-data'
import fetch from 'node-fetch'
import { extname } from 'path'

/**
 * 模拟 Windows 客户端使用邮箱登录的过程
 * @param email 登录邮箱
 * @param password 登录密码
 * @returns 登录凭证 TOKEN
 */
export async function loginByEmail(email: string, password: string) {
    const response = await fetch(`${originURL}/v1/user/email-login`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            deviceId: v3(Math.random().toString(), v3.URL),
            platform: 'windows'
        })
    }).then(res => res.json()) as { data: { token: string } }
    return response.data.token
}

/**
 * 获取文件上传令牌
 * @param token 登录凭证
 * @returns 文件上传令牌
 */
export async function getUploadToken(token: string) {
    const response = await fetch(`${originURL}/v1/misc/qiniu-token`, {
        headers: { token }
    }).then(res => res.json()) as { data: { token: string } }
    return response.data.token
}

/**
 * 上传图片
 * ```
 * // 使用示例
 * const token = await loginByEmail('user@hello.com', '12345678')
 * const uploadToken = await getUploadToken(token)
 * const downloadURL = await uploadImage(uploadToken, 'E:/视频/Video.mp4')
 * ```
 * @param token 通过 {@link getUploadToken} 获取的上传令牌
 * @param filePath 需要上传的文件路径
 * @returns 文件下载地址，需要配置 `Referer: https://www.yhchat.com/` 访问。
 */
export async function uploadImage(token: string, filePath: string) {
    const body = new FormData()
    body.append('token', token)
    body.append('file', createReadStream(filePath))
    body.append('key', v4() + extname(filePath))
    const response = await fetch(`https://upload-z2.qiniup.com/`, {
        method: 'POST',
        body,
        headers: body.getHeaders()
    }).then(res => res.json()) as {
        key: string
        hash: string
        fsize: number
        error?: string
    }
    if (response.error) throw new Error(response.error)
    return `https://chat-img.jwznb.com/${response.key}`
}