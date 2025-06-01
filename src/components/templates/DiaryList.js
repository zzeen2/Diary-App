import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DiaryListSection, FriendDiaryListSection } from '../organisms/main';
import {FilterDropdown, SearchButton} from '../atoms/buttons';
import {HeaderBar} from '../molecules/headers';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmotions } from '../../actions/emotionAction';
import { fetchMyDiaries, fetchTodayFollowingDiaries } from '../../actions/diaryAction';
import {SearchInput} from '../atoms/inputs';
import { EmotionFilterGroup, DiarySearchArea, CalenderArea } from '../molecules/filters';
import { Feather } from '@expo/vector-icons';
import useFormmatedDate from '../../hooks/useFormattedDate';
import { TabBar } from '../organisms/TabBar';
import { FriendSearchModal } from '../molecules/modals';
import { getCalendarEmotions } from '../../api/diary';
import { getFollowingsTodayDiaries } from '../../api/diary';

const tabs = [
    { id: 'home', icon: '🏠', label: '홈' },
    { id: 'diary', icon: '📔', label: '일기장' },
    { id: 'stats', icon: '📊', label: '통계' },
    { id: 'profile', icon: '👤', label: '프로필' },
];

const FriendSearchButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.friendSearchButton}>
        <Feather name="user-plus" size={20} color="#b881c2" />
    </TouchableOpacity>
);

