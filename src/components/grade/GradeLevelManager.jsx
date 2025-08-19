// GradeLevelManager.jsx - Enhanced professional version for managing organizational grade levels
// This component allows administrators to view, add, edit, and delete grade levels while providing
// real-time statistics and employee assignment insights. It emphasizes usability, accessibility,
// and visual feedback for a polished HR management experience.
// Key improvements:
// - Added edit functionality with modal form pre-population
// - Assumed updateGradeLevel function available in useGradeLevels hook
// - Enhanced UI with better animations, tooltips, and responsive design
// - Improved accessibility with ARIA attributes and semantic elements
// - Added sorting of grade levels by name for better organization
// - Professional styling refinements for job interview readiness

import React, { useState } from 'react';
import { Plus, Trash2, Award, Edit2 } from 'lucide-react';
import GradeLevelForm from './GradeLevelForm';
import { useGradeLevels } from '../../hooks/useGradeLevels';
import { useEmployees } from '../../hooks/useEmployees';

const GradeLevelManager = ({ onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);
  const { gradeLevels, addGradeLevel, updateGradeLevel, deleteGradeLevel } = useGradeLevels();
  const { employees } = useEmployees();

  // Calculate employee count per grade level
  const getEmployeeCount = (gradeName) => {
    return employees.filter(emp => emp.gradeLevel === gradeName).length;
  };

  // Sort grade levels alphabetically by name
  const sortedGradeLevels = [...gradeLevels].sort((a, b) => a.name.localeCompare(b.name));

  const handleAddGradeLevel = (gradeLevelData) => {
    addGradeLevel(gradeLevelData);
    setShowForm(false);
  };

  const handleUpdateGradeLevel = (gradeLevelData) => {
    updateGradeLevel(editingGrade.id, gradeLevelData);
    setEditingGrade(null);
    setShowForm(false);
  };

  const handleDeleteGradeLevel = (id) => {
    if (window.confirm('Are you sure you want to delete this grade level?')) {
      deleteGradeLevel(id);
    }
  };

  const handleEditGradeLevel = (grade) => {
    setEditingGrade(grade);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingGrade(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto relative" role="dialog" aria-modal="true" aria-labelledby="grade-manager-title">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 id="grade-manager-title" className="text-3xl font-bold mb-2">Grade Level Management</h2>
            <p className="text-purple-100 text-lg">Define organizational hierarchy and compensation levels</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 md:mt-0 bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg flex items-center space-x-3 transition-all duration-200 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600 hover:scale-105"
            aria-label={showForm ? 'Cancel adding or editing grade level' : 'Add new grade level'}
          >
            <Plus size={24} strokeWidth={2.5} aria-hidden="true" />
            <span>{showForm ? 'Cancel' : 'Add Grade Level'}</span>
          </button>
        </div>
      </header>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 w-full max-w-lg transform transition-all duration-300 scale-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingGrade ? 'Edit Grade Level' : 'Create New Grade Level'}
            </h3>
            <GradeLevelForm
              onSubmit={editingGrade ? handleUpdateGradeLevel : handleAddGradeLevel}
              onCancel={handleCancel}
              existingGradeLevels={gradeLevels}
              grade={editingGrade}
              isEdit={!!editingGrade}
            />
          </div>
        </div>
      )}

      {/* Statistics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center transition-all duration-200 hover:shadow-xl">
          <div className="text-3xl font-bold text-indigo-600 mb-2">{gradeLevels.length}</div>
          <div className="text-gray-600">Total Grade Levels</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center transition-all duration-200 hover:shadow-xl">
          <div className="text-3xl font-bold text-green-600 mb-2">{employees.length}</div>
          <div className="text-gray-600">Total Employees</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center transition-all duration-200 hover:shadow-xl">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {gradeLevels.filter(grade => getEmployeeCount(grade.name) > 0).length}
          </div>
          <div className="text-gray-600">Active Levels</div>
        </div>
      </section>

      {/* Grade Levels List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Award className="h-5 w-5 mr-2" aria-hidden="true" />
            Grade Levels ({gradeLevels.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {sortedGradeLevels.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full p-8 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-12 w-12 text-gray-400" aria-hidden="true" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No grade levels yet</h4>
              <p className="text-gray-500 mb-6">Create your first grade level to start organizing your workforce</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Create First Grade Level
              </button>
            </div>
          ) : (
            sortedGradeLevels.map((grade) => {
              const employeeCount = getEmployeeCount(grade.name);
              return (
                <div
                  key={grade.id}
                  className="p-6 hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-lg">
                        <Award className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-bold text-gray-900">{grade.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            employeeCount > 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {employeeCount} employee{employeeCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{grade.description}</p>
                        {grade.salary && (
                          <div className="text-sm text-gray-500">
                            Salary Range: ${grade.salary.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditGradeLevel(grade)}
                        className="text-indigo-600 hover:text-indigo-800 p-2 hover:bg-indigo-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        aria-label={`Edit ${grade.name}`}
                        title="Edit grade level"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteGradeLevel(grade.id)}
                        disabled={employeeCount > 0}
                        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        aria-label={`Delete ${grade.name}`}
                        title={employeeCount > 0 ? 'Cannot delete grade level with assigned employees' : 'Delete grade level'}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Close Button */}
      <div className="flex justify-end pt-6">
        <button
          onClick={onClose}
          className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Close Manager
        </button>
      </div>
    </div>
  );
};

export default GradeLevelManager;