import axios from "axios";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_serverKey,
    headers: {
        'content-type': 'application/json'
    },
    withCredentials: true
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;