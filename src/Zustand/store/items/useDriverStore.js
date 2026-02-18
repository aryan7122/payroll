// src/store/customers/useCustomerStore.js
import { create } from 'zustand';
import { createAsyncSlice } from '../core/createAsyncSlice';
import { postApi } from '../core/apiHandler';
import API from '../../services/apiRoutes';

const useDriverStore = create(
  createAsyncSlice(
    (params) => postApi(API.customerList, params),
    {
      beforeFetch: (params) => {
        localStorage.setItem("customerPayload", JSON.stringify(params));
      },
      onSuccess: (data) => console.log("Driver list loaded:", data),
      onError: (err) => console.error("Failed to load customers", err),
    }
  )
);

export default useDriverStore;
