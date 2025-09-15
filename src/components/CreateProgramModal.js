import React, { useState } from 'react';
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
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';
import { frequencyOptions, difficultyOptions } from '../data/exerciseDatabase';

const CreateProgramModal = ({ visible, onClose, onCreateProgram }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    difficulty: 'Başlangıç',
    frequency: 'Haftada 3 gün',
  });

  const handleCreate = () => {
    if (!formData.name.trim()) {
      alert('Lütfen program adını giriniz');
      return;
    }
    onCreateProgram(formData);
    setFormData({
      name: '',
      description: '',
      type: '',
      difficulty: 'Başlangıç',
      frequency: 'Haftada 3 gün',
    });
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
            <Text style={styles.headerTitle}>Yeni Program Oluştur</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.textDark} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Program Adı *</Text>
              <TextInput
                style={styles.input}
                placeholder="Örn: Güç Antremanı"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Açıklama</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Program hakkında kısa bir açıklama"
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Program Türü</Text>
              <TextInput
                style={styles.input}
                placeholder="Örn: Kuvvet, Cardio, HIIT"
                value={formData.type}
                onChangeText={(text) => setFormData({ ...formData, type: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Zorluk Seviyesi</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.difficulty}
                  style={styles.picker}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                >
                  <Picker.Item label="Seviye seçin" value="" />
                  {difficultyOptions.map(option => (
                    <Picker.Item 
                      key={option.id} 
                      label={option.label} 
                      value={option.value} 
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Sıklık</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.frequency}
                  style={styles.picker}
                  onValueChange={(value) => setFormData({ ...formData, frequency: value })}
                >
                  <Picker.Item label="Sıklık seçin" value="" />
                  {frequencyOptions.map(option => (
                    <Picker.Item 
                      key={option.id} 
                      label={option.label} 
                      value={option.value} 
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createButtonText}>Programı Oluştur</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  pickerContainer: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 5,
  },
  picker: {
    height: Platform.OS === 'ios' ? 150 : 50,
    width: '100%',
    backgroundColor: colors.backgroundLight,
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
  createButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateProgramModal;