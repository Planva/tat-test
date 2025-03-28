import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchImages, submitStories } from '../lib/cloudflare';
import { ArrowRight, Loader2 } from 'lucide-react';

interface Story {
  imageId: number;
  content: string;
  demographics: {
    gender: string;
    age: number;
  };
}

export function Test() {
  const navigate = useNavigate();
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageUrls = await fetchImages();
        setImages(imageUrls);
        // Set random image
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        setCurrentImage(imageUrls[randomIndex]);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    loadImages();
  }, []);

  const handleSubmit = async () => {
    if (!gender) {
      alert('Please select your gender.');
      return;
    }

    if (!age || isNaN(Number(age)) || Number(age) < 1) {
      alert('Please enter a valid age.');
      return;
    }

    if (!story.trim()) {
      alert('Please write a story before submitting.');
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
      await submitStories(stories);
      navigate('/results', { state: { stories } });
    } catch (error) {
      console.error('Error saving response:', error);
      alert('There was an error saving your response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentImage) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Tell a Story About This Image
        </h2>
        
        {/* Demographics Section */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1"
                max="120"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your age"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={currentImage}
            alt="TAT Test Image"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="mt-8">
        <label
          htmlFor="story"
          className="block text-sm font-medium text-gray-700"
        >
          Write your story:
        </label>
        <div className="mt-2">
          <textarea
            id="story"
            rows={6}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Write your story here..."
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
              Submit
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}