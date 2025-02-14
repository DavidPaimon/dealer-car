"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function VehicleModels({ makeId, year }) {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`)
      .then((res) => res.json())
      .then((data) => setModels(data.Results))
      .catch((error) => console.error("Error fetching vehicle models:", error));
  }, [makeId, year]);

  return (
    <div className="mt-8 w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl">
      {models.length > 0 ? (
        <ul className="space-y-4 text-gray-800">
          {models.map((model) => (
            <li key={model.Model_ID} className="p-3 bg-gray-200 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:bg-gray-300">
              {model.Model_Name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No models found for the selected vehicle type and year.</p>
      )}
    </div>
  );
}

export default function ResultPage() {
  const searchParams = useSearchParams();
  const makeId = searchParams.get("makeId");
  const year = searchParams.get("year");

  return (
    <Suspense fallback={<div>Loading vehicle models...</div>}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800 animate-fade-in">Vehicle Models</h1>
        {makeId && year ? (
          <VehicleModels makeId={makeId} year={year} />
        ) : (
          <div>No parameters provided.</div>
        )}
      </div>
    </Suspense>
  );
}
