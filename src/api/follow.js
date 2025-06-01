import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';

export const getFollowers = async (uid) => {
  const res = await axios.get(`${EXPO_PUBLIC_API_URL}/follow/app/followers`, {
    params: { uid },
  });
  return res.data;
};

export const getFollowings = async (uid) => {
  const res = await axios.get(`${EXPO_PUBLIC_API_URL}/follow/app/followings`, {
    params: { uid },
  });
  return res.data;
};

export const followUser = async (follower_id, following_id) => {
  const res = await axios.post(`${EXPO_PUBLIC_API_URL}/follow/create`, {
    follower_id,
    following_id,
  });
  return res.data;
};

export const unfollowUser = async (follower_id, following_id) => {
  const res = await axios.delete(`${EXPO_PUBLIC_API_URL}/follow/delete`, {
    data: { follower_id, following_id },
  });
  return res.data;
};

export const checkFollowStatus = async (follower, following) => {
  const res = await axios.get(`${EXPO_PUBLIC_API_URL}/follow/status`, {
    params: { follower, following },
  });
  return res.data.isFollowed;
}; 