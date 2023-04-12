import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { VscAdd } from 'react-icons/vsc';

import { selectUser } from '.././redux/reducers/auth/authSelectors';


import {
    setFormData,
    setErrorMessage,
    toggleChangeAction,
    toggleDelete
} from '.././redux/reducers/customers/customersSlice';
import { createCustomer } from '.././redux/reducers/customers/customersActions';
import { selectFormData, selectErrorMessage } from '.././redux/reducers/customers/customersSelectors';


// Email validation function
const isValidEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}


export default function CustomerCreate() {

    // Get token from local storage, check if it's running in browser
    const token = typeof window !== 'undefined' && localStorage.getItem('token');
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const userId = user.id;

    const formData = useSelector(selectFormData);
    const errorMessage = useSelector(selectErrorMessage);
    
    const { 
        first_name, 
        last_name, 
        email, 
        phone, 
        address, 
        status, 
        photo
    } = formData;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!first_name) {
            dispatch(setErrorMessage('First name is required'));
            return;
          }
          
          if (!last_name) {
            dispatch(setErrorMessage('Last name is required'));
            return;
          }
          
          if (!email || !isValidEmail(email)) {
            dispatch(setErrorMessage('Email is incorrect'));
            return;
          }
          
          if (!phone) {
            dispatch(setErrorMessage('Phone is required'));
            return;
        }
        
        await dispatch(
            createCustomer({
                first_name,
                last_name,
                email,
                phone,
                address,
                status: 'Active',
                photo,
                user: userId
            }, token),
        );
        await dispatch(toggleDelete(false));
        await dispatch(toggleChangeAction(false));
        await dispatch(setErrorMessage(''));
    };

    return (
        <div className='container mx-auto'>
        <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-6 mt-1">
            <div className="col-span-4">
                <div className='grid lg:grid-cols-2 gap-1 px-1 mt-1'>  
                    <div className='input-type'>
                        <input 
                        type='text' 
                        name="first_name"
                        onChange={(e) => dispatch(setFormData({ ...formData, first_name: e.target.value }))}
                        placeholder='First Name' 
                        className='border border-gray-400 w-full py-2 px-4 rounded-xl focus:border-blue-500 focus:border-2 focus:outline-none'
                        />
                    </div>
                    <div className='input-type'>
                        <input 
                        type='text' 
                        onChange={(e) => dispatch(setFormData({ ...formData, last_name: e.target.value }))} 
                        name="last_name" 
                        placeholder='Last Name' 
                        className='border border-gray-400 w-full py-2 px-4 rounded-xl focus:border-blue-500 focus:border-2 focus:outline-none'
                        />
                    </div>
                    <div className='input-type'>
                        <input 
                        type='text' 
                        onChange={(e) => dispatch(setFormData({ ...formData, email: e.target.value }))} 
                        name="email" 
                        placeholder='Email' 
                        className='border border-gray-400 w-full py-2 px-4 rounded-xl focus:border-blue-500 focus:border-2 focus:outline-none'
                        />
                    </div>
                    <div className='input-type'>
                        <input 
                        type='text' 
                        onChange={(e) => dispatch(setFormData({ ...formData, phone: e.target.value }))} 
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
                        onChange={(e) => dispatch(setFormData({ ...formData, address: e.target.value }))} 
                        name="address" 
                        placeholder='Address' 
                        className='border border-gray-400 w-full py-2 px-4 rounded-xl focus:border-blue-500 focus:border-2 focus:outline-none'
                        />
                    </div>
                    <div className='input-type'>
                        <input 
                        type='text' 
                        name="photo" 
                        onChange={(e) => dispatch(setFormData({ ...formData, photo: e.target.value }))}
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
                    { formData.photo ? (
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
        {errorMessage && <div>{errorMessage}</div>}    
        </div>

        <div className="grid grid-cols-6">
            <div className="col-span-4">
                <div className="grid grid-cols-4">
                    <div className="col-span-1">
                        <div className='px-1 my-2'>
                            <button type = 'submit' className='flex justify-center w-full text-md bg-green-500 text-white px-4 py-2 border rounded-xl hover:bg-green-600 hover:border-green-700 '>
                                Add
                                <span className='my-auto px-2'><VscAdd /></span>
                            </button>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className='mx-2 py-4 flex justify-center'>
                            <div className='form-check mr-4'>
                                <input 
                                value="Active" 
                                id="radioDefault1" 
                                checked={status === 'Active'}
                                onChange={(e) => dispatch(setFormData({ ...formData, status: e.target.value }))} 
                                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2" 
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
                                checked={status === 'Inactive'}
                                onChange={(e) => dispatch(setFormData({ ...formData, status: e.target.value }))} 
                                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2" 
                                type='radio' 
                                name='status'
                                />
                                <label htmlFor='radioDefault2' className='inline-block text-gray-700'>
                                    Inactive
                                </label>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="col-span-2">
            </div> */}
        </div>
        </form>
        </div>
    )
}

