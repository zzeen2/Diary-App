// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import SectionTitle from '../../atoms/TextsAndLabel/SectionTitle';
// import { DiaryCard, FriendDiaryCard } from '../../molecules/cards';

// const DiaryListSection = ({ title, entries, isFriend = false, findEmotion, onPressSeeMore, onPressCard, maxCount = 4, }) => {
//   const limitedEntries = entries.slice(0, maxCount);

//   return (
//     <View style={styles.container}>
//       <SectionTitle title={title} onPressSeeMore={onPressSeeMore} />

//       {limitedEntries.map((entry) => {
//         // 백엔드에서 받은 emotion 객체를 직접 사용
//         // primaryEmotion: entry.emotion 객체 자체가 EmotionTag에서 필요한 속성(id, name, emoji, color)을 가지고 있어야 함
//         const userEmotionData = entry.userEmotion || null; // 사용자 감정 객체
//         const aiEmotionData = entry.aiEmotion || null;     // AI 감정 객체
//         //console.log(`Entry ID: ${entry.id}`);
//     //console.log('  userEmotionData received:', userEmotionData);
//     //console.log('  aiEmotionData received:', aiEmotionData);
//         const CardComponent = isFriend ? FriendDiaryCard : DiaryCard;

//         return (
//           <CardComponent
//             key={entry.id}
//             entry={entry}
//             primaryEmotion={userEmotionData}
//             secondaryEmotion={aiEmotionData}
//             onPress={() => onPressCard?.(entry)}
//           />
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//     marginBottom: 16,
//   },
// });

// export default DiaryListSection;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import SectionTitle from '../../atoms/TextsAndLabel/SectionTitle';
import { DiaryCard, FriendDiaryCard } from '../../molecules/cards';

const DiaryListSection = ({ title, entries, isFriend = false, findEmotion, onPressSeeMore, onPressCard, maxCount = 4, }) => {
  const limitedEntries = entries.slice(0, maxCount);

  return (
    <View style={styles.container}>
      <SectionTitle title={title} onPressSeeMore={onPressSeeMore} />

      {limitedEntries.map((entry) => {
        // ⭐ 디버깅 로그 추가 ⭐
        //console.log(`=== Entry ID: ${entry.id} ===`);
        //console.log('전체 entry 객체:', JSON.stringify(entry, null, 2));
        
        // 감정 데이터 처리
        let userEmotionData = null;
        let aiEmotionData = null;

        // ⭐ 여러 가능한 데이터 구조에 대응 ⭐
        if (entry.userEmotion) {
          // 이미 완전한 감정 객체가 있는 경우
          userEmotionData = entry.userEmotion;
          //console.log('userEmotion 직접 사용:', userEmotionData);
        } else if (entry.primaryEmotion) {
          // primaryEmotion이 ID인 경우 findEmotion으로 찾기
          if (typeof entry.primaryEmotion === 'string' || typeof entry.primaryEmotion === 'number') {
            userEmotionData = findEmotion(entry.primaryEmotion);
            //console.log('primaryEmotion ID로 찾은 결과:', userEmotionData);
          } else {
            // primaryEmotion이 이미 객체인 경우
            userEmotionData = entry.primaryEmotion;
            //console.log('primaryEmotion 객체 직접 사용:', userEmotionData);
          }
        }

        if (entry.aiEmotion) {
          // 이미 완전한 감정 객체가 있는 경우
          aiEmotionData = entry.aiEmotion;
          //console.log('aiEmotion 직접 사용:', aiEmotionData);
        } else if (entry.secondaryEmotion) {
          // secondaryEmotion이 ID인 경우 findEmotion으로 찾기
          if (typeof entry.secondaryEmotion === 'string' || typeof entry.secondaryEmotion === 'number') {
            aiEmotionData = findEmotion(entry.secondaryEmotion);
            console.log('secondaryEmotion ID로 찾은 결과:', aiEmotionData);
          } else {
            // secondaryEmotion이 이미 객체인 경우
            aiEmotionData = entry.secondaryEmotion;
            //console.log('secondaryEmotion 객체 직접 사용:', aiEmotionData);
          }
        }

        //console.log('최종 userEmotionData:', userEmotionData);
        //console.log('최종 aiEmotionData:', aiEmotionData);

        const CardComponent = isFriend ? FriendDiaryCard : DiaryCard;

        return (
          <CardComponent
            key={entry.id}
            entry={entry}
            // ⭐ DiaryCard가 기대하는 prop 이름으로 전달 ⭐
            userEmotion={userEmotionData}
            aiEmotion={aiEmotionData}
            onPress={() => onPressCard?.(entry)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
});

export default DiaryListSection;