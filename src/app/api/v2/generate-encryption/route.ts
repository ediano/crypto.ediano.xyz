import { NextResponse } from 'next/server';

import { CryptographicV2, STRING_ENCRYPTION_SECRET_KEY } from '@/lib/cryptographic.v2';

const cryptographic = new CryptographicV2();
const maximumSize = 32;

type Body = { password: string; textToEncryption: string };

export async function POST(request: Request) {
  const body: Body = await request.json();

  if (!body.textToEncryption) {
    return NextResponse.json({ message: 'Encryption text is required!' }, { status: 400, statusText: 'Error' });
  }

  if (body.textToEncryption.length > 10000) {
    return NextResponse.json({ message: 'Maximum 10000 characters!' }, { status: 400, statusText: 'Error' });
  }

  if (body.password) {
    const password = body.password.slice(0, maximumSize);
    const newKey = (password + STRING_ENCRYPTION_SECRET_KEY).slice(0, maximumSize);

    const encrypt = cryptographic.encrypt({ value: body.textToEncryption, key: newKey });
    return NextResponse.json({ message: encrypt }, { status: 201, statusText: 'OK' });
  }

  const encrypt = cryptographic.encrypt({ value: body.textToEncryption });
  return NextResponse.json({ message: encrypt }, { status: 201, statusText: 'OK' });
}
