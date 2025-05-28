import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalenderArea = ({ diaryList = [], selectedDate, onSelectDate, onPressToday }) => {
    const getTodayDateString = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; 
    };
    
    const today = getTodayDateString();
    
    // 감정별 색상 매핑
    const emotionColors = {
        '😊': '#FFEAA7', // happy
        '😢': '#A3D8F4', // sad
        '😠': '#FFB7B7', // angry
        '😌': '#B5EAD7', // calm
        '😰': '#C7CEEA', // anxious
        '😴': '#E2D8F3', // tired
        '🤩': '#FFD8BE', // excited
        '🤔': '#D8E2DC', // confused
    };
    
    // 날짜별로 감정 이모지와 색상 적용
    const markedDates = diaryList.reduce((acc, entry) => {
        const date = entry.date;
        const emotion = entry.primaryEmotion || '😊';
        const emotionColor = emotionColors[emotion] || '#F0F0F0';
        
        if (!acc[date]) {
            acc[date] = {
                customStyles: {
                    container: {
                        backgroundColor: emotionColor,
                        borderRadius: 18,
                        elevation: 2,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        width: 36,
                        height: 36,
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    text: {
                        color: '#333',
                        fontWeight: '600',
                        fontSize: 14,
                    },
                },
            };
        }
        return acc;
    }, {});

    // 오늘 날짜 특별 스타일링
    if (!markedDates[today]) {
        markedDates[today] = {
            customStyles: {
                container: {
                    backgroundColor: '#b881c2',
                    borderRadius: 18,
                    elevation: 3,
                    shadowColor: '#b881c2',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    width: 36,
                    height: 36,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                text: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 14,
                },
            },
        };
    } else {
        // 오늘 날짜에 일기가 있는 경우 테두리 추가
        markedDates[today].customStyles.container = {
            ...markedDates[today].customStyles.container,
            borderWidth: 3,
            borderColor: '#b881c2',
        };
    }

    // 선택된 날짜 스타일링
    if (selectedDate && selectedDate !== today) {
        if (!markedDates[selectedDate]) {
            markedDates[selectedDate] = { 
                customStyles: { 
                    container: {
                        borderRadius: 18,
                        width: 36,
                        height: 36,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }, 
                    text: {
                        color: '#333',
                        fontWeight: '600',
                        fontSize: 14,
                    } 
                } 
            };
        }
        markedDates[selectedDate].customStyles.container = {
            ...markedDates[selectedDate].customStyles?.container,
            borderWidth: 2,
            borderColor: '#b881c2',
        };
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>📅 감정 캘린더</Text>
                <TouchableOpacity onPress={onPressToday} style={styles.todayButton}>
                    <Text style={styles.todayBtn}>Today</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.calendarContainer}>
                <Calendar
                    markingType="custom"
                    markedDates={markedDates}
                    onDayPress={(day) => onSelectDate(day.dateString)}
                    current={selectedDate || today}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#666',
                        selectedDayBackgroundColor: '#b881c2',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#b881c2',
                        dayTextColor: '#333',
                        textDisabledColor: '#ccc',
                        arrowColor: '#b881c2',
                        disabledArrowColor: '#ddd',
                        monthTextColor: '#333',
                        indicatorColor: '#b881c2',
                        textDayFontFamily: 'System',
                        textMonthFontFamily: 'System',
                        textDayHeaderFontFamily: 'System',
                        textDayFontWeight: '500',
                        textMonthFontWeight: '600',
                        textDayHeaderFontWeight: '600',
                        textDayFontSize: 14,
                        textMonthFontSize: 18,
                        textDayHeaderFontSize: 13,
                    }}
                    style={styles.calendar}
                    hideExtraDays={true}
                    enableSwipeMonths={true}
                    firstDay={0}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        margin: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        paddingTop: 20,
        paddingBottom: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    todayButton: {
        backgroundColor: '#b881c2',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#b881c2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    todayBtn: {
        fontSize: 13,
        color: '#ffffff',
        fontWeight: '600',
    },
    calendarContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal: 8,
    },
    calendar: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});

export default CalenderArea;