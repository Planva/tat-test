// Use environment-aware API URL
const API_URL = import.meta.env.DEV 
  ? '/api'  // Local development
  : 'https://tat-test-api.planvaofficial.workers.dev/api'; // Production

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1517677129300-07b130802f46?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1590075865003-e48277faa558?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1597176116047-876a32798fcc?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1594819047096-e65bf358b318?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1534330207526-8e81f10ec6fc?auto=format&fit=crop&w=800'
];

export async function fetchImages(): Promise<string[]> {
  return DEFAULT_IMAGES;
}

export async function submitStories(stories: { imageId: number; content: string }[]) {
  // Since we're not storing data, just return a success response
  return { success: true, id: 'local-' + Date.now() };
}

export async function getAIAnalysis(story: string) {
  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ story }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI analysis');
    }

    return response.json();
  } catch (error) {
    console.error('Error getting AI analysis:', error);
    return {
      analysis: "Unable to generate AI analysis at this time. Please try again later."
    };
  }
}