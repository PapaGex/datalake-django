import axios from 'axios';
import {
    setCustomers,
    setFormData,
    setSearchedCustomers,
    setErrorMessage,
} from './customersSlice'


const NEXT_PUBLIC_BASE_URL = "your-next-public-base-url";

// Get customers
export const fetchCustomers = (token) => async (dispatch) => {
    try {
        const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/customers/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setCustomers(response.data));
    } catch (error) {
        console.error('Error fetching customers:', error);
        dispatch(setErrorMessage('Failed to fetch customers.'));
    }
}

// Get customer by id
export const fetchCustomer = (id, token) => async (dispatch) => {
    try {
        const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/customers/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setFormData(response.data));
    } catch (error) {
        console.error('Error fetching customer:', error);
        console.error('Error details:', error.response); 
        dispatch(setErrorMessage('Failed to fetch customer.'));
    }
}

// Create customer
export const createCustomer = (formData, token) => async (dispatch) => {
    try {
        const response = await axios.post(`${NEXT_PUBLIC_BASE_URL}/api/customers/`, formData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setFormData(response.data));
    } catch (error) {
        console.error('Error creating customer:', error);
        dispatch(setErrorMessage('Failed to create customer.'));
    }
};

// Update customer
export const updateCustomer = (id, formData, token) => async (dispatch) => {
    try {
        const response = await axios.put(`${NEXT_PUBLIC_BASE_URL}/api/customers/${id}/`, formData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setFormData(response.data));
    } catch (error) {
        console.error('Error updating customer:', error);
        dispatch(setErrorMessage('Failed to update customer.'));
    }
};

// Delete customer
export const deleteCustomer = (id, token) => async (dispatch) => {
    try {
        const response = await axios.delete(`${NEXT_PUBLIC_BASE_URL}/api/customers/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setFormData(response.data));
    } catch (error) {
        console.error('Error deleting customer:', error);
        dispatch(setErrorMessage('Failed to delete customer.'));
    }
};

// Search customers by search string
export const searchCustomers = (searchString, token) => async (dispatch) => {
    try {   
        const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/customers/?search=${searchString}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setSearchedCustomers(response.data));
    } catch (error) {
        console.error('Error searching customers:', error);
        dispatch(setErrorMessage('Failed to search customers.'));
    }
};
