import React, { useState,useEffect } from 'react';
import { StyleSheet, ImageBackground, Image, Dimensions, View, Platform, Text, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { KAKAO_REST_API_KEY } from '@env';
WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');

const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

const WelcomeScreen = () => {
  // 안전 영역의 인셋 값을 가져옵니다
  const insets = useSafeAreaInsets();
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태
  
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
    logo : {
      width: 150,
      height: 150,
      resizeMode: 'contain',
      marginBottom: 8,
    },
    content: {
      flex : 1,
      alignItems: 'center',
      zIndex: 10,
      justifyContent : 'center',
      width : '100%',
    },
    title: {
      fontSize: 36,
      fontWeight: '800',
      color: '#b881c2',
      marginBottom: 10,
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.1)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 5,
    },
    text : {
      fontSize : 18,
      color : '#555',
      marginBottom:40,
      textAlign :'center'
    },
    button : {
      backgroundColor :'#b881c2',
      paddingVertical : 15,
      paddingHorizontal:40,
      borderRadius: 30,
      shadowColor:'#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation:5,
      marginBottom: 20,

    },
    buttonText : {
      color : 'white', // 색깔 조정하기
      fontSize : 18,
      fontWeight : '600'
    },
    footer : {
      position:'absolute',
      bottom : 20 + (Platform.OS === 'ios' ? insets.bottom : 0),
      width:'100%',
      alignItems:'center'
    },
    footerText: {
      color: '#777',
      fontSize: 12
    },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#999',
  },
  modalLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  termsText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    lineHeight: 18,
  },
  });

const OpenModal = () => {
  setModalOpen(true)
}
  
const LoginHandler = async () => {
  console.log("카카오 로그인 시작");

  // const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  
  // const result = await AuthSession.startAsync({ authUrl: kakaoAuthUrl });
  // console.log(result)
  // console.log("지났어")

  // if (result.type === 'success') {
  //   const code = result.params.code;
  //   console.log("✅ 카카오 인증 성공, code:", code);

  //   setModalOpen(false);
  // } else {
  //   console.log("❌ 로그인 취소 또는 실패");
  // }
};

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={true} backgroundColor="transparent" hidden={false} />
      
      <ImageBackground source={require('../assets/background.png')} style={styles.background} >
        <Image source={require('../assets/cloud1.png')} style={[styles.cloud, styles.cloud1]} />
        <Image source={require('../assets/cloud2.png')} style={[styles.cloud, styles.cloud2]} />
        <Image source={require('../assets/cloud3.png')} style={[styles.cloud, styles.cloud3]} />
        <Image source={require('../assets/cloud4.png')} style={[styles.cloud, styles.cloud4]} />

        <View style={styles.content}>
          <Image source={require('../assets/logo2.png')} style = {styles.logo} />
          <Text style = {styles.title}>Mood Groom</Text>
          <Text style = {styles.text}>당신의 감정을 구름에 담아보세요.</Text>
          <TouchableOpacity style = {styles.button} onPress={OpenModal}>
            <Text style = {styles.buttonText}>시작하기</Text>
          </TouchableOpacity>
        </View>
        
        <View style = {styles.footer}>
          <Text style={styles.footerText}>© 2025 Mood Groom. All rights reserved.</Text>
        </View>
      </ImageBackground>

      {/* 카카오 로그인 모달 */}
      <Modal visible={modalOpen} transparent animationType="fade" onRequestClose={() => setModalOpen(false)} >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {/* 닫기 버튼 */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalOpen(false)}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <Image source={require('../assets/logo2.png')} style={styles.modalLogo}/>

            {/* 안내 문구 */}
            <Text style={styles.modalTitle}>간편하게 로그인하고{'\n'}다양한 서비스를 이용해보세요.</Text>

            {/* 카카오 로그인 버튼 */}
            <TouchableOpacity style={styles.kakaoButton} onPress={LoginHandler}>
                <Image source={require('../assets/kakao_login_button.png')} style={styles.kakaoImage}/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WelcomeScreen;