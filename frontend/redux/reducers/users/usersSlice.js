import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggleDashboard: false,
    formUserData: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        status: '',
        photo: '',
        user: ''
    },
    users: [],
    errorUserMessage: '',
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        toggleDashboard: (state) => {
            state.toggleDashboard =!state.toggleDashboard
        },
        setFormUserData: (state, action) => { 
            state.formUserData = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setUserErrorMessage: (state, action) => {
            state.errorUserMessage = action.payload;
        },
    },
});

export const { 
    toggleDashboard,
    setFormUserData,
    setUsers,
    setUserErrorMessage
} = usersSlice.actions;
 
export default usersSlice.reducer;