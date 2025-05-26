import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './src/screens/WelcomeScreens';
import MainScreen from './src/components/templates/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateDiary from './src/components/templates/createDiary'
import { Provider } from 'react-redux';
import { store } from '../MoodCloudApp/src/store'
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import * as WebBrowser from 'expo-web-browser';
const Stack = createNativeStackNavigator();
const AppContent = () => {
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn === null) return null;
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="createDiary" component={CreateDiary} />
        </>
      ) : (
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  WebBrowser.maybeCompleteAuthSession();// 로그인 상태에 따라 화면 결정
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AuthProvider> 
          <NavigationContainer>
            <AppContent />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});