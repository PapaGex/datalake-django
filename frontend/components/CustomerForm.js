import { useSelector, useDispatch } from "react-redux";
import { VscFoldDown, VscFoldUp } from 'react-icons/vsc';

import CustomerCreate from './CustomerCreate';
import CustomerUpdate from './CustomerUpdate';
import CustomerDelete from './CustomerDelete';
import CustomerSearch from './CustomerSearch';

import { 
    toggleChangeAction,
    toggleDelete,
    setFormData,
    setErrorMessage,
    updateAction, 
    searchStringAction
} from ".././redux/reducers/customers/customersSlice";
import { 
    selectId, 
    selectToggleForm, 
    selectToggleDelete
} from ".././redux/reducers/customers/customersSelectors";
import { toggleDashboard } from '../redux/reducers/users/usersSlice';
import { selectToggleDashboard } from '../redux/reducers/users/usersSelectors';

export default function CustomerForm() {

    const dispatch = useDispatch();
    const id = useSelector(selectId);
    const formOpen = useSelector(selectToggleForm);
    const isDelete = useSelector(selectToggleDelete);
    const isDashboard = useSelector(selectToggleDashboard);

    const resetForm = () => {
        dispatch(setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            status: 'Active',
            photo: '',
            user: '1',
        }));
        dispatch(setErrorMessage(''))
        dispatch(searchStringAction(''));
        dispatch(toggleDelete(false));
    };

    const handlerButtonClick = () => {
        if (isDashboard) {
            dispatch(toggleDashboard(false))
        }
        if (formOpen && id) {
            dispatch(updateAction(undefined));
            dispatch(toggleDelete(false));
        }
        dispatch(toggleChangeAction());
        resetForm();
    }
    
    return (
        <div className="container mx-auto">
            <div className='flex justify-between px-1 py-1 border-b'> 
                <div className='left flex'>
                    <button onClick={handlerButtonClick}
                    className='flex w-48 justify-center text-md bg-blue-500 text-white px-4 py-2 border rounded-xl hover:bg-blue-700 hover:text-white hover:border-blue-700 '>
                        { formOpen ? <span className='my-auto mx-1'><VscFoldUp /></span> 
                        : <span className='my-auto mx-1'><VscFoldDown /></span>  }
                        <span className="my-auto mx-1">{formOpen ? "Close" : "Add Customer"}</span>
                    </button>
                </div>
                <div className='flex w-2/6'>{!formOpen && !isDelete && <CustomerSearch />}</div>
                <div className='right flex'>{!formOpen && isDelete && <CustomerDelete />}</div>
            </div>
            <div>{formOpen && (id ? <CustomerUpdate/> : <CustomerCreate />)}</div>
        </div>
    )
}
