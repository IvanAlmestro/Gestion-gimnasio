import axios from "axios";

// 1. Instancia para el microservicio de Usuarios/Auth
export const authApi = axios.create({
    baseURL: "http://localhost:8080"
});

// Interceptor de REQUEST para Usuarios/Auth (Inyecta el token)
authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de RESPONSE para Usuarios/Auth (Maneja sesión vencida)
authApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("persona");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// 2. Instancia para el microservicio de Rutinas
export const rutinasApi = axios.create({
    baseURL: "http://localhost:8081"
});

// 3. Interceptores para Rutinas
rutinasApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

rutinasApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("persona");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);