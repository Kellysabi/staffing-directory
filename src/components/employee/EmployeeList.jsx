import React from 'react';
import EmployeeCard from './EmployeeCard';
import { Users } from 'lucide-react';

// src/components/employee/EmployeeList.jsx
// This component displays a list of EmployeeCard components
// It handles the case when there are no employees and provides a button to add a new employee
// It is designed to be responsive and visually appealing
// The EmployeeList component receives props for employees, grade levels, and various action handlers
// It uses Tailwind CSS for styling and Lucide icons for visual elements
const EmployeeList = ({
  employees,
  gradeLevels,
  onEdit,
  onDelete,
  onViewProfile,
  onAddEmployee,
  animate = false
}) => {
    // Check if there are no employees to display
  // If there are no employees, show a message and a button to add the first employee
    // The button triggers the onAddEmployee function passed as a prop
    // If there are employees, map through them and render EmployeeCard components
  // Each EmployeeCard receives the employee data and action handlers as props
  
  if (employees.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full p-12 w-40 h-40 mx-auto mb-8 flex items-center justify-center">
          <Users className="h-20 w-20 text-indigo-500" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">No employees found</h3>
        <p className="text-gray-600 mb-10 max-w-md mx-auto text-lg">
          Start building your team by adding your first employee. You can always edit their information later.
        </p>
        <button
          onClick={onAddEmployee}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add First Employee
        </button>
      </div>
    );
  }
  // Map through the employees and render EmployeeCard for each
  // Each card can be animated based on the index and animate prop
    // The EmployeeCard component displays employee details and provides actions for editing, deleting, and viewing profiles
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {employees.map((employee, index) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewProfile={onViewProfile}
          index={index}
          animate={animate}
        />
      ))}
    </div>
  );
};

export default EmployeeList;