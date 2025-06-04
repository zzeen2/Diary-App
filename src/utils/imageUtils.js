import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Alert, Platform } from 'react-native';

// 기본 이미지 조작 옵션
const DEFAULT_MANIPULATION_OPTIONS = {
  resizeWidth: 1400,
  compressQuality: 0.7,
  format: ImageManipulator.SaveFormat.JPEG,
};

const MAX_FILE_SIZE = 2 * 1024 * 1024;

/**
 * 이미지를 조작하는 함수 (리사이즈, 압축)
 * @param {string} imageUri 원본 이미지 URI
 * @param {object} options 조작 옵션 (resizeWidth, compressQuality, format)
 * @returns {Promise<ImageManipulator.ImageResult | null>} 조작된 이미지 결과 또는 null
 */
export const manipulateImageAsync = async (
  imageUri,
  options = DEFAULT_MANIPULATION_OPTIONS
) => {
  let { resizeWidth, compressQuality, format } = {
    ...DEFAULT_MANIPULATION_OPTIONS,
    ...options,
  };

  try {
    console.log(`Manipulating image: ${imageUri} with options:`, { resizeWidth, compressQuality, format });
    
    let manipResult = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: resizeWidth } }],
      {
        compress: compressQuality,
        format: format,
        base64: false,
      }
    );

    const response = await fetch(manipResult.uri);
    const blob = await response.blob();
    let fileSize = blob.size;
    
    console.log(`Initial file size: ${(fileSize / 1024).toFixed(0)}KB`);

    let attempts = 0;
    const maxAttempts = 5;
    
    while (fileSize > MAX_FILE_SIZE && attempts < maxAttempts) {
      attempts++;
      console.log(`File too large (${(fileSize / 1024).toFixed(0)}KB), attempting compression ${attempts}/${maxAttempts}`);
      
      resizeWidth = Math.floor(resizeWidth * 0.7);
      compressQuality = Math.max(0.1, compressQuality - 0.1);
      
      manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: resizeWidth } }],
        {
          compress: compressQuality,
          format: format,
          base64: false,
        }
      );
      
      const newResponse = await fetch(manipResult.uri);
      const newBlob = await newResponse.blob();
      fileSize = newBlob.size;
      
      console.log(`After compression ${attempts}: ${(fileSize / 1024).toFixed(0)}KB (${resizeWidth}px, ${(compressQuality * 100).toFixed(0)}%)`);
    }

    if (fileSize > MAX_FILE_SIZE) {
      Alert.alert(
        '이미지 크기 오류',
        `이미지 파일이 너무 큽니다 (${(fileSize / 1024).toFixed(0)}KB). 더 작은 이미지를 선택하거나 다른 이미지를 시도해주세요.`
      );
      return null;
    }

    console.log(`Final manipulation successful: ${(fileSize / 1024).toFixed(0)}KB`);
    return manipResult;
  } catch (error) {
    console.error('Error manipulating image:', error);
    Alert.alert(
      '이미지 처리 오류',
      '이미지를 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.'
    );
    return null;
  }
};

/**
 * 이미지 라이브러리에서 이미지를 선택하고 조작하는 함수
 * @param {object} manipulationOptions 이미지 조작 옵션 (선택 사항)
 * @returns {Promise<ImageManipulator.ImageResult | null>} 조작된 이미지 결과 또는 null
 */
export const pickAndManipulateImageAsync = async (
  manipulationOptions = DEFAULT_MANIPULATION_OPTIONS
) => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        '권한 필요',
        '이미지를 선택하려면 사진 라이브러리 접근 권한이 필요합니다.'
      );
      return null;
    }
  }

  try {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, 
      quality: 1, 
    });

    if (pickerResult.canceled || !pickerResult.assets || pickerResult.assets.length === 0) {
      console.log('Image picking cancelled or no assets selected.');
      return null;
    }

    const selectedImageUri = pickerResult.assets[0].uri;
    console.log('Image selected:', selectedImageUri);

    return await manipulateImageAsync(selectedImageUri, manipulationOptions);
  } catch (error) {
    console.error('Error picking image:', error);
    Alert.alert('이미지 선택 오류', '이미지를 선택하는 중 오류가 발생했습니다.');
    return null;
  }
}; 