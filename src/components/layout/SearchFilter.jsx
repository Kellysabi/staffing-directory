// SearchFilter.jsx
import React, { useState, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { debounce } from '../../utils/helpers';

// SearchFilter.jsx
// This component provides a search and filter interface for employee listings
// It allows searching by name, role, department, email, skills, and bio
// It also includes filters for grade level, country, and salary ranges
// It handles input validation and provides feedback for invalid inputs
// It uses local state for search term and filter values, and calls provided setter functions to update the parent component's state
// It also includes error handling for invalid filter inputs
// It displays active filters and allows clearing them individually or all at once
// It uses a responsive design with a toggle for showing/hiding filters
// The component is styled using Tailwind CSS for a modern and clean look
// It includes accessibility features like focus states and clear button functionality
const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  filterGrade,
  setFilterGrade,
  filterCountry,
  setFilterCountry,
  filterMinSalary,
  setFilterMinSalary,
  filterMaxSalary,
  setFilterMaxSalary,
  gradeLevels,
  countries,
  onFilterError
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [showFilters, setShowFilters] = useState(false);

  // Debug: Log props to verify functions are passed correctly
  useEffect(() => {
    const requiredFunctions = {
      setSearchTerm,
      setFilterGrade,
      setFilterCountry,
      setFilterMinSalary,
      setFilterMaxSalary,
      onFilterError
    };

    Object.entries(requiredFunctions).forEach(([name, func]) => {
      if (typeof func !== 'function') {
        console.error(`${name} is not a function:`, func);
      }
    });
  }, [setSearchTerm, setFilterGrade, setFilterCountry, setFilterMinSalary, setFilterMaxSalary, onFilterError]);

  const debouncedSetSearchTerm = debounce((value) => {
    if (typeof setSearchTerm === 'function') {
      setSearchTerm(value);
    } else {
      console.error('setSearchTerm is not a function');
    }
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    debouncedSetSearchTerm(value);
  };

  const clearNonCountryFilters = () => {
    if (typeof setSearchTerm === 'function') setSearchTerm('');
    setLocalSearchTerm('');
    if (typeof setFilterGrade === 'function') setFilterGrade('');
    if (typeof setFilterMinSalary === 'function') setFilterMinSalary('');
    if (typeof setFilterMaxSalary === 'function') setFilterMaxSalary('');
  };

  const handleCountryChange = (e) => {
    const value = e.target.value;
    if (typeof setFilterCountry === 'function') {
      setFilterCountry(value);
      if (value) {
        clearNonCountryFilters();
      }
    } else {
      console.error('setFilterCountry is not a function');
      if (typeof onFilterError === 'function') {
        onFilterError('Filter error: Unable to update country filter');
      }
    }
  };

  const clearAllFilters = () => {
    if (typeof setSearchTerm === 'function') setSearchTerm('');
    setLocalSearchTerm('');
    if (typeof setFilterGrade === 'function') setFilterGrade('');
    if (typeof setFilterCountry === 'function') setFilterCountry('');
    if (typeof setFilterMinSalary === 'function') setFilterMinSalary('');
    if (typeof setFilterMaxSalary === 'function') setFilterMaxSalary('');
    if (typeof onFilterError === 'function') onFilterError(null);
  };

  const handleSalaryChange = (e, type) => {
    const value = e.target.value;
    
    if (type === 'min' && typeof setFilterMinSalary === 'function') {
      setFilterMinSalary(value);
    } else if (type === 'max' && typeof setFilterMaxSalary === 'function') {
      setFilterMaxSalary(value);
    } else {
      console.error(`Setter function for ${type} salary is not available`);
      return;
    }

    // Validation
    if (value && parseFloat(value) < 0) {
      if (typeof onFilterError === 'function') {
        onFilterError('Salary cannot be negative');
      }
      return;
    }

    // Check salary range validity
    const minSal = type === 'min' ? value : filterMinSalary;
    const maxSal = type === 'max' ? value : filterMaxSalary;

    if (minSal && maxSal && parseFloat(minSal) > parseFloat(maxSal)) {
      if (typeof onFilterError === 'function') {
        onFilterError('Minimum salary cannot exceed maximum salary');
      }
    } else {
      if (typeof onFilterError === 'function') {
        onFilterError(null);
      }
    }
  };

  const activeFilters = [
    searchTerm && `Search: ${searchTerm}`,
    filterGrade && `Grade: ${filterGrade}`,
    filterCountry && `Country: ${filterCountry}`,
    filterMinSalary && `Min Salary: $${filterMinSalary}`,
    filterMaxSalary && `Max Salary: $${filterMaxSalary}`
  ].filter(Boolean);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filter Employees
        </h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex items-center mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={localSearchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, role, department, email, skills, or bio..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grade Level
            </label>
            <select
              value={filterGrade}
              onChange={(e) => {
                if (typeof setFilterGrade === 'function') {
                  setFilterGrade(e.target.value);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Grades</option>
              {gradeLevels && gradeLevels.map && gradeLevels.map(grade => (
                <option key={grade.id} value={grade.name}>
                  {grade.name} - {grade.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <select
              value={filterCountry}
              onChange={handleCountryChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Countries</option>
              {countries && countries.length > 0 ? (
                countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))
              ) : (
                <option value="" disabled>Loading countries...</option>
              )}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Salary
              </label>
              <input
                type="number"
                value={filterMinSalary}
                onChange={(e) => handleSalaryChange(e, 'min')}
                placeholder="Min salary"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Salary
              </label>
              <input
                type="number"
                value={filterMaxSalary}
                onChange={(e) => handleSalaryChange(e, 'max')}
                placeholder="Max salary"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {activeFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">Active Filters:</span>
          {activeFilters.map((filter, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full"
            >
              {filter}
              <button
                onClick={clearAllFilters}
                className="ml-2 text-indigo-600 hover:text-indigo-800"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          <button
            onClick={clearAllFilters}
            className="ml-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;