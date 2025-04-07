import { getUploadToken, loginByEmail, uploadImage } from '../src/main.js'

const token = await loginByEmail('m@iuroc.com', 'MyApee@2002')
const uploadToken = await getUploadToken(token)
const result = await uploadImage(uploadToken, 'E:\\视频工程\\游戏录屏\\Poolians\\Video_2025-03-02_214349.mp4')
console.log(result)