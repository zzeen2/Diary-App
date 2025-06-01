import React from 'react';
import { View, Text, Modal,StyleSheet,Dimensions, TouchableWithoutFeedback, } from 'react-native';
import {EmojiIcon} from '../../atoms/icons';
import {ModalCloseButton} from '../../atoms/buttons';

const { width } = Dimensions.get('window');
const itemWidth = (width - 100) / 4;

const EmotionModal = ({ visible, onClose, onConfirm, tempEmotion, setTempEmotion, emotions }) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.overlay}>
            <TouchableWithoutFeedback>
                <View style={styles.modal}>
                <ModalCloseButton onPress={onClose} />
                <Text style={styles.title}>감정 선택하기</Text>

                <View style={styles.grid}>
                    {emotions.map((emotion, idx) => {
                    const selected = tempEmotion?.type === emotion.type;
                    return (
                        <View key={idx} style={[styles.item, selected && styles.selectedItem]} >
                        <EmojiIcon emoji={emotion.emoji} color={emotion.color} onPress={() => setTempEmotion(emotion)} />
                        <Text style={styles.name}>{emotion.name}</Text>
                        </View>
                    );
                    })}
                </View>

                <TouchableWithoutFeedback onPress={onConfirm}>
                    <View style={styles.confirmBtn}>
                    <Text style={styles.confirmText}>확인</Text>
                    </View>
                </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '88%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 24,
        position: 'relative',
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 20,
        color: '#444',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 2,
    },
    item: {
        width: itemWidth,
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: 'transparent', 
        borderRadius: 8,
    },
    selectedItem: {
        borderWidth: 2,
        borderColor: '#b881c2',
        borderRadius: 8,
    },
    name: {
        marginTop: 6,
        marginBottom:6,
        fontSize: 13,
        color: '#555',
    },
    confirmBtn: {
        backgroundColor: '#b881c2',
        paddingVertical: 10,
        borderRadius: 50,
        marginTop: 20,
        alignItems: 'center',
    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default EmotionModal;
