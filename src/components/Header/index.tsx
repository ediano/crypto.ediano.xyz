import { Locale } from '@/config/i18n.config';
import { Navbar } from '../Navbar';

type Props = { lang: Locale };

export async function Header({ lang }: Props) {
  return (
    <header>
      {/* @ts-expect-error Async Server Component */}
      <Navbar lang={lang} />
    </header>
  );
}
