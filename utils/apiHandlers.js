import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

console.log({BASE_URL})

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();

      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//     response => response,
//     async (error) => {
//         const originalRequest = error.config
//         if (error?.response?.status == 401 && !originalRequest._retry) {
//             originalRequest._retry = true
//             try {
//                 const refreshToken = localStorage.getItem("refreshToken")
//                 if (refreshToken) {

//                     const response = await axios.post(`${BASE_URL}/refresh/`, { refresh: refreshToken })
//                     const newAccessToken = response.data.access
//                     localStorage.setItem("accessToken", newAccessToken)

//                     api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                     originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                     return api(originalRequest);
//                 } else {

//                     return Promise.reject(error);
//                 }
//             } catch (error) {
//                 return Promise.reject(error)
//             }
//         } else {
//             return Promise.reject(error);
//         }
//     }
// )

