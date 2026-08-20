import axios from "axios";

// 1. Instancia ÚNICA apuntando al API Gateway
const apiClient = axios.create({
    baseURL: "http://localhost:9000"
});

// 2. Interceptor de REQUEST (Inyecta el token para todas las peticiones)
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3. Interceptor de RESPONSE (Maneja sesión vencida de forma global)
apiClient.interceptors.response.use(
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

// 4. Exportamos ambas variables apuntando al MISMO cliente
// para que tus imports en los componentes sigan funcionando perfecto.
export const authApi = apiClient;
export const rutinasApi = apiClient;