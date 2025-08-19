import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import SearchFilter from './components/layout/SearchFilter';
import StatCard from './components/common/StatCard';
import EmployeeList from './components/employee/EmployeeList';
import EmployeeForm from './components/employee/EmployeeForm';
import EmployeeProfile from './components/employee/EmployeeProfile';
import GradeLevelManager from './components/grade/GradeLevelManager';
import LoadingSpinner from './components/common/LoadingSpinner';
import Modal from './components/common/Modal';
import { useEmployees } from './hooks/useEmployees';
import { useGradeLevels } from './hooks/useGradeLevels';
import { Users, Building2, Award, MapPin } from 'lucide-react';
import './styles/globals.css';

const API_ENDPOINTS = {
  COUNTRIES: 'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json'
};

const App = () => {
  const {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    filteredEmployees,
    searchTerm,
    setSearchTerm,
    filterGrade,
    setFilterGrade
  } = useEmployees();

  const {
    gradeLevels,
    addGradeLevel,
    deleteGradeLevel
  } = useGradeLevels();

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [filterCountry, setFilterCountry] = useState('');
  const [filterMinSalary, setFilterMinSalary] = useState('');
  const [filterMaxSalary, setFilterMaxSalary] = useState('');
  const [filterError, setFilterError] = useState(null);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showGradeLevelModal, setShowGradeLevelModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.COUNTRIES);
        const data = await response.json();
        const uniqueCountries = Array.from(new Set(data.map(city => city.country))).sort();
        setCountries(uniqueCountries);
      } catch (error) {
        console.error('Error loading countries:', error);
        // Fallback countries
        setCountries(['United States', 'Canada', 'United Kingdom', 'Germany', 'France']);
      } finally {
        setLoading(false);
        setTimeout(() => setAnimate(true), 100);
      }
    };

    loadData();
  }, []);

  const handleAddEmployee = (employeeData) => {
    addEmployee(employeeData);
    setShowAddModal(false);
  };

  const handleEditEmployee = (employeeData) => {
    updateEmployee(selectedEmployee.id, employeeData);
    setShowEditModal(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
    }
  };

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const openProfileModal = (employee) => {
    setSelectedEmployee(employee);
    setShowProfileModal(true);
  };

  const closeAllModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowProfileModal(false);
    setShowGradeLevelModal(false);
    setSelectedEmployee(null);
  };

  // Additional filtering on top of the hook's filteredEmployees
  let displayedEmployees = filteredEmployees;
  if (filterCountry) {
    displayedEmployees = displayedEmployees.filter(emp => emp.country === filterCountry);
  }
  if (filterMinSalary) {
    displayedEmployees = displayedEmployees.filter(emp => emp.salary >= parseFloat(filterMinSalary));
  }
  if (filterMaxSalary) {
    displayedEmployees = displayedEmployees.filter(emp => emp.salary <= parseFloat(filterMaxSalary));
  }

  // Statistics calculations
  const stats = {
    totalEmployees: employees.length,
    departments: new Set(employees.map(emp => emp.department)).size,
    gradeLevelsCount: gradeLevels.length,
    countries: new Set(employees.map(emp => emp.country)).size
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header 
        onAddEmployee={() => setShowAddModal(true)}
        onManageGrades={() => setShowGradeLevelModal(true)}
        animate={animate}
      />

      {/* Statistics Dashboard */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-1000 delay-300 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Employees"
            value={stats.totalEmployees}
            color="blue"
          />
          <StatCard
            icon={Building2}
            title="Departments"
            value={stats.departments}
            color="green"
          />
          <StatCard
            icon={Award}
            title="Grade Levels"
            value={stats.gradeLevelsCount}
            color="purple"
          />
          <StatCard
            icon={MapPin}
            title="Countries"
            value={stats.countries}
            color="orange"
          />
        </div>

        {/* Search and Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterGrade={filterGrade}
          setFilterGrade={setFilterGrade}
          filterCountry={filterCountry}
          setFilterCountry={setFilterCountry}
          filterMinSalary={filterMinSalary}
          setFilterMinSalary={setFilterMinSalary}
          filterMaxSalary={filterMaxSalary}
          setFilterMaxSalary={setFilterMaxSalary}
          gradeLevels={gradeLevels}
          countries={countries}
          onFilterError={setFilterError}
        />

        {/* Filter Error Display */}
        {filterError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {filterError}
          </div>
        )}

        {/* Employee List */}
        <EmployeeList
          employees={displayedEmployees}
          gradeLevels={gradeLevels}
          onEdit={openEditModal}
          onDelete={handleDeleteEmployee}
          onViewProfile={openProfileModal}
          onAddEmployee={() => setShowAddModal(true)}
          animate={animate}
        />
      </div>

      {/* Modals */}
      <Modal
        isOpen={showAddModal}
        onClose={closeAllModals}
        title="Add New Employee"
      >
        <EmployeeForm
          onSubmit={handleAddEmployee}
          onCancel={closeAllModals}
          countries={countries}
          gradeLevels={gradeLevels}
        />
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={closeAllModals}
        title="Edit Employee"
      >
        {selectedEmployee && (
          <EmployeeForm
            employee={selectedEmployee}
            onSubmit={handleEditEmployee}
            onCancel={closeAllModals}
            countries={countries}
            gradeLevels={gradeLevels}
            isEdit={true}
          />
        )}
      </Modal>

      <Modal
        isOpen={showProfileModal}
        onClose={closeAllModals}
        title="Employee Profile"
      >
        {selectedEmployee && (
          <EmployeeProfile
            employee={selectedEmployee}
            gradeLevels={gradeLevels}
            onEdit={() => {
              setShowProfileModal(false);
              openEditModal(selectedEmployee);
            }}
            onClose={closeAllModals}
          />
        )}
      </Modal>

      <Modal
        isOpen={showGradeLevelModal}
        onClose={closeAllModals}
        title="Manage Grade Levels"
      >
        <GradeLevelManager
          gradeLevels={gradeLevels}
          onAdd={addGradeLevel}
          onDelete={deleteGradeLevel}
          onClose={closeAllModals}
        />
      </Modal>
    </div>
  );
};

export default App;