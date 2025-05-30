import { EXPO_PUBLIC_API_URL } from '@env';

export const getUserInfo = async (token) => {
    try {
        console.log("getUserInfo")
        const res = await fetch(`${EXPO_PUBLIC_API_URL}/login/app/user`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        const data = await res.json();

        console.log(" 응답 data:", data);
        if (!res.ok) {
        throw new Error(data.message || '유저 정보 요청 실패');
        }

        return data;
    } catch (error) {
        throw error;
    }
};
