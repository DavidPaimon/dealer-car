"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [modelYears, setModelYears] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [selectedModelYear, setSelectedModelYear] = useState('');
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.Results) {
          setVehicleTypes(data.Results);
        }
      })
      .catch(() => setError('Failed to load vehicle types'));

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
    } else {
      setError('Please select both vehicle type and model year');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-vinotinto to-white p-6">
      <h1 className="text-5xl font-extrabold mb-8 text-white shadow-lg">Filter Vehicles</h1>

      {error && (
        <div className="mb-4 text-red-400 bg-red-800 p-3 rounded-lg shadow-md">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="mb-6 w-full max-w-lg text-center">
        <label className="block text-lg font-semibold mb-2 text-white">Select Vehicle Type</label>
        <select
          value={selectedVehicleType}
          onChange={(e) => setSelectedVehicleType(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-4 focus:ring-vinotinto transition duration-300 text-lg"
        >
          <option value="">Select Vehicle Type</option>
          {vehicleTypes.map((type) => (
            <option key={type.MakeId} value={type.MakeId}>
              {type.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 w-full max-w-lg text-center">
        <label className="block text-lg font-semibold mb-2 text-white">Select Model Year</label>
        <select
          value={selectedModelYear}
          onChange={(e) => setSelectedModelYear(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-4 focus:ring-vinotinto transition duration-300 text-lg"
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
        className="w-full max-w-xs bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-4 px-6 rounded-full font-bold text-xl hover:bg-gradient-to-l hover:from-yellow-500 hover:to-red-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
