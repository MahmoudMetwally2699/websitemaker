import { Section } from '../types';
import Link from 'next/link';

interface SectionPreviewProps {
  sections: Section[];
  websiteIdea: string;
}

export default function SectionPreview({ sections, websiteIdea }: SectionPreviewProps) {
  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'hero':
        return '🚀';
      case 'about':
        return 'ℹ️';
      case 'contact':
        return '📞';
      default:
        return '📄';
    }
  };

  const getSectionBgColor = (type: string) => {
    switch (type) {
      case 'hero':
        return 'bg-blue-50 border-blue-200';
      case 'about':
        return 'bg-green-50 border-green-200';
      case 'contact':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Website Preview
        </h1>        <p className="text-lg text-gray-600">
          Generated sections for: <span className="font-semibold">&quot;{websiteIdea}&quot;</span>
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border-2 ${getSectionBgColor(section.type)} transition-shadow hover:shadow-md`}
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">{getSectionIcon(section.type)}</span>
              <h2 className="text-xl font-semibold text-gray-800 capitalize">
                {section.name}
              </h2>
              <span className="ml-auto px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                {section.type}
              </span>
            </div>
            <div className="text-gray-700 leading-relaxed">
              {section.content.split('\n').map((paragraph, pIndex) => (
                <p key={pIndex} className="mb-2">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>      {/* Footer */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Generate Another Website
        </Link>
      </div>
    </div>
  );
}
