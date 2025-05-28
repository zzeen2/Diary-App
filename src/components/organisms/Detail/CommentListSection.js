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

const CommentListSection = ({ comments = [], onSubmitComment, onDeleteComment, currentUserId }) => {
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
              <Text style={styles.emptyText}>댓글이 아직 없어요.</Text>
            )}

            {comments.map((item) => (
              <CommentItemBox
                key={item.id}
                comment={item}
                isMine={item.user.id === currentUserId}
                onDelete={() => onDeleteComment?.(item.id)}
              />
            ))}
          </ScrollView>

          <CommentInput onSubmit={onSubmitComment} />
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
});

export default CommentListSection;
