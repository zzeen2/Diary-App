export const getTodayFollowingDiaries = async () => {
  const res = await axios.get(`${API_URL}/app/followings/todayDiaries`, {
    withCredentials: true,
  });
  return res.data;
}; 