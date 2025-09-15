import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';
import { exerciseDatabase } from '../data/exerciseDatabase';

const AddExerciseModal = ({ visible, onClose, onAddExercise, initialData, isEditing = false }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
    notes: '',
  });

  useEffect(() => {
    if (initialData && visible) {
      setFormData({
        name: initialData.name || '',
        sets: initialData.sets?.toString() || '',
        reps: initialData.reps?.toString() || '',
        weight: initialData.weight?.toString() || '',
        notes: initialData.notes || '',
      });
      
      // Find and set the exercise from database
      const exercise = Object.values(exerciseDatabase)
        .flat()
        .find(ex => ex.name === initialData.name);
      
      if (exercise) {
        setSelectedExercise(exercise);
        setSelectedCategory(exercise.category);
      }
    }
  }, [initialData, visible]);

  const validateForm = () => {
    if (!selectedExercise) {
      Alert.alert('Hata', 'Lütfen bir hareket seçiniz');
      return false;
    }
    if (!formData.sets || !formData.reps) {
      Alert.alert('Hata', 'Lütfen set ve tekrar sayısını belirtiniz');
      return false;
    }
    if (isNaN(formData.sets) || isNaN(formData.reps)) {
      Alert.alert('Hata', 'Set ve tekrar sayısı sayısal bir değer olmalıdır');
      return false;
    }
    if (parseInt(formData.sets) <= 0 || parseInt(formData.reps) <= 0) {
      Alert.alert('Hata', 'Set ve tekrar sayısı 0\'dan büyük olmalıdır');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    // If editing, keep the original exercise ID
    const exerciseData = {
      ...(initialData?.id && { id: initialData.id }),
      name: selectedExercise.name,
      description: selectedExercise.description,
      sets: parseInt(formData.sets),
      reps: parseInt(formData.reps),
      weight: formData.weight ? parseInt(formData.weight) : 0,
      notes: formData.notes,
    };

    onAddExercise(exerciseData);

    setFormData({
      name: '',
      sets: '',
      reps: '',
      weight: '',
      notes: '',
    });
    setSelectedCategory(null);
    setSelectedExercise(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{isEditing ? 'Hareketi Düzenle' : 'Hareket Ekle'}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.textDark} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            {/* Exercise Categories */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Kategori Seçin</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
                {Object.entries(exerciseDatabase).map(([key, category]) => (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.categoryButton,
                      selectedCategory === key && styles.selectedCategoryButton,
                    ]}
                    onPress={() => setSelectedCategory(key)}>
                    <Text
                      style={[
                        styles.categoryButtonText,
                        selectedCategory === key && styles.selectedCategoryButtonText,
                      ]}>
                      {category.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Exercise List */}
            {selectedCategory && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Hareket Seçin</Text>
                <ScrollView style={styles.exerciseList}>
                  {exerciseDatabase[selectedCategory].exercises.map((exercise) => (
                    <TouchableOpacity
                      key={exercise.id}
                      style={[
                        styles.exerciseItem,
                        selectedExercise?.id === exercise.id && styles.selectedExerciseItem,
                      ]}
                      onPress={() => setSelectedExercise(exercise)}>
                      <Text
                        style={[
                          styles.exerciseName,
                          selectedExercise?.id === exercise.id && styles.selectedExerciseName,
                        ]}>
                        {exercise.name}
                      </Text>
                      <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {selectedExercise && (
              <>
                <View style={styles.row}>
                  <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Set Sayısı <Text style={styles.required}>*</Text></Text>
                    <TextInput
                      style={[styles.input, !formData.sets && styles.requiredField]}
                      placeholder="3"
                      value={formData.sets}
                      onChangeText={(text) => setFormData({ ...formData, sets: text })}
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Tekrar Sayısı <Text style={styles.required}>*</Text></Text>
                    <TextInput
                      style={[styles.input, !formData.reps && styles.requiredField]}
                      placeholder="12"
                      value={formData.reps}
                      onChangeText={(text) => setFormData({ ...formData, reps: text })}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Ağırlık (kg)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="50"
                    value={formData.weight}
                    onChangeText={(text) => setFormData({ ...formData, weight: text })}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Notlar</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Ekstra notlar veya teknik detaylar"
                    value={formData.notes}
                    onChangeText={(text) => setFormData({ ...formData, notes: text })}
                    multiline
                    numberOfLines={4}
                  />
                </View>
              </>
            )}
          </ScrollView>

          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Text style={styles.addButtonText}>{isEditing ? 'Kaydet' : 'Hareketi Ekle'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  required: {
    color: colors.error,
    fontWeight: 'bold',
  },
  requiredField: {
    borderWidth: 1,
    borderColor: colors.error,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  closeButton: {
    padding: 5,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: colors.textDark,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.backgroundLight,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategoryButton: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: colors.textDark,
  },
  selectedCategoryButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  exerciseList: {
    maxHeight: 300,
  },
  exerciseItem: {
    padding: 15,
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
    marginBottom: 8,
  },
  selectedExerciseItem: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
    marginBottom: 4,
  },
  selectedExerciseName: {
    color: colors.primary,
  },
  exerciseDescription: {
    fontSize: 14,
    color: colors.gray,
  },
});

export default AddExerciseModal;