// src/components/molecules/boxes/ImagePickerBox.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';

// images: 로컬 URI 배열, onPickImage: 이미지 선택 시 호출될 함수, onRemoveImage: 이미지 제거 시 호출될 함수
const ImagePickerBox = ({ images, onPickImage, onRemoveImage }) => {
  // 컴포넌트가 렌더링될 때마다 이미지 상태 확인
  useEffect(() => {
    console.log('=== ImagePickerBox 렌더링 ===');
    console.log('받은 images props:', images);
    console.log('images 길이:', images?.length || 0);
    console.log('images 타입:', typeof images);
    console.log('images는 배열인가?', Array.isArray(images));
    if (images && images.length > 0) {
      console.log('첫 번째 이미지 URI:', images[0]);
    }
  }, [images]);

  // 이미지를 추가하는 버튼 클릭 시, DiaryWriteScreen에서 넘어온 onPickImage 함수를 호출합니다.
  const handlePickImage = () => {
    console.log('=== 이미지 추가 버튼 클릭 ===');
    console.log('현재 이미지 개수:', images?.length || 0);
    
    if (images && images.length >= 5) {
      console.log('⚠️ 이미지 개수 제한 도달');
      Alert.alert('사진 첨부 제한', '최대 5장까지 사진을 첨부할 수 있습니다.');
      return;
    }
    
    console.log('✅ onPickImage 함수 호출');
    onPickImage(); // DiaryWriteScreen의 pickImage (useDiarySubmit의 uploadImage 포함) 호출
  };

  // 이미지를 제거하는 버튼 클릭 시, DiaryWriteScreen에서 넘어온 onRemoveImage 함수를 호출합니다.
  const handleRemoveImage = (index) => {
    console.log('=== 이미지 제거 버튼 클릭 ===');
    console.log('제거할 이미지 인덱스:', index);
    console.log('제거 전 이미지 개수:', images?.length || 0);
    console.log('제거할 이미지 URI:', images?.[index]);
    
    onRemoveImage(index);
    
    // 제거 후 상태는 부모 컴포넌트에서 업데이트되므로 여기서는 로그만
    console.log('✅ onRemoveImage 함수 호출 완료');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>사진 추가 (최대 5장)</Text>
      <View style={styles.imageRow}>
        {images && images.map((uri, index) => {
          console.log(`이미지 ${index} 렌더링:`, uri);
          return (
            <View key={index} style={styles.thumbnailContainer}>
              <Image source={{ uri }} style={styles.thumbnail} />
              <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveImage(index)}>
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {(!images || images.length < 5) && (
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