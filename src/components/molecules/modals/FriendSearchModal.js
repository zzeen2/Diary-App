import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

const FriendSearchModal = ({ visible, onClose }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followingUsers, setFollowingUsers] = useState([]); // 현재 팔로우 중인 사용자들

  // 검색 결과 초기화
  useEffect(() => {
    if (visible) {
      setSearchKeyword('');
      setSearchResults([]);
      loadFollowingList();
    }
  }, [visible]);

  // 현재 팔로우 중인 사용자 목록 가져오기
  const loadFollowingList = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) return;

      // TODO: 실제 팔로우 목록 API 호출
      // const response = await axios.get(`${EXPO_PUBLIC_API_URL}/follow/following`, {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // setFollowingUsers(response.data);

      // 임시 더미 데이터
      setFollowingUsers([4284784202, 4282976753]); // 임희정, 친구A의 uid
    } catch (error) {
      console.error('팔로우 목록 로딩 실패:', error);
    }
  };

  // 사용자 검색
  const searchUsers = async (keyword) => {
    if (!keyword.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        Alert.alert('오류', '로그인이 필요합니다.');
        return;
      }

      console.log('=== 사용자 검색 API 호출 ===');
      console.log('검색어:', keyword);

      // TODO: 실제 사용자 검색 API 호출
      // const response = await axios.get(`${EXPO_PUBLIC_API_URL}/login/search/users`, {
      //   params: { nickname: keyword },
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });

      // 임시 더미 검색 결과
      const allUsers = [
        {
          uid: 4284784202,
          nick_name: '임희정',
          profile_image: 'http://k.kakaocdn.net/dn/badoZf/btsNMu0SZS4/rlYvUJUNaZGDnKxamo0hI1/img_640x640.jpg',
        },
        {
          uid: 4282976753,
          nick_name: '친구A',
          profile_image: 'https://via.placeholder.com/40',
        },
        {
          uid: 4282976754,
          nick_name: '친구B',
          profile_image: 'https://via.placeholder.com/40',
        },
        {
          uid: 4282976755,
          nick_name: '친구C',
          profile_image: 'https://via.placeholder.com/40',
        },
      ];

      // 검색어가 닉네임에 포함된 사용자 필터링
      const filteredUsers = allUsers.filter(user => 
        user.nick_name.toLowerCase().includes(keyword.toLowerCase())
      );

      console.log('검색 결과:', filteredUsers);
      setSearchResults(filteredUsers);

    } catch (error) {
      console.error('사용자 검색 실패:', error);
      Alert.alert('검색 실패', '사용자 검색 중 오류가 발생했습니다.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 팔로우/언팔로우 처리
  const handleFollowToggle = async (user) => {
    const isFollowing = followingUsers.includes(user.uid);
    
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        Alert.alert('오류', '로그인이 필요합니다.');
        return;
      }

      console.log(`=== ${isFollowing ? '언팔로우' : '팔로우'} 요청 ===`);
      console.log('대상 사용자:', user.nick_name, user.uid);

      if (isFollowing) {
        // 언팔로우
        // TODO: 실제 언팔로우 API 호출
        // await axios.delete(`${EXPO_PUBLIC_API_URL}/follow/${user.uid}`, {
        //   headers: { 'Authorization': `Bearer ${token}` }
        // });
        
        setFollowingUsers(prev => prev.filter(uid => uid !== user.uid));
        Alert.alert('완료', `${user.nick_name}님을 언팔로우했습니다.`);
      } else {
        // 팔로우
        // TODO: 실제 팔로우 API 호출
        // await axios.post(`${EXPO_PUBLIC_API_URL}/follow`, {
        //   following_id: user.uid
        // }, {
        //   headers: { 'Authorization': `Bearer ${token}` }
        // });
        
        setFollowingUsers(prev => [...prev, user.uid]);
        Alert.alert('완료', `${user.nick_name}님을 팔로우했습니다!`);
      }

    } catch (error) {
      console.error('팔로우 처리 실패:', error);
      Alert.alert('오류', '팔로우 처리 중 오류가 발생했습니다.');
    }
  };

  // 검색 입력 처리 (디바운싱)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUsers(searchKeyword);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchKeyword]);

  // 사용자 카드 렌더링
  const renderUserCard = ({ item }) => {
    // const isFollowing = followingUsers.includes(item.uid); // 버튼이 제거되므로 이 변수는 여기서 필요 없어짐
    
    return (
      <View style={styles.userItem}>
        <Image source={{ uri: item.profile_image }} style={styles.userAvatar} />
        <Text style={styles.userNickname}>{item.nick_name}</Text>
        {/* 팔로우/팔로잉 버튼 TouchableOpacity 제거됨 */}
      </View>
    );
  };

  if (!visible) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        {/* 헤더 */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>친구 찾기</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
            <Feather name="x" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* 검색 입력 */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputWrapper}>
            <Feather name="search" size={16} color="#999" />
            <TextInput
              style={styles.searchInputField}
              placeholder="닉네임 검색"
              placeholderTextColor="#999"
              value={searchKeyword}
              onChangeText={setSearchKeyword}
              autoFocus={true}
            />
            {searchKeyword.length > 0 && (
              <TouchableOpacity onPress={() => setSearchKeyword('')} style={styles.clearButton}>
                <Feather name="x-circle" size={16} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 검색 결과 */}
        <View style={styles.resultsList}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#b881c2" />
              <Text style={styles.loadingText}>검색 중...</Text>
            </View>
          ) : searchKeyword.trim() === '' ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>👥</Text>
              <Text style={styles.emptyMessage}>닉네임으로 친구를 찾아보세요</Text>
            </View>
          ) : searchResults.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyMessage}>검색 결과가 없어요</Text>
            </View>
          ) : (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.uid.toString()}
              renderItem={renderUserCard}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute', // 화면 전체를 덮도록 position: 'absolute' 사용
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // 다른 요소들 위에 표시되도록 zIndex 설정
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%', // 모달의 최대 높이 제한 (화면의 80%)
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalCloseBtn: {
    padding: 5,
  },
  searchSection: {
    marginBottom: 15,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8, // 플랫폼별 패딩 조절
  },
  searchInputField: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  resultsList: {
    // flex: 1, // 일단 주석 처리하고 height 또는 maxHeight로 제어
    // minHeight: 100, 
    height: 300, // 4-5개 항목이 보일 수 있는 대략적인 높이 (조정 필요)
    // 또는 maxHeight: 300, 
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 12,
    opacity: 0.5,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginVertical: 4,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  userNickname: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
});

export default FriendSearchModal;