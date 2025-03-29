import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export function Home() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('home.title')} | TAT Test Online</title>
        <meta name="description" content={t('home.about.description')} />
        <link rel="canonical" href={`https://tat-test.com/${i18n.language === 'en' ? '' : i18n.language}`} />
        <meta property="og:title" content={`${t('home.title')} | TAT Test Online`} />
        <meta property="og:description" content={t('home.about.description')} />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Brain className="h-16 w-16 text-indigo-600 mx-auto" aria-hidden="true" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            {t('home.title')}
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            {t('home.subtitle')}
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* About Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('home.about.title')}</h2>
            <p className="text-gray-600 leading-relaxed">
              {t('home.about.description')}
            </p>
          </section>

          {/* How it Works Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('home.howItWorks.title')}</h2>
            <ol className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold mr-3">1</span>
                <span>{t('home.howItWorks.steps.1')}</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold mr-3">2</span>
                <span>{t('home.howItWorks.steps.2')}</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold mr-3">3</span>
                <span>{t('home.howItWorks.steps.3')}</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold mr-3">4</span>
                <span>{t('home.howItWorks.steps.4')}</span>
              </li>
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
              <div className="border-b border-gray-200 pb-6" itemScope itemType="https://schema.org/Question">
                <h3 className="text-lg font-semibold text-gray-900 mb-2" itemProp="name">
                  What is the Thematic Apperception Test (TAT)?
                </h3>
                <div itemScope itemType="https://schema.org/Answer">
                  <p className="text-gray-600" itemProp="text">
                    The TAT is a projective psychological test that reveals personality traits, emotions, and social relationships through storytelling about ambiguous images.
                  </p>
                </div>
              </div>
              <div itemScope itemType="https://schema.org/Question">
                <h3 className="text-lg font-semibold text-gray-900 mb-2" itemProp="name">
                  How does the TAT test work?
                </h3>
                <div itemScope itemType="https://schema.org/Answer">
                  <p className="text-gray-600" itemProp="text">
                    You'll be shown a series of images and asked to tell stories about them. These stories are analyzed to understand your personality, motivations, and emotional patterns.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Start Test Button */}
          <div className="text-center py-8">
            <button
              onClick={() => navigate('/test')}
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              aria-label={t('home.startButton')}
            >
              {t('home.startButton')}
              <ArrowRight className="ml-2 h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}