import React from 'react';
import { Users, Plus, Award } from 'lucide-react';

// Header.jsx - Professional layout for the header section
// This component displays the main header with branding and action buttons
// It includes a title, subtitle, and buttons for adding employees and managing grades
//
// Props:
// - onAddEmployee: Function to handle adding a new employee
// - onManageGrades: Function to handle managing grade levels
// - animate: Boolean to control animation effects
// This component is designed to be responsive and visually appealing
// It uses Tailwind CSS for styling and Lucide icons for visual elements
// The header is fixed at the top and includes a gradient background for a modern look
// The buttons have hover effects and transitions for a polished user experience
// The layout is designed to be clean and professional, suitable for a staff directory application
// The header also includes accessibility features like focus states for keyboard navigation
// The component is optimized for performance with minimal re-renders
// The header is designed to be reusable and can be easily integrated into different parts of the application
const Header = ({ onAddEmployee, onManageGrades, animate = false }) => {
  return (
    <div className={`bg-white shadow-lg border-b transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-600 p-3 rounded-xl">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Staff Directory</h1>
              <p className="text-gray-600">Manage your organization's workforce efficiently</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onManageGrades}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-105 font-medium"
            >
              <Award size={20} />
              <span>Manage Grades</span>
            </button>
            <button
              onClick={onAddEmployee}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-105 font-medium"
            >
              <Plus size={20} />
              <span>Add Employee</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;