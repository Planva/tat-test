import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
  const langPrefix = '';
  
  const partnerLinks = [
    {
      name: 'Ai Manga Translate',
      url: 'https://aimangatranslate.com'
    },
    {
      name: 'Ai Timeline Maker',
      url: 'https://timeline-maker.org'
    },
    {
      name: 'PDF Translation',
      url: 'https://pdf-translation.com'
    },
    {
      name: 'Online Clipboard',
      url: 'https://onlinclipboard.com'
    },
    {
      name: 'Digital Planner',
      url: 'https://digiplanpro.com'
    },
    {
      name: 'Thumbnail Tester',
      url: 'https://www.thumbnail-tester.com'
    },
  ];

  const mainLinks = [
    { path: '/tat-test-about', label: 'About TAT' },
    { path: '/tat-test-cards', label: 'TAT Cards' },
    { path: '/tat-test-research', label: 'Research' },
    { path: '/tat-test-methodology', label: 'Methodology' },
    { path: '/tat-test-story-library', label: 'Story Library' },
    { path: '/tat-test-online', label: 'Take Test' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to={langPrefix || '/'} className="flex items-center">
                <Brain className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">TAT Test</span>
              </Link>
              <div className="hidden md:flex ml-10 space-x-8">
                {mainLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={`${langPrefix}${link.path}`}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-6" />
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                {t('footer.about.title')}
              </h3>
              <p className="text-base text-gray-500">
                {t('footer.about.description')}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Main Links
              </h3>
              <ul className="space-y-2">
                {mainLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={`${langPrefix}${link.path}`} className="text-base text-gray-500 hover:text-gray-900">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to={`${langPrefix}/tat-test-privacy`} className="text-base text-gray-500 hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to={`${langPrefix}/terms`} className="text-base text-gray-500 hover:text-gray-900">
                    Terms & Disclaimer
                  </Link>
                </li>
                <li>
                  <Link to={`${langPrefix}/editorial-standards`} className="text-base text-gray-500 hover:text-gray-900">
                    Editorial Standards
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.apa.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    APA Guidelines
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                {t('footer.partnerSites')}
              </h3>
              <ul className="space-y-2">
                {partnerLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-gray-500 hover:text-gray-900"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} <a href="https://www.tat-test.com" className="hover:text-gray-900">TAT Test</a>. {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
