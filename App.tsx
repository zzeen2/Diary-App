import React, { useContext, useEffect } from 'react';
import { Linking, SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './src/screens/WelcomeScreens';
import MainScreen from './src/components/templates/MainScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateDiary from './src/components/templates/createDiary'
import { Provider } from 'react-redux';
import { store } from './src/store'
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import * as WebBrowser from 'expo-web-browser';
import DiaryListScreen from './src/components/templates/DiaryList';
import MyProfile from './src/components/templates/Myprofile'
import UserProfile from './src/components/templates/UserProfile';
import DiaryDetail from './src/components/templates/DiaryDetail';
import StatsTemplate from './src/components/templates/StatsTemplate';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation(); // navigation 훅
  useEffect(() => {
    // 앱이 포그라운드에 있을 때 딥링크 처리
    const handleUrl = ({ url }) => {
      console.log('App: Deep link received (foreground):', url);
      processDeepLink(url);
    };

    // 앱이 꺼져 있다가 딥링크로 실행될 때 처리
    Linking.getInitialURL().then((url) => {
      console.log(url)
      if (url) {
        console.log('App: Deep link received (initial):', url);
        processDeepLink(url);
      }
    }).catch(err => console.error('Error getting initial URL', err));

    // 리스너 등록
    const subscription = Linking.addEventListener('url', handleUrl);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      subscription.remove();
    };
  }, []); // 의존성 배열 비워 한 번만 실행되도록
    const processDeepLink = async (url) => {
    // 당신의 커스텀 스킴 확인
    console.log(url)
    if (url.startsWith('moodcloudapp://')) {
      console.log("App: 커스텀 스킴 딥링크 감지:", url);
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const success = urlParams.get('success') === 'true';
      const appToken = urlParams.get('appToken');
      const uid = urlParams.get('uid');
      const nickname = urlParams.get('nickname');
      const profile = urlParams.get('profile');
      const error = urlParams.get('error');
      const redirectTo = urlParams.get('redirectTo'); // 백엔드에서 보낸 redirectTo 파라미터

      if (success && appToken) {
        console.log("App: 딥링크 통해 로그인 성공! 토큰:", appToken);

        // redirectTo 파라미터에 따라 내비게이션
        if (redirectTo === 'Main') {
          console.log("App: Main 스크린으로 이동 요청 감지.");
          // 스택 초기화 후 Main으로 이동 (이전 화면으로 돌아갈 수 없음)
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        } else {
          // redirectTo가 없거나 다른 경우의 기본 처리
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        }
      } else {
        console.log("App: 딥링크 통해 로그인 실패. 에러:", error);
      }
    }
  };
  if (isLoggedIn === null) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none', }}>
      {/* {isLoggedIn ? (
        <>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="createDiary" component={CreateDiary} />
        </>
      ) : (
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      )} */}
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="createDiary" component={CreateDiary} />
      <Stack.Screen name="listDiary" component={DiaryListScreen} />
      <Stack.Screen name="myProfile" component={MyProfile} />
      <Stack.Screen name="UserProfile" component={UserProfile}  />
      <Stack.Screen name="DiaryDetail" component={DiaryDetail} />
      <Stack.Screen name="stats" component={StatsTemplate} />
    </Stack.Navigator>
  );
};

export default function App() {
  // WebBrowser.maybeCompleteAuthSession();

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