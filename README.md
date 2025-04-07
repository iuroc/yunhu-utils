# 云湖工具包

## 项目介绍

1. 提供云湖服务接口相关工具
2. 基于云湖服务接口进行应用开发


## 使用说明

### 安装模块

```bash
pnpm add yunhu-utils
```

### 使用模块

```typescript
import { loginByEmail, getUploadToken, uploadImage } from 'yunhu-utils'

const token = await loginByEmail('user@hello.com', '12345678')
const uploadToken = await getUploadToken(token)
const downloadURL = await uploadImage(uploadToken, 'E:/图片/test.jpg')

console.log(`图片下载地址: ${downloadURL}`)
```

### 配置 `tsconfig.json`

```json
{
    "compilerOptions": {
        "strict": true,
        "module": "NodeNext",
        "target": "ESNext",
        "moduleResolution": "nodenext",
    }
}
```