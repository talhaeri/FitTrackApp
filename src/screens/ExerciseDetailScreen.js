import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors';

const { width } = Dimensions.get('window');

const ExerciseDetailScreen = ({ route }) => {
  const { exercise } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{exercise.name}</Text>
          <Text style={styles.category}>{exercise.category}</Text>
        </View>

        <View style={styles.gifContainer}>
          <Image
            source={{ uri: exercise.gifUrl }}
            style={styles.gif}
            resizeMode="contain"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nasıl Yapılır?</Text>
          <Text style={styles.description}>{exercise.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Önemli İpuçları</Text>
          {exercise.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipNumber}>{index + 1}</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hedef Kaslar</Text>
          <Text style={styles.muscles}>{exercise.targetMuscles}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: colors.gray,
  },
  gifContainer: {
    backgroundColor: colors.white,
    padding: 10,
  },
  gif: {
    width: width - 40,
    height: width - 40,
    alignSelf: 'center',
    borderRadius: 10,
  },
  section: {
    backgroundColor: colors.white,
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: colors.textDark,
    lineHeight: 24,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 10,
    fontSize: 14,
    fontWeight: '600',
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    color: colors.textDark,
    lineHeight: 24,
  },
  muscles: {
    fontSize: 16,
    color: colors.textDark,
    lineHeight: 24,
  },
});

export default ExerciseDetailScreen;