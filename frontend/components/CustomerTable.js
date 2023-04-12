import Image from 'next/image';
import { useState, useEffect, useCallback } from'react';
import { useSelector, useDispatch } from 'react-redux';
import { VscEdit, VscTrash } from 'react-icons/vsc';

import { selectToken } from '.././redux/reducers/auth/authSelectors';
import { loginSuccess, loginFailed } from '.././redux/reducers/auth/authSlice';

import { 
    toggleChangeAction,
    toggleDelete,
    updateAction, 
    deleteAction
} from '.././redux/reducers/customers/customersSlice';
import { fetchCustomers } from '.././redux/reducers/customers/customersActions';
import { 
    selectId,
    selectToggleForm,
    selectCustomers,
    selectFormData,
    selectSearchString,
    selectSearchedCustomers,
} from '.././redux/reducers/customers/customersSelectors';

const getLocalStorage = (key) => {
    if (typeof window!== 'undefined') {
      return localStorage.getItem(key);
    }
  };

export default function CustomerTable() {

    const [isAuth, setIsAuth] = useState(false);
    // Get token from local storage, check if it's running in browser
    const token = useSelector(selectToken)

    const dispatch = useDispatch();

    const id = useSelector(selectId);
    const formOpen = useSelector(selectToggleForm);
    const formData = useSelector(selectFormData);
    const searchString = useSelector(selectSearchString);
    const searchedCustomers = useSelector(selectSearchedCustomers);
    const customers = useSelector(selectCustomers);

    // Refresh the customers when id, formOpen change
    const handleCheckToken = useCallback(() => {
        const token = getLocalStorage('token');
        if (token) {
          (async () => {
            await dispatch(fetchCustomers(token));
            dispatch(loginSuccess(token));
            dispatch(loginFailed(null));
        })();
        } 
      }, [dispatch]);
    
      useEffect(() => {
        handleCheckToken();
    }, [handleCheckToken, id, formOpen]);

    
    const columns = [
        { title: '#'},
        { title: 'Photo', name: 'photo'},
        { title: 'First Name', name: 'first_name'},
        { title: 'Last Name', name: 'last_name'},
        { title: 'Email', name: 'email'},
        { title: 'Phone', name: 'phone'},
        { title: 'Address', name: 'address'},
        { title: 'Status', name: 'status'},
        { title: 'Action', name: 'action'}]

    return ( 
        <div className='container mx-auto'>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="bg-blue-100">
                        <tr className='text-xs text-black uppercase text-center'>
                        {columns.map((col, index) => 
                            <th key={`${col.name}-${index}`} className="px-6 py-3 items-center"  >
                                {col.title}
                            </th>)}
                        </tr>
                    </thead>
                    <tbody className='container mx-auto' key="table-body">
                        {searchString
                        ? searchedCustomers.map((obj, index) => <Tr {...obj} key={`${obj.id}-${index}`} index={index + 1} />)
                        : (id ? <Tr {...formData} index={1} /> : customers.map((obj, index) => <Tr {...obj} key={`${obj.id}-${index}`} index={index + 1} />))
                        }
                    </tbody> 
                </table>
        </div>
    )
}

function Tr({_id, index, first_name, last_name, email, phone, address, photo, status}) {
    
    const dispatch = useDispatch();
    const formOpen = useSelector(selectToggleForm);
    
    const onUpdate = async () => {
        if (!formOpen) {
            await dispatch(toggleChangeAction());
            await dispatch(updateAction(_id));  
        }
        await dispatch(updateAction(_id));
    }

    const onDelete = async () => {
        if (!formOpen) {
            await dispatch(deleteAction(_id));
            await dispatch(toggleDelete());
        }
    }
    
    return (
        <tr className='font-medium whitespace-nowrap text-gray-900 bg-white border-b hover:bg-blue-50'>
            <th className="px-6 py-3 w-12 text-center" key={`header-${index}`}>
                {index}
            </th>
            <td className="px-6 py-3 w-24 items-center">
            { photo ? (
                <Image
                    src={photo}
                    alt=""
                    width={400}
                    height={400}
                    className="h-12 w-12 object-cover"
                    unoptimized
                />
            ) : (
                <div className="h-12 w-12 border border-gray-400 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">{first_name?.[0]} {last_name?.[0]}</span>
                </div>
            )}
            </td>
            <td className="px-6 py-3 w-36 max-w-xs break-words whitespace-normal">
                {first_name || 'Unknown'}
            </td>
            <td className="px-6 py-3 w-36 max-w-xs break-words whitespace-normal">
                {last_name || 'Unknown'}
            </td>
            <td className="px-6 py-3 w-48 max-w-xs break-words whitespace-normal">
                {email || 'Unknown'}
            </td>
            <td className="px-6 py-3 w-48 max-w-xs break-words whitespace-normal">
                {phone || 'Unknown'}
            </td>
            <td className="px-6 py-3 w-72 max-w-xs break-words whitespace-normal">
                {address || 'Unknown'}
            </td>
            <td className="px-6 py-3 w-24 text-center">
                <button className=''>
                    <span className={`${status == 'Active' ? 'bg-green-500' : 'bg-rose-500'} text-white px-3 py-1 rounded-xl`}>{status || 'No Status'}</span>
                </button>
            </td>
            <td className="px-6 py-3 w-36">
                <div className='flex justify-center align-middle'>
                    <button className='cursor mr-2' onClick={onUpdate}>
                        <span className=''>
                        <VscEdit /> 
                        </span>
                    </button>
                    <button className='cursor ml-2' onClick={onDelete}>
                        <span className=''>
                        <VscTrash />
                        </span>
                    </button>
                </div>
            </td>
        </tr>
    )
}
