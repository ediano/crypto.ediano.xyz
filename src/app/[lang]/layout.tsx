import '../../styles/globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';

import { i18n, Locale } from '@/config/i18n.config';
import { getDictionary } from '@/dictionaries';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  params: { lang: Locale };
  children: React.ReactNode;
};

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

type GenerateMetadata = {
  params: { lang: Locale };
};

export async function generateMetadata({ params }: GenerateMetadata): Promise<Metadata> {
  const translation = getDictionary(params.lang);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URI!),
    title: {
      default: translation('title'),
      template: `%s | ${translation('title')}`,
    },
    openGraph: {
      title: {
        default: translation('title'),
        template: `%s | ${translation('title')}`,
      },
    },
  };
}

export default function RootLayout({ params, children }: Props) {
  return (
    <html lang={params.lang} className={inter.className}>
      <body>
        {/* @ts-expect-error Async Server Component */}
        <Header lang={params.lang} />

        {children}
      </body>
    </html>
  );
}
