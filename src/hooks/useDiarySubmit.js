const useDiarySubmit = () => {
  const [loading, setLoading] = useState(false);

  const submit = async ({ primaryEmotion, secondaryEmotion, text, images }) => {
    if (!text.trim()) {
      Alert.alert("내용을 작성해주세요.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('content', text);
      formData.append('primaryEmotion', primaryEmotion.type);
      formData.append('secondaryEmotion', secondaryEmotion?.type || null);
      images.forEach((uri, i) => {
        formData.append('images', {
          uri,
          name: `image_${i}.jpg`,
          type: 'image/jpeg',
        });
      });

      // 예시
      await fetch('https://your-api.com/diary', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('작성 완료!');
      // navigation.goBack(); 등
    } catch (err) {
      Alert.alert('오류 발생', err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading };
};
