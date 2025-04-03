// Default images from Unsplash
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
  return Promise.resolve(DEFAULT_IMAGES);
}

export async function submitStories(stories: { imageId: number; content: string; demographics?: { gender: string; age: number } }[]): Promise<{ success: boolean; id: string }> {
  // Simulate successful submission without making API call
  return Promise.resolve({
    success: true,
    id: crypto.randomUUID()
  });
}