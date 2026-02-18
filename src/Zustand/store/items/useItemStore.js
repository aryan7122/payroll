// src/store/customers/useCustomerStore.js
import { create } from 'zustand';
import { createAsyncSlice } from '../core/createAsyncSlice';
import { postApi } from '../core/apiHandler';
import API from '../../services/apiRoutes';

const useItemStore = create(
    createAsyncSlice(
        (params) => postApi(API.customerList, params),
        {
            // beforeFetch: (params) => {
            //     localStorage.setItem("customerPayload", JSON.stringify(params));
            // },

            onSuccess: (data) => console.log("Item list loaded:", data),
            onError: (err) => console.error("Failed to load Item", err),
        }
    )
);

export default useItemStore;
