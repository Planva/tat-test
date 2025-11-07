import React from 'react';
import { BookOpenCheck, FileText } from 'lucide-react';
import { SEO } from '../components/SEO';

const caseStudies = [
  {
    id: 'achiever',
    title: 'Card 7GF – Emerging Researcher Narrative',
    story:
      'A graduate fellow studies late in the laboratory while peers celebrate outside. She reflects on parental expectations, the looming grant deadline, and a quiet determination to publish before turning twenty-five.',
    insights: [
      'Achievement vocabulary peaked at 8.4%, highlighting strong mastery themes.',
      'Affiliation markers remained moderate (1.8%) because the protagonist references supportive mentors.',
      'Emotional tone leaned positive (+3.1%) despite acknowledging stress, which often signals resilient coping.'
    ],
    recommendation:
      'We flag this profile as “goal engaged.” Users are encouraged to explore recovery rituals and to balance short-term wins with intrinsic motivation.'
  },
  {
    id: 'caregiver',
    title: 'Card 12BG – Intergenerational Care Story',
    story:
      'A young adult son sits beside his recovering father. The narrator describes shared childhood memories, current hospital routines, and a promise to rebuild the family workshop once his father regains strength.',
    insights: [
      'Affiliation language reached 3.6%, more than double our typical benchmark, reflecting relational focus.',
      'Power dynamics stayed low (0.4%), yet the narrator referenced role reversals and boundary setting.',
      'Emotional tone skewed negative (-2.9%) during early paragraphs but returned to neutral by the conclusion.'
    ],
    recommendation:
      'We suggest reflective journaling prompts about caregiver fatigue and encourage the user to discuss support networks with a counsellor.'
  },
  {
    id: 'navigator',
    title: 'Card 3BM – Adolescent Identity Narrative',
    story:
      'Two siblings wait at a train platform. The narrator alternates between first- and third-person perspectives to debate whether to leave their hometown or stay to protect their younger brother from bullying.',
    insights: [
      'Power vocabulary scored 2.3% because the protagonist weighs control, voice, and social status.',
      'Self-references fluctuated between “I” and “she,” a stylistic choice that often indicates experimentation with identity.',
      'Sentiment polarity oscillated, producing balanced +1.2% / -1.0% scores, a sign of nuanced emotional processing.'
    ],
    recommendation:
      'The feedback PDF highlights identity exploration resources plus discussion prompts for school counsellors facilitating group sessions.'
  }
];

export default function CaseLibrary() {
  const librarySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TAT Story Library',
    description:
      'Sample narratives demonstrating how TAT Test Online scores achievement, affiliation, power, and emotional tone.',
    inLanguage: 'en'
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <SEO
        title="Story Library"
        description="Read curated TAT practice stories with scoring breakdowns so you know what to expect before submitting your own narrative."
        type="article"
        structuredData={[librarySchema]}
      />

      <header className="space-y-4">
        <p className="text-sm uppercase tracking-widest text-indigo-600 font-semibold">Case Library</p>
        <h1 className="text-4xl font-bold text-gray-900">Narrative Examples & Scoring Walkthroughs</h1>
        <p className="text-lg text-gray-600">
          These anonymised stories illustrate how nuanced writing translates into motive scores. Each example includes a
          synopsis rather than the full text to protect contributor privacy while still showcasing interpretation depth.
        </p>
      </header>

      <section className="space-y-6">
        {caseStudies.map((item) => (
          <article key={item.id} className="bg-white rounded-xl shadow-sm p-8 space-y-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <BookOpenCheck className="h-6 w-6 text-indigo-600" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-gray-900">{item.title}</h2>
            </div>
            <p className="text-gray-700">{item.story}</p>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Key Insights</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                {item.insights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Guidance: </span>
              {item.recommendation}
            </p>
          </article>
        ))}
      </section>

      <section className="bg-white rounded-xl shadow-sm p-8 space-y-4">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-indigo-600" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-gray-900">How to Use These Examples</h2>
        </div>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Compare the length and specificity of each synopsis to your own writing goals.</li>
          <li>Notice how we balance inner thoughts, interpersonal dynamics, and future-oriented conclusions.</li>
          <li>Share the stories with classmates as discussion prompts about motive imagery and ethical storytelling.</li>
          <li>Pair the examples with the Methodology page to position the exercise within a research syllabus.</li>
        </ul>
      </section>
    </div>
  );
}
