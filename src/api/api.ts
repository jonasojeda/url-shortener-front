
// src/api/urlApi.ts
import axios from 'axios';

const API_BASE_URL = "http://3.22.20.179";
//URL create
export const createUrl = async (url: string) => {
    const response = await axios.post(`${API_BASE_URL}/api/url`, { url });
    return response.data;
};

//URL get all
export const fetchUrls = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/url`);
    return response.data;
};

//URL show
export const fetchUrlByKey = async (urlKey: string) => {
    const response = await axios.get(`${API_BASE_URL}/api/url/${urlKey}`);
    return response.data;
};

// Función para eliminar una URL por ID
export const deleteUrl = async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/api/url/${id}`);
    return response.data;
};

