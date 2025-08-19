// API service for external data fetching

const API_ENDPOINTS = {
  COUNTRIES: 'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json'
};

// Fetch countries from external API
export const fetchCountries = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.COUNTRIES);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract unique countries and sort them
    const uniqueCountries = [...new Set(data.map(city => city.country))]
      .filter(country => country && country.trim() !== '')
      .sort();
    
    return uniqueCountries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    
    // Return fallback countries if API fails
    return [
      'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia',
      'Austria', 'Bangladesh', 'Belgium', 'Brazil', 'Canada',
      'Chile', 'China', 'Colombia', 'Denmark', 'Egypt',
      'Finland', 'France', 'Germany', 'Ghana', 'Greece',
      'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
      'Israel', 'Italy', 'Japan', 'Jordan', 'Kenya',
      'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand',
      'Nigeria', 'Norway', 'Pakistan', 'Philippines', 'Poland',
      'Portugal', 'Russia', 'Saudi Arabia', 'Singapore', 'South Africa',
      'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Thailand',
      'Turkey', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
      'Venezuela', 'Vietnam'
    ];
  }
};

// Fetch cities by country (if needed for future enhancements)
export const fetchCitiesByCountry = async (country) => {
  try {
    const response = await fetch(API_ENDPOINTS.COUNTRIES);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter cities by country
    const cities = data
      .filter(city => city.country === country)
      .map(city => city.name)
      .filter(city => city && city.trim() !== '')
      .sort();
    
    // Remove duplicates
    return [...new Set(cities)];
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

// Generic API call function
export const apiCall = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Simulate API delay for better UX (optional)
export const simulateApiDelay = (ms = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};