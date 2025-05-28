import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchInput } from '../../atoms/inputs';
import EmotionFilterGroup from './EmotionFilterGroup';
import PrivacyFilterButton from '../../atoms/buttons/PrivacyFilterButton';

const DiarySearchArea = ({ searchKeyword, setSearchKeyword,emotions, selectedEmotion,  setSelectedEmotion,privacyFilter, setPrivacyFilter,}) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchRow}>
                <View style={styles.inputWrap}>
                    <SearchInput value={searchKeyword} onChange={setSearchKeyword} />
                </View>
                <PrivacyFilterButton value={privacyFilter} onChange={setPrivacyFilter} />
            </View>
            <EmotionFilterGroup emotions={emotions} selectedEmotion={selectedEmotion} onSelectEmotion={setSelectedEmotion} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 12,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    inputWrap: {
        flex: 1,
    },
});

export default DiarySearchArea;
