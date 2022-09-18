import axios from "axios";
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.interceptors.request.use(function (config) {
    console.log('the interceptor is running')
    // Do something before request is sent
    return config;
}, function (error) {
    console.log('errpor', );
    // Do something with request error
    return Promise.reject(error);
});
