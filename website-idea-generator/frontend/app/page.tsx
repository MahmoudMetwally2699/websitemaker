'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import WebsiteForm from './components/WebsiteForm';
import { useState } from 'react';

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Website Idea Generator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter your website idea and get instantly generated sections including Hero, About, and Contact sections.
            </p>
          </div>

          <WebsiteForm />
        </div>
        <Toaster position="top-right" />
      </main>
    </QueryClientProvider>
  );
}
