import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/colors';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    birthDate: '',
    height: '',
    weight: '',
    goal: 'Kas Kazanımı',
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editField, setEditField] = useState({ key: '', value: '', label: '' });

  const loadUserData = async () => {
    try {
      const usersData = await AsyncStorage.getItem('users');
      if (usersData) {
        const users = JSON.parse(usersData);
        const currentUser = users.find(u => u.email === user.email);
        if (currentUser) {
          const birthDate = currentUser.birthDate || '';
          setProfileData({
            name: currentUser.name || '',
            email: currentUser.email || '',
            birthDate: birthDate,
            height: currentUser.height ? `${currentUser.height} cm` : '',
            weight: currentUser.weight ? `${currentUser.weight} kg` : '',
            goal: currentUser.goal || 'Kas Kazanımı',
          });
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };



  const profileFields = [
    { key: 'birthDate', label: 'Doğum Tarihi', value: profileData.birthDate },
    { key: 'height', label: 'Boy', value: profileData.height },
    { key: 'weight', label: 'Kilo', value: profileData.weight },
    { key: 'goal', label: 'Hedef', value: profileData.goal },
  ];

  const handleEdit = async (field) => {
    setEditField(field);
    if (field.key === 'birthDate') {
      setShowDatePicker(true);
    } else {
      setEditModalVisible(true);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const usersData = await AsyncStorage.getItem('users');
      if (usersData) {
        const users = JSON.parse(usersData);
        const updatedUsers = users.map(u => {
          if (u.email === user.email) {
            const valueToSave = editField.key === 'birthDate' 
              ? editField.value 
              : editField.value.replace(/ (cm|kg)$/, '');
            return {
              ...u,
              [editField.key]: valueToSave
            };
          }
          return u;
        });

        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        await AsyncStorage.setItem('user', JSON.stringify({
          ...user,
          [editField.key]: editField.key === 'birthDate' 
            ? editField.value 
            : editField.value.replace(/ (cm|kg)$/, '')
        }));

        setProfileData(prev => ({
          ...prev,
          [editField.key]: editField.value
        }));

        setEditModalVisible(false);
        Alert.alert('Başarılı', 'Profil bilginiz güncellendi');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      Alert.alert('Hata', 'Profil bilgisi güncellenirken bir hata oluştu');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Çıkış Yap', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.replace('Login');
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          style={styles.header}>
          
          <View style={styles.profileAvatar}>
            <Text style={styles.avatarText}>{profileData.name ? profileData.name[0].toUpperCase() : '?'}</Text>
          </View>
          
          <Text style={styles.profileName}>{profileData.name || 'İsim belirtilmedi'}</Text>
          <Text style={styles.profileEmail}>{profileData.email}</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
            {profileFields.map((field) => (
              <TouchableOpacity
                key={field.key}
                style={styles.fieldRow}
                onPress={() => handleEdit(field)}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <View style={styles.fieldValueContainer}>
                  <Text style={styles.fieldValue}>
                    {field.value || 'Belirtilmedi'}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color={colors.gray} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ayarlar</Text>
            
            <TouchableOpacity style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Bildirimler</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.gray} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Gizlilik</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.gray} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Yardım & Destek</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.gray} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={profileData.birthDate ? new Date(profileData.birthDate) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate && event.type === 'set') {
              const formattedDate = selectedDate.toLocaleDateString('tr-TR');
              const newEditField = {
                key: 'birthDate',
                value: formattedDate,
                label: 'Doğum Tarihi'
              };
              setEditField(newEditField);
              setProfileData(prev => ({
                ...prev,
                birthDate: formattedDate
              }));
              handleSaveEdit();
            }
          }}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editField.label} Düzenle</Text>
            <TextInput
              style={styles.modalInput}
              value={editField.value}
              onChangeText={(text) => setEditField({...editField, value: text})}
              placeholder={`${editField.label} giriniz`}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setEditModalVisible(false)}>
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveEdit}>
                <Text style={styles.saveButtonText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.primary,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },

  content: {
    padding: 20,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 15,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  fieldLabel: {
    fontSize: 14,
    color: colors.gray,
  },
  fieldValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldValue: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '500',
    marginRight: 5,
  },
  logoutButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  logoutText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 25,
    width: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.lightGray,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: colors.primary,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '500',
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileScreen;