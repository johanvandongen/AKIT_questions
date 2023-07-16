import axios from 'axios';

let token: string = '';
const updateToken = (newToken: string): void => {
    token = newToken;
    console.log(`Updated token to ${token}`);
};

const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

// Add access token to all API requests
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export { axiosInstance, token, updateToken };
