import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, ScrollView, ImageBackground, Image, Dimensions, View, Platform, Text, TouchableOpacity,SafeAreaView} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const MainScreen = () => {
  // SafeAreaInsets를 통해 기기별 안전 영역 정보를 가져옴
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState('diary');
    const navigation = useNavigation();
    const [selectedEmotion, setSelectedEmotion] = useState(null);

    // 감정 선택 핸들러 
    const emotionSelectHandler =(emotion) => {
        console.log("선택된 감정 : ", emotion)
        setSelectedEmotion(emotion);
    }
    // 감정 정보 넘기기
    const writeEmotion =() => {
        if(selectedEmotion) {
            navigation.navigate('DiaryWrite', {emotion : selectedEmotion})
            console.log("감정 넘어간다")
        }
    }

    // 감정 아이콘 데이터
    const emotionIcons = [
        { id: 'happy', emoji: '😊', color: '#FFEAA7', name: '행복' },
        { id: 'sad', emoji: '😢', color: '#A3D8F4', name: '슬픔' },
        { id: 'angry', emoji: '😠', color: '#FFB7B7', name: '분노' },
        { id: 'calm', emoji: '😌', color: '#B5EAD7', name: '평온' },
        { id: 'anxious', emoji: '😰', color: '#C7CEEA', name: '불안' },
        { id: 'tired', emoji: '😴', color: '#E2D8F3', name: '피곤' },
        { id: 'excited', emoji: '🤩', color: '#FFD8BE', name: '신남' },
        { id: 'confused', emoji: '🤔', color: '#D8E2DC', name: '혼란' },
        { id: 'grateful', emoji: '🤗', color: '#F0E6EF', name: '감사' },
    ];

    // 내일기 샘플 데이터
    const diaryEntries = [
        { 
        id: 1,
        title: '봄 날씨와 함께한 산책', 
        date: '2025.05.17', 
        content: '날씨가 너무 좋아서 한강 공원을 산책했다. 벚꽃이 막 피기 시작해서 정말 예뻤다. 공원에는 많은 사람들이 나와 봄을 즐기고 있었다.',
        primaryEmotion: 'happy',
        secondaryEmotion: 'calm'
        },
        { 
        id: 2,
        title: '업무에 대한 고민', 
        date: '2025.05.16', 
        content: '프로젝트 마감이 다가오는데 아직 해결하지 못한 문제가 있어서 걱정이다. 주말에도 시간을 내서 좀 더 고민해봐야 할 것 같다.',
        primaryEmotion: 'anxious',
        secondaryEmotion: null
        },
        { 
        id: 3,
        title: '오랜만에 만난 친구', 
        date: '2025.05.15', 
        content: '대학 친구를 오랜만에 만났다. 서로 많이 바빠서 자주 볼 수는 없지만, 만날 때마다 시간 가는 줄 모르게 이야기를 나눈다.',
        primaryEmotion: 'excited',
        secondaryEmotion: 'happy'
        },
    ];
    // 친구 일기 샘플 데이터
    const friendDiaryEntries = [
        {
        id: 1,
        userId: 'user1',
        userName: '민지',
        userProfile: '../assets/cloud3.png',
        title: '집에서 요리해본 날',
        date: '2025.05.18',
        content: '오늘은 처음으로 파스타를 만들어봤다. 생각보다 어렵지 않았고 맛도 괜찮았다. 다음에는 더 다양한 요리에 도전해봐야겠다.',
        primaryEmotion: 'happy',
        secondaryEmotion: 'excited',
        isPublic: true
        },
        {
        id: 2,
        userId: 'user2',
        userName: '수진',
        userProfile: '../assets/cloud3.png',
        title: '시험 끝난 후의 해방감',
        date: '2025.05.17',
        content: '드디어 기말고사가 끝났다! 한 달 동안 정말 열심히 준비했는데 끝나고 나니 해방감이 장난 아니다. 친구들과 함께 맛있는 저녁을 먹으며 축하했다.',
        primaryEmotion: 'excited',
        secondaryEmotion: 'calm',
        isPublic: true
        },
        {
        id: 3,
        userId: 'user3',
        userName: '하은',
        userProfile: '../assets/cloud3.png',
        title: '새로 산 책',
        date: '2025.05.16',
        content: '오늘 서점에서 오랫동안 찾던 책을 발견했다. 바로 사서 카페에 앉아 읽기 시작했는데 시간 가는 줄 몰랐다. 앞으로 한 주는 이 책에 빠져 살 것 같다.',
        primaryEmotion: 'calm',
        secondaryEmotion: null,
        isPublic: true
        }
    ];

    // 하단 탭 데이터
    const tabs = [
        { id: 'home', icon: '🏠', label: '홈' },
        { id: 'diary', icon: '📔', label: '일기장' },
        { id: 'stats', icon: '📊', label: '통계' },
    ];

  // 감정 찾기 헬퍼 함수
    const findEmotion = (emotionId) => {
        return emotionIcons.find(emotion => emotion.id === emotionId) || null;
    };

    const styles = StyleSheet.create({
    // 기본 레이아웃
    container: {
        flex: 1,
    },
    safeContainer: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
    },
    scrollContent: {
        flex: 1,
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },

    // 헤더 영역
    headerBar: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        //paddingBottom :10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerDivider: {
        height: 1,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginVertical: 1,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImageWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#b881c2',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    streakText: {
        fontSize: 13,
        color: '#b881c2',
        fontWeight: '800',
    },

    // 환영 헤더
    welcomeHeader: {
        fontWeight: '500',
        marginTop: 10,
        marginBottom: 20,
    },
    dateText: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    greetingText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom :8,
    },

    // 감정 선택 섹션
    emotionSection: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionText: {
        fontSize: 14,
        color: '#666',
        //color : '#b881c2',
        marginBottom: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    emotionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
    },
    emotionBubble: {
        margin: 4,
    },
    emotionIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
    },

    // 일기 목록 섹션
    diaryListSection: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    seeMoreButton: {
        fontSize: 12,
        color: '#888',
        fontWeight: '500',
    },

    // 일기 카드
    diaryCardWrapper: {
        marginBottom: 14,
    },
    diaryCard: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
        // height: 110, 
        maxHeight:120,
    },
    emotionBarContainer: {
        width: 6,
        height: '100%',
    },
    emotionBar: {
        width: '100%',
    },
    primaryEmotionBar: {
        height: '50%',
    },
    secondaryEmotionBar: {
        height: '50%',
    },
    singleEmotionBar: {
        height: '100%',
    },
    cardContent: {
        flex: 1,
        padding: 14,
        justifyContent: 'space-between', // 내용을 카드 높이에 맞게 배분
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        marginRight: 8,
    },
    cardDate: {
        fontSize: 12,
        color: '#888',
    },
    cardText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
        lineHeight: 20,
        flex: 1, 
    },
    emotionTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    emotionTag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    emotionTagEmoji: {
        fontSize: 14,
        marginRight: 4,
    },
    emotionTagName: {
        fontSize: 12,
        color: '#555',
    },
    
    // 하단 탭 네비게이션
        tabBar: {
        flexDirection: 'row',
        height: 56,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: Platform.OS === 'ios' ? insets.bottom > 0 ? 0 : 5 : 5,
    },
    activeTabButton: {
        borderTopWidth: 2,
        borderTopColor: '#b881c2',
        backgroundColor: 'rgba(184, 129, 194, 0.05)',
    },
    tabIcon: {
        fontSize: 20,
        marginBottom: 2,
    },
    tabLabel: {
        fontSize: 12,
        color: '#666',
    },
    activeTabLabel: {
        color: '#b881c2',
        fontWeight: '600',
    },
    // 친구일기 카드 
    friendDiaryCard : {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
        maxHeight: 160,
    },
    friendProfileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'space-between',
    },
    friendProfileImage : {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 8,
        backgroundColor: '#ddd',
    },
    defaultImage : {
        width : 24,
        height : 24,
        borderRadius:12
    },
    friendName : {
        fontSize: 13,
        fontWeight: '500',
        color: '#555',
    },
    selectedEmotionBox: {
        marginTop: 16,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    selectedEmotionText: {
        fontSize: 15,
        color: '#333',
        fontWeight: '600',
        marginBottom: 12,
    },
    selectedButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    emotionOnlyButton: {
        backgroundColor: '#ddd',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    diaryWriteButton: {
        backgroundColor: '#b881c2',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    selectedButtonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
    }


    });

    return (
        <View style={styles.container}>
        {/* iOS와 Android 모두에서 상태바 설정 */}
        <StatusBar style='dark' backgroundColor="transparent" translucent={true} />

        {/* 배경 이미지 */}
        <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}resizeMode="cover" >
            <SafeAreaView style={styles.safeContainer}>
            {/* 상단 헤더 */}
            <View style={[styles.headerBar, Platform.OS === 'android' && { paddingTop: insets.top || StatusBar.currentHeight || 0 }]}>
                <View style={styles.headerLeft}>
                <View style={styles.profileImageWrapper}>
                    <Image source={require('../assets/cloud4.png')} style={styles.profileImage} />
                </View>
                <Text style={styles.pageTitle}>홈</Text>
                </View>
                <Text style={styles.streakText}>🔥 3일 연속 기록 중</Text>
            </View>
            <View style={styles.headerDivider} />
            {/* 메인 컨텐츠 */}
            <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* 문구 헤더 */}
                <View style={styles.welcomeHeader}>
                <Text style={styles.dateText}>2025.05.18 (토)</Text>
                <Text style={styles.greetingText}>김지은님! 👋 </Text>
                <Text style={styles.greetingText}>오늘의 감정은 어떤가요?</Text>
                </View>

                {/* 감정 선택 섹션 */}
                <View style={styles.emotionSection}>
                    <Text style={styles.sectionText}>오늘의 감정을 선택하고 자유롭게 이야기를 들려주세요!</Text>
                    <View style={styles.emotionGrid}>
                        {emotionIcons.map((emotion, index) => (
                            <TouchableOpacity key={index} style={styles.emotionBubble} onPress={() => emotionSelectHandler(emotion)}>
                                <View style={[styles.emotionIcon, { backgroundColor: emotion.color }]}>
                                <Text>{emotion.emoji}</Text>
                                </View>
                            </TouchableOpacity>
                            ))}
                    </View>
                    {selectedEmotion && (
                        <View style={[styles.selectedEmotionBox, { backgroundColor: selectedEmotion.color + '66' }]}> 
                            <Text style={styles.selectedEmotionText}>{selectedEmotion.emoji} {selectedEmotion.name}한 기분이시군요!</Text>
                            <View style={styles.selectedButtons}>
                            <TouchableOpacity style={styles.emotionOnlyButton} onPress={emotionSelectHandler}>
                                <Text style={styles.selectedButtonText}>감정만 기록하기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.diaryWriteButton} onPress={writeEmotion}>
                                <Text style={styles.selectedButtonText}>일기 작성하기</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>

                {/* 최근 일기 섹션 */}
                <View style={styles.diaryListSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>📓 나의 최근 일기</Text>
                    <TouchableOpacity>
                    <Text style={styles.seeMoreButton}>더보기</Text>
                    </TouchableOpacity>
                </View>
                
                {/* 일기 카드 */}
                {diaryEntries.map((entry) => {
                    const primaryEmotion = findEmotion(entry.primaryEmotion);
                    const secondaryEmotion = entry.secondaryEmotion ? findEmotion(entry.secondaryEmotion) : null;
                    
                    if (!primaryEmotion) return null;
                    
                    return (
                    <TouchableOpacity key={entry.id} style={styles.diaryCardWrapper}>
                        <View style={styles.diaryCard}>
                        {/* 왼쪽 감정 색상 바 */}
                            <View style={styles.emotionBarContainer}>
                                {secondaryEmotion ? (
                                // 두 개의 감정이 있는 경우
                                <>
                                    <View style={[ styles.emotionBar, styles.primaryEmotionBar, { backgroundColor: primaryEmotion.color }]} />
                                    <View 
                                    style={[styles.emotionBar, styles.secondaryEmotionBar, { backgroundColor: secondaryEmotion.color }]} />
                                </>
                                ) : (
                                // 하나의 감정만 있는 경우
                                <View style={[styles.emotionBar, styles.singleEmotionBar, { backgroundColor: primaryEmotion.color }]} />
                                )}
                            </View>
                            
                            {/* 카드 내용 */}
                            <View style={styles.cardContent}>
                                <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle} numberOfLines={2}>{entry.title}</Text>
                                <Text style={styles.cardDate}>{`${entry.isPublic ? '🌎' : '🔒'} ${entry.date}`}</Text>
                                </View>
                                
                                <Text style={styles.cardText} numberOfLines={2}>
                                {entry.content}
                                </Text>
                                
                                {/* 감정 태그 표시 */}
                                <View style={styles.emotionTags}>
                                <View 
                                    style={[styles.emotionTag, { backgroundColor: primaryEmotion.color + '40' }]}>
                                    <Text style={styles.emotionTagEmoji}>{primaryEmotion.emoji}</Text>
                                    <Text style={styles.emotionTagName}>{primaryEmotion.name}</Text>
                                </View>
                                
                                {secondaryEmotion && (<View style={[styles.emotionTag, { backgroundColor: secondaryEmotion.color + '40' }]}>
                                    <Text style={styles.emotionTagEmoji}>{secondaryEmotion.emoji}</Text>
                                    <Text style={styles.emotionTagName}>{secondaryEmotion.name}</Text>
                                    </View>
                                )}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    );
                })}
                </View>
                {/* 친구 일기 섹션 */}
                <View style = {styles.diaryListSection}>
                    <View style = {styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>👥 친구들의 일기</Text>
                        <TouchableOpacity><Text style={styles.seeMoreButton}>더보기</Text></TouchableOpacity>
                    </View>
                    {/* 친구일기 카드 */}
                    {friendDiaryEntries.map((entry) => {
                        const primaryEmotion = findEmotion(entry.primaryEmotion);
                        const secondaryEmotion = entry.secondaryEmotion ? findEmotion(entry.secondaryEmotion) : null;
                        if (!primaryEmotion) return null;
                        return (
                            <TouchableOpacity key={entry.id} style={styles.diaryCardWrapper}>
                                <View style={styles.friendDiaryCard}>
                                    <View style={styles.emotionBarContainer}> {secondaryEmotion ? (
                                // 두 개의 감정이 있는 경우
                                <>
                                    <View style={[ styles.emotionBar, styles.primaryEmotionBar, { backgroundColor: primaryEmotion.color }]} />
                                    <View 
                                    style={[styles.emotionBar, styles.secondaryEmotionBar, { backgroundColor: secondaryEmotion.color }]} />
                                </>
                                ) : (
                                // 하나의 감정만 있는 경우
                                    <View style={[styles.emotionBar, styles.singleEmotionBar, { backgroundColor: primaryEmotion.color }]} />
                                )}
                                    </View>
                                    <View style={styles.cardContent}>
                                        <View style={styles.friendProfileSection}>
                                            <View style={styles.friendProfileImage}>
                                                {entry.userProfile && (<Image source={require('../assets/logo2.png')} style={styles.defaultImage}></Image>)}
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                <Text style={styles.friendName}>{entry.userName}</Text>
                                                <Text style={styles.cardDate}>{entry.date}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.cardHeader}>
                                            <Text style={styles.cardTitle} numberOfLines={1}>{entry.title}</Text>
                                        </View>
                                        <Text style={styles.cardText} numberOfLines={2}>{entry.content}</Text>
                                        <View style={styles.emotionTags}>
                                        <View style={[styles.emotionTag, { backgroundColor: primaryEmotion.color + '40' }]}>
                                            <Text style={styles.emotionTagEmoji}>{primaryEmotion.emoji}</Text>
                                            <Text style={styles.emotionTagName}>{primaryEmotion.name}</Text>
                                        </View>
                                        
                                        {secondaryEmotion && (<View style={[styles.emotionTag, { backgroundColor: secondaryEmotion.color + '40' }]}>
                                            <Text style={styles.emotionTagEmoji}>{secondaryEmotion.emoji}</Text>
                                            <Text style={styles.emotionTagName}>{secondaryEmotion.name}</Text>
                                            </View>
                                        )}
                                        </View>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
            
            {/* 하단 탭 네비게이션*/}
            <View style={[styles.tabBar,{ paddingBottom: insets.bottom }]}>
                {tabs.map((tab) => (
                <TouchableOpacity key={tab.id} style={[styles.tabButton, activeTab === tab.id && styles.activeTabButton]} onPress={() => setActiveTab(tab.id)}>
                    <Text style={styles.tabIcon}>{tab.icon}</Text>
                    <Text style={[styles.tabLabel,activeTab === tab.id && styles.activeTabLabel]}>{tab.label}</Text>
                </TouchableOpacity>
                ))}
            </View>
            </SafeAreaView>
        </ImageBackground>
        </View>
    );
};

export default MainScreen;