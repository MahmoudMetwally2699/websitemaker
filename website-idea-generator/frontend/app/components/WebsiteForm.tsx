'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';
import { GenerateRequest } from '../types';

interface FormData {
  idea: string;
}

export default function WebsiteForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: data.idea } as GenerateRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      toast.success('Website sections generated successfully!');
      reset();
      router.push(`/preview/${result.id}`);

    } catch (error) {
      console.error('Error generating website:', error);
      toast.error('Failed to generate website sections. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Website Idea Generator
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your website idea
          </label>
          <input
            {...register('idea', {
              required: 'Website idea is required',
              minLength: {
                value: 5,
                message: 'Please provide a more detailed idea (at least 5 characters)'
              },
              maxLength: {
                value: 200,
                message: 'Please keep your idea under 200 characters'
              }
            })}
            type="text"
            id="idea"            placeholder="e.g., Landing page for bakery"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-500"
            disabled={isLoading}
          />
          {errors.idea && (
            <p className="mt-1 text-sm text-red-600">{errors.idea.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
              <span className="ml-2">Generating...</span>
            </div>
          ) : (
            'Generate Website Sections'
          )}
        </button>
      </form>
    </div>
  );
}
