import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {CommentItemBox} from '../../molecules/boxes';
import {CommentInput} from '../../atoms/inputs';

const CommentListSection = ({ comments = [], onSubmitComment, onDeleteComment, currentUserId, isPublic = true, navigation }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardWrapper}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>💬 댓글 {comments.length}</Text>

          <ScrollView
            style={styles.commentList}
            contentContainerStyle={{ paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {comments.length === 0 && (
              <Text style={styles.emptyText}>
                {isPublic ? '댓글이 아직 없어요.' : '비공개 일기입니다.'}
              </Text>
            )}

            {comments.map((item) => {
              const writerId = item.writer?.uid || item.user?.id;
              const isMine = writerId === currentUserId;
              
              return (
                <CommentItemBox
                  key={item.id}
                  comment={item}
                  isMyComment={isMine}
                  onDelete={() => onDeleteComment?.(item.id)}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>

          {isPublic ? (
            <CommentInput onSubmit={onSubmitComment} />
          ) : (
            <View style={styles.privateNotice}>
              <Text style={styles.privateNoticeText}>
                🔒 비공개 일기에는 댓글을 작성할 수 없습니다.
              </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardWrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  commentList: {
    flex: 1,
  },
  emptyText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  privateNotice: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },
  privateNoticeText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CommentListSection;
