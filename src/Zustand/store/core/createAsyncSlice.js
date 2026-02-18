// src/store/core/createAsyncSlice.js

import toast from "react-hot-toast";

export const createAsyncSlice = (fetcher, config = {}) => (set, get) => ({
    data: null,
    loading: false,
    error: null,

    fetch: async (params) => {

        if (config.beforeFetch) {
            config.beforeFetch(params, get());
        }

        set({ loading: true, error: null });

        try {
            const data = await fetcher(params);
            set({ data, loading: false });

            if (config.onSuccess) config.onSuccess(data, get());

            return data;
        } catch (error) {
            const errMsg = error?.message || 'Unknown error';
            set({ error: errMsg, loading: false });

            if (config.onError) config.onError(error, get());
        }
    },
});
