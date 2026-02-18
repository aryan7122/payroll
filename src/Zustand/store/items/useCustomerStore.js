// src/store/customers/useCustomerStore.js
import { create } from 'zustand';
import { createAsyncSlice } from '../core/createAsyncSlice';
import { postApi } from '../core/apiHandler';
import API from '../../services/apiRoutes';

const useCustomerStore = create(
  createAsyncSlice(
    (params) => postApi(API.customerList, params),
    {
      beforeFetch: (params) => {
        localStorage.setItem("customerPayload", JSON.stringify(params));
      },
      onSuccess: (data) => console.log("Customer list loaded:", data),
      onError: (err) => console.error("Failed to load customers", err),
    }
  )
);

export default useCustomerStore;

export const useCustomerCreateStore = create(
  createAsyncSlice((params) => postApi(API.createCustomer, params))
);

