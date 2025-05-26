import OpenAI from 'openai';
import { Alert } from 'react-native';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const useEmotionAnalyze = () => {
    const analyzeEmotion = async (content, emotionList, setAiEmotion) => {
        if (!content || content.trim().length === 0) {
            Alert.alert('일기 내용을 먼저 작성해주세요.');
        return;
        }

        try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
            {
                role: "user",
                content: `다음 일기에서 주된 감정을 하나의 단어로 말해줘. (행복, 슬픔, 분노, 평온, 불안, 피곤, 신남, 혼란, 감사 중에서)\n\n"${content}"`,
            },
            ],
            temperature: 0.5,
            max_tokens: 10,
        });

        const keyword = response.choices[0].message.content.trim();
        console.log('분석된 감정 키워드:', keyword);

        const matched = emotionList.find((e) => e.name === keyword);
        if (matched) {
            setAiEmotion(matched);
        } else {
            Alert.alert('분석 결과를 해석할 수 없습니다.', `"${keyword}"`);
        }
        } catch (err) {
            console.error('감정 분석 오류:', err);
        Alert.alert('감정 분석 실패', err.message || '네트워크 오류');
        }
    };

    return { analyzeEmotion };
};

export default useEmotionAnalyze;
