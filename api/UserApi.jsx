import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
});

const handleRequest = async (method, url, data = null) => {
    try {
        const response = await axiosInstance({ method, url, data });
        return response.data;
    } catch (error) {
        console.error(`Error in ${method} request to ${url}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};


export const createUser = async (userData) => {return handleRequest('post', '/users', userData);}
export const getUsers = async () => {return handleRequest('get', '/users');}
export const getUserById = async (id) => {return handleRequest('get', `/users/${id}`);}
export const updateUser = async (id, userData) => {return handleRequest('put', `/users/${id}`, userData);}
export const deleteUser = async (id) => {return handleRequest('delete', `/users/${id}`);}