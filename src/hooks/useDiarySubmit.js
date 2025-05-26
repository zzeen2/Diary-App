import { useState } from 'react';
import { Alert } from 'react-native';

const useDiarySubmit = (navigation) => {
  const [loading, setLoading] = useState(false);

  const submit = async ({ title, content, images, userEmotion, aiEmotion, isPublic }) => {
  try {
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('userEmotion', userEmotion.type);
    formData.append('aiEmotion', aiEmotion.type);
    formData.append('isPublic', isPublic ? 'true' : 'false');

    images.forEach((uri, i) => {
      formData.append('images', {
        uri,
        name: `image_${i}.jpg`,
        type: 'image/jpeg',
      });
    });

    const response = await fetch('https://your-api.com/diary', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      throw new Error('서버 오류가 발생했습니다.');
    }

    Alert.alert('일기가 저장되었습니다!');
    navigation.navigate('Main');
  } catch (err) {
    Alert.alert('저장 실패', err.message || '네트워크 오류');
  } finally {
    setLoading(false);
  }
};

  return { submit, loading };
};

export default useDiarySubmit;
