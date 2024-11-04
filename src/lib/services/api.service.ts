// src/lib/services/api.service.ts
import axios from 'axios';
import type { User } from '../models/user.models.js';

// Use the environment variable for the base URL
const BASE_URL = import.meta.env.VITE_API_URL; // Access the API URL from the environment variable

export const apiService = {
    async register(userInfo: User) {
        try {
            const response = await axios.post(`${BASE_URL}/register`, userInfo);
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    },

    async login(userInfo: User) {
        try {
            const response = await axios.post(`${BASE_URL}/login`, userInfo);
            return response.data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },

    async forgotPassword(email: string) {
        try {
            const response = await axios.post(`${BASE_URL}/forgot-password`, { email });
            return response.data;
        } catch (error) {
            console.error('Error in forgot password:', error);
            throw error;
        }
    }
};
