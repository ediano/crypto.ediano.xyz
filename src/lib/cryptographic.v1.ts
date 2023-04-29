import * as crypto from 'crypto';

const STRING_ENCRYPTION_SECRET_KEY = process.env.STRING_ENCRYPTION_SECRET_KEY || '';

const config = {
  secretKey: STRING_ENCRYPTION_SECRET_KEY.split('-').join(''),
  algorithm: 'aes-256-cbc',
  splitCode: '.',
};

export class CryptographicV1 {
  private key = Buffer.from(config.secretKey);
  private randomBytes = 16;

  private getBufferHex(value: string) {
    return Buffer.from(value, 'hex');
  }

  encrypt(value: string) {
    const iv = Buffer.from(crypto.randomBytes(this.randomBytes));
    const cipher = crypto.createCipheriv(config.algorithm, this.key, iv);
    const encrypted = cipher.update(value.trim());

    const result = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + config.splitCode + result.toString('hex');
  }

  decrypt(value: string) {
    const [iv, encrypted] = value.split(config.splitCode);
    const ivBuffer = this.getBufferHex(iv);
    const encryptedBuffer = this.getBufferHex(encrypted);

    const decipher = crypto.createDecipheriv(config.algorithm, this.key, ivBuffer);
    const decrypted = decipher.update(encryptedBuffer);

    const result = Buffer.concat([decrypted, decipher.final()]);
    return result.toString();
  }
}
