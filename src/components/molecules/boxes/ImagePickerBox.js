// import React from 'react';
// import { View, Image, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const ImagePickerBox = ({ images, setImages }) => {
//   const pickImage = async () => { // 이미지 추가
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       const uri = result.assets[0].uri;
//       setImages([...images, uri]);
//     }
//   };

//   const removeImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>사진 추가 (최대 5장)</Text>
//       <View style={styles.imageRow}>
//         {images.map((uri, index) => (
//           <TouchableOpacity key={index} onPress={() => removeImage(index)}>
//             <Image source={{ uri }} style={styles.thumbnail} />
//           </TouchableOpacity>
//         ))}

//         {images.length < 5 && (
//           <TouchableOpacity onPress={pickImage}>
//             <View style={styles.addBox}>
//               <Text style={styles.addText}>＋</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 16,
//   },
//   label: {
//     fontSize: 15,
//     fontWeight: '500',
//     marginBottom: 20,
//     color: '#555',
//   },
//   imageRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 13,
//   },
//   thumbnail: {
//     width: 160,
//     height: 160,
//     borderRadius: 8,
//   },
//   addBox: {
//     width: 70,
//     height: 70,
//     borderRadius: 8,
//     backgroundColor: '#eee',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   addText: {
//     fontSize: 28,
//     color: '#aaa',
//   },
// });

// export default ImagePickerBox;

// src/components/molecules/boxes/ImagePickerBox.js
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker'; // 여기서 직접 이미지 피커를 호출하지 않으므로 필요 없음

// images: 로컬 URI 배열, onPickImage: 이미지 선택 시 호출될 함수, onRemoveImage: 이미지 제거 시 호출될 함수
const ImagePickerBox = ({ images, onPickImage, onRemoveImage }) => {
  // 이미지를 추가하는 버튼 클릭 시, DiaryWriteScreen에서 넘어온 onPickImage 함수를 호출합니다.
  const handlePickImage = () => {
    if (images.length >= 5) {
      Alert.alert('사진 첨부 제한', '최대 5장까지 사진을 첨부할 수 있습니다.');
      return;
    }
    onPickImage(); // DiaryWriteScreen의 pickImage (useDiarySubmit의 uploadImage 포함) 호출
  };

  // 이미지를 제거하는 버튼 클릭 시, DiaryWriteScreen에서 넘어온 onRemoveImage 함수를 호출합니다.
  const handleRemoveImage = (index) => {
    onRemoveImage(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>사진 추가 (최대 5장)</Text>
      <View style={styles.imageRow}>
        {images.map((uri, index) => (
          <View key={index} style={styles.thumbnailContainer}>
            <Image source={{ uri }} style={styles.thumbnail} />
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveImage(index)}>
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}

        {images.length < 5 && (
          <TouchableOpacity onPress={handlePickImage}>
            <View style={styles.addBox}>
              <Text style={styles.addText}>＋</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 20,
    color: '#555',
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 13,
  },
  thumbnailContainer: {
    position: 'relative',
    width: 70, // 썸네일 크기 조정
    height: 70,
    borderRadius: 8,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // 삭제 버튼이 이미지 위에 오도록
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addBox: {
    width: 70, // 썸네일과 동일한 크기
    height: 70,
    borderRadius: 8,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed', // 점선 테두리
  },
  addText: {
    fontSize: 28,
    color: '#aaa',
  },
});

export default ImagePickerBox;