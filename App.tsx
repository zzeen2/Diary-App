import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <WelcomeScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});