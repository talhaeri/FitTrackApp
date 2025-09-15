import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';
import { useAuth } from '../context/AuthContext';
import { WaterTrackingService } from '../services/WaterTrackingService';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [waterAmount, setWaterAmount] = useState(0);
  const [calories, setCalories] = useState(0);
  const [calorieInput, setCalorieInput] = useState('');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const progressWidth = useState(new Animated.Value(0))[0];

  useEffect(() => {
    loadWaterConsumption();
    const interval = setInterval(checkDate, 60000); // Her dakika kontrol et
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.timing(progressWidth, {
      toValue: (waterAmount / 2.5) * 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [waterAmount]);

  const loadWaterConsumption = async () => {
    const amount = await WaterTrackingService.getWaterConsumption(user.id);
    setWaterAmount(amount);
  };

  const checkDate = () => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const lastDate = lastUpdate.toISOString().split('T')[0];

    if (currentDate !== lastDate) {
      // Gün değişmiş, su tüketimini sıfırla
      WaterTrackingService.resetWaterConsumption(user.id);
      setWaterAmount(0);
      setLastUpdate(now);
    }
  };

  const handleAddWater = async () => {
    try {
      const newAmount = await WaterTrackingService.updateWaterConsumption(user.id, 0.5);
      setWaterAmount(newAmount);
      setLastUpdate(new Date());
    } catch (error) {
      Alert.alert('Hata', 'Su tüketimi güncellenirken bir hata oluştu');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          style={styles.header}>
          
          <View style={styles.userWelcome}>
            <View style={styles.userInfo}>
              <Text style={styles.welcomeText}>Merhaba, {user?.name || 'Ahmet'}! 👋</Text>
              <Text style={styles.subText}>Bugün harika görünüyorsun</Text>
            </View>
            <View style={styles.userAvatar}>
              <Text style={styles.avatarText}>{user?.name?.[0] || 'A'}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Su Tüketimi Bölümü */}
          <View style={styles.trackingCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>Günlük Su Tüketimi</Text>
                <Text style={styles.cardTarget}>Hedef: 2.5 Lt</Text>
              </View>
              <TouchableOpacity 
                style={styles.addButton} 
                onPress={handleAddWater}>
                <Ionicons name="water" size={20} color={colors.white} />
                <Text style={styles.buttonText}>+0.5 Lt</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.progressContainer}>
              <Animated.View 
                style={[
                  styles.progressBar,
                  { width: progressWidth.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%']
                  })}
                ]} 
              />
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{waterAmount.toFixed(1)} Lt</Text>
                <Text style={styles.statLabel}>Tüketilen</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{(2.5 - waterAmount).toFixed(1)} Lt</Text>
                <Text style={styles.statLabel}>Kalan</Text>
              </View>
            </View>
          </View>

          {/* Kalori Takip Bölümü */}
          <View style={[styles.trackingCard, styles.calorieCard]}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>Kalori Takibi</Text>
                <Text style={styles.cardTarget}>Günlük kalori hesaplama</Text>
              </View>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => {
                  if (calorieInput) {
                    setCalories(calories + parseInt(calorieInput));
                    setCalorieInput('');
                  }
                }}>
                <Ionicons name="add-circle" size={20} color={colors.white} />
                <Text style={styles.buttonText}>Ekle</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.calorieInputContainer}>
              <TextInput
                style={styles.calorieInput}
                placeholder="Kalori miktarı"
                keyboardType="numeric"
                value={calorieInput}
                onChangeText={setCalorieInput}
              />
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{calories}</Text>
                <Text style={styles.statLabel}>Toplam Kalori</Text>
              </View>
            </View>
          </View>
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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  trackingCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 4,
  },
  cardTarget: {
    fontSize: 14,
    color: colors.textLight,
  },
  addButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    gap: 5,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  progressContainer: {
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  calorieCard: {
    marginTop: 8,
  },
  calorieInputContainer: {
    marginBottom: 20,
  },
  calorieInput: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.white,
  },
  userWelcome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  waterContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waterInfo: {
    flex: 1,
  },
  waterLabel: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 8,
  },
  waterAmountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  waterAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginRight: 5,
  },
  waterUnit: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
  },
  waterTarget: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  addWaterButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  addWaterButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 15,
  },
});

export default HomeScreen;