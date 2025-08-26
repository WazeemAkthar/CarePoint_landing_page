// lib/apiClient.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL } from '../app/config';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
        }
        if (!error.response) {
          throw new Error('Network error. Please check your connection.');
        }
        return Promise.reject(error);
      }
    );
  }

  async post<T, D = any>(url: string, data?: D): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    // Log the full error object for debugging
    console.error('API Error:', error);
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }
    if (error.response?.data) {
      // If data exists but no message, stringify it
      return new Error(JSON.stringify(error.response.data));
    }
    if (error.message) {
      return new Error(error.message);
    }
    return new Error('An unexpected error occurred');
  }
}

export const apiClient = new ApiClient(API_BASE_URL + '/api');
