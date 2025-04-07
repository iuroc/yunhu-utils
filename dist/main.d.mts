/**
 * 模拟 Windows 客户端使用邮箱登录的过程
 * @param email 登录邮箱
 * @param password 登录密码
 * @returns 登录凭证 TOKEN
 */
declare function loginByEmail(email: string, password: string): Promise<string>;
/**
 * 获取文件上传令牌
 * @param token 登录凭证
 * @returns 文件上传令牌
 */
declare function getUploadToken(token: string): Promise<string>;
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
declare function uploadImage(token: string, filePath: string): Promise<string>;

export { getUploadToken, loginByEmail, uploadImage };
