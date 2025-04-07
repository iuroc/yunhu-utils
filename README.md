# 云湖工具包

## 项目介绍

1. 提供云湖服务接口相关工具
2. 基于云湖服务接口进行应用开发


## 使用说明

```bash
pnpm add yunhu-utils
```

```typescript
import { loginByEmail, getUploadToken, uploadImage } from 'yunhu-utils'

const token = await loginByEmail('user@hello.com', '12345678')
const uploadToken = await getUploadToken(token)
const downloadURL = await uploadImage(uploadToken, 'E:/视频/Video.mp4')

console.log(`图片下载地址: ${downloadURL}`)
```