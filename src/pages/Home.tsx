import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';

export function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // FAQ Schema Data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Thematic Apperception Test (TAT)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The TAT is a projective psychological test that reveals personality traits, emotions, and social relationships through storytelling about ambiguous images."
        }
      },
      {
        "@type": "Question",
        "name": "How does the TAT test work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You'll be shown a series of images and asked to tell stories about them. These stories are analyzed to understand your personality, motivations, and emotional patterns."
        }
      }
    ]
  };

  const seoTitle = 'TAT Test Cards | Thematic Apperception Assessment';
  const seoDescription = 'Explore TAT cards, complete the guided storytelling practice, and get instant language insights on achievement, affiliation, power, and emotional tone.';

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: seoTitle,
    description: seoDescription,
    url: 'https://www.tat-test.com/',
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'TAT Test Online',
      url: 'https://www.tat-test.com/'
    }
  };

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        structuredData={[webPageSchema, faqSchema]}
      />

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

          {/* Value Proposition */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Receive</h2>
            <p className="text-gray-600 mb-4">
              Each story you submit is analysed with a transparent scoring model derived from McClelland’s motivational theory.
              Your downloadable PDF includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>A summary of achievement, affiliation, and power themes present in your writing.</li>
              <li>Emotional tone indicators that distinguish positive and negative language, plus suggestions for reflection.</li>
              <li>Guidance on how to bring your results to a counsellor, coach, or therapist for a deeper discussion.</li>
            </ul>
          </section>

          {/* Responsible Use */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsible & Ethical Use</h2>
            <p className="text-gray-600 mb-4">
              The Thematic Apperception Test is traditionally administered by trained professionals. TAT Test Online offers an
              educational simulation only. We encourage you to:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600">
              <li>Use the platform to explore personal narratives, not to self-diagnose mental health conditions.</li>
              <li>Share your results with a qualified practitioner if you need personalised advice or therapeutic support.</li>
              <li>Read our <a href="/editorial-standards" className="text-indigo-600 hover:text-indigo-700">Editorial Standards</a> to understand how we vet psychological information.</li>
            </ol>
            <p className="text-sm text-gray-500 mt-4">
              References: Henry A. Murray (1943), “Thematic Apperception Test”; McClelland, D. C. (1985), “Human Motivation”.
            </p>
          </section>

          {/* Who Should Try the TAT */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Is This For?</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Students & Researchers</h3>
                <p>
                  Psychology students can practise interpreting narrative data without needing the full physical card set.
                  Each card preview is accompanied by context and interpretation tips.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Coaches & Facilitators</h3>
                <p>
                  Life coaches and facilitators can use the prompts to spark reflective conversations while respecting the
                  boundaries of non-clinical work.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Growth Seekers</h3>
                <p>
                  Individuals can explore how their stories reveal recurring motivations, then track progress with repeated assessments.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Educators</h3>
                <p>
                  Teachers introducing projective techniques in class can demonstrate the workflow safely and ethically using anonymised data.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What is the Thematic Apperception Test (TAT)?
                </h3>
                <div>
                  <p className="text-gray-600">
                    The TAT is a projective psychological test that reveals personality traits, emotions, and social relationships through storytelling about ambiguous images.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How does the TAT test work?
                </h3>
                <div>
                  <p className="text-gray-600">
                    You'll be shown a series of images and asked to tell stories about them. These stories are analyzed to understand your personality, motivations, and emotional patterns.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Start Test Button */}
          <div className="text-center py-8">
            <button
              onClick={() => navigate('/tat-test-online')}
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
