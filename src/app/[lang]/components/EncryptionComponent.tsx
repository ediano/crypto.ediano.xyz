'use client';

import { useState } from 'react';
import classnames from 'classnames';

import { Locale } from '@/config/i18n.config';

import { CreateEncryption } from './CreateEncryption';
import { ReverseEncryption } from './ReverseEncryption';
import { ButtonUseClient } from '@/components/Button/ButtonUseClient';
import { getDictionary } from '@/dictionaries';

type EncryptionOptions = 'encrypt' | 'decrypt';

type Props = {
  lang: Locale;
};

export function EncryptionComponent({ lang }: Props) {
  const translation = getDictionary(lang);

  const [selectedEncryption, setSelectedEncryption] = useState<EncryptionOptions>('encrypt');

  const handleSelectedEncryptionClick = (option: EncryptionOptions) => {
    setSelectedEncryption(option);
  };

  return (
    <div
      className={classnames(
        'w-full max-w-7xl flex flex-col gap-8 px-8 py-12 rounded shadow-lg min-h-full',
        selectedEncryption === 'encrypt' && 'bg-gray-900',
        selectedEncryption === 'decrypt' && 'bg-zinc-900',
      )}
    >
      <div className="flex justify-center gap-4">
        <ButtonUseClient
          type="button"
          onClick={() => handleSelectedEncryptionClick('encrypt')}
          className={classnames(selectedEncryption === 'encrypt' && 'border-b-0', 'flex-1 bg-gray-900')}
        >
          {translation('Encrypt')}
        </ButtonUseClient>

        <ButtonUseClient
          type="button"
          onClick={() => handleSelectedEncryptionClick('decrypt')}
          className={classnames(selectedEncryption === 'decrypt' && 'border-b-0', 'flex-1 bg-zinc-900')}
        >
          {translation('Decrypt')}
        </ButtonUseClient>
      </div>

      {selectedEncryption === 'encrypt' && <CreateEncryption lang={lang} />}

      {selectedEncryption === 'decrypt' && <ReverseEncryption lang={lang} />}
    </div>
  );
}
