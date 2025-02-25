import axios from "axios";

// Create an instance of axios with a public base URL
const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Custom hook to use the public axios instance
const useAxiosPublic = () => axiosPublic;

export default useAxiosPublic;