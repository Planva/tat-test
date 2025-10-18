import React from 'react';
import { BookOpen, CheckCircle, FileSearch, Users } from 'lucide-react';
import { SEO } from '../components/SEO';

const reviewSteps = [
  {
    title: 'Evidence Collection',
    description:
      'We compare TAT scoring and interpretation frameworks from peer-reviewed journals, textbooks used in graduate psychology programmes, and guidance issued by the American Psychological Association.'
  },
  {
    title: 'Clinical Consultation',
    description:
      'Content updates are reviewed by consultants with postgraduate training in counselling or clinical psychology. We do not publish diagnostic claims and always emphasise educational use.'
  },
  {
    title: 'Plain Language Editing',
    description:
      'A copy editor adapts psychological terminology into accessible explanations so visitors without clinical training can understand the purpose and limits of the assessment.'
  },
  {
    title: 'Annual Revalidation',
    description:
      'Each January we re-validate our content against new research, update references, and refresh screenshots to reflect current product behaviour.'
  }
];

const corePrinciples = [
  {
    icon: BookOpen,
    title: 'Educational Focus',
    description:
      'Our stories, examples, and interpretations illustrate how the Thematic Apperception Test can be used for self-reflection. We avoid offering clinical diagnoses or replacing professional evaluation.'
  },
  {
    icon: CheckCircle,
    title: 'Verifiable Sources',
    description:
      'Every factual statement references studies from journals such as the Journal of Personality Assessment or Psychological Assessment. When we summarise findings, citations appear beneath the paragraph.'
  },
  {
    icon: FileSearch,
    title: 'Transparent Limitations',
    description:
      'We highlight the limitations of automated text analysis, clarify that the TAT requires trained facilitation, and direct users to seek in-person guidance when deeper interpretation is needed.'
  },
  {
    icon: Users,
    title: 'Inclusive Language',
    description:
      'Scenarios and guidance account for diverse backgrounds. We avoid stereotypes, use gender-inclusive language, and provide neutral examples to minimise cultural bias.'
  }
];

export default function Editorial() {
  const editorialSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: 'TAT Test Online Editorial Standards',
    description:
      'Documentation of TAT Test Online editorial workflow, evidence review, and fact-checking commitments.',
    inLanguage: 'en',
    url: 'https://www.tat-test.com/editorial-standards'
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SEO
        title="Editorial Standards"
        description="Learn how TAT Test Online researches, reviews, and updates its content to meet Google AdSense quality guidelines and provide trustworthy psychological education."
        type="article"
        structuredData={[editorialSchema]}
      />

      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Editorial Standards & Review Policy</h1>
        <p className="text-lg text-gray-600">
          High-quality content is the foundation of TAT Test Online. We follow a documented editorial workflow designed
          to meet Google AdSense expectations, respect intellectual property, and keep psychological information accurate.
        </p>
      </header>

      <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Four-Step Review Process</h2>
        <div className="space-y-6">
          {reviewSteps.map((step, index) => (
            <div key={step.title} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                  {index + 1}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="text-gray-600 mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 mb-8">
        {corePrinciples.map((principle) => (
          <article key={principle.title} className="bg-white rounded-lg shadow-sm p-6">
            <principle.icon className="h-8 w-8 text-indigo-600 mb-3" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{principle.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{principle.description}</p>
          </article>
        ))}
      </section>

      <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Citations & Intellectual Property</h2>
        <p className="text-gray-600 mb-3">
          The TAT cards themselves are licensed materials. We only provide low-resolution previews hosted on an external CDN
          and acknowledge Henry A. Murray and Christiana D. Morgan as the original creators. When citing academic work,
          we follow APA 7th edition formatting.
        </p>
        <p className="text-gray-600">
          Users and educators are encouraged to request permission before replicating any downloadable PDFs or textual content.
          For media outlets referencing our platform, please credit “TAT Test Online Research Group”.
        </p>
      </section>

      <section className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Report an Issue</h2>
        <p className="text-gray-600">
          If you believe any content is inaccurate, outdated, or infringes on intellectual property, email{' '}
          <a className="text-indigo-600 hover:text-indigo-700" href="mailto:support@tat-test.com">
            support@tat-test.com
          </a>{' '}
          with “Editorial Review” in the subject line. Include the page URL, a description of the issue, and any supporting evidence.
          We investigate all requests within five business days and provide a written update on the outcome.
        </p>
      </section>
    </div>
  );
}
