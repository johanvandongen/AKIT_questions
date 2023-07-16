import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL ?? '';
console.log('ada', baseURL);
let token: string = '';
const updateToken = (newToken: string): void => {
    token = newToken;
    console.log(`Updated token to ${token}`);
};

const axiosInstance = axios.create({
    baseURL,
});

// Add access token to all API requests
axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export { axiosInstance, token, updateToken };
