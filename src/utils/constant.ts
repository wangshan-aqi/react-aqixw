// http://web.chacuo.net/netrsakeypair
// 在线生成非对称加密公钥私钥对、在线生成公私钥对、RSA Key pair create、生成RSA密钥对
import { enc, AES } from "crypto-js";
const secretKey = "123456";
// 加密函数
export function encryptedText(plaintext: string): string {
  return AES.encrypt(plaintext, secretKey).toString();
}

// 解密函数
export function decryptedText(encryptedText: string): string {
  return AES.decrypt(encryptedText, secretKey).toString(enc.Utf8);
}
