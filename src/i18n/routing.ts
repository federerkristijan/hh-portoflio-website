import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'he'],
  defaultLocale: 'en',
  localePrefix: 'always'
});
