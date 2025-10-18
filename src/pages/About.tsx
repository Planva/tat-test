import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';

const inventors = [
  {
    name: 'Henry A. Murray',
    role: 'Psychologist, Harvard Psychological Clinic',
    contribution:
      'Led the development of the Thematic Apperception Test in the 1930s, proposing the idea that individuals reveal dominant needs through storytelling.'
  },
  {
    name: 'Christiana D. Morgan',
    role: 'Research Associate, Harvard Psychological Clinic',
    contribution:
      'Collected and illustrated many of the original TAT cards and conducted early validation sessions with participants.'
  }
];

export function About() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About the Thematic Apperception Test (TAT)',
    description:
      'Historical overview of the Thematic Apperception Test (TAT), highlighting inventors Henry A. Murray and Christiana D. Morgan and explaining how TAT Test Online adapts the assessment for educational use.',
    inLanguage: 'en',
    url: 'https://www.tat-test.com/tat-test-about',
    mainEntity: {
      '@type': 'Thing',
      name: 'Thematic Apperception Test',
      sameAs: 'https://en.wikipedia.org/wiki/Thematic_Apperception_Test'
    },
    mentions: inventors.map((inventor) => ({
      '@type': 'Person',
      name: inventor.name,
      description: inventor.contribution
    }))
  };

  return (
    <div className="max-w-5xl mx-auto">
      <SEO
        title="About the Thematic Apperception Test"
        description="Discover the origins of the Thematic Apperception Test (TAT), its inventors Henry A. Murray and Christiana D. Morgan, and how TAT Test Online adapts the method for educational use."
        type="article"
        structuredData={[aboutSchema]}
      />
      <div className="text-center mb-12">
        <Brain className="h-16 w-16 text-indigo-600 mx-auto" />
        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          What is the Thematic Apperception Test (TAT)?
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Learn the history of the TAT and how TAT Test Online offers a respectful, educational simulation.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Origins of the TAT</h2>
            <p className="text-gray-600 leading-relaxed">
              The Thematic Apperception Test was created at the Harvard Psychological Clinic in the early 1930s by
              psychologist Henry A. Murray and research associate Christiana D. Morgan. The pair designed a series of
              evocative, ambiguous images and invited participants to tell stories about the scenes. Murray believed
              these narratives revealed a person&apos;s underlying drives, conflicts, and worldview—a theory he later
              published in the 1943 <em>Thematic Apperception Test Manual</em>.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Morgan worked with artists to create the original card illustrations and co-facilitated early pilot tests.
              Their collaboration produced 31 cards, each depicting characters in emotionally charged situations. Over the decades,
              researchers adapted the cards for different populations, including children, adults, and specific cultural groups.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Meet the Inventors</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {inventors.map((inventor) => (
                <article key={inventor.name} className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{inventor.name}</h3>
                  <p className="text-sm text-indigo-700 uppercase tracking-wide mt-1">{inventor.role}</p>
                  <p className="text-gray-600 mt-3">{inventor.contribution}</p>
                </article>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Sources: Murray, H. A. (1943). <em>Thematic Apperception Test Manual</em>; Morgan, C. D. (1935). Harvard Psychological Clinic Archives.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How TAT Test Online Uses This Legacy</h2>
            <p className="text-gray-600 mb-4">
              TAT Test Online is an independently developed educational project inspired by the original TAT methodology. We provide:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>High-level explanations of TAT theory for students, researchers, and personal development enthusiasts.</li>
              <li>Illustrative prompts that mimic the themes found in the historic card set, delivered via modern web technology.</li>
              <li>An accessible language analysis tool that mirrors research metrics for achievement, affiliation, and power motives.</li>
            </ul>
            <p className="text-gray-600 mt-4">
              We respect the intellectual property of the original TAT creators. Our image previews are low-resolution,
              educational references, not substitutes for licensed clinical materials. Professional administration still requires
              formal training and adherence to ethical standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsible Use</h2>
            <p className="text-gray-600 mb-4">
              This website is not endorsed by Harvard University or the estates of Murray and Morgan. It is a modern web
              experience designed to help users appreciate narrative assessment. If you are experiencing emotional distress or
              mental health difficulties, please contact a licensed professional or emergency services in your region.
            </p>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Continue Exploring</h2>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/tat-test-research"
                className="inline-flex items-center px-5 py-3 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
              >
                Research Insights
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/editorial-standards"
                className="inline-flex items-center px-5 py-3 rounded-md bg-white border border-indigo-200 text-sm font-medium text-indigo-700 hover:bg-indigo-50 transition"
              >
                Editorial Standards
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/tat-test-online"
                className="inline-flex items-center px-5 py-3 rounded-md bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Try the Practice Test
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
