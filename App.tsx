
import React, { useState, useEffect, useCallback } from 'react';
import type { Location, Result } from './types';
import { getMurrelFishInfo } from './services/geminiService';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Footer } from './components/Footer';
import { LocationIcon } from './components/icons/LocationIcon';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [location, setLocation] = useState<Location | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError("Could not get your location. Please enable location services in your browser for location-based searches.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiResult = await getMurrelFishInfo(query, location);
      setResult(apiResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [query, location]);

  const LocationStatus = () => (
    <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
      {location && !locationError && (
        <>
          <LocationIcon className="h-4 w-4 mr-1 text-green-500" />
          <span>Location enabled for local results</span>
        </>
      )}
      {locationError && (
        <span className="text-red-500 text-center">{locationError}</span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <div className="text-center w-full max-w-3xl mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Your AI-Powered Guide to Murrel Fish Farming</h2>
            <p className="text-lg text-gray-600">
                Ask anything about Murrel fish seeds, feed, or farming techniques. Add "near me" to find local dealers.
            </p>
        </div>
        
        <div className="w-full max-w-2xl">
          <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} isLoading={isLoading} />
          <LocationStatus />
        </div>

        <div className="w-full mt-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative max-w-2xl mx-auto" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {!isLoading && !result && !error && (
            <div className="text-center text-gray-500 mt-12">
              <img src="https://picsum.photos/seed/murrelfish/400/250" alt="Murrel Fish" className="mx-auto rounded-lg shadow-md mb-4" />
              <p>Results will be displayed here.</p>
            </div>
          )}
          
          {result && <ResultsDisplay result={result} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
