import { useState, useEffect, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useEmployees = () => {
  const [employees, setEmployees] = useLocalStorage('staffDirectory_employees', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');

  const addEmployee = (employeeData) => {
    const newEmployee = {
      id: Date.now(),
      ...employeeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const updateEmployee = (id, employeeData) => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === id
          ? { ...emp, ...employeeData, updatedAt: new Date().toISOString() }
          : emp
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGrade = !filterGrade || emp.gradeLevel === filterGrade;
      
      return matchesSearch && matchesGrade;
    });
  }, [employees, searchTerm, filterGrade]);

  return {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    filteredEmployees,
    searchTerm,
    setSearchTerm,
    filterGrade,
    setFilterGrade
  };
};