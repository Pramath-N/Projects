import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const navigateToTemperatureTrend = () => {
    navigate('/temperature-trend');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <h1 className="text-3xl text-white font-bold">Climate Insights</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Explore the Climate Changes Across Major Cities of India</h2>
          <p className="text-lg">
            Dive into Historical Data Analysis of temperature trends across major Indian cities.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="felx justify-center items-center">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Temperature Trends</h3>
            <p className="text-gray-600 mb-4">
              Analyze temperature changes over the years across Indian cities.
            </p>
            <button
              onClick={navigateToTemperatureTrend}
              className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              View Trends
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
