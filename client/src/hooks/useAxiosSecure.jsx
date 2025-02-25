import axios from "axios";

// Create an instance of axios with a secure base URL
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Custom hook to use the secure axios instance
const useAxiosSecure = () => axiosSecure;

export default useAxiosSecure;
