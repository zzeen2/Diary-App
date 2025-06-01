import React, { useContext } from 'react';
import { Linking, SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './src/screens/WelcomeScreens';
import MainScreen from './src/components/templates/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
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

const Stack = createNativeStackNavigator();

// AppContent는 네비게이션 스크린 정의만 담당
const AppScreens = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === null) {
    // 로딩 중에는 아무것도 표시하지 않거나 로딩 스피너 표시
    return null; 
  }
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} id={undefined}>
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
        </>
      )}
    </Stack.Navigator>
  );
};

// RootNavigation은 NavigationContainer와 키 관리를 담당
const RootNavigation = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <NavigationContainer key={String(isLoggedIn)}> 
      <AppScreens />
    </NavigationContainer>
  );
};

export default function App() {
  WebBrowser.maybeCompleteAuthSession();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AuthProvider>
          <RootNavigation />
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