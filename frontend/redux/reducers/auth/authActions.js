import axios from 'axios';
import {
  loginSuccess,
  loginFailed,
  setUser,
  logout,
} from './authSlice';


const NEXT_PUBLIC_BASE_URL="your-next-public-base-url";

const setLocalStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};


const removeLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};


// Login existing user
export const loginUser = ({ username, password }, router) => async (dispatch) => {
  try {
    const response = await axios.post(`${NEXT_PUBLIC_BASE_URL}/api/token/`, { username, password });
    const { access } = response.data;

    setLocalStorage('token', access);
    setLocalStorage('isAuth', true);

    dispatch(loginSuccess(access));
    dispatch(loginFailed(null));

    router.push('/');
  } catch (error) {
    dispatch(loginFailed(error.message));
  }
};


// Register new user
export const registerUser = (username, email, password, router) => async (dispatch) => {
  try {
    await axios.post(`${NEXT_PUBLIC_BASE_URL}/api/auth/users/`, {
      username,
      email,
      password,
    });

    await dispatch(loginUser({ username, password }, router));
  } catch (error) {
    dispatch(loginFailed(error.message));
  }
};


// Logout user
export const logoutUser = (router) => (dispatch) => {
    removeLocalStorage('token');
    setLocalStorage('isAuth', false);
  
    dispatch(logout());
  
    router.push('/');
  };


//  Get current user
export const getCurrentUser = (token) => async (dispatch) => {
  try {
      const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/users/users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setUser(response.data[0]));
  } catch (error) {
    dispatch(loginFailed('Error while getting user'));
  }
};
