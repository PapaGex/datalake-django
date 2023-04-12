import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VscCheck, VscClose } from 'react-icons/vsc';

import { selectToken } from '.././redux/reducers/auth/authSelectors';
import { loginSuccess, loginFailed } from '.././redux/reducers/auth/authSlice';

import { deleteAction, toggleDelete } from '.././redux/reducers/customers/customersSlice';
import { fetchCustomer, deleteCustomer } from '.././redux/reducers/customers/customersActions';
import { selectId, selectFormData } from '.././redux/reducers/customers/customersSelectors';

const getLocalStorage = (key) => {
    if (typeof window!== 'undefined') {
      return localStorage.getItem(key);
    }
  };

export default function CustomerDelete() {

    // Get token from local storage, check if it's running in browser
    const dispatch = useDispatch();

    const id = useSelector(selectId);
    const formData = useSelector(selectFormData);
    const token = useSelector(selectToken);

    // const { first_name, last_name } = formData || {};
    const { first_name, last_name } = formData;
    
    // Refresh the customers when id is changed
    const handleCheckToken = useCallback(() => {
        const token = getLocalStorage('token');
        if (id && token) {
          (async () => {
            await dispatch(fetchCustomer(id, token));
            dispatch(loginSuccess(token));
            dispatch(loginFailed(null));
        })();
        } 
      }, [id, dispatch]);
    
      useEffect(() => {
        handleCheckToken();
    }, [handleCheckToken]);


    const deleteHandler = async () => {
        
        await dispatch(deleteCustomer(id, token));
        await dispatch(deleteAction(undefined));
        await dispatch(toggleDelete(false));
    }

    const cancelHandler = async () => {
        await dispatch(deleteAction(null));
        await dispatch(toggleDelete(false));
    }

    return (
        <div className="flex items-center space-x-1">
            <p className='text-xl mr-3'>Delete {first_name} {last_name}?</p>
            <button 
                onClick={cancelHandler}
                className="flex text-md bg-green-500 text-white px-4 py-2 rounded-xl border-rounded-xl hover:bg-green-500 hover:border-green-500 hover:text-grey-50">
                Cancel
                <span className='my-auto mx-1'><VscClose /></span>
            </button>
            <button
                onClick={deleteHandler}
                className="flex text-md bg-red-500 text-white px-4 py-2 rounded-xl border-rounded-xl hover:bg-rose-500 hover:border-red-500 hover:text-grey-50">
                Delete
                <span className='my-auto mx-1'><VscCheck /></span>
            </button>
        </div>
    )
}