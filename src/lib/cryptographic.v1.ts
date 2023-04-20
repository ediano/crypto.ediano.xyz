import * as crypto from 'crypto';

const STRING_ENCRYPTION_SECRET_KEY = process.env.STRING_ENCRYPTION_SECRET_KEY || '';

const config = {
  secretKey: STRING_ENCRYPTION_SECRET_KEY,
  algorithm: 'aes-256-cbc',
  splitCode: '|',
};

type Encrypt = {
  value: string;
  randomBytes?: number;
  key?: string;
};

type Decrypt = {
  value: string;
  key?: string;
};

export class CryptographicV1 {
  private key = Buffer.from(config.secretKey);

  private getBufferHex(value: string) {
    return Buffer.from(value, 'hex');
  }

  encrypt({ value, randomBytes = 16, key }: Encrypt) {
    const iv = Buffer.from(crypto.randomBytes(randomBytes));
    const cipher = crypto.createCipheriv(config.algorithm, key || this.key, iv);
    const encrypted = cipher.update(value.trim());

    const result = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + config.splitCode + result.toString('hex');
  }

  decrypt({ value, key }: Decrypt) {
    const [iv, encrypted] = value.split(config.splitCode);
    const ivBuffer = this.getBufferHex(iv);
    const encryptedBuffer = this.getBufferHex(encrypted);

    const decipher = crypto.createDecipheriv(config.algorithm, key || this.key, ivBuffer);
    const decrypted = decipher.update(encryptedBuffer);

    const result = Buffer.concat([decrypted, decipher.final()]);
    return result.toString();
  }
}
