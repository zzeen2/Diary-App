import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerBox = ({ images, setImages }) => {
  const pickImage = async () => { // 이미지 추가
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImages([...images, uri]);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>사진 추가 (최대 5장)</Text>
      <View style={styles.imageRow}>
        {images.map((uri, index) => (
          <TouchableOpacity key={index} onPress={() => removeImage(index)}>
            <Image source={{ uri }} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}

        {images.length < 5 && (
          <TouchableOpacity onPress={pickImage}>
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
  thumbnail: {
    width: 160,
    height: 160,
    borderRadius: 8,
  },
  addBox: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 28,
    color: '#aaa',
  },
});

export default ImagePickerBox;
