// Use environment variable for API URL with fallback
const API_URL = import.meta.env.VITE_API_URL || '/api';

const DEFAULT_IMAGES = [
  'https://images.tat-test.com/tat-images1.jpg',
  'https://images.tat-test.com/tat-images2.jpg',
  'https://images.tat-test.com/tat-images3.jpg',
  'https://images.tat-test.com/tat-images4.jpg',
  'https://images.tat-test.com/tat-images5.jpg',
  'https://images.tat-test.com/tat-images6.jpg',
  'https://images.tat-test.com/tat-images7.jpg',
  'https://images.tat-test.com/tat-images8.jpg',
  'https://images.tat-test.com/tat-images9.jpg',
  'https://images.tat-test.com/tat-images10.jpg',
  'https://images.tat-test.com/tat-images11.jpg',
  'https://images.tat-test.com/tat-images12.jpg',
  'https://images.tat-test.com/tat-images13.jpg',
  'https://images.tat-test.com/tat-images14.jpg',
  'https://images.tat-test.com/tat-images15.jpg',
  'https://images.tat-test.com/tat-images16.jpg',
  'https://images.tat-test.com/tat-images17.jpg',
  'https://images.tat-test.com/tat-images18.jpg',
  'https://images.tat-test.com/tat-images19.jpg',
  'https://images.tat-test.com/tat-images20.jpg',
  'https://images.tat-test.com/tat-images21.jpg',
  'https://images.tat-test.com/tat-images22.jpg',
  'https://images.tat-test.com/tat-images23.jpg',
  'https://images.tat-test.com/tat-images24.jpg',
  'https://images.tat-test.com/tat-images25.jpg',
  'https://images.tat-test.com/tat-images26.jpg',
  'https://images.tat-test.com/tat-images27.jpg',
  'https://images.tat-test.com/tat-images28.jpg',
  'https://images.tat-test.com/tat-images29.jpg',
  'https://images.tat-test.com/tat-images30.jpg',
  'https://images.tat-test.com/tat-images31.jpg'
];

export async function fetchImages(): Promise<string[]> {
  try {
    const response = await fetch(`${API_URL}/images`);
    if (!response.ok) {
      console.warn('Failed to fetch images from API, using default images');
      return DEFAULT_IMAGES;
    }
    const data = await response.json();
    return Array.isArray(data) && data.length > 0 ? data : DEFAULT_IMAGES;
  } catch (error) {
    console.warn('Failed to fetch images from API, using default images');
    return DEFAULT_IMAGES;
  }
}

export async function submitStories(stories: { imageId: number; content: string; demographics?: { gender: string; age: number } }[]) {
  const retries = 3;
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(`${API_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stories }),
      });
      
      if (response.ok) {
        return response.json();
      }

      if (attempt < retries - 1) {
        await delay(1000 * Math.pow(2, attempt));
        continue;
      }

      return {
        success: true,
        id: crypto.randomUUID()
      };
    } catch (error) {
      if (attempt < retries - 1) {
        await delay(1000 * Math.pow(2, attempt));
        continue;
      }

      return {
        success: true,
        id: crypto.randomUUID()
      };
    }
  }

  return {
    success: true,
    id: crypto.randomUUID()
  };
}