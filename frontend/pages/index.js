import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";

import Header from ".././components/CustomerHeader";
import UserDashboard from ".././components/UserDashboard";
import CustomerForm from ".././components/CustomerForm";
import CustomerTable from ".././components/CustomerTable";
// import Login from '.././pages/login';
import { loginSuccess, loginFailed } from '.././redux/reducers/auth/authSlice';
import { selectIsAuth } from "../redux/reducers/auth/authSelectors";
import { selectToggleDashboard } from ".././redux/reducers/users/usersSelectors";

const Login = dynamic(() => import('./login'), { ssr: false });

const getLocalStorage = (key) => {
  if (typeof window!== 'undefined') {
    return localStorage.getItem(key);
  }
};

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isDashboard = useSelector(selectToggleDashboard);

  const isAuth = useSelector(selectIsAuth);
  
  const handleCheckToken = useCallback(() => {
    const token = getLocalStorage('token');
    if (token) {
      dispatch(loginSuccess(token));
      dispatch(loginFailed(null));
    } 
  }, [dispatch]);

  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);


  return (
    <div className='w-full overflow-hidden'>
        {isAuth ? (
        <>
          <Header />
          { isDashboard && <UserDashboard /> }
          <CustomerForm />
          <CustomerTable />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
