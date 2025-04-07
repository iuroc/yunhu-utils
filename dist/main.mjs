import { v3, v4 } from 'uuid';
import { createReadStream } from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { extname } from 'path';

const originURL = "https://chat-go.jwzhd.com";

async function loginByEmail(email, password) {
  const response = await fetch(`${originURL}/v1/user/email-login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      deviceId: v3(Math.random().toString(), v3.URL),
      platform: "windows"
    })
  }).then((res) => res.json());
  return response.data.token;
}
async function getUploadToken(token) {
  const response = await fetch(`${originURL}/v1/misc/qiniu-token`, {
    headers: { token }
  }).then((res) => res.json());
  return response.data.token;
}
async function uploadImage(token, filePath) {
  const body = new FormData();
  body.append("token", token);
  body.append("file", createReadStream(filePath));
  body.append("key", v4() + extname(filePath));
  const response = await fetch(`https://upload-z2.qiniup.com/`, {
    method: "POST",
    body,
    headers: body.getHeaders()
  }).then((res) => res.json());
  if (response.error) throw new Error(response.error);
  return `https://chat-img.jwznb.com/${response.key}`;
}

export { getUploadToken, loginByEmail, uploadImage };
//# sourceMappingURL=main.mjs.map
