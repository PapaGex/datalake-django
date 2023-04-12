import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: undefined,
    toggleForm: false,
    toggleDelete: false,
    formData: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        status: '',
        photo: '',
        user: ''
    },
    customers: [],
    searchString: '',
    searchedCustomers: [],
    errorMessage: '',
}

const customersSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        id: (state, action) => {
            state.id = action.payload;
        },
        toggleChangeAction: (state) => {
            state.toggleForm =!state.toggleForm
        },
        toggleDelete: (state) => {
            state.toggleDelete =!state.toggleDelete
        },
        setFormData: (state, action) => { 
            state.formData = action.payload;
        },
        setCustomers: (state, action) => {
            state.customers = action.payload;
        },
        updateAction: (state, action) => {
            state.id = action.payload
        },
        deleteAction: (state, action) => {
            state.id = action.payload
        },
        searchStringAction: (state, action) => {
            state.searchString = action.payload
        },
        setSearchedCustomers: (state, action) => { 
            state.searchedCustomers = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
    },
});

export const { 
    id,
    toggleChangeAction,
    toggleDelete,
    setFormData,
    setCustomers,
    updateAction,
    deleteAction,
    searchStringAction,
    setSearchedCustomers,
    setErrorMessage
} = customersSlice.actions;
 
export default customersSlice.reducer;

