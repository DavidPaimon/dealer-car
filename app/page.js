"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";

function VehicleFilter() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [modelYears, setModelYears] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedModelYear, setSelectedModelYear] = useState("");
  const [vehicleModels, setVehicleModels] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json")
      .then((res) => res.json())
      .then((data) => setVehicleTypes(data.Results));

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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-red-900 to-white">
      <h1 className="text-3xl font-bold mb-6 text-white">Filter Vehicles</h1>
      <div className="mb-4 w-1/2">
        <select
          value={selectedVehicleType}
          onChange={(e) => setSelectedVehicleType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
        >
          <option value="">Select Vehicle Type</option>
          {vehicleTypes.map((type) => (
            <option key={type.MakeId} value={type.MakeId}>
              {type.MakeName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4 w-1/2">
        <select
          value={selectedModelYear}
          onChange={(e) => setSelectedModelYear(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
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
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-8 rounded-lg shadow-lg disabled:bg-gray-400"
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
