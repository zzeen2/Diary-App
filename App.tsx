import React, { useContext, useEffect } from 'react';
import { Linking, SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './src/screens/WelcomeScreens';
import MainScreen from './src/components/templates/MainScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateDiary from './src/components/templates/CreateDiary'
import { Provider } from 'react-redux';
import { store } from './src/store'
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import * as WebBrowser from 'expo-web-browser';
import DiaryListScreen from './src/components/templates/DiaryList';
import MyProfile from './src/components/templates/Myprofile'
import UserProfile from './src/components/templates/UserProfile';
import DiaryDetail from './src/components/templates/DiaryDetail';
import DiaryEdit from './src/components/templates/DiaryEdit';
import StatsTemplate from './src/components/templates/StatsTemplate';
import LoginScreen from './src/components/templates/LoginScreen';
import { useDispatch } from 'react-redux';
import  fetchUser  from './src/reducers/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const dispatch = useDispatch(); 
  const navigation = useNavigation(); // navigation 훅

  useEffect(() => {
    const initUser = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        dispatch(fetchUser(token));
      }
    };
    initUser();
  }, []);

  if (isLoggedIn === null) return null;
  
  
  return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {isLoggedIn ? (
      <>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="createDiary" component={CreateDiary} />
        <Stack.Screen name="listDiary" component={DiaryListScreen} />
        <Stack.Screen name="myProfile" component={MyProfile} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="DiaryDetail" component={DiaryDetail} />
        <Stack.Screen name="DiaryEdit" component={DiaryEdit} />
        <Stack.Screen name="stats" component={StatsTemplate} />
      </>
    ) : (
      <>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="OAuth" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      </>
    )}
  </Stack.Navigator>
);

};

export default function App() {
  WebBrowser.maybeCompleteAuthSession();

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