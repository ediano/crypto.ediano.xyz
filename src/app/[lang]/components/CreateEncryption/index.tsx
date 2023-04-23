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

const createEncryptionFormSchema = z.object({
  password: z
    .string()
    .refine((value) => value.length <= 32, { message: 'Maximum 32 characters!' })
    .optional(),
  textToEncryption: z
    .string()
    .nonempty('Encryption text is required!')
    .refine((value) => value.length <= 10000, { message: 'Maximum 10000 characters!' }),
});

type CreateEncryptionFormData = z.infer<typeof createEncryptionFormSchema>;

export function CreateEncryption({ lang }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateEncryptionFormData>({ resolver: zodResolver(createEncryptionFormSchema) });

  const translation = getDictionary(lang);
  const [error, setError] = useState('');
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
    setError('');
    setEncryptedKey('');
  };

  const onSubmit: SubmitHandler<CreateEncryptionFormData> = async (data) => {
    setError('');

    const newData = {
      password: data.password,
      textToEncryption: data.textToEncryption,
    };

    const response = await fetch('/api/v2/generate-encryption', {
      method: 'POST',
      body: JSON.stringify(newData),
    });

    const metadata = (await response.json()) as { message: string };

    if (response.status !== 201) {
      setError(metadata.message);
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
            label={`${translation('Text to encryption')}: (Max 10000)`}
            error={translation(errors.textToEncryption?.message as any)}
            {...register('textToEncryption', { required: true })}
          />

          <ButtonUseClient type="submit" className="min-w-full mx-auto">
            {translation('Encrypt')}
          </ButtonUseClient>
        </form>
      )}

      {(!!error || !!encryptedKey) && (
        <div className="flex flex-col gap-8 w-full max-w-lg mx-auto break-words">
          {!!error && <span className="w-full bg-red-300 text-black rounded p-4">{translation(error as any)}</span>}

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
