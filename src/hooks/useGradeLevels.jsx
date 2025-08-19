import { useLocalStorage } from './useLocalStorage';

export const useGradeLevels = () => {
  const [gradeLevels, setGradeLevels] = useLocalStorage('staffDirectory_gradeLevels', [
    { id: 1, name: 'LVL1', description: 'Entry Level' },
    { id: 2, name: 'LVL2', description: 'Junior Level' },
    { id: 3, name: 'LVL3', description: 'Senior Level' },
    { id: 4, name: 'LVL4', description: 'Lead Level' },
    { id: 5, name: 'LVL5', description: 'Executive Level' }
  ]);

  const addGradeLevel = (gradeLevelData) => {
    const newGradeLevel = {
      id: Date.now(),
      ...gradeLevelData,
      createdAt: new Date().toISOString()
    };
    setGradeLevels(prev => [...prev, newGradeLevel]);
  };

  const updateGradeLevel = (id, gradeLevelData) => {
    setGradeLevels(prev =>
      prev.map(grade =>
        grade.id === id
          ? { ...grade, ...gradeLevelData, updatedAt: new Date().toISOString() }
          : grade
      )
    );
  };

  const deleteGradeLevel = (id) => {
    setGradeLevels(prev => prev.filter(grade => grade.id !== id));
  };

  const getGradeLevelById = (id) => {
    return gradeLevels.find(grade => grade.id === id);
  };

  const getGradeLevelByName = (name) => {
    return gradeLevels.find(grade => grade.name === name);
  };

  return {
    gradeLevels,
    addGradeLevel,
    updateGradeLevel,
    deleteGradeLevel,
    getGradeLevelById,
    getGradeLevelByName
  };
};
