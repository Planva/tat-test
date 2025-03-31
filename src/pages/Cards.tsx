import React, { useEffect, useState } from 'react';
import { Brain, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchImages } from '../lib/cloudflare';
import { Dialog, Transition } from '@headlessui/react';

export function Cards() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <Brain className="h-16 w-16 text-indigo-600 mx-auto" />
        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          TAT Test Cards and Pictures
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Understanding the standard TAT cards and their interpretations
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Standard TAT Cards</h2>
              <p className="text-gray-600">
                The complete set of Thematic Apperception Test (TAT) consists of 31 picture cards, though typically only 8-12 cards are used in a single session. Each card is carefully designed to elicit specific types of responses and reveal different aspects of personality.
              </p>
            </section>

            <div className="flex justify-center my-8">
              <Link
                to="/tat-test-online"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Take the TAT Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">TAT Card Gallery</h2>
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group cursor-pointer" onClick={() => setSelectedImage(image)}>
                      <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={image}
                          alt={`TAT Card ${index + 1}`}
                          className="object-cover transform group-hover:scale-105 transition-transform duration-200"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-200"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <span className="text-white font-semibold text-lg">Card {index + 1}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Interpreting TAT Responses</h2>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Using TAT in Clinical Settings</h2>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Considerations</h3>
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

      {/* Image Lightbox */}
      <Transition show={!!selectedImage} as={React.Fragment}>
        <Dialog 
          as="div" 
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setSelectedImage(null)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setSelectedImage(null)}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="TAT Card"
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}