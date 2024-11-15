import React, { useState } from 'react';

const TemperatureTrend = () => {
  const [selectedCity, setSelectedCity] = useState('----');
  const [imageBase64, setImageBase64] = useState('');

  const cities = ["----", "Ahmedabad", "Bengaluru", "Chennai", "Delhi", "Hyderabad", "Kolkata", "Mumbai", "Pune"];

  const fetchTemperatureTrend = async () => {
    if (selectedCity === "----") return;
    try {
      const response = await fetch('http://localhost:5000/process_city', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: selectedCity }),
      });

      if (response.ok) {
        const data = await response.json();
        setImageBase64(data.image_base64);
      } else {
        console.error('Error fetching data.');
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl text-white font-bold">Temperature Trends</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* City Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select a City</h2>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <button
            onClick={fetchTemperatureTrend}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Fetch Trend
          </button>
        </div>

        {/* Trend Image */}
        {imageBase64 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Temperature Trend for {selectedCity}</h2>
            <img
              src={`data:image/png;base64,${imageBase64}`}
              alt={`Temperature Trend for ${selectedCity}`}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default TemperatureTrend;
