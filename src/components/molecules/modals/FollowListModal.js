import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getFollowers, getFollowings } from '../../../api/follow';
import { useNavigation } from '@react-navigation/native';

const FollowListModal = ({
  visible,
  onClose,
  uid,
  type,
  isMine = false,
  onRemoveFollower,
  onRemoveFollowing
}) => {
  const [activeTab, setActiveTab] = useState('followers');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (visible && uid) {
      setLoading(true);
      const fetchList = async () => {
        try {
          let data = type === 'followers' ? await getFollowers(uid) : await getFollowings(uid);
          if (data && !Array.isArray(data) && data.users) data = data.users;
          setList(Array.isArray(data) ? data : []);
        } catch (e) {
          setList([]);
          console.error('[FollowListModal] API 에러:', e);
        } finally {
          setLoading(false);
        }
      };
      fetchList();
    }
  }, [visible, uid, type]);

  const handleRemove = (id) => {
    if (activeTab === 'followers') {
      onRemoveFollower?.(id);
    } else {
      onRemoveFollowing?.(id);
    }
  };

  const handleUserPress = (user) => {
    onClose();
    navigation.navigate('UserProfile', {
      uid: user.uid,
      nickname: user.nickname || user.nick_name,
      isFollowing: false,
    });
  };

  const renderItem = ({ item }) => {
    const profileImg =
      item.profile_img ||
      item.profileImage ||
      item.profile_image ||
      item.avatar ||
      item.img_url ||
      '';
    return (
      <TouchableOpacity onPress={() => handleUserPress(item)} style={styles.userRow}>
        <Image
          source={
            !!profileImg && typeof profileImg === 'string' && profileImg.trim().startsWith('http')
              ? { uri: profileImg }
              : require('../../../assets/logo2.png')
          }
          style={styles.avatar}
        />
        <View style={styles.infoBox}>
          <Text style={styles.nickname}>{item.nickname || item.nick_name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center' }}>
        <View style={{ margin: 24, backgroundColor: '#fff', borderRadius: 16, padding: 20, maxHeight: '70%' }}>
          <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
            <Feather name="x" size={28} color="#b881c2" />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>
            {type === 'followers' ? '팔로워 목록' : '팔로잉 목록'}
          </Text>
          {loading ? (
            <ActivityIndicator size="large" color="#b881c2" />
          ) : (
            <FlatList
              data={list}
              keyExtractor={(item) => item.uid?.toString() || item.id?.toString()}
              renderItem={renderItem}
              ListEmptyComponent={<Text style={{ color: '#888', textAlign: 'center', marginVertical: 24 }}>목록이 없습니다.</Text>}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    paddingBottom : 20
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeIcon: {
    padding: 8,
    borderRadius: 20,
  },
  tabContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#b881c2',
    shadowColor: '#b881c2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#ffffff',
  },
  list: {
    paddingHorizontal: 24,
    paddingTop: 16,
    maxHeight: 300,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginVertical: 4,
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },
  infoBox: {
    flex: 1,
    justifyContent: 'center',
  },
  nickname: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 71, 87, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 71, 87, 0.2)',
  },
  removeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ff4757',
  },
  separator: {
    height: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 12,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default FollowListModal;