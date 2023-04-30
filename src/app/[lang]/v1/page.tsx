import { Metadata } from 'next';

import { getDictionary } from '@/dictionaries';
import { getUrlLocales } from '@/lib/getUrl';
import { Locale } from '@/config/i18n.config';
import { EncryptionComponent } from './components/EncryptionComponent';

type GenerateMetadata = {
  params: { lang: Locale };
};

type Props = GenerateMetadata;

export async function generateMetadata({ params }: GenerateMetadata): Promise<Metadata> {
  const translation = getDictionary(params.lang);

  return {
    title: 'V1',
    alternates: {
      canonical: params.lang + '/v1',
      languages: getUrlLocales('/v1'),
    },
    openGraph: {
      title: 'V1',
      description: translation.description,
      url: params.lang + '/v1',
    },
  };
}

export default async function V1({ params }: Props) {
  return (
    <main className="w-full items-center max-w-7xl mx-auto py-12 px-4">
      <EncryptionComponent lang={params.lang} />
    </main>
  );
}
