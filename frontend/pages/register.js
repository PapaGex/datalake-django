import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';


import { registerUser } from '.././redux/reducers/auth/authActions';
import { selectLoginFailed } from '.././redux/reducers/auth/authSelectors';
import { loginFailed } from '../redux/reducers/auth/authSlice';


const Register = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const errorMessage = useSelector(selectLoginFailed);


    const resetErrorMessage = useCallback(() => {
      dispatch(loginFailed(''));
    }, [dispatch]);
  
  
    // Reset error message when switching Login  and Signup pages
    useEffect(() => {
      const handleRouteChange = () => {
        resetErrorMessage();
      };
      router.events.on('routeChangeStart', handleRouteChange);
      return () => {
        router.events.off('routeChangeStart', handleRouteChange);
      };
    }, [router.events, resetErrorMessage]);
  
    
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
    
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(loginFailed(''));
      dispatch(registerUser(username, email, password, router));

    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl overflow-hidden shadow-md px-6 py-8">
          <h1 className="text-2xl font-semibold mb-4 text-center">Create Account</h1>
          <div className="mb-6">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="appearance-none border rounded w-64 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="appearance-none border rounded w-64 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            {errorMessage && (
              <div className="text-red-500 break-words overflow-y-auto text-sm mb-4">{errorMessage}</div>
            )}
          </div>
          <div className="w-full flex justify-center mb-2">
            <Link href="/login" className="text-blue-500 hover:text-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </Link>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-2 px-12 rounded-full focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
    
}

export default Register;