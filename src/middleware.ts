import createMiddleware from 'next-intl/middleware';

import { i18n } from '@/config/i18n.config';

export default createMiddleware({
  locales: i18n.locales as unknown as string[],
  defaultLocale: i18n.defaultLocale,
  localeDetection: true,
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
