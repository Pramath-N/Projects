import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-500">Weather Dashboard</h1>
      <p className="text-lg text-gray-400 mb-6">Welcome to the Weather Change Visualization App.</p>
      <Link
        to="/temperature-trend"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Go to Temperature Trends
      </Link>
    </div>
  );
};

export default DashboardPage;
