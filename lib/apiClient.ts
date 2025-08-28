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

  private handleError(error: any, url?: string): Error {
    console.error('API Error:', error);
    if (url) {
      console.error(`Error occurred while accessing URL: ${url}`);
    }
    if (error.response?.data?.message) {
      return new Error(`Error ${error.response.status}: ${error.response.data.message}`);
    }
    if (error.response?.data) {
      return new Error(`Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    }
    if (error.message) {
      return new Error(error.message);
    }
    return new Error('An unexpected error occurred');
  }

  async get<T>(url: string): Promise<T> {
    try {
      const response = await this.client.get<T>(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error, url);
    }
  }

  async post<T, D = any>(url: string, data?: D): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error, url);
    }
  }

  async put<T, D = any>(url: string, data?: D): Promise<T> {
    try {
      const response = await this.client.put<T>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error, url);
    }
  }

  // 👇 Add these two methods
  async patch<T, D = any>(url: string, data?: D): Promise<T> {
    try {
      const response = await this.client.patch<T>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error, url);
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const response = await this.client.delete<T>(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error, url);
    }
  }
}
export const apiClient = new ApiClient(`${API_BASE_URL}/api`);
