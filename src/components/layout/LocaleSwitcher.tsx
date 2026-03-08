'use client';

import {useEffect, useRef, useState} from 'react';
import {useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';

type LocaleOption = {
  code: 'en' | 'de' | 'he';
  label: string;
  flag: string;
};

const locales: LocaleOption[] = [
  {
    code: 'en',
    label: 'English',
    flag: '🇬🇧'
  },
  {
    code: 'de',
    label: 'Deutsch',
    flag: '🇩🇪'
  },
  {
    code: 'he',
    label: 'עברית',
    flag: '🇮🇱'
  }
];

export default function LocaleSwitcher() {
  const locale = useLocale() as LocaleOption['code'];
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const currentLocale =
    locales.find((item) => item.code === locale) ?? locales[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current) {
        return;
      }

      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="locale-dropdown" ref={rootRef}>
      <button
        type="button"
        className="locale-trigger"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Select language"
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <span className="locale-trigger-content">
          <span className="locale-flag" aria-hidden="true">
            {currentLocale.flag}
          </span>
          <span className="locale-label">{currentLocale.label}</span>
        </span>

        <span className={`locale-caret${isOpen ? ' is-open' : ''}`} aria-hidden="true">
          ▾
        </span>
      </button>

      {isOpen ? (
        <div className="locale-menu" role="menu" aria-label="Languages">
          {locales.map((item) => {
            const isActive = item.code === locale;

            return (
              <Link
                key={item.code}
                href={pathname}
                locale={item.code}
                role="menuitem"
                className={`locale-option${isActive ? ' is-active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="locale-flag" aria-hidden="true">
                  {item.flag}
                </span>
                <span className="locale-label">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
