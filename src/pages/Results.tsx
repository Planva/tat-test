import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Info, Target, Share2, Scale } from 'lucide-react';
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

    addSection('Summary', `${interpretation.summary.headline} Tone: ${interpretation.summary.tone}. Word count: ${interpretation.summary.length}.`);
    addSection('Achievement', interpretation.achievement.interpretation);
    addSection('Affiliation', interpretation.affiliation.interpretation);
    addSection('Power Dynamics', interpretation.power.interpretation);
    addSection('Needs vs Presses', interpretation.dynamics.needsPress.interpretation);
    addSection('Temporal Focus', interpretation.dynamics.temporal.interpretation);
    addSection('Conflict Intensity', interpretation.dynamics.conflict.interpretation);
    addSection('Resolution Cues', interpretation.dynamics.resolution.interpretation);
    addSection('Agency', interpretation.dynamics.agency.interpretation);
    addSection('Emotional Style', interpretation.personality.emotionalStyle.interpretation);
    if (interpretation.recommendations.length) {
      addSection('Suggestions', interpretation.recommendations.join(' '));
    }

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
                <p className="mb-2">
                  TAT scoring looks at motive imagery (needs), environmental pressures (presses), and narrative movement from
                  conflict to resolution. This automated reading uses published dictionaries from Murray, McClelland, and Winter to
                  approximate those dimensions.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Motive Scores:</strong> Achievement, affiliation, and power frequencies across your narrative.</li>
                  <li><strong>Needs vs Presses:</strong> Whether the protagonist is guided by inner wishes or external demands.</li>
                  <li><strong>Temporal Focus:</strong> Coverage of past context, present tension, and future resolution as required in TAT administration.</li>
                  <li><strong>Conflict & Resolution:</strong> Markers that a clear problem and ending were articulated.</li>
                  <li><strong>Agency & Affect:</strong> Action verbs and emotional tone illustrating how the protagonist copes.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Snapshot */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500">Word Count</p>
            <p className="text-2xl font-semibold text-gray-900">{interpretation.summary.length}</p>
            <p className="text-xs text-gray-500">Recommended range: 250–400 words</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500">Tone Snapshot</p>
            <p className="text-xl font-semibold text-gray-900">{interpretation.summary.tone}</p>
            <p className="text-xs text-gray-500">+{interpretation.personality.emotionalStyle.positive}% / -{interpretation.personality.emotionalStyle.negative}%</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500">Narrative Depth</p>
            <p className="text-sm text-gray-900 font-semibold">{interpretation.summary.headline}</p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Story</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{stories[0].content}</p>
        </div>

        {/* Analysis Section */}
        <div className="bg-white shadow rounded-lg p-6 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Motive Profile</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[{
                title: 'Achievement',
                data: interpretation.achievement,
                Icon: Target
              }, {
                title: 'Affiliation',
                data: interpretation.affiliation,
                Icon: Share2
              }, {
                title: 'Power',
                data: interpretation.power,
                Icon: Scale
              }].map((card) => (
                <div key={card.title} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <card.Icon className="h-4 w-4 text-indigo-600" />
                      {card.title}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-indigo-600">{card.data.label}</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{card.data.score}%</p>
                  <p className="text-sm text-gray-600 mt-2">{card.data.interpretation}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Narrative Dynamics</h2>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border border-gray-100 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700">Needs vs Presses</p>
                  <p className="text-2xl font-bold text-gray-900">{interpretation.dynamics.needsPress.balance}</p>
                  <p className="text-sm text-gray-600 mt-1">Needs {interpretation.dynamics.needsPress.needs}% · Presses {interpretation.dynamics.needsPress.presses}%</p>
                  <p className="text-sm text-gray-600 mt-2">{interpretation.dynamics.needsPress.interpretation}</p>
                </div>
                <div className="border border-gray-100 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700">Temporal Focus</p>
                  <p className="text-2xl font-bold text-gray-900 capitalize">{interpretation.dynamics.temporal.dominant}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Past {interpretation.dynamics.temporal.values.past}% · Present {interpretation.dynamics.temporal.values.present}% · Future {interpretation.dynamics.temporal.values.future}%
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{interpretation.dynamics.temporal.interpretation}</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="border border-gray-100 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700">Conflict Intensity</p>
                  <p className="text-2xl font-bold text-gray-900">{interpretation.dynamics.conflict.score}%</p>
                  <p className="text-sm text-gray-600 mt-2">{interpretation.dynamics.conflict.interpretation}</p>
                </div>
                <div className="border border-gray-100 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700">Resolution Signals</p>
                  <p className="text-2xl font-bold text-gray-900">{interpretation.dynamics.resolution.score}%</p>
                  <p className="text-sm text-gray-600 mt-2">{interpretation.dynamics.resolution.interpretation}</p>
                </div>
                <div className="border border-gray-100 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700">Protagonist Agency</p>
                  <p className="text-2xl font-bold text-gray-900">{interpretation.dynamics.agency.score}%</p>
                  <p className="text-sm text-gray-600 mt-2">{interpretation.dynamics.agency.interpretation}</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tone & Social Framing</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border border-gray-100 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700">Emotional Tone</p>
                <p className="text-sm text-gray-600">+{interpretation.personality.emotionalStyle.positive}% / -{interpretation.personality.emotionalStyle.negative}%</p>
                <p className="text-sm text-gray-600 mt-2">{interpretation.personality.emotionalStyle.interpretation}</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700">Social Awareness</p>
                <p className="text-2xl font-bold text-gray-900">{interpretation.personality.socialAwareness.score}%</p>
                <p className="text-sm text-gray-600 mt-2">{interpretation.personality.socialAwareness.interpretation}</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700">Self-Reference</p>
                <p className="text-2xl font-bold text-gray-900">{interpretation.personality.selfReferences.score}%</p>
                <p className="text-sm text-gray-600 mt-2">{interpretation.personality.selfReferences.interpretation}</p>
              </div>
            </div>
          </section>
        </div>

        {interpretation.recommendations.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Suggestions for Your Next Story</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {interpretation.recommendations.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600">
          <p className="mb-4">
            <strong>Note:</strong> This analysis mirrors common TAT scoring rubrics but does not replace professional interpretation. Mood,
            culture, and real-life stressors can all shape what appears in your narrative.
          </p>
          <p>
            Bring these observations to a counsellor or instructor if you want to explore the motives and presses that emerged. They
            can integrate this practice run with broader assessment data.
          </p>
        </div>
      </div>
    </div>
  );
}
