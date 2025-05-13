import fs from 'fs';
import crypto from 'crypto';

export function signMessage(message, privateKeyPath) {
  const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(message);
  return sign.sign(privateKey, 'base64');
}

export function verifySignature(message, signature, publicKeyPath) {
  const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
  const verify = crypto.createVerify('RSA-SHA256');
  verify.update(message);
  return verify.verify(publicKey, signature, 'base64');
}
