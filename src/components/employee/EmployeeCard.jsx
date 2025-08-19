import React from 'react';
import { User, Building2, MapPin, Edit2, Trash2, Eye, Mail, Phone } from 'lucide-react';
import { getGradeLevelColor, formatDate, calculateTenure } from '../../utils/helpers';

// EmployeeCard.jsx - Displays a card for each employee with their details
// This component is used to show a summary of employee information in a card format

const EmployeeCard = ({ 
  employee, 
  onEdit, 
  onDelete, 
  onViewProfile, 
  index = 0,
  animate = false 
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-gray-200 ${
        animate ? 'animate-slideUp' : ''
      }`}
      style={{
        animationDelay: animate ? `${index * 100}ms` : '0ms'
      }}
    >
      <div className="p-6">
        {/* Header with Avatar and Grade */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center">
            <div className="relative mr-4">
              {employee.image ? (
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="w-16 h-16 rounded-full object-cover border-3 border-gray-200"
                />
              ) : (
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{employee.name}</h3>
              <p className="text-gray-600 font-medium">{employee.role}</p>
              {employee.employeeId && (
                <p className="text-xs text-gray-500 mt-1">ID: {employee.employeeId}</p>
              )}
            </div>
          </div>
          {employee.gradeLevel && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getGradeLevelColor(employee.gradeLevel)}`}>
              {employee.gradeLevel}
            </span>
          )}
        </div>

        {/* Employee Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Building2 className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
            <span>{employee.department}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
            <span>{employee.country}{employee.state ? `, ${employee.state}` : ''}</span>
          </div>

          {employee.email && (
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
              <span className="truncate">{employee.email}</span>
            </div>
          )}

          {employee.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
              <span>{employee.phone}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {employee.skills && (
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Skills</div>
            <div className="flex flex-wrap gap-1">
              {employee.skills.split(',').slice(0, 3).map((skill, skillIndex) => (
                <span key={skillIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {skill.trim()}
                </span>
              ))}
              {employee.skills.split(',').length > 3 && (
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">
                  +{employee.skills.split(',').length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onViewProfile(employee)}
            className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-200 transition-all duration-200 flex items-center justify-center space-x-1 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            title="View Profile"
          >
            <Eye size={14} />
            <span>View</span>
          </button>
          
          <button
            onClick={() => onEdit(employee)}
            className="bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 transition-all duration-200 flex items-center justify-center space-x-1 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
            title="Edit Employee"
          >
            <Edit2 size={14} />
            <span>Edit</span>
          </button>
          
          <button
            onClick={() => onDelete(employee.id)}
            className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-all duration-200 flex items-center justify-center space-x-1 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            title="Delete Employee"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </div>

        {/* Join Date and Tenure */}
        {employee.joinDate && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Joined: {new Date(employee.joinDate).toLocaleDateString()}</span>
              <span>{calculateTenure(employee.joinDate)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;