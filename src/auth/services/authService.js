// src/auth/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users'; // Cambia la URL si es necesario

export default {
    // Función para iniciar sesión y obtener el token
    async login(username, password) {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password,
            });

            // Asegúrate de que la respuesta tenga la estructura esperada
            if (response && response.data) {
                return { token: response.data.token }; // Devuelve solo el token si existe
            } else {
                return { error: 'Respuesta inesperada del servidor' };
            }
        } catch (error) {
            // Retorna el error capturado para que sea manejado en el componente
            return { error: error.response?.data?.message || 'Error en la solicitud de inicio de sesión' };
        }
    },

    // Función para obtener la información del usuario autenticado
    async getUserInfo(token) {
        try {
            const response = await axios.get(`${API_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Asegúrate de que la respuesta tenga la estructura esperada
            if (response && response.data) {
                return response.data; // Devuelve la información del usuario
            } else {
                return { error: 'Respuesta inesperada al obtener la información del usuario' };
            }
        } catch (error) {
            // Retorna el error capturado para que sea manejado en el componente
            return { error: error.response?.data?.message || 'Error en la solicitud de información del usuario' };
        }
    },

    // Cerrar sesión
    logout() {
        localStorage.removeItem('token'); // Elimina el token de localStorage
    },
};
