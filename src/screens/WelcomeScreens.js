// // import React, { useState,useEffect, useContext } from 'react';
// // import { StyleSheet, ImageBackground, Image, Dimensions, View, Platform, Text, TouchableOpacity, Modal } from 'react-native';
// // import { StatusBar } from 'expo-status-bar';
// // import Constants from 'expo-constants';
// // import { useSafeAreaInsets } from 'react-native-safe-area-context';
// // // import * as AuthSession from 'expo-auth-session';
// // // import * as WebBrowser from 'expo-web-browser';
// // import { AuthContext } from '../context/AuthContext';
// // import { useKakaoLogin } from '../hooks/useKakaoLogin';
// // import { useNavigation } from '@react-navigation/native';


// // const { width, height } = Dimensions.get('window');

// // const WelcomeScreen = () => {
// //     const { login } = useContext(AuthContext);
// //     const { signInWithKakao } = useKakaoLogin();
// //     // 안전 영역의 인셋 값을 가져옵니다
// //     const insets = useSafeAreaInsets();
// //     const [modalOpen, setModalOpen] = useState(false); // 모달 상태
// //     const navigation = useNavigation();
// //     const styles = StyleSheet.create({
// //         container: {
// //         flex: 1,
// //         marginTop: Platform.OS === 'ios' ? -insets.top : 0,
// //         marginBottom: Platform.OS === 'ios' ? -insets.bottom : 0,
// //         justifyContent: "center",
// //         alignItems : "center"
// //         },
// //         background: {
// //         flex: 1,
// //         width: '100%',
// //         height: '100%'
// //         },
// //         cloud: {
// //         position: 'absolute',
// //         opacity: 0.55,
// //         resizeMode: 'contain'
// //         },
// //         cloud1: {
// //         top: 50 + (Platform.OS === 'ios' ? Constants.statusBarHeight : 0),
// //         left: 20,
// //         width: 140,
// //         height: 60
// //         },
// //         cloud2: {
// //         top: height * 0.3,
// //         right: 20, 
// //         width: 120, 
// //         height: 50 
// //         },
// //         cloud3: {
// //         bottom: 80 + (Platform.OS === 'ios' ? insets.bottom : 0),
// //         left: 30,
// //         width: 140,
// //         height: 45
// //         },
// //         cloud4: {
// //         bottom: 30 + (Platform.OS === 'ios' ? insets.bottom : 0),
// //         right: 40,
// //         width: 110,
// //         height: 35
// //         },
// //         logo : {
// //         width: 150,
// //         height: 150,
// //         resizeMode: 'contain',
// //         marginBottom: 8,
// //         },
// //         content: {
// //         flex : 1,
// //         alignItems: 'center',
// //         zIndex: 10,
// //         justifyContent : 'center',
// //         width : '100%',
// //         },
// //         title: {
// //         fontSize: 36,
// //         fontWeight: '800',
// //         color: '#b881c2',
// //         marginBottom: 10,
// //         textAlign: 'center',
// //         textShadowColor: 'rgba(0, 0, 0, 0.1)',
// //         textShadowOffset: { width: 0, height: 2 },
// //         textShadowRadius: 5,
// //         },
// //         text : {
// //         fontSize : 18,
// //         color : '#555',
// //         marginBottom:40,
// //         textAlign :'center'
// //         },
// //         button : {
// //         backgroundColor :'#b881c2',
// //         paddingVertical : 15,
// //         paddingHorizontal:40,
// //         borderRadius: 30,
// //         shadowColor:'#000',
// //         shadowOffset: { width: 0, height: 4 },
// //         shadowOpacity: 0.2,
// //         shadowRadius: 5,
// //         elevation:5,
// //         marginBottom: 20,

