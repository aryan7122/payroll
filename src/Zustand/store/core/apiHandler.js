// src/store/core/apiHandler.js
import axiosInstance from "../../../Configs/axiosInstance";

export const postApi = async (url, payload, options = {}) => {
    const response = await axiosInstance.post(url, payload);
    return response.data;
};
