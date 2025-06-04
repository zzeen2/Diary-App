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
import { useDispatch, useSelector } from 'react-redux';
import { searchUsersByNickname } from '../../../actions/userAction';
import { useNavigation } from '@react-navigation/native';
import { EXPO_PUBLIC_API_URL } from '@env';

const FriendSearchModal = ({ visible, onClose }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [followingUsers, setFollowingUsers] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  // Redux에서 검색 결과와 로딩 상태를 가져옵니다
  const searchResults = useSelector(state => state.user?.searchResults || []);
  const loading = useSelector(state => state.user?.loading || false);

  useEffect(() => {
    if (visible) {
      setSearchKeyword('');
      loadFollowingList();
    }
  }, [visible]);

  const loadFollowingList = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) return;

      setFollowingUsers([]);
    } catch (error) {
      console.error('팔로우 목록 로딩 실패:', error);
    }
  };

  const handleFollowToggle = async (user) => {
    const isFollowing = followingUsers.includes(user.uid);
    
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        Alert.alert('오류', '로그인이 필요합니다.');
        return;
      }
      Alert.alert('준비중', '팔로우 기능은 현재 준비중입니다.');

    } catch (error) {
      console.error('팔로우 처리 실패:', error);
      Alert.alert('오류', '팔로우 처리 중 오류가 발생했습니다.');
    }
  };

  // 검색어가 변경될 때마다 Redux 액션을 dispatch합니다
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchKeyword.trim()) {
        dispatch(searchUsersByNickname(searchKeyword));
        
        // 백엔드가 작동하지 않을 경우를 대비한 임시 더미 데이터
        // 실제 검색 결과가 없고 백엔드 문제일 경우에만 사용
        setTimeout(() => {
          // 검색 후 2초 뒤에도 결과가 없다면 더미 데이터 표시 (개발/테스트용)
          if (searchResults.length === 0 && !loading) {
            console.log('백엔드 API 문제로 더미 데이터 표시');
            // dispatch({ 
            //   type: 'SEARCH_USERS_SUCCESS', 
            //   payload: [
            //     { uid: 1, nick_name: '테스트유저1', profile_image: null },
            //     { uid: 2, nick_name: '테스트유저2', profile_image: null }
            //   ] 
            // });
          }
        }, 2000);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchKeyword, dispatch, searchResults.length, loading]);

  // 디버깅을 위한 로그
  useEffect(() => {
  }, [searchResults, loading]);

  const renderUserCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        onClose();
        navigation.navigate('UserProfile', {
          uid: item.uid,
          nickname: item.nick_name,
          isFollowing: false,
        });
      }}
      style={styles.userItem}
    >
      <Image 
        source={
          item.profile_image && item.profile_image.trim() !== '' 
            ? { uri: item.profile_image } 
            : require('../../../assets/logo2.png')
        } 
        style={styles.userAvatar} 
        onError={() => {
          // 이미지 로드 실패 시 기본 이미지 사용
        }}
      />
      <Text style={styles.userNickname}>{item.nick_name}</Text>
    </TouchableOpacity>
  );

  if (!visible) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>친구 찾기</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
            <Feather name="x" size={20} color="#666" />
          </TouchableOpacity>
        </View>

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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
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
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
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
    height: 300,
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