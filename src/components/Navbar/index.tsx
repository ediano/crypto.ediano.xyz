import Link from 'next/link';

import { Locale } from '@/config/i18n.config';
import { getDictionary } from '@/dictionaries';
import { GithubIco, CaretDownIco } from './Icons';
import { flag } from './locales';
import { LocationOptions } from './LocationOptions';
import { socialLinks } from './socialLinks';
import { ListPages } from './ListPages';

type Props = { lang: Locale };

export async function Navbar({ lang }: Props) {
  const translation = getDictionary(lang);

  return (
    <nav className="bg-gray-900 border-gray-700 p-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" locale={lang} className="flex items-center gap-2">
          <span className="text-2xl font-semibold whitespace-nowrap text-white"> {translation!.title}</span>
        </Link>

        <ul className="flex flex-row gap-6 items-center text-sm font-medium">
          {socialLinks.map((socialLink) => {
            return (
              <li key={socialLink.url} className="border border-transparent hover:border-gray-300 rounded-lg">
                <Link
                  href="https://github.com/ediano/crypto.ediano.xyz"
                  className="w-11 h-11 flex items-center justify-center"
                  target="_blank"
                  rel="noreferrer noopener"
                  title={socialLink.name}
                >
                  <GithubIco size={28} />
                </Link>
              </li>
            );
          })}

          <ListPages lang={lang} />

          <li className="relative flex flex-col">
            <button
              id="menu-locales"
              className="peer/menu-locales h-[42px] flex items-center p-2 gap-2 border rounded-lg shadow-lg"
            >
              <span>{flag[lang]}</span>
              <CaretDownIco size={18} />
            </button>

            <ul className="hidden absolute z-[4096] right-0 origin-top-right w-full bg-white top-10 peer-hover/menu-locales:flex hover:flex flex-col items-center border rounded-lg px-2 shadow-xl">
              <LocationOptions lang={lang} />
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
