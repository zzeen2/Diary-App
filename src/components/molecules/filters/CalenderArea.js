import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalenderArea = ({ diaryList = [], emotions = [], selectedDate, onSelectDate, onPressToday, calendarEmotions = [], onMonthChange }) => {
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = getTodayDateString();

  // 날짜 형식 변환 함수들
  const convertDateToDot = (dateStr) => {
    // "2025-05-20" -> "2025.05.20"
    return dateStr.replace(/-/g, '.');
  };

  const convertDateToDash = (dateStr) => {
    // "2025.05.20" -> "2025-05-20"
    return dateStr.replace(/\./g, '-');
  };

  const findEmotion = (id) => {
    const emotion = emotions.find((e) => e.id === id);
    return emotion || {};
  };
  
  const findEmotionForDate = (dateStr) => {
    // 먼저 달력 감정 데이터에서 찾기
    const calendarEmotion = calendarEmotions.find((item) => item.date === dateStr);
    if (calendarEmotion && calendarEmotion.userEmotion) {
      return {
        emoji: calendarEmotion.userEmotion.emoji || null,
        color: calendarEmotion.userEmotion.color || null,
        hasDiary: calendarEmotion.hasDiary,
        diaryId: calendarEmotion.diaryId
      };
    }
    
    // 일기 데이터에서 찾기 (기존 로직)
    const dotFormatDate = convertDateToDot(dateStr);
    const diary = diaryList.find((entry) => entry.date === dotFormatDate);
    
    if (diary && diary.primaryEmotion) {
      const emotion = findEmotion(diary.primaryEmotion);
      return {
        emoji: emotion?.emoji || null,
        color: emotion?.color || null,
        hasDiary: true,
        diaryId: diary.id
      };
    }
    return null;
  };

  const handleDayPress = (day) => {
    const emotionData = findEmotionForDate(day.dateString);
    
    if (emotionData && emotionData.hasDiary === false) {
      // 감정만 있고 일기가 없는 경우
      Alert.alert(
        '감정만 기록한 날이에요',
        '이 날은 감정만 기록되고 일기는 작성되지 않았습니다.',
        [{ text: '확인', style: 'default' }]
      );
    } else {
      // 일기가 있거나 아무것도 없는 경우
      onSelectDate(day.dateString);
    }
  };

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
          onDayPress={handleDayPress}
          current={selectedDate || today}
          hideExtraDays={true}
          enableSwipeMonths={true}
          firstDay={0}
          onMonthChange={onMonthChange}
          dayComponent={({ date, state }) => {
            const emotionData = findEmotionForDate(date.dateString);
            const isToday = date.dateString === today;
            const isSelected = date.dateString === selectedDate;
            const hasEmotion = !!emotionData;

            return (
              <TouchableOpacity
                onPress={() => handleDayPress({ dateString: date.dateString })}
                style={[
                  styles.dayContainer,
                  isToday && styles.todayContainer,
                  isSelected && styles.selectedContainer,
                  hasEmotion && {
                    backgroundColor: emotionData.color,
                    borderRadius: 18,
                  },
                  hasEmotion && !emotionData.hasDiary && styles.emotionOnlyContainer,
                ]}
              >
                {hasEmotion ? (
                  <Text style={styles.emotionEmoji}>{emotionData.emoji}</Text>
                ) : (
                  <Text
                    style={[
                      styles.dayText,
                      isToday && styles.todayText,
                      isSelected && styles.selectedText,
                      state === 'disabled' && styles.disabledText,
                    ]}
                  >
                    {date.day}
                  </Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginVertical: 16,
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
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
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
  },
  dayContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  dayText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  todayContainer: {
    backgroundColor: '#f3e6f6',
  },
  todayText: {
    fontWeight: '700',
    color: '#b881c2',
  },
  selectedContainer: {
    borderWidth: 2,
    borderColor: '#b881c2',
  },
  selectedText: {
    fontWeight: '700',
    color: '#b881c2',
  },
  emotionEmoji: {
    fontSize: 20,
    textAlign: 'center',
  },
  disabledText: {
    color: '#ccc',
  },
  emotionOnlyContainer: {
    opacity: 0.6,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export default CalenderArea;