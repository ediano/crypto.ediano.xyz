'use client';

import Link from 'next/link';
import { usePathname, useParams, useSearchParams, useRouter } from 'next/navigation';

import { Locale } from '@/config/i18n.config';
import { getDictionary } from '@/dictionaries';
import { CaretDownIco } from './Icons';
import { listPages } from './listPages';

type Props = { lang: Locale };

export function ListPages({ lang }: Props) {
  const translation = getDictionary(lang);

  const pathname = usePathname();
  const version = pathname.split('/')[pathname.split('/').length - 1];

  return (
    <li className="relative flex flex-col w-[120px]">
      <button
        id="menu-versions"
        className="peer/menu-versions h-[42px] flex items-center p-2 gap-2 border rounded-lg shadow-lg"
      >
        <span>{translation.Version}</span>
        <CaretDownIco size={18} />
        <span>{version === lang || !version ? 'v2' : version}</span>
      </button>

      <ul className="hidden absolute z-[4096] right-0 origin-top-right w-full top-10 peer-hover/menu-versions:flex hover:flex flex-col items-center border rounded-lg px-2 shadow-xl">
        {listPages.map((page) => {
          return (
            <li key={page.url} className="flex items-center border-t first:border-none h-11">
              <Link replace href={page.url} locale={lang} className="flex items-center p-2">
                {page.name.includes(page.version) ? page.name : page.name + ' ' + page.version}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
