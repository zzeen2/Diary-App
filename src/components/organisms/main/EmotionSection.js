import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchEmotions } from '../../../actions/emotionAction';

const DiaryImotionSection = ({
    isEmotionSaved,
    selectedEmotion,
    onSelectEmotion,
    onPressSaveEmotion,
    onPressWrite
    }) => {

    const { emotions, loading  } = useSelector(state => ({emotions: state.emotions, loading: state.loading, }));
    return (
        <View style={styles.section}>
        {isEmotionSaved ? (
            <Text style={styles.notice}>오늘은 이미 감정을 등록하셨습니다.</Text>
        ) : (
            <>
            <Text style={styles.label}>오늘의 감정을 선택해주세요</Text>

            <EmotionSection
                emotionIcons={emotionIcons}
                selectedEmotion={selectedEmotion}
                onSelectEmotion={onSelectEmotion}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={onPressSaveEmotion}>
                <Text style={styles.saveText}>감정만 저장하기</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.writeBtn} onPress={onPressWrite}>
                <Text style={styles.writeText}>일기 작성하기</Text>
            </TouchableOpacity>
            </>
        )}
        </View>
    );
    };

    const styles = StyleSheet.create({
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 5,
    },
    notice: {
        fontSize: 15,
        color: '#999',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: '600',
    },
    saveBtn: {
        marginTop: 12,
        backgroundColor: '#b881c2',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    writeBtn: {
        marginTop: 8,
        backgroundColor: '#d3c0e0',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveText: {
        color: 'white',
        fontWeight: '700',
    },
    writeText: {
        color: '#444',
        fontWeight: '600',
    },
});

export default DiaryImotionSection;
