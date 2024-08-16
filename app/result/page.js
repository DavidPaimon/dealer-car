"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const makeId = searchParams.get('makeId');
  const year = searchParams.get('year');
  
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (makeId && year) {
      fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.Results) {
            setModels(data.Results);
          } else {
            setError('No models found');
          }
        })
        .catch(() => setError('Failed to load models'));
    }
  }, [makeId, year]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-maroon-800 via-white to-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 shadow-lg">Vehicle Models</h1>
      
      {error && (
        <div className="mb-4 text-red-400 bg-red-800 p-3 rounded-lg shadow-md">
          <strong>Error:</strong> {error}
        </div>
      )}

      <ul className="w-full max-w-lg bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-2xl">
        {models.length > 0 ? (
          models.map((model) => (
            <li key={model.Model_ID} className="mb-2 text-lg text-gray-800 font-semibold">
              {model.Model_Name}
            </li>
          ))
        ) : (
          <li className="text-lg text-gray-800 font-semibold">No models found for the selected vehicle type and year.</li>
        )}
      </ul>
    </div>
  );
}
