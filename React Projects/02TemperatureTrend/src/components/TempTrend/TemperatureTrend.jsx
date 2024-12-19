// Import necessary modules
import React, { useState } from 'react';

function TemperatureComparisonApp() {
  const [selectedCity, setSelectedCity] = useState('----');
  const [imagePath, setImagePath] = useState('');
  const [disCity, setDisCity] = useState('');
  const [comparisonImagePath, setComparisonImagePath] = useState(null);

  const cities = ["Ahemadabad", "Bengaluru", "Chennai", "Delhi", "Hyderabad", "Kolkata", "Mumbai", "Pune"];

  // Function to fetch temperature trend for a city
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
        setImagePath(`http://localhost:5000${data.image_path}`);
        setDisCity(selectedCity);
      } else {
        console.error('Error fetching data.');
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  // Function to fetch the comparison chart
  const fetchComparisonChart = async (type) => {
    try {
      const endpoint = type === 'heatmap' 
        ? 'http://localhost:5000/compare_cities' 
        : 'http://localhost:5000/compare_cities_radar';

      const response = await fetch(endpoint);

      if (response.ok) {
        const data = await response.json();
        setComparisonImagePath(`http://localhost:5000${data.image_path}`);
      } else {
        console.error("Failed to fetch the comparison chart.");
      }
    } catch (error) {
      console.error("Error fetching comparison chart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">City Temperature Analysis</h1>

      {/* City Temperature Trend Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-3/4">
        <h2 className="text-xl font-semibold mb-4">Select a City</h2>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="----" disabled>
            ----
          </option>

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

        {imagePath && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Temperature Trend for {disCity}</h2>
            <img
              src={imagePath}
              alt={`Temperature Trend for ${selectedCity}`}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Comparison Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-3/4">
        <h2 className="text-xl font-semibold mb-4">Compare City Trends</h2>

        <div className="flex gap-4">
          <button
            onClick={() => fetchComparisonChart('heatmap')}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            View Heatmap
          </button>
          <button
            onClick={() => fetchComparisonChart('radar')}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            View Radar Chart
          </button>
        </div>

        {comparisonImagePath && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">City Comparison Chart</h2>
            <img 
              src={comparisonImagePath} 
              alt="City Comparison Chart" 
              className="w-full h-auto rounded-lg" 
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TemperatureComparisonApp;
