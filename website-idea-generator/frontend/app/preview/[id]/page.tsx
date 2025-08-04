'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SectionPreview from '../../components/SectionPreview';
import { LoadingSpinnerLarge } from '../../components/LoadingSpinner';
import { GenerateResponse } from '../../types';
import toast from 'react-hot-toast';

export default function PreviewPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<GenerateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSections = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/sections/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Website sections not found. They may have expired.');
          }
          throw new Error(`Failed to fetch sections: ${response.status}`);
        }

        const result: GenerateResponse = await response.json();
        setData(result);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load website sections';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSections();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="container mx-auto">
          <LoadingSpinnerLarge />
          <p className="text-center text-gray-600 mt-4">Loading your website sections...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600 mb-4">
              {error || 'Failed to load website sections'}
            </p>            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <SectionPreview sections={data.sections} websiteIdea={data.idea} />
    </div>
  );
}
