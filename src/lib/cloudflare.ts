// Use environment-aware API URL
const API_URL = import.meta.env.DEV 
  ? '/api'  // Local development
  : 'https://tat-test-api.planvaofficial.workers.dev/api'; // Production

export async function fetchImages(): Promise<string[]> {
  try {
    const response = await fetch(`${API_URL}/images`);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

export async function submitStories(stories: { imageId: number; content: string }[]) {
  try {
    const response = await fetch(`${API_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stories }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit stories');
    }

    return response.json();
  } catch (error) {
    console.error('Error submitting stories:', error);
    throw error;
  }
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