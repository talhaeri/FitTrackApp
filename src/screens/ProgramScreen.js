import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import colors from '../styles/colors';
import ExerciseItem from '../components/ExerciseItem';
import CreateProgramModal from '../components/CreateProgramModal';
import AddExerciseModal from '../components/AddExerciseModal';
import { WorkoutService } from '../services/WorkoutService';

const ProgramScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isAddExerciseModalVisible, setIsAddExerciseModalVisible] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const userPrograms = await WorkoutService.getAllPrograms(user.id);
      setPrograms(userPrograms);
      if (userPrograms.length > 0) {
        setSelectedProgram(userPrograms[0]);
      }
    } catch (error) {
      console.error('Error loading programs:', error);
      Alert.alert('Hata', 'Programlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProgram = async (programData) => {
    try {
      const newProgram = await WorkoutService.createProgram(user.id, programData);
      setPrograms(prev => [...prev, newProgram]);
      setSelectedProgram(newProgram);
      Alert.alert('Başarılı', 'Program oluşturuldu');
    } catch (error) {
      console.error('Error creating program:', error);
      Alert.alert('Hata', 'Program oluşturulurken bir hata oluştu');
    }
  };

  const handleEditExercise = async (exerciseData) => {
    if (!selectedProgram || !editingExercise) {
      return;
    }

    try {
      const updatedExercise = await WorkoutService.updateExerciseInProgram(
        user.id,
        selectedProgram.id,
        editingExercise.id,
        exerciseData
      );
      
      setPrograms(prev => prev.map(program => {
        if (program.id === selectedProgram.id) {
          return {
            ...program,
            exercises: program.exercises.map(ex => 
              ex.id === editingExercise.id ? updatedExercise : ex
            )
          };
        }
        return program;
      }));
      
      setSelectedProgram(prev => ({
        ...prev,
        exercises: prev.exercises.map(ex => 
          ex.id === editingExercise.id ? updatedExercise : ex
        )
      }));
      
      setEditingExercise(null);
      Alert.alert('Başarılı', 'Hareket güncellendi');
    } catch (error) {
      console.error('Error updating exercise:', error);
      Alert.alert('Hata', 'Hareket güncellenirken bir hata oluştu');
    }
  };

  const handleAddExercise = async (exerciseData) => {
    if (!selectedProgram) {
      Alert.alert('Hata', 'Lütfen önce bir program seçin');
      return;
    }

    try {
      const newExercise = await WorkoutService.addExerciseToProgram(
        user.id,
        selectedProgram.id,
        exerciseData
      );
      
      setPrograms(prev => prev.map(program => {
        if (program.id === selectedProgram.id) {
          return {
            ...program,
            exercises: [...program.exercises, newExercise]
          };
        }
        return program;
      }));
      
      setSelectedProgram(prev => ({
        ...prev,
        exercises: [...prev.exercises, newExercise]
      }));
      
      Alert.alert('Başarılı', 'Hareket eklendi');
    } catch (error) {
      console.error('Error adding exercise:', error);
      Alert.alert('Hata', 'Hareket eklenirken bir hata oluştu');
    }
  };

  const handleDeleteExercise = async (programId, exerciseId) => {
    Alert.alert(
      'Hareketi Sil',
      'Bu hareketi silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sil', 
          style: 'destructive',
          onPress: async () => {
            try {
              await WorkoutService.removeExerciseFromProgram(user.id, programId, exerciseId);
              setPrograms(prev => prev.map(program => {
                if (program.id === programId) {
                  return {
                    ...program,
                    exercises: program.exercises.filter(ex => ex.id !== exerciseId)
                  };
                }
                return program;
              }));
              
              if (selectedProgram?.id === programId) {
                setSelectedProgram(prev => ({
                  ...prev,
                  exercises: prev.exercises.filter(ex => ex.id !== exerciseId)
                }));
              }
            } catch (error) {
              console.error('Error deleting exercise:', error);
              Alert.alert('Hata', 'Hareket silinirken bir hata oluştu');
            }
          }
        },
      ]
    );
  };

  const handleDeleteProgram = async (programId) => {
    Alert.alert(
      'Programı Sil',
      'Bu programı silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sil', 
          style: 'destructive',
          onPress: async () => {
            try {
              await WorkoutService.deleteProgram(user.id, programId);
              const updatedPrograms = programs.filter(p => p.id !== programId);
              setPrograms(updatedPrograms);
              
              if (selectedProgram?.id === programId) {
                setSelectedProgram(updatedPrograms[0] || null);
              }
            } catch (error) {
              console.error('Error deleting program:', error);
              Alert.alert('Hata', 'Program silinirken bir hata oluştu');
            }
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Antrenman Programlarım</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setIsCreateModalVisible(true)}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centerContent}>
          <Text>Yükleniyor...</Text>
        </View>
      ) : programs.length === 0 ? (
        <View style={styles.centerContent}>
          <Text style={styles.emptyText}>Henüz program oluşturmadınız</Text>
          <TouchableOpacity 
            style={styles.createFirstButton}
            onPress={() => setIsCreateModalVisible(true)}>
            <Text style={styles.createFirstButtonText}>İlk Programını Oluştur</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.programSelector}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.programTabs}>
              {programs.map((program) => (
                <TouchableOpacity
                  key={program.id}
                  style={[
                    styles.programTab,
                    selectedProgram?.id === program.id && styles.selectedProgramTab
                  ]}
                  onPress={() => setSelectedProgram(program)}>
                  <Text style={[
                    styles.programTabText,
                    selectedProgram?.id === program.id && styles.selectedProgramTabText
                  ]}>
                    {program.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {selectedProgram && (
            <View style={styles.programContent}>
              <View style={styles.programHeader}>
                <View>
                  <Text style={styles.programName}>{selectedProgram.name}</Text>
                  <Text style={styles.programInfo}>
                    {selectedProgram.type} • {selectedProgram.difficulty} • {selectedProgram.frequency}
                  </Text>
                </View>
                <View style={styles.programActions}>
                  <TouchableOpacity 
                    style={styles.startButton}
                    onPress={() => navigation.navigate('WorkoutSession', { program: selectedProgram })}>
                    <Ionicons name="play" size={20} color={colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => handleDeleteProgram(selectedProgram.id)}>
                    <Ionicons name="trash-outline" size={20} color={colors.danger} />
                  </TouchableOpacity>
                </View>
              </View>

              {selectedProgram.exercises.map((exercise) => (
                <ExerciseItem
                  key={exercise.id}
                  exercise={exercise}
                  onEdit={() => {
                    setEditingExercise(exercise);
                    setIsAddExerciseModalVisible(true);
                  }}
                  onDelete={() => handleDeleteExercise(selectedProgram.id, exercise.id)}
                />
              ))}

              <TouchableOpacity 
                style={styles.addExerciseButton}
                onPress={() => setIsAddExerciseModalVisible(true)}>
                <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
                <Text style={styles.addExerciseText}>Hareket Ekle</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}

      <CreateProgramModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onCreateProgram={handleCreateProgram}
      />

      <AddExerciseModal
        visible={isAddExerciseModalVisible}
        onClose={() => {
          setIsAddExerciseModalVisible(false);
          setEditingExercise(null);
        }}
        onAddExercise={editingExercise ? handleEditExercise : handleAddExercise}
        initialData={editingExercise}
        isEditing={!!editingExercise}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    backgroundColor: colors.white,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textGray,
    marginBottom: 20,
  },
  createFirstButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  createFirstButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  programSelector: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  programTabs: {
    paddingHorizontal: 20,
  },
  programTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
  },
  selectedProgramTab: {
    backgroundColor: colors.primary,
  },
  programTabText: {
    fontSize: 14,
    color: colors.textDark,
  },
  selectedProgramTabText: {
    color: colors.white,
    fontWeight: '600',
  },
  programContent: {
    padding: 20,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  programName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 5,
  },
  programInfo: {
    fontSize: 14,
    color: colors.textGray,
  },
  programActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  startButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f0fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fee8e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addExerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 20,
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
  },
  addExerciseText: {
    fontSize: 16,
    color: colors.primary,
    marginLeft: 8,
    fontWeight: '600',
  },
});

export default ProgramScreen;