// //         },
// //         buttonText : {
// //         color : 'white', // 색깔 조정하기
// //         fontSize : 18,
// //         fontWeight : '600'
// //         },
// //         footer : {
// //         position:'absolute',
// //         bottom : 20 + (Platform.OS === 'ios' ? insets.bottom : 0),
// //         width:'100%',
// //         alignItems:'center'
// //         },
// //         footerText: {
// //         color: '#777',
// //         fontSize: 12
// //         },
// //     modalOverlay: {
// //         flex: 1,
// //         backgroundColor: 'rgba(0,0,0,0.5)',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// //     modalBox: {
// //         backgroundColor: 'white',
// //         width: '85%',
// //         borderRadius: 20,
// //         padding: 30,
// //         alignItems: 'center',
// //         elevation: 10,
// //         shadowColor: '#000',
// //         shadowOffset: { width: 0, height: 8 },
// //         shadowOpacity: 0.2,
// //         shadowRadius: 12,
// //     },
// //     closeButton: {
// //         position: 'absolute',
// //         top: 15,
// //         right: 15,
// //     },
// //     closeButtonText: {
// //         fontSize: 24,
// //         color: '#999',
// //     },
// //     modalLogo: {
// //         width: 100,
// //         height: 100,
// //         resizeMode: 'contain',
// //         marginBottom: 10,
// //     },
// //     modalTitle: {
// //         fontSize: 16,
// //         fontWeight: '600',
// //         color: '#333',
// //         textAlign: 'center',
// //         marginBottom: 20,
// //         lineHeight: 24,
// //     },
// //     termsText: {
// //         fontSize: 12,
// //         color: '#888',
// //         textAlign: 'center',
// //         lineHeight: 18,
// //     },
// //     });

// //     const OpenModal = () => {
// //         setModalOpen(true)
// //     }
    
// //     const LoginHandler = async () => {
// //         console.log("로그인 핸들러")
// //         setModalOpen(false);
// //         navigation.navigate('OAuth');
// //     }; 

// //     return (
// //         <View style={styles.container}>
// //         <StatusBar style="light" translucent={true} backgroundColor="transparent" hidden={false} />
        
// //         <ImageBackground source={require('../assets/background.png')} style={styles.background} >
// //             <Image source={require('../assets/cloud1.png')} style={[styles.cloud, styles.cloud1]} />
// //             <Image source={require('../assets/cloud2.png')} style={[styles.cloud, styles.cloud2]} />
// //             <Image source={require('../assets/cloud3.png')} style={[styles.cloud, styles.cloud3]} />
// //             <Image source={require('../assets/cloud4.png')} style={[styles.cloud, styles.cloud4]} />

// //             <View style={styles.content}>
// //             <Image source={require('../assets/logo2.png')} style = {styles.logo} />
// //             <Text style = {styles.title}>Mood Groom</Text>
// //             <Text style = {styles.text}>당신의 감정을 구름에 담아보세요.</Text>
// //             <TouchableOpacity style = {styles.button} onPress={OpenModal}>
// //                 <Text style = {styles.buttonText}>시작하기</Text>
// //             </TouchableOpacity>
// //             </View>
            
// //             <View style = {styles.footer}>
// //             <Text style={styles.footerText}>© 2025 Mood Groom. All rights reserved.</Text>
// //             </View>
// //         </ImageBackground>

// //         {/* 카카오 로그인 모달 */}
// //         <Modal visible={modalOpen} transparent animationType="fade" onRequestClose={() => setModalOpen(false)} >
// //             <View style={styles.modalOverlay}>
// //             <View style={styles.modalBox}>
// //                 {/* 닫기 버튼 */}
// //                 <TouchableOpacity style={styles.closeButton} onPress={() => setModalOpen(false)}>
// //                 <Text style={styles.closeButtonText}>×</Text>
// //                 </TouchableOpacity>

// //                 <Image source={require('../assets/logo2.png')} style={styles.modalLogo}/>

// //                 {/* 안내 문구 */}
// //                 <Text style={styles.modalTitle}>간편하게 로그인하고{'\n'}다양한 서비스를 이용해보세요.</Text>

// //                 {/* 카카오 로그인 버튼 */}
// //                 <TouchableOpacity style={styles.kakaoButton} onPress={LoginHandler}>
// //                     <Image source={require('../assets/kakao_login_button.png')} style={styles.kakaoImage}/>
// //                 </TouchableOpacity>
// //             </View>
// //             </View>
// //         </Modal>
// //         </View>
// //     );
// // };

// // export default WelcomeScreen;

// // WelcomeScreen.js
// import React, { useState,useEffect, useContext } from 'react';
// import { StyleSheet, ImageBackground, Image, Dimensions, View, Platform, Text, TouchableOpacity, Modal, Alert } from 'react-native'; // ⭐ Alert 임포트 추가 ⭐
// import { StatusBar } from 'expo-status-bar';
// import Constants from 'expo-constants';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { AuthContext } from '../context/AuthContext';
// import { useKakaoLogin } from '../hooks/useKakaoLogin';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux'; // ⭐ useDispatch 임포트 추가 (Redux 사용 시) ⭐
// import AsyncStorage from '@react-native-async-storage/async-storage'; // ⭐ AsyncStorage 임포트 추가 ⭐
// import { setUser } from '../reducers/userReducer'; // ⭐ setUser 액션 임포트 추가 (Redux 사용 시) ⭐
// import { getUserInfo } from '../api/user'; // ⭐ getUserInfo 임포트 추가 (사용자 상세 정보 가져올 때) ⭐


