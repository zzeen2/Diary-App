import Constants from 'expo-constants';

// 액션 타입 상수들
export const FETCH_EMOTIONS_LOADING = 'FETCH_EMOTIONS_LOADING';
export const FETCH_EMOTIONS_SUCCESS = 'FETCH_EMOTIONS_SUCCESS';

// 리듀서에서 호출할 내용
export const fetchEmotionsLoading = () => ({ type: FETCH_EMOTIONS_LOADING});
export const fetchEmotionsSuccess = (emotions) => ({ type: FETCH_EMOTIONS_SUCCESS, payload: { data: emotions,}});

// 액션 생성자 함수
export const fetchEmotions = () => {
    return async (dispatch) => {
        try {
        // 로딩 시작
        dispatch(fetchEmotionsLoading());
        //console.log('감정 데이터 요청 시작');
        
        // API URL 가져오기
        const apiUrl = 'http://192.168.219.104:4000'||Constants.expoConfig?.extra?.apiUrl ; // 192.168.0.6 // 192.168.219.104
        console.log("apirukl ######", apiUrl)
        // API 호출
        const response = await fetch(`${apiUrl}/main/emotionAll`);    
        const data = await response.json();
        
        // 성공 시 데이터 설정
        if (data) {dispatch(fetchEmotionsSuccess(data))}

        } catch (error) {
        console.error('리덕스 감정 데이터 가져오기 오류:', error);
        }
    };
};