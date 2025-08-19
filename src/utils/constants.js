export const GRADE_LEVEL_COLORS = {
  'LVL1': {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    ring: 'ring-green-500'
  },
  'LVL2': {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
    ring: 'ring-blue-500'
  },
  'LVL3': {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-200',
    ring: 'ring-purple-500'
  },
  'LVL4': {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-200',
    ring: 'ring-orange-500'
  },
  'LVL5': {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    ring: 'ring-red-500'
  }
};

export const DEPARTMENTS = [
  'Engineering',
  'Human Resources',
  'Marketing',
  'Sales',
  'Finance',
  'Operations',
  'Customer Service',
  'Legal',
  'IT Support',
  'Product Management',
  'Quality Assurance',
  'Research & Development'
];

export const ROLES = [
  'Software Engineer',
  'Senior Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Product Manager',
  'Project Manager',
  'UI/UX Designer',
  'Data Scientist',
  'Business Analyst',
  'HR Manager',
  'Marketing Manager',
  'Sales Representative',
  'Customer Success Manager',
  'Finance Analyst',
  'Operations Manager'
];

export const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s\.\']+$/
  },
  email: {
    required: false,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    required: false,
    pattern: /^[\+]?[1-9][\d]{0,15}$/
  },
  role: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  department: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  country: {
    required: true
  },
  address: {
    required: true,
    minLength: 10,
    maxLength: 500
  }
};

export const LOCAL_STORAGE_KEYS = {
  EMPLOYEES: 'staffDirectory_employees',
  GRADE_LEVELS: 'staffDirectory_gradeLevels',
  SETTINGS: 'staffDirectory_settings'
};

export const API_ENDPOINTS = {
  COUNTRIES: 'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json'
};
export const DEFAULT_COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia',
  'Austria', 'Bangladesh', 'Belgium', 'Brazil', 'Canada',
  'Chile', 'China', 'Colombia', 'Denmark', 'Egypt',
  'Finland', 'France', 'Germany', 'Ghana', 'Greece',
  'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',] 