// const { width, height } = Dimensions.get('window');

// const WelcomeScreen = () => {
//     const { login } = useContext(AuthContext); // AuthContext를 사용한다면 그대로 유지
//     const navigation = useNavigation();
//     const dispatch = useDispatch(); // ⭐ useDispatch 초기화 ⭐

//     // ⭐ 로그인 성공 후 처리될 콜백 함수를 정의합니다 ⭐
//     const handleLoginSuccess = async (userId) => {
//         try {
//             console.log("handleLoginSuccess: 카카오 로그인 성공! 사용자 ID:", userId);
            
//             // 1. AsyncStorage에 저장된 토큰 가져오기 (useKakaoLogin에서 저장했을 것입니다)
//             const token = await AsyncStorage.getItem('jwtToken'); 
            
//             if (token) {
//                 // 2. getUserInfo 함수를 호출하여 사용자 상세 정보(닉네임, 프로필 등) 가져오기
//                 const userInfo = await getUserInfo(token);
//                 console.log("✅ 로그인 성공 후 불러온 사용자 정보:", userInfo);

//                 // 3. Redux 스토어에 사용자 정보 업데이트
//                 dispatch(setUser({
//                     uid: userId, // 토큰 페이로드에서 받은 userId 사용
//                     nickname: userInfo.nickname,
//                     profile: userInfo.profile,
//                     // 필요한 다른 사용자 정보도 여기에 추가하세요.
//                 }));

//                 // 4. 앱의 메인 화면으로 이동
//                 navigation.replace('MainTab'); // 'MainTab'은 당신의 메인 탭 네비게이터 이름에 맞게 변경하세요.
//             } else {
//                 Alert.alert("로그인 오류", "인증 토큰을 찾을 수 없습니다. 다시 로그인해주세요.");
//             }
//         } catch (error) {
//             console.error("❌ handleLoginSuccess 오류:", error.response?.data || error.message || error);
//             Alert.alert("로그인 실패", "로그인 후 사용자 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.");
//         } finally {
//             setModalOpen(false); // 모달을 닫습니다.
//         }
//     };

//     // ⭐ useKakaoLogin 훅에 handleLoginSuccess 콜백을 전달합니다 ⭐
//     const { signInWithKakao } = useKakaoLogin(handleLoginSuccess);
    
//     const insets = useSafeAreaInsets();
//     const [modalOpen, setModalOpen] = useState(false); // 모달 상태

//     const styles = StyleSheet.create({
//         // ... (기존 스타일 코드)

//         // ⭐ 카카오 로그인 버튼 스타일을 추가하거나 수정합니다 ⭐
//         kakaoButton: { 
//             // 예를 들어, 너비와 높이 등
//             width: 250, 
//             height: 50, 
//             borderRadius: 10,
//         },
//         kakaoImage: { 
//             width: '100%', 
//             height: '100%', 
//             resizeMode: 'contain',
//         }
//     });

//     const OpenModal = () => {
//         setModalOpen(true)
//     }
    
//     // ⭐ LoginHandler 함수를 수정하여 signInWithKakao를 직접 호출하도록 합니다 ⭐
//     const LoginHandler = async () => {
//         console.log("카카오 로그인 버튼 클릭됨!");
//         setModalOpen(false); // 모달을 먼저 닫습니다.
//         await signInWithKakao(); // ⭐ 카카오 로그인 프로세스 시작! ⭐
//     }; 

//     return (
//         <View style={styles.container}>
//         <StatusBar style="light" translucent={true} backgroundColor="transparent" hidden={false} />
        
//         <ImageBackground source={require('../assets/background.png')} style={styles.background} >
//             <Image source={require('../assets/cloud1.png')} style={[styles.cloud, styles.cloud1]} />
//             <Image source={require('../assets/cloud2.png')} style={[styles.cloud, styles.cloud2]} />
//             <Image source={require('../assets/cloud3.png')} style={[styles.cloud, styles.cloud3]} />
//             <Image source={require('../assets/cloud4.png')} style={[styles.cloud, styles.cloud4]} />

