import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import customersReducer from './customers/customersSlice';
import usersReducer from './users/usersSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    customers: customersReducer,
    users: usersReducer
});

export default rootReducer;