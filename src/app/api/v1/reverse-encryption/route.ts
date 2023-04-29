import { NextResponse } from 'next/server';

import { CryptographicV1 } from '@/lib/cryptographic.v1';

const cryptographic = new CryptographicV1();

type Body = { encryptedText: string };

export async function POST(request: Request) {
  try {
    const body: Body = await request.json();

    if (!body.encryptedText) {
      return NextResponse.json({ message: 'Encrypted text is required!' }, { status: 400, statusText: 'Error' });
    }

    const decrypt = cryptographic.decrypt(body.encryptedText);
    return NextResponse.json({ message: decrypt }, { status: 201, statusText: 'OK' });
  } catch (err) {
    return NextResponse.json({ message: 'Decryption failed!' }, { status: 400, statusText: 'Error' });
  }
}
