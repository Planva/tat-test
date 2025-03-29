import React from 'react';
import { Brain, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Research() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Brain className="h-16 w-16 text-indigo-600 mx-auto" />
        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          TAT Test Research and Studies
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Scientific research and validation of the Thematic Apperception Test
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Historical Development</h2>
              <p className="text-gray-600">
                The Thematic Apperception Test was developed by Henry Murray and Christiana Morgan at the Harvard Psychological Clinic in the 1930s. Originally published in 1943, the test has become one of the most widely researched and used projective psychological tests.
              </p>
            </section>

            <div className="flex justify-center my-8">
              <Link
                to="/test"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Take the TAT Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Research Findings</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Reliability Studies</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Test-retest reliability ranges from 0.60 to 0.80</li>
                    <li>Inter-rater reliability is typically above 0.85</li>
                    <li>Internal consistency measures show moderate to high reliability</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Validity Research</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Strong predictive validity for achievement motivation</li>
                    <li>Good construct validity when used with standardized scoring systems</li>
                    <li>High face validity in clinical settings</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications in Different Fields</h2>
              <p className="text-gray-600 mb-4">
                TAT research has demonstrated its effectiveness in various areas:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Clinical Psychology</li>
                <li>Personality Research</li>
                <li>Organizational Psychology</li>
                <li>Cross-Cultural Studies</li>
                <li>Educational Assessment</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Modern Developments</h2>
              <p className="text-gray-600 mb-4">
                Recent research has focused on:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Computerized scoring systems</li>
                <li>Cultural adaptations</li>
                <li>Integration with other assessment tools</li>
                <li>Application in specific populations</li>
              </ul>
            </section>

            <section className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Research Implications</h3>
              <p className="text-gray-600 mb-4">
                Current research suggests that the TAT is most effective when:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Used as part of a comprehensive assessment battery</li>
                <li>Administered and interpreted by trained professionals</li>
                <li>Scored using standardized systems</li>
                <li>Considered within cultural context</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}