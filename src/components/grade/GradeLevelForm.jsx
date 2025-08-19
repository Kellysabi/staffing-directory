// src/components/grade/GradeLevelForm.jsx
// This component provides a form for creating or editing grade levels
// It includes fields for name, description, and salary ranges
// It validates input and handles submission to the parent component

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const GradeLevelForm = ({ onSubmit, onCancel, existingGradeLevels }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Grade level name is required');
      return;
    }
    if (existingGradeLevels.some(grade => grade.name.toLowerCase() === name.toLowerCase())) {
      setError('Grade level name already exists');
      return;
    }
    if (minSalary && maxSalary && parseFloat(minSalary) > parseFloat(maxSalary)) {
      setError('Minimum salary cannot exceed maximum salary');
      return;
    }
    const gradeLevelData = {
      id: uuidv4(),
      name: name.trim(),
      description: description.trim(),
      minSalary: minSalary ? parseFloat(minSalary) : null,
      maxSalary: maxSalary ? parseFloat(maxSalary) : null,
    };
    onSubmit(gradeLevelData);
    setName('');
    setDescription('');
    setMinSalary('');
    setMaxSalary('');
    setError('');
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Grade Level Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          placeholder="e.g., Senior Manager"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          placeholder="e.g., Oversees department operations and strategy"
          rows={4}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="minSalary" className="block text-sm font-medium text-gray-700">
            Minimum Salary
          </label>
          <input
            type="number"
            id="minSalary"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            placeholder="e.g., 70000"
          />
        </div>
        <div>
          <label htmlFor="maxSalary" className="block text-sm font-medium text-gray-700">
            Maximum Salary
          </label>
          <input
            type="number"
            id="maxSalary"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            placeholder="e.g., 90000"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium"
        >
          Create Grade Level
        </button>
      </div>
    </div>
  );
};

export default GradeLevelForm;