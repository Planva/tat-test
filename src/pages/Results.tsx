import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Info } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { analyzeText, getAnalysisInterpretation } from '../lib/analysis';
import { SEO } from '../components/SEO';

interface Story {
  imageId: number;
  content: string;
  demographics?: {
    gender: string;
    age: number;
  };
}

export function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const stories = location.state?.stories as Story[] || [];
  
  if (!stories.length) {
    navigate('/');
    return null;
  }

  const analysis = analyzeText(stories[0].content);
  const interpretation = getAnalysisInterpretation(analysis);
  const reportSchema = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    'name': 'TAT Test Story Analysis',
    'description': 'Automated linguistic summary for a single TAT practice story.',
    'inLanguage': 'en',
    'creator': {
      '@type': 'Organization',
      'name': 'TAT Test Online',
      'url': 'https://www.tat-test.com/'
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    // Title
    doc.setFontSize(20);
    doc.text('TAT Test Results', 20, yPos);
    yPos += 20;

    // Demographics
    if (stories[0].demographics) {
      doc.setFontSize(14);
      doc.text('Demographics:', 20, yPos);
      yPos += 10;
      doc.setFontSize(12);
      doc.text(`Gender: ${stories[0].demographics.gender}`, 30, yPos);
      yPos += 10;
      doc.text(`Age: ${stories[0].demographics.age}`, 30, yPos);
      yPos += 20;
    }

    // Story
    doc.setFontSize(14);
    doc.text('Your Story:', 20, yPos);
    yPos += 10;
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(stories[0].content, 170);
    doc.text(splitText, 20, yPos);
    yPos += splitText.length * 7 + 20;

    // Analysis
    doc.setFontSize(14);
    doc.text('Analysis:', 20, yPos);
    yPos += 10;
    doc.setFontSize(12);

    const addSection = (title: string, content: string) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(12);
      doc.text(`${title}:`, 20, yPos);
      yPos += 7;
      const lines = doc.splitTextToSize(content, 170);
      doc.text(lines, 30, yPos);
      yPos += lines.length * 7 + 10;
    };

    addSection('Achievement', interpretation.achievement.interpretation);
    addSection('Affiliation', interpretation.affiliation.interpretation);
    addSection('Power Dynamics', interpretation.power.interpretation);
    addSection('Emotional Style', interpretation.personality.emotionalStyle.interpretation);

    doc.save('tat-test-results.pdf');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SEO
        title="Your TAT Test Analysis"
        description="Review the detailed analysis of your Thematic Apperception Test story, including motivational themes and emotional tone insights."
        type="article"
        noIndex
        structuredData={[reportSchema]}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your TAT Test Analysis</h1>
        <button
          onClick={downloadPDF}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Download className="h-5 w-5 mr-2" />
          Download PDF
        </button>
      </div>

      <div className="grid gap-8">
        {/* Understanding the Scores */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">Understanding the Scores</h3>
              <div className="prose prose-sm text-blue-800">
                <p className="mb-2">The percentages shown in this analysis represent the frequency of specific types of words in your story:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Achievement Score:</strong> Typical range is 4.5-8.5% (average: 5.7%). Higher scores indicate stronger focus on success and accomplishment.</li>
                  <li><strong>Social Connection Score:</strong> Average is 1.2%. About 30% of people score 0%. Higher scores show greater emphasis on relationships.</li>
                  <li><strong>Power Dynamics Score:</strong> Typical range is 0.8-2.7% (average: 1.7%). Higher scores suggest attention to control and status.</li>
                  <li><strong>Emotional Tone:</strong> Shows the balance between positive (+) and negative (-) emotional words. Higher positive percentage suggests optimistic outlook.</li>
                  <li><strong>Social Awareness Score:</strong> Reflects the frequency of words referring to other people and social interactions.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Story
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap">{stories[0].content}</p>
        </div>

        {/* Analysis Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Story Analysis
          </h2>
          
          <div className="grid gap-6">
            {/* Motivational Themes */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Motivational Themes</h3>
              <div className="grid gap-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Achievement Focus</span>
                    <span className="text-sm text-gray-500">{interpretation.achievement.score}%</span>
                  </div>
                  <p className="text-sm text-gray-600">{interpretation.achievement.interpretation}</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Social Connection</span>
                    <span className="text-sm text-gray-500">{interpretation.affiliation.score}%</span>
                  </div>
                  <p className="text-sm text-gray-600">{interpretation.affiliation.interpretation}</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Power Dynamics</span>
                    <span className="text-sm text-gray-500">{interpretation.power.score}%</span>
                  </div>
                  <p className="text-sm text-gray-600">{interpretation.power.interpretation}</p>
                </div>
              </div>
            </div>

            {/* Language Style */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Language Analysis</h3>
              <div className="grid gap-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Emotional Tone</span>
                    <span className="text-sm text-gray-500">
                      +{interpretation.personality.emotionalStyle.positive}% / 
                      -{interpretation.personality.emotionalStyle.negative}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{interpretation.personality.emotionalStyle.interpretation}</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Social Awareness</span>
                    <span className="text-sm text-gray-500">{interpretation.personality.socialAwareness.score}%</span>
                  </div>
                  <p className="text-sm text-gray-600">{interpretation.personality.socialAwareness.interpretation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600">
          <p className="mb-4">
            <strong>Note:</strong> This analysis is based on linguistic patterns in your story and should be considered as general insights rather than definitive conclusions. Many factors can influence how someone responds to this test, including current mood, environment, and personal circumstances.
          </p>
          <p>
            The TAT (Thematic Apperception Test) is designed to explore how individuals perceive and interpret ambiguous situations, potentially revealing aspects of their personality through storytelling.
          </p>
        </div>
      </div>
    </div>
  );
}
