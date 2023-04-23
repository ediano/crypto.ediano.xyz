import { NextResponse } from 'next/server';

import { CryptographicV2, STRING_ENCRYPTION_SECRET_KEY } from '@/lib/cryptographic.v2';

const cryptographic = new CryptographicV2();
const maximumSize = 32;

type Body = { password: string; encryptedText: string };

export async function POST(request: Request) {
  try {
    const body: Body = await request.json();

    if (!body.encryptedText) {
      return NextResponse.json({ message: 'Encrypted text is required!' }, { status: 400, statusText: 'Error' });
    }

    if (body.password) {
      const password = body.password.slice(0, maximumSize);
      const newKey = (password + STRING_ENCRYPTION_SECRET_KEY).slice(0, maximumSize);

      const decrypt = cryptographic.decrypt({ value: body.encryptedText, key: newKey });
      return NextResponse.json({ message: decrypt }, { status: 201, statusText: 'OK' });
    }

    const decrypt = cryptographic.decrypt({ value: body.encryptedText });
    return NextResponse.json({ message: decrypt }, { status: 201, statusText: 'OK' });
  } catch (err) {
    return NextResponse.json(
      { message: 'Decryption failed!', description: 'Check the entered password or encrypted text!' },
      { status: 400, statusText: 'Error' },
    );
  }
}
