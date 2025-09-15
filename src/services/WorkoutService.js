import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRAMS_KEY = 'user_programs';
const EXERCISES_KEY = 'user_exercises';

export const WorkoutService = {
  // Program işlemleri
  getAllPrograms: async (userId) => {
    try {
      const programsData = await AsyncStorage.getItem(`${PROGRAMS_KEY}_${userId}`);
      return programsData ? JSON.parse(programsData) : [];
    } catch (error) {
      console.error('Error getting programs:', error);
      return [];
    }
  },

  createProgram: async (userId, program) => {
    try {
      const programs = await WorkoutService.getAllPrograms(userId);
      const newProgram = {
        id: Date.now().toString(),
        ...program,
        exercises: [],
        createdAt: new Date().toISOString(),
        userId: userId
      };
      
      const updatedPrograms = [...programs, newProgram];
      await AsyncStorage.setItem(`${PROGRAMS_KEY}_${userId}`, JSON.stringify(updatedPrograms));
      return newProgram;
    } catch (error) {
      console.error('Error creating program:', error);
      throw error;
    }
  },

  updateProgram: async (userId, programId, updates) => {
    try {
      const programs = await WorkoutService.getAllPrograms(userId);
      const programIndex = programs.findIndex(p => p.id === programId);
      
      if (programIndex === -1) throw new Error('Program not found');
      
      programs[programIndex] = {
        ...programs[programIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      await AsyncStorage.setItem(`${PROGRAMS_KEY}_${userId}`, JSON.stringify(programs));
      return programs[programIndex];
    } catch (error) {
      console.error('Error updating program:', error);
      throw error;
    }
  },

  deleteProgram: async (userId, programId) => {
    try {
      const programs = await WorkoutService.getAllPrograms(userId);
      const updatedPrograms = programs.filter(p => p.id !== programId);
      await AsyncStorage.setItem(`${PROGRAMS_KEY}_${userId}`, JSON.stringify(updatedPrograms));
    } catch (error) {
      console.error('Error deleting program:', error);
      throw error;
    }
  },

  // Hareket işlemleri
  getAllExercises: async (userId) => {
    try {
      const exercisesData = await AsyncStorage.getItem(`${EXERCISES_KEY}_${userId}`);
      return exercisesData ? JSON.parse(exercisesData) : [];
    } catch (error) {
      console.error('Error getting exercises:', error);
      return [];
    }
  },

  addExerciseToProgram: async (userId, programId, exercise) => {
    try {
      const programs = await WorkoutService.getAllPrograms(userId);
      const programIndex = programs.findIndex(p => p.id === programId);
      
      if (programIndex === -1) throw new Error('Program not found');
      
      const newExercise = {
        id: Date.now().toString(),
        ...exercise,
        addedAt: new Date().toISOString()
      };
      
      programs[programIndex].exercises.push(newExercise);
      await AsyncStorage.setItem(`${PROGRAMS_KEY}_${userId}`, JSON.stringify(programs));
      return newExercise;
    } catch (error) {
      console.error('Error adding exercise to program:', error);
      throw error;
    }
  },

  removeExerciseFromProgram: async (userId, programId, exerciseId) => {
    try {
      const programs = await WorkoutService.getAllPrograms(userId);
      const programIndex = programs.findIndex(p => p.id === programId);
      
      if (programIndex === -1) throw new Error('Program not found');
      
      programs[programIndex].exercises = programs[programIndex].exercises.filter(
        e => e.id !== exerciseId
      );
      
      await AsyncStorage.setItem(`${PROGRAMS_KEY}_${userId}`, JSON.stringify(programs));
    } catch (error) {
      console.error('Error removing exercise from program:', error);
      throw error;
    }
  },

  updateExerciseInProgram: async (userId, programId, exerciseId, updates) => {
    try {
      const programs = await WorkoutService.getAllPrograms(userId);
      const programIndex = programs.findIndex(p => p.id === programId);
      
      if (programIndex === -1) throw new Error('Program not found');
      
      const exerciseIndex = programs[programIndex].exercises.findIndex(
        e => e.id === exerciseId
      );
      
      if (exerciseIndex === -1) throw new Error('Exercise not found');
      
      programs[programIndex].exercises[exerciseIndex] = {
        ...programs[programIndex].exercises[exerciseIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      await AsyncStorage.setItem(`${PROGRAMS_KEY}_${userId}`, JSON.stringify(programs));
      return programs[programIndex].exercises[exerciseIndex];
    } catch (error) {
      console.error('Error updating exercise in program:', error);
      throw error;
    }
  }
};