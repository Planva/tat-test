import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchImages, submitStories } from '../lib/cloudflare';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';

interface Story {
  imageId: number;
  content: string;
  demographics?: {
    gender: string;
    age: number;
  };
}

export function Test() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    const loadImages = async () => {
      try {
        setError(null);
        const imageUrls = await fetchImages();
        setImages(imageUrls);
        // Set random image
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        setCurrentImage(imageUrls[randomIndex]);
      } catch (error) {
        console.error('Error loading images:', error);
        setError('Failed to load images');
      }
    };

    loadImages();
  }, []);

  const metaTitle = t('test.metaTitle', { defaultValue: t('test.title') || 'Take the TAT Test Online' });
  const metaDescription = t('test.metaDescription', {
    defaultValue:
      'Complete the guided Thematic Apperception Test (TAT) online, submit your story, and receive instant personality insights.'
  });

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to complete the TAT practice story online',
    'description': metaDescription,
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Observe the card',
        'text': 'Spend 30–60 seconds looking at the card and noting the characters and setting.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Describe the background',
        'text': 'Explain what may have happened before the scene and what each character is feeling.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Write the story',
        'text': 'Compose a 250–400 word story including the current conflict and a possible outcome.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Submit the story',
        'text': 'Enter the story into the form, add optional demographics, and submit for instant feedback.'
      }
    ],
    'tool': [
      {
        '@type': 'HowToTool',
        'name': 'TAT Test Online story form'
      }
    ]
  };

  const handleSubmit = async () => {
    if (!gender) {
      alert(t('test.validation.gender'));
      return;
    }

    if (!age || isNaN(Number(age)) || Number(age) < 1) {
      alert(t('test.validation.age'));
      return;
    }

    if (!story.trim()) {
      alert(t('test.validation.story'));
      return;
    }

    setLoading(true);
    try {
      const stories = [{ 
        imageId: images.indexOf(currentImage), 
        content: story,
        demographics: {
          gender,
          age: Number(age)
        }
      }];
      
      const result = await submitStories(stories);
      
      if (result.success) {
        navigate('/tat-test-results', { 
          state: { 
            stories,
            testId: result.id 
          }
        });
      } else {
        throw new Error('Failed to save response');
      }
    } catch (error) {
      console.error('Error saving response:', error);
      setError(t('test.error.save'));
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md w-full text-center">
          <p className="text-red-800 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            {t('test.error.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  if (!currentImage) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title={metaTitle} description={metaDescription} type="article" structuredData={[howToSchema]} />
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('test.title')}
        </h2>
        <p className="mt-2 text-gray-600">
          Set aside at least 15 quiet minutes. You will view one randomly selected card from the original TAT set.
          Save your progress in a text editor if you wish to refine your story before submitting.
        </p>
        <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-lg p-4 text-sm text-indigo-900">
          <h3 className="font-semibold mb-2">Before You Begin</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Observe the card for 30–60 seconds and note your immediate impressions.</li>
            <li>Describe the protagonist, the supporting characters, and the setting in detail.</li>
            <li>Explain what happened before the scene, the current conflict, and a realistic conclusion.</li>
            <li>Write in a single sitting to keep the narrative coherent. Aim for 250–400 words.</li>
          </ol>
        </div>
        
        {/* Demographics Section */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('test.demographics.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                {t('test.demographics.gender.label')}
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">{t('test.demographics.gender.select')}</option>
                <option value="male">{t('test.demographics.gender.options.male')}</option>
                <option value="female">{t('test.demographics.gender.options.female')}</option>
                <option value="other">{t('test.demographics.gender.options.other')}</option>
                <option value="prefer-not-to-say">{t('test.demographics.gender.options.prefer')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                {t('test.demographics.age')}
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1"
                max="120"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder={t('test.demographics.agePlaceholder')}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={currentImage}
            alt={t('test.imageAlt')}
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="mt-8">
        <label
          htmlFor="story"
          className="block text-sm font-medium text-gray-700"
        >
          {t('test.story.label')}
        </label>
        <div className="mt-2">
          <textarea
            id="story"
            rows={6}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder={t('test.story.placeholder')}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              {t('test.submit')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </div>

      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
        <p>
          <strong>Important:</strong> Stories submitted here are anonymised instantly. The automated interpretation reflects
          linguistic patterns, not clinical diagnosis. If your story brings up strong emotions or distressing memories, consider
          speaking with a licensed counsellor or psychologist who can provide personalised support.
        </p>
      </div>
    </div>
  );
}
