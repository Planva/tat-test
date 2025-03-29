import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, ArrowRight } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Brain className="h-16 w-16 text-indigo-600 mx-auto" />
        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          What is the Thematic Apperception Test (TAT)?
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Understanding the psychological assessment tool that reveals personality through storytelling
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">History and Development</h2>
              <p className="text-gray-600">
                The Thematic Apperception Test (TAT) was developed by Henry Murray and Christiana Morgan at Harvard University in the 1930s. This psychological test is one of the most widely used projective tests in the field of psychology, providing valuable insights into a person's drives, emotions, and conflicts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How Does the TAT Test Work?</h2>
              <p className="text-gray-600 mb-4">
                The TAT consists of 31 picture cards showing ambiguous black and white pictures. Subjects are asked to tell a story about each picture, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>What is happening in the picture</li>
                <li>What led up to this situation</li>
                <li>What the characters are thinking and feeling</li>
                <li>What might happen next</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Does the TAT Test Measure?</h2>
              <p className="text-gray-600 mb-4">
                The TAT is designed to evaluate personality characteristics and emotional functioning through:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Achievement motivation</li>
                <li>Power motivation</li>
                <li>Intimacy motivation</li>
                <li>Problem-solving abilities</li>
                <li>Perceptions of others</li>
                <li>Emotional states and conflicts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reliability and Validity</h2>
              <p className="text-gray-600 mb-4">
                As a projective test, the TAT's reliability and validity depend largely on:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>The examiner's training and expertise</li>
                <li>Standardized administration procedures</li>
                <li>Systematic scoring methods</li>
                <li>Integration with other assessment tools</li>
              </ul>
            </section>

            <div className="mt-8 flex justify-center">
              <Link
                to="/test"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Take the TAT Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}