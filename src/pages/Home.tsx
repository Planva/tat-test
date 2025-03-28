import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <Brain className="h-16 w-16 text-indigo-600 mx-auto" />
        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          Thematic Apperception Test (TAT)
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Explore your personality through storytelling
        </p>
      </div>

      <div className="mt-12 prose prose-indigo mx-auto">
        <h2>What is TAT?</h2>
        <p>
          The Thematic Apperception Test (TAT) is a projective psychological test
          that reveals underlying motives, concerns, and the way people see the
          social world through stories they make up about ambiguous pictures.
        </p>

        <h2>How it works</h2>
        <ol>
          <li>You'll be shown a series of 10 ambiguous images</li>
          <li>For each image, write a story about what you see</li>
          <li>Include what led to the scene, what's happening now, and what might happen next</li>
          <li>Your responses are completely anonymous</li>
        </ol>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/test')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start Test
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}