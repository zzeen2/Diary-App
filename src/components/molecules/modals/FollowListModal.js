import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const FollowListModal = ({
  visible,
  onClose,
  followers = [],
  followings = [],
  isMine = false,
  onRemoveFollower,
  onRemoveFollowing
}) => {
  const [activeTab, setActiveTab] = useState('followers'); // 'followers' or 'followings'

  const data = activeTab === 'followers' ? followers : followings;

  const handleRemove = (id) => {
    if (activeTab === 'followers') {
      onRemoveFollower?.(id);
    } else {
      onRemoveFollowing?.(id);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.userRow}>
      <View style={styles.avatarContainer}>
        <Image source={item.profile_img} style={styles.avatar} />
      </View>
      <Text style={styles.nickname}>{item.nickname}</Text>
      {isMine && (
        <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(item.id)} activeOpacity={0.8}>
          <Text style={styles.removeText}>삭제</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* 헤더 */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>친구 목록</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                <Feather name="x" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* 탭 */}
          <View style={styles.tabContainer}>
            <View style={styles.tabRow}>
              <TouchableOpacity
                onPress={() => setActiveTab('followers')}
                style={[
                  styles.tab,
                  activeTab === 'followers' && styles.activeTab,
                ]}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === 'followers' && styles.activeTabText
                ]}>
                  팔로워 ({followers.length})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTab('followings')}
                style={[
                  styles.tab,
                  activeTab === 'followings' && styles.activeTab,
                ]}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === 'followings' && styles.activeTabText
                ]}>
                  팔로잉 ({followings.length})
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 리스트 */}
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>👥</Text>
                <Text style={styles.emptyText}>
                  {activeTab === 'followers' ? '팔로워가 없어요' : '팔로잉이 없어요'}
                </Text>
              </View>
            )}
          />
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginVertical: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  nickname: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
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
    // marginLeft: 4,
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