const DiaryListScreen = ({ route }) => {
    const insets = useSafeAreaInsets();
    const [filterType, setFilterType] = useState(route?.params?.initialFilter || 'my');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [showPrivateOnly, setShowPrivateOnly] = useState(false);
    const [privacyFilter, setPrivacyFilter] = useState('all');
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showFriendModal, setShowFriendModal] = useState(false); // ✅ 친구찾기 모달 상태
    const formattedSelectedDate = useFormmatedDate(selectedDate);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('diary');
    const [calendarEmotions, setCalendarEmotions] = useState([]); // 달력용 감정 데이터
    const [followingTodayDiaries, setFollowingTodayDiaries] = useState([]); // 팔로잉 오늘 일기
    const [currentMonth, setCurrentMonth] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    });

    // Redux 상태
    const emotions = useSelector((state) => state.emotions.emotions) || [];
    const diaryState = useSelector((state) => state.diary);
    const rawMyDiaries = diaryState?.myDiaries || [];
    const diaryLoading = diaryState?.loading || false;
    const todayFollowingDiaries = useSelector((state) => state.diary.todayFollowingDiaries) || [];

    console.log('=== DiaryListScreen 상태 ===');
    console.log('현재 필터:', filterType);
    console.log('isSearchMode:', isSearchMode);
    console.log('emotions 길이:', emotions.length);
    console.log('rawMyDiaries 길이:', rawMyDiaries.length);

    const getTodayDateString = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; 
    };

    const getTodayDotFormat = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    useEffect(() => {
        console.log('=== 데이터 로딩 시작 ===');
        dispatch(fetchEmotions());
        dispatch(fetchMyDiaries());
        dispatch(fetchTodayFollowingDiaries());
        
        // 팔로잉 오늘 일기 데이터 가져오기
        const fetchFollowingToday = async () => {
            try {
                const data = await getFollowingsTodayDiaries();
                console.log('팔로잉 오늘 일기 데이터:', data);
                setFollowingTodayDiaries(data);
            } catch (error) {
                console.error('팔로잉 오늘 일기 조회 실패:', error);
                setFollowingTodayDiaries([]);
            }
        };
        
        fetchFollowingToday();
    }, [dispatch]);

    // 달력 감정 데이터 가져오기
    useEffect(() => {
        const fetchCalendarData = async () => {
            try {
                console.log('달력 감정 데이터 가져오기:', currentMonth);
                const data = await getCalendarEmotions(currentMonth);
                console.log('달력 감정 데이터:', data);
                setCalendarEmotions(data);
            } catch (error) {
                console.error('달력 감정 데이터 가져오기 실패:', error);
            }
        };
        
        fetchCalendarData();
    }, [currentMonth]);

    // 실제 API 데이터를 캘린더 형식으로 변환
    const transformDiaryData = (diaries) => {
        return diaries.map(diary => {
            const dateStr = diary.createdAt ? diary.createdAt.split('T')[0].replace(/-/g, '.') : '';
            
            return {
                id: diary.id,
                title: diary.title,
                content: diary.content,
                date: dateStr,
                primaryEmotion: diary.userEmotion?.id || diary.aiEmotion?.id || null,
                isPublic: diary.isPublic,
                userEmotion: diary.userEmotion,
                aiEmotion: diary.aiEmotion,
                commentCount: diary.commentCount || 0,
                images: diary.images || [],
                writer: diary.writer,
                createdAt: diary.createdAt
            };
        });
    };

    // 변환된 내 일기 데이터
    const myDiaryEntries = transformDiaryData(rawMyDiaries);

    // ✅ 팔로잉 오늘 일기 데이터 변환
    const transformedFollowingDiaries = transformDiaryData(followingTodayDiaries);

    console.log('=== 팔로잉 일기 확인 ===');
    console.log('팔로잉 오늘 일기 개수:', transformedFollowingDiaries.length);
    console.log('오늘 날짜:', getTodayDotFormat());

    const findEmotion = (id) => {
        if (!Array.isArray(emotions)) return {};
        return emotions.find(e => e?.id === id) || {};
    };

    // ✅ 친구찾기 모달 열기
    const handleOpenFriendModal = () => {
        console.log('친구찾기 모달 열기');
        setShowFriendModal(true);
        // TODO: 친구찾기 모달 구현
    };

    // ✅ 헤더 오른쪽 버튼 처리
    const handleRightButtonPress = () => {
        if (filterType === 'follower') {
            // 팔로워 탭: 친구찾기 모달
            handleOpenFriendModal();
        } else {
            // 내 일기 탭: 검색 모드 토글
            setIsSearchMode((prev) => !prev);
        }
    };

    // 내 일기 검색 로직
    const searchedMyDiaries = myDiaryEntries.filter((entry) => {
        const titleHasKeyword = entry.title?.includes(searchKeyword) || false;
        const contentHasKeyword = entry.content?.includes(searchKeyword) || false;
        const matchesKeyword = titleHasKeyword || contentHasKeyword;
        
        let matchesEmotion = true;
        if (selectedEmotion) {
            matchesEmotion = entry.primaryEmotion === selectedEmotion;
        }

        let matchesPrivacy = true;
        if (privacyFilter === 'public') {
            matchesPrivacy = entry.isPublic === true;
        } else if (privacyFilter === 'private') {
            matchesPrivacy = entry.isPublic === false;
        }

        return matchesKeyword && matchesEmotion && matchesPrivacy;
    });

    return (
    <View style={styles.container}>
        <StatusBar style="dark" backgroundColor="transparent" translucent />
        <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
            <SafeAreaView style={[styles.safeContainer, { paddingTop: insets.top }]}>
            <HeaderBar 
                showBackButton={true} 
                onBackPress={() => navigation.goBack()} 
                centerContent={
                    <View style={styles.dropdownWrapper}>
                        <FilterDropdown selected={filterType} onSelect={(value) => setFilterType(value)} />
                    </View>
                }
                rightContent={
                    filterType === 'follower' 
                        ? <FriendSearchButton onPress={handleRightButtonPress} />
                        : <SearchButton onPress={handleRightButtonPress} />
                }
            />

            <View style={styles.divider} />

            <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                
                {/* ✅ 내 일기 탭 */}
                {filterType === 'my' && (
                    <>
                        {isSearchMode ? (
                            <>
                                {/* 검색/필터링 영역 */}
                                <DiarySearchArea
                                    searchKeyword={searchKeyword}
                                    setSearchKeyword={setSearchKeyword}
                                    emotions={emotions}
                                    selectedEmotion={selectedEmotion}
                                    setSelectedEmotion={setSelectedEmotion}
                                    showPrivateOnly={showPrivateOnly}
                                    setShowPrivateOnly={setShowPrivateOnly}
                                    privacyFilter={privacyFilter}
                                    setPrivacyFilter={setPrivacyFilter}
                                />

                                {/* 검색 결과 */}
                                <DiaryListSection
                                    title="📖 내 일기 검색 결과"
                                    entries={searchedMyDiaries}
                                    findEmotion={findEmotion}
                                    onPressCard={(entry) => 
                                        navigation.navigate('DiaryDetail', {
                                            diary: entry,
                                            isMine: true,
                                        })
                                    }
                                />
                            </>
                        ) : (
                            <>
                                {/* 캘린더 */}
                                <CalenderArea
                                    diaryList={myDiaryEntries}
                                    calendarEmotions={calendarEmotions}
                                    selectedDate={selectedDate}
                                    onSelectDate={setSelectedDate}
                                    onPressToday={() => setSelectedDate(getTodayDateString())}
                                    emotions={emotions}
                                    onMonthChange={(date) => {
                                        const month = `${date.year}-${String(date.month).padStart(2, '0')}`;
                                        setCurrentMonth(month);
                                    }}
                                />
                                
                                {/* 선택된 날짜의 일기 */}
                                {selectedDate && (
                                    <DiaryListSection
                                        title={`📖 ${formattedSelectedDate} 일기`}
                                        entries={myDiaryEntries.filter(d => {
                                            const convertedDate = d.date.replace(/\./g, '-');
                                            return convertedDate === selectedDate;
                                        })}
                                        findEmotion={findEmotion}
                                        onPressCard={(entry) =>
                                        navigation.navigate('DiaryDetail', {
                                            diary: entry,
                                            isMine: true,
                                        })
                                        }
                                    />
                                )}
                            </>
                        )}
                    </>
                )}

                {/* ✅ 팔로워 일기 탭 */}
                {filterType === 'follower' && (
                    <View style={styles.followerContainer}>
                        <DiaryListSection
                            title="👥 오늘의 팔로잉 일기"
                            entries={transformedFollowingDiaries}
                            findEmotion={findEmotion}
                            isFriend={true}
                            onPressCard={(entry) =>
                                navigation.navigate('DiaryDetail', {
                                    diary: entry,
                                    isMine: false,
                                })
                            }
                            emptyMessage="😔 오늘 작성된 팔로잉 일기가 없어요"
                            emptySubMessage="친구들을 찾아서 팔로우해보세요!"
                            onEmptyButtonPress={handleOpenFriendModal}
                            emptyButtonText="친구 찾기"
                        />
                    </View>
                )}
            </ScrollView>

            <TabBar tabs={tabs} activeTab={activeTab} onTabPress={(tabId) => {
            setActiveTab(tabId);
            if (tabId === 'home') {
                navigation.navigate('Main');
            } else if (tabId === 'diary') {
                navigation.navigate('listDiary');
            } else if (tabId === 'stats') {
                navigation.navigate('stats');
            } else if (tabId === 'profile') {
                navigation.navigate('myProfile');
            }
            }}
            />
            </SafeAreaView>
        </ImageBackground>

        {/* ✅ 친구찾기 모달 */}
        <FriendSearchModal 
            visible={showFriendModal}
            onClose={() => setShowFriendModal(false)}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
    },
    safeContainer: {
        flex: 1,
    },
    scrollContent: {
        flex: 1,
        marginBottom: 10,
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    dropdownWrapper: {
        zIndex: 10,
        position: 'relative',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginVertical: 1,
    },
    friendSearchButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: 'rgba(184, 129, 194, 0.1)',
    },
    followerContainer: {
        marginTop: 16,
    },
});

export default DiaryListScreen;