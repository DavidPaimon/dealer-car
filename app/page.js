"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";

function VehicleFilter() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [modelYears, setModelYears] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedModelYear, setSelectedModelYear] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json")
      .then((res) => res.json())
      .then((data) => setVehicleTypes(data.Results))
      .catch((error) => console.error("Error fetching vehicle types:", error));

    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = 2015; year <= currentYear; year++) {
      years.push(year);
    }
    setModelYears(years);
  }, []);

  const handleSearch = () => {
    if (selectedVehicleType && selectedModelYear) {
      router.push(`/result?makeId=${selectedVehicleType}&year=${selectedModelYear}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 animate-fade-in">Filter Vehicles</h1>
      <div className="mb-6 w-full max-w-md">
        <select
          value={selectedVehicleType}
          onChange={(e) => setSelectedVehicleType(e.target.value)}
          className="w-full p-3 border border-gray-400 bg-white text-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-300"
        >
          <option value="">Select Vehicle Type</option>
          {vehicleTypes.length > 0 ? (
            vehicleTypes.map((type) => (
              <option key={type.MakeId} value={type.MakeId}>
                {type.MakeName}
              </option>
            ))
          ) : (
            <option value="">Loading vehicle types...</option>
          )}
        </select>
      </div>
      <div className="mb-6 w-full max-w-md">
        <select
          value={selectedModelYear}
          onChange={(e) => setSelectedModelYear(e.target.value)}
          className="w-full p-3 border border-gray-400 bg-white text-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-300"
        >
          <option value="">Select Model Year</option>
          {modelYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button
        disabled={!selectedVehicleType || !selectedModelYear}
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-12 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105"
        onClick={handleSearch}
      >
        Next
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VehicleFilter />
    </Suspense>
  );
}
