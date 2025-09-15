/**
 * FitTrack Application Configuration
 * 
 * This file contains the main application configuration for the FitTrack
 * fitness tracking mobile application built with React Native and Expo.
 * 
 * @author FitTrack Development Team
 * @version 1.0.0
 * @platform React Native / Expo
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';

/**
 * Main Application Component
 * 
 * This component serves as the entry point for the FitTrack application.
 * It sets up the authentication context, navigation container, and global app settings.
 * 
 * Features:
 * - Global authentication state management
 * - Navigation system setup
 * - Status bar configuration
 * 
 * @returns {JSX.Element} The root application component
 */
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}