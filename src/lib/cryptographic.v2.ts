import * as crypto from 'crypto';

export const STRING_ENCRYPTION_SECRET_KEY = process.env.STRING_ENCRYPTION_SECRET_KEY || '';

const config = {
  secretKey: STRING_ENCRYPTION_SECRET_KEY.split('-').join(''),
  algorithm: 'aes-256-cbc',
  splitCode: '.',
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

export class CryptographicV2 {
  private key = Buffer.from(config.secretKey);
  private randomBytes = 16;

  private getBufferHex(value: string) {
    return Buffer.from(value, 'hex');
  }

  private newBufferFrom(key: string) {
    return Buffer.from(key);
  }

  encrypt({ value, key }: Encrypt) {
    const iv = Buffer.from(crypto.randomBytes(this.randomBytes));

    const newKey = !!key ? this.newBufferFrom(key) : this.key;

    const cipher = crypto.createCipheriv(config.algorithm, newKey, iv);
    const encrypted = cipher.update(value.trim());

    const result = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + config.splitCode + result.toString('hex');
  }

  decrypt({ value, key }: Decrypt) {
    const [iv, encrypted] = value.split(config.splitCode);
    const ivBuffer = this.getBufferHex(iv);
    const encryptedBuffer = this.getBufferHex(encrypted);

    const newKey = !!key ? this.newBufferFrom(key) : this.key;

    const decipher = crypto.createDecipheriv(config.algorithm, newKey, ivBuffer);
    const decrypted = decipher.update(encryptedBuffer);

    const result = Buffer.concat([decrypted, decipher.final()]);
    return result.toString();
  }
}
