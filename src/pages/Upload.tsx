import React, { useState } from 'react';
import { Upload } from 'lucide-react';

export function Upload() {
  const [uploadStatus, setUploadStatus] = useState<{ [key: string]: boolean }>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (max 200KB)
    if (file.size > 200 * 1024) {
      alert('Image size should be less than 200KB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Check dimensions
        if (img.width !== 800) {
          alert('Image width should be 800px');
          return;
        }

        setUploadStatus(prev => ({ ...prev, [`tat-${index + 1}.jpg`]: true }));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Upload className="h-6 w-6 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Upload TAT Test Images</h1>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Image Requirements</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Format: JPG only</li>
                  <li>Width: Exactly 800px</li>
                  <li>Size: Less than 200KB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Image {index + 1} (tat-{index + 1}.jpg)
                </label>
                {uploadStatus[`tat-${index + 1}.jpg`] && (
                  <span className="text-green-600 text-sm">✓ Valid image</span>
                )}
              </div>
              <input
                type="file"
                accept="image/jpeg"
                onChange={(e) => handleFileChange(e, index)}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Next Steps</h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-600">
            <li>Upload all 10 images following the requirements above</li>
            <li>Save the validated images to your computer</li>
            <li>Create a folder named "images" in the "public" directory of your project</li>
            <li>Copy all images to the "public/images" folder with their respective names (tat-1.jpg through tat-10.jpg)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}