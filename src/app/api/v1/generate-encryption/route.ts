import { NextResponse } from 'next/server';

import { CryptographicV1 } from '@/lib/cryptographic.v1';

const cryptographic = new CryptographicV1();

type Body = { textToEncryption: string };

export async function POST(request: Request) {
  const body: Body = await request.json();

  if (!body.textToEncryption) {
    return NextResponse.json({ message: 'Encryption text is required!' }, { status: 400, statusText: 'Error' });
  }

  if (body.textToEncryption.length > 10000) {
    return NextResponse.json({ message: 'Maximum 10000 characters!' }, { status: 400, statusText: 'Error' });
  }

  const encrypt = cryptographic.encrypt(body.textToEncryption);
  return NextResponse.json({ message: encrypt }, { status: 201, statusText: 'OK' });
}
