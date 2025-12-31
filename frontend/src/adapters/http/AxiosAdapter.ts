import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { type HttpAdapter } from './HttpAdapter.interface';
import { toast } from '../../utils/toast';

export class AxiosAdapter implements HttpAdapter {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Interceptor to add token to requests
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor for global error handling
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                const { response } = error;
                if (response) {
                    const { data, status } = response;

                    if (status === 400 && data) {
                        // Handle validation errors
                        if (Array.isArray(data.errors)) {
                            // If multiple errors, show them all (or maybe just the first one? Let's show first one prominently)
                            data.errors.forEach((err: string) => toast.error(err));
                        } else if (typeof data.message === 'string') {
                            toast.error(data.message);
                        } else {
                            toast.error('Validation failed');
                        }
                    } else if (status === 401) {
                        toast.error('Session expired. Please login again.');
                        // Optional: Redirect to login
                    } else if (status === 500) {
                        toast.error('Internal Server Error. Please try again later.');
                    } else if (data && data.message) {
                        toast.error(data.message);
                    }
                } else {
                    toast.error('Network Error. Please check your internet connection.');
                }
                return Promise.reject(error);
            }
        );
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
        return response.data;
    }

    async post<T>(url: string, body: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.post(url, body, config);
        return response.data;
    }

    async put<T>(url: string, body: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.put(url, body, config);
        return response.data;
    }

    async patch<T>(url: string, body: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.patch(url, body, config);
        return response.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
        return response.data;
    }
}

export const http = new AxiosAdapter('http://localhost:3000');
