import Image from 'next/image';
import { VscEdit } from 'react-icons/vsc';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";

import { loginSuccess, loginFailed } from '.././redux/reducers/auth/authSlice';
import { getCurrentUser, logoutUser } from '.././redux/reducers/auth/authActions';
import { selectToken, selectUser, selectIsAuth } from '.././redux/reducers/auth/authSelectors';

import { setFormUserData } from '../redux/reducers/users/usersSlice';
import { selectFormUserData } from '../redux/reducers/users/usersSelectors';


const getLocalStorage = (key) => {
    if (typeof window!== 'undefined') {
      return localStorage.getItem(key);
    }
  };

const UserDashboard = () => {
    const dispatch = useDispatch();

    const formUserData = useSelector(selectFormUserData);

    const router = useRouter();
    const token = useSelector(selectToken);
    const isAuth = useSelector(selectIsAuth);

    const user = useSelector(selectUser);
    const {
        first_name, 
        last_name, 
        email,
        phone,
        address,
        photo
    } = user;
    
      useEffect(() => {
        const token = getLocalStorage('token');
        if (token) {
          dispatch(loginSuccess(token));
          dispatch(loginFailed(null));
          dispatch(getCurrentUser(token));
        } else {
          dispatch(logoutUser(router));
          dispatch(loginFailed(null));
        }
      }, [isAuth, dispatch, router]);


    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <>
        {isAuth && (
        <div className='container mx-auto'>
        <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-6 mt-1">
            <div className="col-span-4">
                <div className='grid lg:grid-cols-2 gap-1 px-1 mt-1'>  
                    <div className='input-type'>
                    <input 
                    type='text' 
                    name="username" 
                    value={first_name || ''} 
                    onChange={(e) => dispatch(setFormUseData({ ...formUserData, first_name: e.target.value }))} 
                    // onChange={(e) => dispatch(setFormData({ ...formData, first_name: e.target.value }))} 
                    placeholder='First Name' 
                    className='border border-gray-400 w-full py-2 px-4 rounded-xl focus:border-blue-500 focus:border-2 focus:outline-none'
                    />
                    </div>
                    <div className='input-type'>
                    <input 
                    type='text' 
                    value={last_name || ''} 
                    onChange={(e) => dispatch(setFormUserData({ ...formUserData, last_name: e.target.value }))} 
                    name="last_name" 
                    placeholder='Last Name' 
                    className='border border-gray-400 w-full py-2 px-4 rounded-xl focus:border-blue-500 focus:border-2 focus:outline-none'
                    />
                    </div>
                    <div className='input-type'>
                    <input 
                    type='text' 
                    value={email || ''} 
                    onChange={(e) => dispatch(setFormUserData({ ...formUserData, email: e.target.value }))} 
                    name="email" 
                    placeholder='Email' 
                    className='border border-gray-400 w-full py-2 px-4 rounded-xl focus:border-blue-500 focus:border-2 focus:outline-none'
                    />
                    </div>
                    <div className='input-type'>
                    <input 
                    type='text' 
                    value={phone || ''} 
                    onChange={(e) => dispatch(setFormUserData({ ...formUserData, phone: e.target.value }))} 
                    name="phone" 
                    placeholder='Phone' 
                    className='border border-gray-400 w-full py-2 px-4 rounded-xl focus:border-blue-500 focus:border-2 focus:outline-none'
                    />
                    </div>
                </div>
                <div className='grid lg:grid-cols-1 gap-1 px-1 mt-1'> 
                    <div className='input-type'>
                        <input 
                        type='text' 
                        value={address || ''} 
                        onChange={(e) => dispatch(setFormUserData({ ...formUserData, address: e.target.value }))} 
                        name="address" 
                        placeholder='Address' 
                        className='border border-gray-400 w-full py-2 px-4 rounded-xl focus:border-blue-500 focus:border-2 focus:outline-none'
                        />
                    </div>
                    <div className='input-type'>
                        <input 
                        type='text' 
                        value={photo || ''} 
                        onChange={(e) => dispatch(setFormUserData({ ...formUserData, photo: e.target.value }))} 
                        name="photo" 
                        placeholder='Photo URL' 
                        className='border border-gray-400 w-full py-2 px-4 rounded-xl focus:border-blue-500 focus:border-2 focus:outline-none'
                        />
                    </div>
                </div>
            </div>
            <div className="col-span-2">
            <div className='grid lg:grid-cols-1'>
                <div className='mx-1'>
                    <div className="">
                    { photo ? (
                        <Image
                            src={photo}
                            alt=""
                            width={400}
                            height={400}
                            className="h-48 w-48 object-cover"
                            unoptimized
                        />
                    ) : (
                        <div className="h-48 w-48 border border-gray-400 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No photo</span>
                        </div>
                    )}
                    </div>
                </div>

            </div>
        </div>
        </div>

        <div className='container mx-auto px-2'>
        {/* {errorMessage && <div>{errorMessage}</div>}     */}
        </div>
        
        <div className="grid grid-cols-6">
            <div className="col-span-4">
                <div className="grid grid-cols-4">

                    {/* <div className="col-span-1">
                        <div className='px-1 my-2'>
                            <button type = 'submit' className='flex justify-center w-full text-md bg-yellow-500 text-white px-4 py-2 border rounded-xl hover:bg-yellow-600 hover:border-yellow-700 '>
                                Update
                                <span className='my-auto px-2'><VscEdit /></span>
                            </button>
                        </div>
                    </div> */}

                    {/* <div className="col-span-3">
                        <div className='mx-2 py-4 flex justify-center'>
                            <div className='form-check mr-4'>
                                <input 
                                value="Active" 
                                id="radioDefault1" 
                                // checked={status === 'Active'}
                                // onChange={(e) => dispatch(setFormData({ ...formData, status: e.target.value }))} 
                                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pounter" 
                                type='radio' 
                                name='status'
                                />
                                <label htmlFor='radioDefault1' className='inline-block text-gray-700'>
                                    Active
                                </label>
                            </div>
                            <div className='form-check ml-4'>
                                <input 
                                value="Inactive" 
                                id="radioDefault2" 
                                // checked={status === 'Inactive'}
                                // onChange={(e) => dispatch(setFormData({ ...formData, status: e.target.value }))} 
                                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pounter" 
                                type='radio' 
                                name='status'
                                />
                                <label htmlFor='radioDefault2' className='inline-block text-gray-700'>
                                    Inactive
                                </label>
                            </div>
                        
                        </div>
                    </div> */}

                </div>
            </div>
            {/* <div className="col-span-2">
            </div> */}
        </div>

        </form>
        </div>
        )}
        </>
    );

}
export default UserDashboard;