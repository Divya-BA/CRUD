import axios from 'axios';

const cUrl = 'https://api.countrystatecity.in/v1';
const ckey = 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==';

// Set up the axios instance with the API key
const axiosInstance = axios.create({
    baseURL: cUrl,
    headers: {
        'X-CSCAPI-KEY': ckey
    }
});

// Fetch all countries
export const fetchCountries = async () => {
    try {
        const response = await axiosInstance.get('/countries');
        return response.data;
    } catch (error) {
        console.error('Error in fetching countries', error);
        throw error;
    }
};

// Fetch states by country ISO2 code
export const fetchStates = async (countryCode) => {
    try {
        const response = await axiosInstance.get(`/countries/${countryCode}/states`);
        return response.data;
    } catch (error) {
        console.error('Error in fetching states', error);
        throw error;
    }
};

// Fetch cities by state ISO2 code and country ISO2 code
export const fetchCities = async (countryCode, stateCode) => {
    try {
        const response = await axiosInstance.get(`/countries/${countryCode}/states/${stateCode}/cities`);
        return response.data;
    } catch (error) {
        console.error('Error in fetching cities', error);
        throw error;
    }
};
