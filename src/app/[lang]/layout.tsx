import '../../styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  params: { lang: any };
  children: React.ReactNode;
};

const locales = ['en-US', 'pt-BR'];
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function RootLayout({ params, children }: Props) {
  return (
    <html lang={params.lang} className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
