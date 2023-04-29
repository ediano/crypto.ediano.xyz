'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Copy } from 'phosphor-react';
import { zodResolver } from '@hookform/resolvers/zod';
import classnames from 'classnames';
import { z } from 'zod';

import { getDictionary } from '@/dictionaries';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Locale } from '@/config/i18n.config';
import { ButtonUseClient } from '@/components/Button/ButtonUseClient';

type Props = {
  lang: Locale;
};

const reverseEncryptionFormSchema = z.object({
  password: z
    .string()
    .refine((value) => value.length <= 32, { message: 'Maximum 32 characters!' })
    .optional(),
  encryptedText: z.string().nonempty('Encrypted text is required!'),
});

type ReverseEncryptionFormData = z.infer<typeof reverseEncryptionFormSchema>;

type ResponseFetch = { message: string; description?: string };

export function ReverseEncryption({ lang }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReverseEncryptionFormData>({ resolver: zodResolver(reverseEncryptionFormSchema) });

  const translation = getDictionary(lang);
  const [error, setError] = useState<ResponseFetch>({} as ResponseFetch);
  const [encryptedKey, setEncryptedKey] = useState('');
  const [copiedText, setCopiedText] = useState(false);

  const handleCopyTextClick = (value: string) => {
    setCopiedText(true);

    navigator.clipboard.writeText(value);

    setTimeout(() => {
      setCopiedText(false);
    }, 1000);
  };

  const handleNewEncryptedKeyClick = () => {
    reset();
    setCopiedText(false);
    setError({} as ResponseFetch);
    setEncryptedKey('');
  };

  const onSubmit: SubmitHandler<ReverseEncryptionFormData> = async (data) => {
    setError({} as ResponseFetch);

    const newData = {
      password: data.password,
      encryptedText: data.encryptedText,
    };

    const response = await fetch('/api/v2/reverse-encryption', {
      method: 'POST',
      body: JSON.stringify(newData),
    });

    const metadata = (await response.json()) as ResponseFetch;

    if (response.status !== 201) {
      setError(metadata);
      return;
    }

    setEncryptedKey(metadata.message);
  };

  return (
    <div className="w-full flex flex-col gap-12">
      {!encryptedKey && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full max-w-lg mx-auto">
          <Input
            lang={lang}
            type="password"
            maxLength={100}
            label={`${translation('Password')}: (${translation('Optional')}, Max 32)`}
            error={translation(errors.password?.message as any)}
            {...register('password', { maxLength: 100 })}
          />

          <Textarea
            lang={lang}
            label={translation('Encrypted text')}
            error={translation(errors.encryptedText?.message as any)}
            {...register('encryptedText', { required: true })}
          />

          <ButtonUseClient type="submit" color="info">
            {translation('Decrypt')}
          </ButtonUseClient>
        </form>
      )}

      {(!!error.message || !!encryptedKey) && (
        <div className="flex flex-col gap-8 w-full max-w-lg mx-auto break-words">
          {!!error.message && (
            <div className="w-full bg-red-300 text-black rounded p-4 flex flex-col gap-4">
              <span>{translation(error.message as any)}</span>

              {!!error.description && <span>{translation(error.description as any)}</span>}
            </div>
          )}

          {!!encryptedKey && (
            <div className="w-full flex flex-col gap-4">
              <div>{translation('Your encrypted key')}:</div>

              <div className="w-full bg-green-300 text-black rounded p-4 flex flex-col gap-4">
                <div className="w-full font-bold border-b border-white border-opacity-50 pb-4">{encryptedKey}</div>

                <div className="flex gap-4 justify-around h-12">
                  <button
                    type="button"
                    onClick={() => handleCopyTextClick(encryptedKey)}
                    className={classnames(
                      'h-full flex items-center gap-2 bg-zinc-600 hover:bg-zinc-800 rounded py-2 px-6 text-white',
                      copiedText && 'text-green-300',
                    )}
                  >
                    {translation('Copy')} <Copy size={22} className={classnames(copiedText && 'animate-bounce')} />
                  </button>

                  <button
                    type="button"
                    onClick={handleNewEncryptedKeyClick}
                    className={classnames(
                      'h-full flex items-center gap-2 bg-white hover:bg-zinc-200 rounded py-2 px-6 text-black',
                    )}
                  >
                    {translation('New')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
