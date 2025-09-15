import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';

import { exerciseDatabase } from '../data/exercises';

const WorkoutSessionScreen = ({ route, navigation }) => {
  const [program, setProgram] = useState(() => {
    const defaultProgram = { 
      name: 'Antrenman', 
      exercises: [] 
    };

    if (!route.params?.program) {
      console.log('Program parametresi bulunamadı');
      return defaultProgram;
    }

    const receivedProgram = route.params.program;
    
    // Program ve egzersiz verilerini kontrol et ve varsayılan değerleri ekle
    return {
      ...defaultProgram,
      ...receivedProgram,
      exercises: (receivedProgram.exercises || []).map(exercise => ({
        id: exercise.id || `exercise-${Math.random()}`,
        name: exercise.name || 'İsimsiz Hareket',
        sets: exercise.sets || '3',
        reps: exercise.reps || '12',
        weight: exercise.weight || 'Vücut Ağırlığı'
      }))
    };
  });

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(20);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);

  const findExerciseDetails = (exerciseName) => {
    if (!exerciseName) {
      console.log('Egzersiz adı boş');
      return null;
    }
    
    console.log('Aranan egzersiz adı:', exerciseName);
    
    try {
      // İsmi normalleştir
      const normalizedSearchName = exerciseName
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9ğüşıöç]/g, '')  // Türkçe karakterleri koru, diğer özel karakterleri kaldır
        .trim();
      
      // exerciseDatabase'in var olduğundan emin ol
      if (!exerciseDatabase || !Array.isArray(exerciseDatabase)) {
        console.log('exerciseDatabase geçerli bir dizi değil');
        return null;
      }
      
      // Eşleşmeyi dene
      const exercise = exerciseDatabase.find(e => {
        if (!e || !e.name) return false;
        
        const normalizedName = e.name
          .toString()
          .toLowerCase()
          .replace(/[^a-z0-9ğüşıöç]/g, '')
          .trim();
        
        return normalizedName.includes(normalizedSearchName) || 
               normalizedSearchName.includes(normalizedName);
      });
      
      if (exercise) {
        console.log('Egzersiz bulundu:', exercise);
        return exercise;
      }

      console.log('Egzersiz bulunamadı');
      return null;
    } catch (error) {
      console.error('Egzersiz arama hatası:', error);
      return null;
    }
  };

  useEffect(() => {
    let interval;
    if (isResting && restTimeLeft > 0) {
      interval = setInterval(() => {
        setRestTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isResting && restTimeLeft === 0) {
      setIsResting(false);
      setRestTimeLeft(20);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimeLeft]);

  const currentExercise = (() => {
    if (!program?.exercises || !Array.isArray(program.exercises)) {
      console.log('Geçersiz program veya exercises dizisi');
      return {};
    }
    
    const exercise = program.exercises[currentExerciseIndex];
    if (!exercise) {
      console.log('Geçersiz egzersiz indeksi:', currentExerciseIndex);
      return {};
    }

    return {
      id: exercise.id || `exercise-${currentExerciseIndex}`,
      name: exercise.name || 'İsimsiz Hareket',
      sets: exercise.sets || '3',
      reps: exercise.reps || '12',
      weight: exercise.weight || 'Vücut Ağırlığı'
    };
  })();

  const handleStartWorkout = () => {
    // Program ve egzersiz verilerinin varlığını kontrol et
    if (!program || !Array.isArray(program.exercises) || program.exercises.length === 0) {
      console.log('Program durumu:', program);
      Alert.alert('Hata', 'Bu programda henüz hareket bulunmamaktadır.');
      return;
    }

    // Tüm egzersizlerin gerekli alanlarının olduğundan emin ol
    const hasValidExercises = program.exercises.every(exercise => 
      exercise && 
      typeof exercise === 'object' && 
      exercise.name && 
      exercise.sets && 
      exercise.reps
    );

    if (!hasValidExercises) {
      console.log('Geçersiz egzersiz verileri:', program.exercises);
      Alert.alert('Hata', 'Program verileri eksik veya hatalı.');
      return;
    }

    setIsWorkoutStarted(true);
  };

  const handleCompleteSet = () => {
    if (currentSetIndex + 1 < parseInt(currentExercise.sets)) {
      setIsResting(true);
      setCurrentSetIndex(currentSetIndex + 1);
    } else {
      if (currentExerciseIndex + 1 < program.exercises.length) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSetIndex(0);
        setIsResting(true);
      } else {
        setWorkoutCompleted(true);
        Alert.alert(
          'Tebrikler!',
          'Antrenmanı başarıyla tamamladınız!',
          [
            {
              text: 'Tamam',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }
    }
  };

  const handleEndWorkout = () => {
    Alert.alert(
      'Antrenmanı Sonlandır',
      'Antrenmanı sonlandırmak istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Evet',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  if (!isWorkoutStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{program.name}</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.startContainer}>
          <Text style={styles.programInfo}>
            {program.exercises.length} Hareket • {program.exercises.reduce((total, exercise) => total + parseInt(exercise.sets), 0)} Set
          </Text>
          <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
            <Ionicons name="play" size={24} color={colors.white} />
            <Text style={styles.startButtonText}>Antrenmanı Başlat</Text>
          </TouchableOpacity>

          <ScrollView style={styles.exerciseList}>
            {program.exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseItem}>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseDetails}>
                    {exercise.sets} set × {exercise.reps} tekrar • {exercise.weight} kg
                  </Text>
                </View>
                <View style={styles.exerciseNumber}>
                  <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  const handleSkipExercise = () => {
    Alert.alert(
      'Hareketi Atla',
      'Bu hareketi atlamak istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Evet',
          style: 'destructive',
          onPress: () => {
            if (currentExerciseIndex + 1 < program.exercises.length) {
              setCurrentExerciseIndex(currentExerciseIndex + 1);
              setCurrentSetIndex(0);
              setIsResting(false);
              setRestTimeLeft(20);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleEndWorkout}>
          <Ionicons name="close" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{program.name}</Text>
        {currentExerciseIndex + 1 < program.exercises.length && (
          <TouchableOpacity onPress={handleSkipExercise}>
            <Ionicons name="play-skip-forward" size={24} color={colors.textDark} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.workoutContainer}>
        <View style={styles.exerciseCard}>
          {(() => {
            const details = findExerciseDetails(currentExercise.name);
            
            return (
              <>
                <View style={styles.exerciseHeader}>
                  <View>
                    <Text style={styles.currentExercise}>{currentExercise.name}</Text>
                    <Text style={styles.exerciseDetails}>
                      {currentExercise.reps} Tekrar • {currentExercise.weight}
                    </Text>
                    {details && (
                      <Text style={styles.targetMuscles}>
                        {details.targetMuscles}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      const details = findExerciseDetails(currentExercise.name);
                      console.log('Detay butonuna basıldı');
                      console.log('Bulunan detaylar:', details);
                      
                      if (details) {
                        console.log('ExerciseDetail ekranına yönlendiriliyor...');
                        navigation.navigate('ExerciseDetail', { exercise: details });
                      } else {
                        console.log('Detay bulunamadı, uyarı gösteriliyor...');
                        Alert.alert('Bilgi', 'Bu hareket için detaylı bilgi bulunmamaktadır.');
                      }
                    }}
                    style={styles.infoButton}>
                    <Ionicons 
                      name="information-circle-outline" 
                      size={24} 
                      color={details ? colors.primary : colors.gray} 
                    />
                  </TouchableOpacity>
                </View>

                {!isResting && details?.imageUrl && (
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: details.imageUrl }}
                      style={styles.exerciseImage}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </>
            );
          })()}
          
          <View style={styles.progressInfo}>
            <Text style={styles.setProgress}>
              Set {currentSetIndex + 1}/{currentExercise.sets}
            </Text>
            <Text style={styles.exerciseProgress}>
              Hareket {currentExerciseIndex + 1}/{program.exercises.length}
            </Text>
          </View>

          {isResting ? (
            <View style={styles.restingContainer}>
              <Text style={styles.restingText}>Dinlenme</Text>
              <Text style={styles.restingTimer}>{restTimeLeft}</Text>
              <Text style={styles.restingSubtext}>saniye</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.completeButton} 
              onPress={handleCompleteSet}>
              <Ionicons name="checkmark" size={24} color={colors.white} />
              <Text style={styles.completeButtonText}>
                Seti Tamamla
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.nextExercise}>
          {currentExerciseIndex + 1 < program.exercises.length && (
            <>
              <Text style={styles.nextExerciseLabel}>Sıradaki Hareket</Text>
              <Text style={styles.nextExerciseName}>
                {program.exercises[currentExerciseIndex + 1].name}
              </Text>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  skipButton: {
    padding: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  startContainer: {
    flex: 1,
    padding: 20,
  },
  programInfo: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 20,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  startButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  exerciseList: {
    flex: 1,
  },
  exerciseItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    color: colors.gray,
  },
  exerciseNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  workoutContainer: {
    flex: 1,
    padding: 20,
  },
  exerciseCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 15,
  },
  currentExercise: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 5,
  },
  exerciseDetails: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 5,
  },
  targetMuscles: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  infoButton: {
    padding: 5,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseImage: {
    width: '80%',
    height: '80%',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    marginBottom: 30,
  },
  setProgress: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  exerciseProgress: {
    fontSize: 16,
    color: colors.gray,
  },
  restingContainer: {
    alignItems: 'center',
  },
  restingText: {
    fontSize: 18,
    color: colors.primary,
    marginBottom: 10,
  },
  restingTimer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
  },
  restingSubtext: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 5,
  },
  completeButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  completeButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  nextExercise: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
  },
  nextExerciseLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 5,
  },
  nextExerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
  },
});

export default WorkoutSessionScreen;