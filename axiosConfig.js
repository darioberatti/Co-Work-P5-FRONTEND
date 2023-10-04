// axiosConfig.js
import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = process.env.API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    let token = Cookies.get("token");
    /* console.log("token req--->", token); */
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    let token = Cookies.get("token");
    /*  console.log("token response--->", token); */
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// export const fetchAPI = (
//   { method, url, body },
//   token
// ) => {
//   // acá averiguen como seteear allow credentials en el header
//   //aca averiguen como inyectar el token en Authorization header (y recuerden el Bearer)
//   if (token) {
//     axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   }
//   return axiosInstance[method](url, body);
// };

export default axiosInstance;
