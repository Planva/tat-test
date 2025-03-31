import React, { useEffect, useState } from 'react';
import { Brain, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { fetchImages } from '../lib/cloudflare';
import { Helmet } from 'react-helmet-async';

export function Cards() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ url: string; index: number } | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageUrls = await fetchImages();
        setImages(imageUrls);
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  // Schema data for TAT Cards with detailed descriptions
  const cardSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": images.map((image, index) => ({
        "@type": "ImageObject",
        "position": index + 1,
        "contentUrl": image,
        "name": `TAT Test Card ${index + 1}`,
        "description": `TAT Test Card ${index + 1} - A standardized psychological assessment image used in the Thematic Apperception Test to evaluate personality traits, emotional responses, and interpersonal dynamics through storytelling.`
      }))
    },
    "name": "Thematic Apperception Test (TAT) Card Collection",
    "description": "A comprehensive collection of standardized TAT test cards used by psychologists for personality assessment. Each card is designed to elicit unique narrative responses that reveal insights into personality traits, emotional patterns, and interpersonal relationships."
  };

  return (
    <>
      <Helmet>
        <title>TAT Test Cards | Thematic Apperception Test Assessment Images</title>
        <meta name="description" content="Explore the complete collection of TAT test cards used in psychological assessment. Each card is designed to reveal unique aspects of personality through storytelling." />
        <meta name="keywords" content="TAT test cards, thematic apperception test, psychological assessment, projective test, personality evaluation, TAT images" />
        <link rel="canonical" href="https://www.tat-test.com/tat-test-cards" />
        <meta property="og:title" content="TAT Test Cards | Thematic Apperception Test Assessment Images" />
        <meta property="og:description" content="Explore the complete collection of TAT test cards used in psychological assessment. Each card is designed to reveal unique aspects of personality through storytelling." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cardSchema) }} />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Brain 
            className="h-16 w-16 text-indigo-600 mx-auto" 
            aria-hidden="true"
            role="img"
            aria-label="Brain icon representing psychological assessment"
          />
          <h1 
            className="mt-4 text-4xl font-bold text-gray-900"
            aria-label="Main heading for TAT Test Cards collection"
          >
            Thematic Apperception Test (TAT) Cards Collection
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            A comprehensive guide to standardized TAT cards and their role in psychological assessment
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="space-y-8">
              <section>
                <h2 
                  className="text-2xl font-bold text-gray-900 mb-4"
                  aria-label="Introduction to standard TAT cards"
                >
                  Understanding the Standard TAT Cards
                </h2>
                <p className="text-gray-600">
                  The complete set of Thematic Apperception Test (TAT) consists of 31 carefully selected cards, each designed to elicit specific psychological responses. These standardized images are used by trained professionals to assess personality traits, emotional patterns, and interpersonal dynamics through storytelling.
                </p>
              </section>

              <div className="flex justify-center my-8">
                <Link
                  to="/tat-test-online"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Begin your TAT assessment now"
                >
                  Take the TAT Test
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </div>

              <section aria-labelledby="gallery-heading">
                <h2 
                  id="gallery-heading" 
                  className="text-2xl font-bold text-gray-900 mb-4"
                  aria-label="Gallery of TAT test cards"
                >
                  Complete TAT Card Gallery
                </h2>
                {loading ? (
                  <div className="flex justify-center py-12" role="status" aria-label="Loading TAT test cards">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" role="list" aria-label="TAT test card gallery">
                    {images.map((image, index) => (
                      <div 
                        key={index} 
                        className="relative group cursor-pointer" 
                        role="listitem"
                        aria-label={`TAT Test Card ${index + 1} - Click to view larger version`}
                        onClick={() => setSelectedImage({ url: image, index })}
                      >
                        <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={image}
                            alt={`TAT Test Card ${index + 1} - Psychological assessment image ${index + 1} of 31 from the Thematic Apperception Test series, designed to evaluate personality traits and emotional responses through storytelling`}
                            className="object-cover transform group-hover:scale-105 transition-transform duration-200"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-200"></div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <span className="text-white font-semibold text-lg">Click to enlarge Card {index + 1}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section>
                <h2 
                  className="text-2xl font-bold text-gray-900 mb-4"
                  aria-label="Guide to interpreting TAT responses"
                >
                  Professional Interpretation of TAT Responses
                </h2>
                <p className="text-gray-600 mb-4">
                  Psychologists analyze TAT stories by looking at several key elements:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>The main theme of the story</li>
                  <li>The protagonist's needs and emotions</li>
                  <li>The environmental forces mentioned</li>
                  <li>The outcome or resolution</li>
                  <li>Significant conflicts described</li>
                </ul>
              </section>

              <section>
                <h2 
                  className="text-2xl font-bold text-gray-900 mb-4"
                  aria-label="Clinical applications of TAT"
                >
                  Clinical Applications and Uses
                </h2>
                <p className="text-gray-600 mb-4">
                  The TAT is widely used in clinical psychology for:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Personality assessment</li>
                  <li>Diagnostic evaluation</li>
                  <li>Treatment planning</li>
                  <li>Research purposes</li>
                </ul>
              </section>

              <section className="bg-gray-50 rounded-lg p-6">
                <h3 
                  className="text-xl font-semibold text-gray-900 mb-4"
                  aria-label="Important considerations for TAT administration"
                >
                  Professional Guidelines and Considerations
                </h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>TAT interpretations should always be made by qualified professionals</li>
                  <li>Results should be considered alongside other assessment tools</li>
                  <li>Cultural factors can influence story interpretations</li>
                  <li>The test requires standardized administration procedures</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Dialog 
        open={selectedImage !== null} 
        onClose={() => setSelectedImage(null)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

          <div className="relative bg-white rounded-lg max-w-4xl w-full mx-auto">
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setSelectedImage(null)}
                aria-label="Close enlarged image view"
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {selectedImage && (
              <div className="p-6">
                <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                  TAT Test Card {selectedImage.index + 1} - Detailed View
                </Dialog.Title>
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={selectedImage.url}
                    alt={`TAT Test Card ${selectedImage.index + 1} - Enlarged view of psychological assessment image ${selectedImage.index + 1} from the Thematic Apperception Test series, used to evaluate personality traits and emotional responses`}
                    className="object-contain w-full h-full"
                  />
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  This standardized TAT card is designed to elicit narrative responses that reveal insights into personality traits, emotional patterns, and interpersonal dynamics through storytelling.
                </p>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}