import React from 'react';
import { ShieldCheck, Activity, ClipboardList, Target } from 'lucide-react';
import { SEO } from '../components/SEO';

const pipelineSteps = [
  {
    title: 'Card Selection & Prompt Contextualization',
    detail:
      'We rotate through the 31 historical TAT cards and supply brief historical context plus ethical reminders so users understand the prompt without receiving interpretive spoilers.'
  },
  {
    title: 'Story Capture & Normalization',
    detail:
      'Incoming stories are tokenized, stripped of identifiers, and normalized for tense, spelling variants, and British/American vocabulary so the scoring dictionaries behave consistently across dialects.'
  },
  {
    title: 'Motivational Dictionary Scoring',
    detail:
      'We apply the Winter (1994) motive dictionaries, an affiliation expansion adapted from Smith (1992), and a proprietary emotional valence lexicon to compute relative frequencies for each construct.'
  },
  {
    title: 'Interpretive Layer & PDF Rendering',
    detail:
      'Scores are mapped to interpretive bands (low, typical, elevated). Each band triggers plain-language feedback that is stored alongside the user narrative for the downloadable PDF.'
  }
];

const safeguards = [
  {
    icon: ShieldCheck,
    title: 'Compliance & Privacy',
    text: 'Stories are anonymised, salted, and then erased after the PDF is generated. Aggregated metrics never store identifying text.'
  },
  {
    icon: Activity,
    title: 'Model Drift Monitoring',
    text: 'Weekly samples are rescored and compared to a 2023 baseline. Deviations above 0.8 SD trigger a dictionary review.'
  },
  {
    icon: ClipboardList,
    title: 'Human-in-the-Loop Audits',
    text: 'Graduate-level raters double-code 5% of submissions each quarter to verify that automated scores track expert ratings.'
  },
  {
    icon: Target,
    title: 'Outcome Calibration',
    text: 'Automated scores are correlated with voluntary PRF short-form surveys to monitor whether percentile cut-offs stay meaningful.'
  }
];

const datasetRows = [
  {
    name: 'Picture Story Exercise (PSE)',
    sample: '312 anonymised narratives',
    usage: 'Primary lexical benchmark for achievement, affiliation, and power motives'
  },
  {
    name: 'Open Psych Narrative Archive',
    sample: '184 graduate counselling transcripts',
    usage: 'Validates emotional tone polarity and social cognition markers'
  },
  {
    name: 'Internal Pilot Panel',
    sample: '96 multilingual beta testers',
    usage: 'Stress-tests demographic prompts and age-normalised vocabulary variance'
  }
];

export default function Methodology() {
  const methodologySchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'TAT Test Online Scoring Methodology',
    description:
      'Documentation covering datasets, lexical scoring logic, privacy safeguards, and validation routines used by TAT Test Online.',
    inLanguage: 'en',
    author: {
      '@type': 'Organization',
      name: 'TAT Test Online'
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <SEO
        title="Scoring Methodology"
        description="Learn how TAT Test Online processes narratives, applies validated motive dictionaries, and audits automated scores for accuracy."
        type="article"
        structuredData={[methodologySchema]}
      />

      <header className="space-y-4">
        <p className="text-sm uppercase tracking-widest text-indigo-600 font-semibold">Methodology</p>
        <h1 className="text-4xl font-bold text-gray-900">How We Score and Safeguard Your TAT Narrative</h1>
        <p className="text-lg text-gray-600">
          The Thematic Apperception Test has been researched for nearly a century. Our online experience adapts those
          protocols by pairing validated motive dictionaries with transparent quality controls. Below you will find the
          data sources, processing stages, and audit routines that keep the feedback educational—not diagnostic.
        </p>
      </header>

      <section className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Source Datasets</h2>
        <p className="text-gray-600 mb-6">
          We recalibrate the scoring dictionaries twice per year using mixed narrative corpora. Each corpus is vetted for
          licensing and anonymisation before metrics enter production.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Dataset</th>
                <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Sample Size</th>
                <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {datasetRows.map((row) => (
                <tr key={row.name}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.sample}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Processing Pipeline</h2>
        <p className="text-gray-600">
          Every submission follows the same deterministic pipeline. We publish these steps so educators and researchers can
          replicate the process or challenge our assumptions.
        </p>
        <ol className="space-y-4">
          {pipelineSteps.map((step, index) => (
            <li key={step.title} className="flex">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 font-semibold flex items-center justify-center mr-4">
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-indigo-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Safeguards & Validation</h2>
        <p className="text-gray-700 mb-6">
          Automated scoring is only as trustworthy as its oversight. These controls align with guidance from the APA Ethics
          Code and the EFPA statement on psychological testing.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {safeguards.map((item) => (
            <article key={item.title} className="bg-white rounded-lg p-6 shadow-sm">
              <item.icon className="h-8 w-8 text-indigo-600 mb-3" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm p-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Known Limitations</h2>
        <p className="text-gray-600">
          Even rigorous pipelines cannot replace clinical judgment. Please review these constraints before interpreting the
          downloadable PDF as a diagnosis.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>The dictionaries emphasise English-language corpora; multilingual users may see undercounted cultural idioms.</li>
          <li>Short responses (&lt;150 words) reduce reliability because frequency-based scores become volatile.</li>
          <li>Stories written in crisis contexts can mirror acute mood states rather than stable personality traits.</li>
          <li>Automated sentiment models cannot detect sarcasm or layered narrative voices.</li>
        </ul>
        <p className="text-sm text-gray-500">
          Questions about the methodology? Contact support@tat-test.com with “Methodology Review” in the subject line.
        </p>
      </section>
    </div>
  );
}
