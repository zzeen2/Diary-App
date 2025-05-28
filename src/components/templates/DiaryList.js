import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DiaryListSection, FriendDiaryListSection } from '../organisms/main';
import {FilterDropdown, SearchButton} from '../atoms/buttons';
import {HeaderBar} from '../molecules/headers';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmotions } from '../../actions/emotionAction';
import {SearchInput} from '../atoms/inputs';
import { EmotionFilterGroup, DiarySearchArea, CalenderArea } from '../molecules/filters';
import { Feather } from '@expo/vector-icons'; // 아이콘 
import useFormmatedDate from '../../hooks/useFormattedDate';
import { TabBar } from '../organisms/TabBar';



// console.log('FilterDropdown:', FilterDropdown);
// console.log('HeaderBar:', HeaderBar);
// console.log('EmotionFilterGroup:', EmotionFilterGroup);
// console.log('SearchInput:', SearchInput);
const tabs = [
    { id: 'home', icon: '🏠', label: '홈' },
    { id: 'diary', icon: '📔', label: '일기장' },
    { id: 'stats', icon: '📊', label: '통계' },
    { id: 'profile', icon: '👤', label: '프로필' },
];


const DiaryListScreen = () => {
    const insets = useSafeAreaInsets();
    const [filterType, setFilterType] = useState('my');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [showPrivateOnly, setShowPrivateOnly] = useState(false);
    const [privacyFilter, setPrivacyFilter] = useState('all');
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const formattedSelectedDate = useFormmatedDate(selectedDate);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const emotions = useSelector((state) => state.emotions);
    const [activeTab, setActiveTab] = useState('diary');
    // console.log(emotions) //<  json 잘 찍힘

    const getTodayDateString = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; 
    };


    useEffect(() => {
        dispatch(fetchEmotions());
    }, [dispatch]);

    const allDiaryEntries = [
        {
        id: 1,
        title: '산책 일기',
        date: '2025.05.20',
        content: '봄 산책 너무 좋았다.봄 산책 너무 좋았다.봄 산책 너무 좋았다.봄 산책 너무 좋았다.봄 산책 너무 좋았다.봄 산책 너무 좋았다.봄 산책 너무 좋았다.',
        primaryEmotion: 'happy',
        isPublic: true,
        },
        {
        id: 2,
        title: '산책 일기',
        date: '2025.05.21',
        content: '봄 산책 너무 좋았다.봄 산책 너무 좋았다.봄 산책 너무 좋았다.봄 산책 너무 좋았다.봄 산책 너무 좋았다.봄 산책 너무 좋았다.봄 산책 너무 좋았다.',
        primaryEmotion: 'sad',
        isPublic: true,
        },
    ];

    const friendDiaryEntries = [
        {
        id: 2,
        title: '친구와 대화',
        date: '2025.05.19',
        content: '기분 좋은 대화 시간',
        primaryEmotion: 'calm',
        isPublic: true,
        },
    ];

    const findEmotion = (id) => emotions.find(e => e.id === id) || {};

    const rawEntries = filterType === 'my' ? allDiaryEntries : friendDiaryEntries;
    // 검색로직
    const displayedEntries = rawEntries.filter((entry) => {
        const titleHasKeyword = entry.title.includes(searchKeyword);
        const contentHasKeyword = entry.content.includes(searchKeyword);
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

        // 조건이 모두 만족될 때
        return matchesKeyword && matchesEmotion && matchesPrivacy;
    });


    return (
    <View style={styles.container}>
        <StatusBar style="dark" backgroundColor="transparent" translucent />
        <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
            <SafeAreaView style={styles.safeContainer}>
            <HeaderBar showBackButton={true} onBackPress={() => navigation.goBack()} centerContent={
                <View style={styles.dropdownWrapper}>
                    <FilterDropdown selected={filterType}  onSelect={(value) => setFilterType(value)} />
                </View>
                }
                rightContent={ <SearchButton onPress={() => setIsSearchMode((prev) => !prev)} />}
            />

            <View style={styles.divider} />

            <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
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

                        {filterType === 'my' ? (
                            <DiaryListSection
                                title="📖 내 일기 검색 결과"
                                entries={displayedEntries}
                                findEmotion={findEmotion}
                                onPressCard={(entry) => console.log(entry.title)}
                            />
                        ) : (
                            <DiaryListSection
                                title="👥 친구 일기 검색 결과"
                                entries={displayedEntries}
                                findEmotion={findEmotion}
                                isFriend={true} // 친구 모드 활성화
                                onPressCard={(entry) => console.log(entry.title)}
                            />
                        )}
                    </>
                ) : (
                    <>
                        {filterType === 'my' && (
                            <>
                                <CalenderArea
                                    diaryList={displayedEntries}
                                    selectedDate={selectedDate}
                                    onSelectDate={setSelectedDate}
                                    onPressToday={() => setSelectedDate(getTodayDateString())}
                                    emotions={emotions}
                                />
                                {selectedDate && (
                                    <DiaryListSection
                                        title={`📖 ${formattedSelectedDate} 일기`}
                                        entries={displayedEntries.filter(d => {
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

                        {filterType === 'follower' && (
                            <View style={{ marginTop: 20 }}>
                                <DiaryListSection
                                    title="👥 친구들의 일기"
                                    entries={displayedEntries}
                                    findEmotion={findEmotion}
                                    isFriend={true}
                                    onPressCard={(entry) =>
                                        navigation.navigate('DiaryDetail', {
                                            diary: entry,
                                            isMine: true,
                                        })
                                        }
                                />
                            </View>
                        )}
                    </>
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
        // marginTop: 5,
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
});

export default DiaryListScreen;
