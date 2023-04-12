import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { loginFailed } from '.././redux/reducers/auth/authSlice';
import { getCurrentUser, logoutUser } from '.././redux/reducers/auth/authActions';
import { selectUser, selectIsAuth } from '.././redux/reducers/auth/authSelectors';

import { toggleDashboard } from '.././redux/reducers/users/usersSlice';
import { selectToggleDashboard } from '../redux/reducers/users/usersSelectors';


const getLocalStorage = (key) => {
  if (typeof window!== 'undefined') {
    return localStorage.getItem(key);
  }
};


export default function CustomerHeader() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);
  const isOpenDashboard = useSelector(selectToggleDashboard);

  const handleCheckToken = useCallback(() => {
    const token = getLocalStorage('token');
    if (token) {
      dispatch(getCurrentUser(token));
    } else {
      dispatch(loginFailed(null));
    }
  }, [dispatch]);

  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);


  const handleCustomers = () => {
    window.location.reload();
  };

  const handleDashboard = () => {
    dispatch(toggleDashboard());
  };

  const handleLogout = () => {
    dispatch(logoutUser(router));
  };

  return (
    <>
      {isAuth && (
        <div className="container mx-auto">
          <div className="flex justify-end">
            <button onClick={handleCustomers} className="px-2">
              Customers
            </button>
            <button onClick={handleDashboard} className="px-2">
              Dashboard
            </button>
            <span className="px-2">{user && user.email}</span>
            <button onClick={handleLogout} className="px-2">
              Logout
            </button>
          </div>

          { !isOpenDashboard && 
          <div className="py-3">
            <h1 className="text-3xl text-center">Customer Management</h1>
          </div>
          }

        </div>
      )}
    </>
  );
}
