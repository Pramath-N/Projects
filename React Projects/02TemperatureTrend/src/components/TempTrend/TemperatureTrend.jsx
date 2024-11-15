import React, { useState } from 'react';

const TemperatureTrend = () => {
  const [selectedCity, setSelectedCity] = useState('----');
  const [disCity, setDisCity] = useState('')
  const [imageBase64, setImageBase64] = useState(''); // Store base64 image

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const cities = ["----","Ahemadabad", "Bengaluru", "Chennai", "Delhi", "Hyderabad", "Kolkata", "Mumbai", "Pune"];

  const fetchTemperatureTrend = async () => {
    if(selectedCity === "----") return;
    setDisCity(selectedCity)
    try {
      const response = await fetch('http://localhost:5000/process_city', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: selectedCity }), // Send 'city' not 'selectedCity'
      });

      if (response.ok) {
        const data = await response.json();
        setImageBase64(data.image_base64); // Set the base64 string from response
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-500">Weather Change Visualization</h1>

      <div className="mb-6">
        <select
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={fetchTemperatureTrend}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Fetch Temperature Trend
      </button>

      {imageBase64 && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4"> {(disCity === '') ? ('') : (`Temperature Trend for ${disCity}`)}</h2>
          <img
            src={`data:image/png;base64,${imageBase64}`} // Display image from base64 string
            alt={`Temperature Trend for ${selectedCity}`}
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default TemperatureTrend
