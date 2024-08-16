"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function VehicleModels({ makeId, year }) {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`)
      .then((res) => res.json())
      .then((data) => setModels(data.Results));
  }, [makeId, year]);

  return (
    <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
      {models.length > 0 ? (
        <ul className="list-disc list-inside text-gray-700">
          {models.map((model) => (
            <li key={model.Model_ID} className="mb-2">
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-900 to-white">
        <h1 className="text-3xl font-bold mb-6 text-white">Vehicle Models</h1>
        {makeId && year ? (
          <VehicleModels makeId={makeId} year={year} />
        ) : (
          <div>No parameters provided.</div>
        )}
      </div>
    </Suspense>
  );
}
