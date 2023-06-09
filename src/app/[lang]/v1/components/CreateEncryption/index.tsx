'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Copy } from 'phosphor-react';
import { zodResolver } from '@hookform/resolvers/zod';
import classnames from 'classnames';
import { z } from 'zod';

import { DictionaryKey, getDictionary } from '@/dictionaries';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Locale } from '@/config/i18n.config';
import { ButtonUseClient } from '@/components/Button/ButtonUseClient';

type Props = {
  lang: Locale;
};

const createEncryptionFormSchema = z.object({
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
      textToEncryption: data.textToEncryption,
    };

    const response = await fetch('/api/v1/generate-encryption', {
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
          <Textarea
            lang={lang}
            label={`${translation['Text to encryption']}: (Max 10000)`}
            error={translation[errors.textToEncryption?.message as DictionaryKey]}
            {...register('textToEncryption', { required: true })}
          />

          <ButtonUseClient type="submit" color="success">
            {translation.Encrypt}
          </ButtonUseClient>
        </form>
      )}

      {(!!error || !!encryptedKey) && (
        <div className="flex flex-col gap-8 w-full max-w-lg mx-auto break-words">
          {!!error && (
            <span className="w-full bg-red-300 text-black rounded p-4">{translation[error as DictionaryKey]}</span>
          )}

          {!!encryptedKey && (
            <div className="w-full flex flex-col gap-4">
              <div>{translation['Your key!']}:</div>

              <div className="w-full bg-green-600 text-white rounded p-4 flex flex-col gap-4">
                <div className="w-full font-bold border-b border-white border-opacity-50 pb-4">{encryptedKey}</div>

                <div className="flex gap-4 justify-around h-12">
                  <ButtonUseClient
                    type="button"
                    onClick={() => handleCopyTextClick(encryptedKey)}
                    color="white"
                    className={classnames(copiedText && 'text-green-600')}
                  >
                    {translation.Copy} <Copy size={22} className={classnames(copiedText && 'animate-bounce')} />
                  </ButtonUseClient>

                  <ButtonUseClient type="button" onClick={handleNewEncryptedKeyClick} color="white">
                    {translation.New}
                  </ButtonUseClient>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
