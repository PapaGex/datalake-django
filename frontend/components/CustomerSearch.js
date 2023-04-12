import { useDispatch, useSelector } from "react-redux";

import { selectToken } from '.././redux/reducers/auth/authSelectors';

import { searchStringAction } from '.././redux/reducers/customers/customersSlice';
import { searchCustomers } from '.././redux/reducers/customers/customersActions';
import { selectSearchString } from '.././redux/reducers/customers/customersSelectors';

export default function CustomerSearch() {

    // Get token from local storage, check if it's running in browser
    const token = typeof window !== 'undefined' && localStorage.getItem('token');
    const dispatch = useDispatch();

    const searchString = useSelector(selectSearchString);
    
    const onSearchChange = async (e) => {
        const updatedSearchString = e.target.value;
        await dispatch(searchStringAction(updatedSearchString));
        await dispatch(searchCustomers(updatedSearchString, token));
    };

    return (
        <div className='container mx-auto'>
            <input 
            type='text' 
            name="searchString" 
            value={searchString} 
            onChange={onSearchChange}
            placeholder='Search' 
            className='border border-gray-400 w-full py-2 px-4 rounded-xl focus:border-blue-500 focus:border-2 focus:outline-none'
            />
        </div>
    )
  }

