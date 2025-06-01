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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [showFriendModal, setShowFriendModal] = useState(false);
    const formattedSelectedDate = useFormmatedDate(selectedDate);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('diary');
    const [calendarEmotions, setCalendarEmotions] = useState([]);
    const [followingTodayDiaries, setFollowingTodayDiaries] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    });

    const emotions = useSelector((state) => state.emotions.emotions) || [];
    const diaryState = useSelector((state) => state.diary);
    const rawMyDiaries = diaryState?.myDiaries || [];
    const diaryLoading = diaryState?.loading || false;
    const todayFollowingDiaries = useSelector((state) => state.diary.todayFollowingDiaries) || [];
    
    const [currentUserId, setCurrentUserId] = useState(null);
    const [displayNickname, setDisplayNickname] = useState('');
    const [userProfileImage, setUserProfileImage] = useState(null);

    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const storedUid = await AsyncStorage.getItem('userUid');
                const storedNickname = await AsyncStorage.getItem('userNickname');
                const storedProfileImage = await AsyncStorage.getItem('userProfileImage');
                
                if (storedUid) setCurrentUserId(Number(storedUid));
                if (storedNickname) setDisplayNickname(storedNickname);
                if (storedProfileImage) setUserProfileImage({ uri: storedProfileImage });
                
            } catch (error) {
            }
        };
        
        loadUserInfo();
    }, []);

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
        dispatch(fetchEmotions());
        dispatch(fetchMyDiaries());
        dispatch(fetchTodayFollowingDiaries());
        
        const fetchFollowingToday = async () => {
            try {
                const data = await getFollowingsTodayDiaries();
                setFollowingTodayDiaries(data);
            } catch (error) {
                setFollowingTodayDiaries([]);
            }
        };
        
        fetchFollowingToday();
    }, [dispatch]);

    useEffect(() => {
        const fetchCalendarData = async () => {
            try {
                const data = await getCalendarEmotions(currentMonth);
                setCalendarEmotions(data);
            } catch (error) {
            }
        };
        
        fetchCalendarData();
    }, [currentMonth]);

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

    const myDiaryEntries = transformDiaryData(rawMyDiaries);
    const transformedFollowingDiaries = transformDiaryData(followingTodayDiaries);

    const findEmotion = (id) => {
        if (!Array.isArray(emotions)) return {};
        return emotions.find(e => e?.id === id) || {};
    };

    const handleOpenFriendModal = () => {
        setShowFriendModal(true);
    };

    const handleRightButtonPress = () => {
        if (filterType === 'follower') {
            handleOpenFriendModal();
        } else {
            setIsSearchMode((prev) => !prev);
        }
    };

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
                
                {filterType === 'my' && (
                    <>
                        {isSearchMode ? (
                            <>
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

                                <DiaryListSection
                                    title="📖 내 일기 검색 결과"
                                    entries={searchedMyDiaries}
                                    findEmotion={findEmotion}
                                    onPressCard={(entry) => {
                                        const transformedEntry = {
                                            ...entry,
                                            user: {
                                                uid: currentUserId,
                                                id: currentUserId,
                                                nickname: displayNickname,
                                                nick_name: displayNickname,
                                                profile_img: userProfileImage?.uri,
                                                profile_image: userProfileImage?.uri,
                                            }
                                        };
                                        navigation.navigate('DiaryDetail', {
                                            diary: transformedEntry,
                                            isMine: true,
                                        });
                                    }}
                                />
                            </>
                        ) : (
                            <>
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
                                
                                {selectedDate && (
                                    <DiaryListSection
                                        title={`📖 ${formattedSelectedDate} 일기`}
                                        entries={myDiaryEntries.filter(d => {
                                            const convertedDate = d.date.replace(/\./g, '-');
                                            return convertedDate === selectedDate;
                                        })}
                                        findEmotion={findEmotion}
                                        onPressCard={(entry) => {
                                            const transformedEntry = {
                                                ...entry,
                                                user: {
                                                    uid: currentUserId,
                                                    id: currentUserId,
                                                    nickname: displayNickname,
                                                    nick_name: displayNickname,
                                                    profile_img: userProfileImage?.uri,
                                                    profile_image: userProfileImage?.uri,
                                                }
                                            };
                                            navigation.navigate('DiaryDetail', {
                                                diary: transformedEntry,
                                                isMine: true,
                                            });
                                        }}
                                    />
                                )}
                            </>
                        )}
                    </>
                )}

                {filterType === 'follower' && (
                    <View style={styles.followerContainer}>
                        <DiaryListSection
                            title="👥 오늘의 팔로잉 일기"
                            entries={transformedFollowingDiaries}
                            findEmotion={findEmotion}
                            isFriend={true}
                            onPressCard={(entry) => {
                                const transformedEntry = {
                                    ...entry,
                                    user: {
                                        uid: entry.writer?.uid,
                                        id: entry.writer?.uid,
                                        nickname: entry.writer?.nick_name,
                                        nick_name: entry.writer?.nick_name,
                                        profile_img: entry.writer?.profile_image,
                                        profile_image: entry.writer?.profile_image,
                                    }
                                };
                                navigation.navigate('DiaryDetail', {
                                    diary: transformedEntry,
                                    isMine: false,
                                });
                            }}
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