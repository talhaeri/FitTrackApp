import AsyncStorage from '@react-native-async-storage/async-storage';

const WATER_TRACKING_KEY = 'water_tracking';

export const WaterTrackingService = {
  // Su tüketimini getir
  getWaterConsumption: async (userId) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const key = `${WATER_TRACKING_KEY}_${userId}_${today}`;
      const data = await AsyncStorage.getItem(key);
      return data ? parseFloat(data) : 0;
    } catch (error) {
      console.error('Error getting water consumption:', error);
      return 0;
    }
  },

  // Su tüketimini güncelle
  updateWaterConsumption: async (userId, amount) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const key = `${WATER_TRACKING_KEY}_${userId}_${today}`;
      const currentAmount = await WaterTrackingService.getWaterConsumption(userId);
      const newAmount = currentAmount + amount;
      await AsyncStorage.setItem(key, newAmount.toString());
      return newAmount;
    } catch (error) {
      console.error('Error updating water consumption:', error);
      throw error;
    }
  },

  // Su tüketimini sıfırla
  resetWaterConsumption: async (userId) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const key = `${WATER_TRACKING_KEY}_${userId}_${today}`;
      await AsyncStorage.setItem(key, '0');
    } catch (error) {
      console.error('Error resetting water consumption:', error);
      throw error;
    }
  },
};