//             <View style={styles.content}>
//             <Image source={require('../assets/logo2.png')} style = {styles.logo} />
//             <Text style = {styles.title}>Mood Groom</Text>
//             <Text style = {styles.text}>당신의 감정을 구름에 담아보세요.</Text>
//             <TouchableOpacity style = {styles.button} onPress={OpenModal}>
//                 <Text style = {styles.buttonText}>시작하기</Text>
//             </TouchableOpacity>
//             </View>
            
//             <View style = {styles.footer}>
//             <Text style={styles.footerText}>© 2025 Mood Groom. All rights reserved.</Text>
//             </View>
//         </ImageBackground>

//         {/* 카카오 로그인 모달 */}
//         <Modal visible={modalOpen} transparent animationType="fade" onRequestClose={() => setModalOpen(false)} >
//             <View style={styles.modalOverlay}>
//             <View style={styles.modalBox}>
//                 {/* 닫기 버튼 */}
//                 <TouchableOpacity style={styles.closeButton} onPress={() => setModalOpen(false)}>
//                 <Text style={styles.closeButtonText}>×</Text>
//                 </TouchableOpacity>

//                 <Image source={require('../assets/logo2.png')} style={styles.modalLogo}/>

//                 {/* 안내 문구 */}
//                 <Text style={styles.modalTitle}>간편하게 로그인하고{'\n'}다양한 서비스를 이용해보세요.</Text>

//                 {/* 카카오 로그인 버튼 */}
//                 <TouchableOpacity style={styles.kakaoButton} onPress={LoginHandler}>
//                     <Image source={require('../assets/kakao_login_button.png')} style={styles.kakaoImage}/>
//                 </TouchableOpacity>
//             </View>
//             </View>
//         </Modal>
//         </View>
//     );
// };

// export default WelcomeScreen;

// src/screens/WelcomeScreen.js (이 파일만 수정하면 됩니다)

import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ImageBackground, Image, Dimensions, View, Platform, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
    const { login } = useContext(AuthContext); // AuthContext를 사용한다면 유지
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [modalOpen, setModalOpen] = useState(false); // 모달 상태

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            // marginTop: Platform.OS === 'ios' ? -insets.top : 0, // 이 부분은 보통 SafeAreaView로 처리하므로 제거하거나 확인 필요
            // marginBottom: Platform.OS === 'ios' ? -insets.bottom : 0, // 이 부분도 마찬가지
            justifyContent: "center",
            alignItems: "center"
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
        logo: {
            width: 150,
            height: 150,
            resizeMode: 'contain',
            marginBottom: 8,
        },
        content: {
            flex: 1,
            alignItems: 'center',
            zIndex: 10,
            justifyContent: 'center',
            width: '100%',
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
        text: {
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
            marginBottom: 20,
        },
        buttonText: {
            color: 'white',
            fontSize: 18,
            fontWeight: '600'
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
        kakaoButton: {
            width: 250,
            height: 50,
            borderRadius: 10,
        },
        kakaoImage: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
        }
    });

    const OpenModal = () => {
        setModalOpen(true)
    }

    // ⭐ LoginHandler 함수는 이제 LoginScreen(OAuth)으로 이동만 시킵니다 ⭐
    const LoginHandler = async () => {
        console.log("WelcomeScreen: 카카오 로그인 버튼 클릭됨! LoginScreen(OAuth)으로 이동.");
        setModalOpen(false); // 모달을 먼저 닫습니다.
        navigation.navigate('OAuth'); // LoginScreen(OAuth)으로 이동
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
                    <Image source={require('../assets/logo2.png')} style={styles.logo} />
                    <Text style={styles.title}>Mood Groom</Text>
                    <Text style={styles.text}>당신의 감정을 구름에 담아보세요.</Text>
                    <TouchableOpacity style={styles.button} onPress={OpenModal}>
                        <Text style={styles.buttonText}>시작하기</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
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

                        <Image source={require('../assets/logo2.png')} style={styles.modalLogo} />

                        {/* 안내 문구 */}
                        <Text style={styles.modalTitle}>간편하게 로그인하고{'\n'}다양한 서비스를 이용해보세요.</Text>

                        {/* 카카오 로그인 버튼 */}
                        <TouchableOpacity style={styles.kakaoButton} onPress={LoginHandler}>
                            <Image source={require('../assets/kakao_login_button.png')} style={styles.kakaoImage} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default WelcomeScreen;