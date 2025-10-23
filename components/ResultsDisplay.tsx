
import React from 'react';
import type { Result } from '../types';
import { LocationIcon } from './icons/LocationIcon';

interface ResultsDisplayProps {
  result: Result;
}

const renderTextWithLineBreaks = (text: string) => {
  return text.split('\n').map((paragraph, index) => (
    <p key={index} className="mb-4 text-gray-700">
      {paragraph}
    </p>
  ));
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-xl animate-fade-in">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">AI Generated Response</h2>
        <div className="text-lg leading-relaxed">
          {renderTextWithLineBreaks(result.text)}
        </div>
      </div>

      {result.sources && result.sources.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Sources from Google Maps</h3>
          <ul className="space-y-3">
            {result.sources.map((source, index) => (
              <li key={index}>
                <a
                  href={source.maps.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start p-4 bg-gray-50 hover:bg-teal-50 rounded-lg transition-colors duration-200 group"
                >
                  <LocationIcon className="h-6 w-6 text-teal-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-teal-700 group-hover:underline">
                      {source.maps.title}
                    </span>
                    {source.maps.placeAnswerSources?.[0]?.reviewSnippets?.map((snippet, sIndex) => (
                       <div key={sIndex} className="mt-2 text-sm text-gray-600 border-l-2 border-gray-200 pl-3">
                         <p>"{snippet.snippet}"</p>
                         <a href={snippet.uri} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Read more</a>
                       </div>
                    ))}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
