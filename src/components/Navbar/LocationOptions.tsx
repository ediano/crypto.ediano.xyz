'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Locale } from '@/config/i18n.config';
import { flag, locales } from './locales';

type Props = { lang: Locale };

export function LocationOptions({ lang }: Props) {
  const pathname = usePathname();

  const getHrefLink = (path: string, lng: string) => {
    const name = path.split('/' + lang).join('');
    return '/' + lng + name;
  };

  return (
    <>
      {locales.map((lng) => {
        if (lang === lng.code) return null;

        return (
          <li key={lng.code} className="flex items-center border-t first:border-none h-11">
            <Link replace href={getHrefLink(pathname, lng.code)} locale={lng.code} className="flex items-center p-2">
              {flag[lng.code]}
            </Link>
          </li>
        );
      })}
    </>
  );
}
