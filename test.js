import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, Image, Dimensions, View, Platform, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  // 안전 영역의 인셋 값을 가져옵니다
  const insets = useSafeAreaInsets();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? -insets.top : 0,
      marginBottom: Platform.OS === 'ios' ? -insets.bottom : 0,
      justifyContent: "center",
      alignItems : "center"
    },
    background: {
      flex: 1,
      width: '100%',
      height: '100%'
    },
    cloud: {
      position: 'absolute',
      opacity: 0.55,
      resizeMode: 'contain'
    },
    cloud1: {
      top: 50 + (Platform.OS === 'ios' ? Constants.statusBarHeight : 0),
      left: 20,
      width: 140,
      height: 60
    },
    cloud2: {
      top: height * 0.3,
      right: 20, 
      width: 120, 
      height: 50 
    },
    cloud3: {
      bottom: 80 + (Platform.OS === 'ios' ? insets.bottom : 0),
      left: 30,
      width: 140,
      height: 45
    },
    cloud4: {
      bottom: 30 + (Platform.OS === 'ios' ? insets.bottom : 0),
      right: 40,
      width: 110,
      height: 35
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      width: '100%',
      paddingHorizontal: 30
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#b881c2',
      marginBottom: 10,
      textAlign: 'center'
    },
    subtitle: {
      fontSize: 18,
      color: '#555',
      marginBottom: 40,
      textAlign: 'center'
    },
    button: {
      backgroundColor: '#b881c2',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
      marginBottom: 20
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600'
    },
    secondaryButton: {
      paddingVertical: 15,
      paddingHorizontal: 40,
    },
    secondaryButtonText: {
      color: '#666',
      fontSize: 16
    },
    footer: {
      position: 'absolute',
      bottom: 20 + (Platform.OS === 'ios' ? insets.bottom : 0),
      width: '100%',
      alignItems: 'center'
    },
    footerText: {
      color: '#777',
      fontSize: 12
    }
  });

  // 로그인 화면으로 이동하는 함수
  const handleLogin = () => {
    // 내비게이션이 설정되어 있다면 사용할 수 있습니다
    // navigation.navigate('Login');
    console.log('로그인 버튼 클릭');
  };

  // 회원가입 화면으로 이동하는 함수
  const handleSignup = () => {
    // navigation.navigate('Signup');
    console.log('회원가입 버튼 클릭');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={true} backgroundColor="transparent" hidden={false} />
      
      <ImageBackground source={require('../../assets/background.png')} style={styles.background} >
        {/* 구름 이미지들 */}
        <Image source={require('../../assets/cloud1.png')} style={[styles.cloud, styles.cloud1]} />
        <Image source={require('../../assets/cloud2.png')} style={[styles.cloud, styles.cloud2]} />
        <Image source={require('../../assets/cloud3.png')} style={[styles.cloud, styles.cloud3]} />
        <Image source={require('../../assets/cloud4.png')} style={[styles.cloud, styles.cloud4]} />
        
        {/* 메인 콘텐츠 */}
        <View style={styles.content}>
          <Image source={require('../../assets/logo2.png')} style={styles.logo} />
          <Text style={styles.title}>Mood Cloud</Text>
          <Text style={styles.subtitle}>당신의 감정을 담아보세요</Text>
          
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>시작하기</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleSignup}>
            <Text style={styles.secondaryButtonText}>이미 계정이 있으신가요?</Text>
          </TouchableOpacity>
        </View>
        
        {/* 푸터 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2023 Mood Cloud. All rights reserved.</Text>
        </View>
        <Modal
            visible={modalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
            >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.4)',
            }}>
                <View style={{
                width: '85%',
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 30,
                alignItems: 'center',
                }}>
                {/* 닫기 버튼 */}
                <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{ position: 'absolute', top: 15, right: 15 }}
                >
                    <Text style={{ fontSize: 20, color: '#999' }}>×</Text>
                </TouchableOpacity>

                {/* 안내 문구 */}
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                    무드 클라우드를 시작하려면{"\n"}로그인이 필요합니다
                </Text>

                {/* 카카오 로그인 버튼 */}
                <TouchableOpacity
                    style={{
                    backgroundColor: '#FEE500',
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    width: '100%',
                    alignItems: 'center',
                    marginTop: 20
                    }}
                    onPress={() => {
                    console.log("카카오 로그인 요청");
                    // 실제 로그인 로직 연결 예정
                    }}
                >
                    <Text style={{ color: '#191919', fontSize: 16, fontWeight: '600' }}>
                    🗣️ 카카오로 시작하기
                    </Text>
                </TouchableOpacity>

                {/* 하단 약관 */}
                <Text style={{ fontSize: 12, color: '#888', marginTop: 15, textAlign: 'center' }}>
                    로그인 시 개인정보 처리방침 및 서비스 이용약관에{"\n"}동의하는 것으로 간주합니다
                </Text>
                </View>
            </View>
            </Modal>

      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;