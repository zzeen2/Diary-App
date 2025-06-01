// src/components/molecules/boxes/ImagePickerBox.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';

// images: 로컬 URI 배열, onPickImage: 이미지 선택 시 호출될 함수, onRemoveImage: 이미지 제거 시 호출될 함수
const ImagePickerBox = ({ images, onPickImage, onRemoveImage }) => {
  useEffect(() => {
  }, [images]);

  // 이미지를 추가하는 버튼 클릭 시, DiaryWriteScreen에서 넘어온 onPickImage 함수를 호출합니다.
  const handlePickImage = () => {
    if (images && images.length >= 5) {
      Alert.alert('사진 첨부 제한', '최대 5장까지 사진을 첨부할 수 있습니다.');
      return;
    }
    onPickImage();
  };

  // 이미지를 제거하는 버튼 클릭 시, DiaryWriteScreen에서 넘어온 onRemoveImage 함수를 호출합니다.
  const handleRemoveImage = (index) => {
    onRemoveImage(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>사진 추가 (최대 5장)</Text>
      <View style={styles.imageRow}>
        {images && images.map((uri, index) => {
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
    width: 70,
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
    zIndex: 1,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addBox: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  addText: {
    fontSize: 28,
    color: '#aaa',
  },
});

export default ImagePickerBox;