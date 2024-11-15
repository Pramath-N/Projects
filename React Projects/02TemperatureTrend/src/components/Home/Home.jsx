import React from 'react';
import { useNavigate } from 'react-router-dom';
import TempertureTrend from '../TempTrend/TemperatureTrend';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/temperature-trend');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-blue-800">
      <h1 className="text-5xl font-bold mb-8">Climate Change Dashboard</h1>
      <p className="text-lg mb-8 text-center max-w-2xl">
        Welcome to the Climate Change Dashboard. Explore data and trends related to temperature changes, CO₂ emissions, and more for major cities in India.
      </p>
      <button
        type='button'
        onClick={handleNavigate}
        className="px-8 py-4 bg-blue-700 hover:bg-blue-800 rounded-lg text-xl font-semibold transition duration-200 text-gray-300"
      >
        Check Temperature Trends
      </button>
    </div>
  );
};

export default Home;
