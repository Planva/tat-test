import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  { code: 'fr', name: 'Français', flag: '🇨🇦' }
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="h-5 w-5" />
        <span className="hidden md:inline">
          {languages.find(lang => lang.code === i18n.language)?.name || 'Language'}
        </span>
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1">
            {languages.map((language) => {
              const isActive = i18n.language === language.code;
              return (
                <button
                  key={language.code}
                  onClick={() => {
                    if (language.code !== i18n.language) {
                      const strippedPath = (() => {
                        const { pathname } = location;
                        for (const lang of languages) {
                          if (lang.code === 'en') continue;
                          if (pathname === `/${lang.code}`) {
                            return '/';
                          }
                          if (pathname.startsWith(`/${lang.code}/`)) {
                            return pathname.replace(`/${lang.code}`, '') || '/';
                          }
                        }
                        return pathname || '/';
                      })();

                      const { search, hash } = location;
                      let targetPath =
                        language.code === 'en'
                          ? strippedPath
                          : strippedPath === '/'
                            ? `/${language.code}`
                            : `/${language.code}${strippedPath.startsWith('/') ? strippedPath : `/${strippedPath}`}`;

                      if (!targetPath.startsWith('/')) {
                        targetPath = `/${targetPath}`;
                      }

                      i18n.changeLanguage(language.code);
                      navigate(`${targetPath}${search}${hash}`, { replace: true });
                    }
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } hover:bg-gray-100 flex items-center space-x-2 transition-colors`}
                  role="menuitem"
                >
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
