// Grade level color mapping
// This function returns a color class based on the grade level
// Used for consistent styling across components

export const getGradeLevelColor = (gradeLevel) => {
  const colors = {
    'LVL1': 'bg-green-100 text-green-800 border-green-200',
    'LVL2': 'bg-blue-100 text-blue-800 border-blue-200',
    'LVL3': 'bg-purple-100 text-purple-800 border-purple-200',
    'LVL4': 'bg-orange-100 text-orange-800 border-orange-200',
    'LVL5': 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[gradeLevel] || 'bg-gray-100 text-gray-800 border-gray-200';
};

// Form validation for employee data
export const validateEmployeeForm = (formData) => {
  const errors = {};

  // Required fields validation
  if (!formData.name?.trim()) {
    errors.name = 'Full name is required';
  }

  if (!formData.role?.trim()) {
    errors.role = 'Job role is required';
  }

  if (!formData.department?.trim()) {
    errors.department = 'Department is required';
  }

  if (!formData.country?.trim()) {
    errors.country = 'Country is required';
  }

  if (!formData.address?.trim()) {
    errors.address = 'Address is required';
  }

  if (!formData.joinDate) {
    errors.joinDate = 'Join date is required';
  }

  if (!formData.salary) {
    errors.salary = 'Salary is required';
  } else if (isNaN(formData.salary) || formData.salary <= 0) {
    errors.salary = 'Salary must be a positive number';
  }

  // Email validation
  if (formData.email && formData.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
  } else {
    errors.email = 'Email is required';
  }

  // Phone validation (basic)
  if (formData.phone && formData.phone.trim()) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
  }

  // Name validation (no numbers)
  if (formData.name?.trim()) {
    const nameRegex = /^[a-zA-Z\s\.\']+$/;
    if (!nameRegex.test(formData.name)) {
      errors.name = 'Name should only contain letters, spaces, dots, and apostrophes';
    }
  }

  return errors;
};

// Grade level validation
export const validateGradeLevel = (gradeLevelData, existingGradeLevels = []) => {
  const errors = {};

  if (!gradeLevelData.name?.trim()) {
    errors.name = 'Grade level name is required';
  } else {
    // Check for duplicate names
    const isDuplicate = existingGradeLevels.some(
      level => level.name.toLowerCase() === gradeLevelData.name.toLowerCase()
    );
    if (isDuplicate) {
      errors.name = 'Grade level name already exists';
    }
  }

  if (!gradeLevelData.description?.trim()) {
    errors.description = 'Description is required';
  }

  return errors;
};

// Format date for display
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Calculate tenure
export const calculateTenure = (joinDate) => {
  if (!joinDate) return 'N/A';
  
  const start = new Date(joinDate);
  const now = new Date();
  const diffTime = Math.abs(now - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  
  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''}${months > 0 ? `, ${months} month${months > 1 ? 's' : ''}` : ''}`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''}`;
  } else {
    return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  }
};

// Search and filter utilities
export const searchEmployees = (employees, searchTerm) => {
  if (!searchTerm.trim()) return employees;
  
  const term = searchTerm.toLowerCase();
  return employees.filter(emp => 
    emp.name.toLowerCase().includes(term) ||
    emp.role.toLowerCase().includes(term) ||
    emp.department.toLowerCase().includes(term) ||
    emp.email?.toLowerCase().includes(term) ||
    emp.country.toLowerCase().includes(term) ||
    (emp.skills && emp.skills.toLowerCase().includes(term)) ||
    (emp.bio && emp.bio.toLowerCase().includes(term))
  );
};

// Sort employees by various criteria
export const sortEmployees = (employees, sortBy = 'name', order = 'asc') => {
  return [...employees].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Handle dates
    if (sortBy === 'joinDate' || sortBy === 'createdAt') {
      aValue = new Date(aValue || 0);
      bValue = new Date(bValue || 0);
    }
    
    // Handle strings
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (order === 'desc') {
      return bValue > aValue ? 1 : -1;
    }
    
    return aValue > bValue ? 1 : -1;
  });
};

// Generate employee statistics
export const generateEmployeeStats = (employees) => {
  const stats = {
    total: employees.length,
    departments: {},
    countries: {},
    gradeLevels: {},
    recentJoins: 0
  };
  
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  employees.forEach(emp => {
    // Department stats
    stats.departments[emp.department] = (stats.departments[emp.department] || 0) + 1;
    
    // Country stats
    stats.countries[emp.country] = (stats.countries[emp.country] || 0) + 1;
    
    // Grade level stats
    if (emp.gradeLevel) {
      stats.gradeLevels[emp.gradeLevel] = (stats.gradeLevels[emp.gradeLevel] || 0) + 1;
    }
    
    // Recent joins
    if (emp.joinDate && new Date(emp.joinDate) > oneMonthAgo) {
      stats.recentJoins++;
    }
  });
  
  return stats;
};

// Export/Import utilities
export const exportEmployeesToCSV = (employees) => {
  const headers = [
    'Name', 'Email', 'Role', 'Department', 'Country', 'State', 
    'Address', 'Grade Level', 'Phone', 'Join Date', 'Salary',
    'Emergency Contact', 'Emergency Phone', 'Skills', 'Bio'
  ];
  
  const csvContent = [
    headers.join(','),
    ...employees.map(emp => [
      `"${emp.name}"`,
      `"${emp.email || ''}"`,
      `"${emp.role}"`,
      `"${emp.department}"`,
      `"${emp.country}"`,
      `"${emp.state || ''}"`,
      `"${emp.address.replace(/"/g, '""')}"`,
      `"${emp.gradeLevel || ''}"`,
      `"${emp.phone || ''}"`,
      `"${emp.joinDate || ''}"`,
      `"${emp.salary || ''}"`,
      `"${emp.emergencyContact || ''}"`,
      `"${emp.emergencyPhone || ''}"`,
      `"${emp.skills || ''}"`,
      `"${emp.bio ? emp.bio.replace(/"/g, '""') : ''}"`
    ].join(','))
  ].join('\n');
  
  return csvContent;
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};