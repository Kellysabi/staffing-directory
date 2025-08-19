import React from 'react';

const LoadingSpinner = ({ size = 'large', text = 'Loading Staff Directory...' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-indigo-600 mx-auto mb-4 ${sizeClasses[size]}`}></div>
        <p className="text-lg text-gray-600">{text}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;