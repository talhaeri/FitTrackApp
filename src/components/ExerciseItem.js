import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';

const ExerciseItem = ({ exercise, onEdit, onDelete, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(exercise)}>
      <View style={styles.info}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.details}>
          {exercise.sets} set x {exercise.reps} tekrar • {exercise.weight}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={(e) => {
          e.stopPropagation();
          onEdit();
        }}>
          <Ionicons name="create-outline" size={16} color="#1a73e8" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={(e) => {
          e.stopPropagation();
          onDelete();
        }}>
          <Ionicons name="trash-outline" size={16} color="#d33" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fb',
    borderRadius: 10,
    marginBottom: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '500',
    marginBottom: 3,
  },
  details: {
    fontSize: 12,
    color: colors.gray,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#e8f0fe',
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#fee8e8',
  },
});

export default ExerciseItem;