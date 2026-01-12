import { API_ENDPOINTS } from './api-config';

// Token management
const TOKEN_KEY = 'wellnexus_auth_token';

export const tokenService = {
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  
  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  }
};

// API client class
class ApiClient {
  private getHeaders(includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (includeAuth) {
      const token = tokenService.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    
    return headers;
  }

  async request<T>(
    url: string,
    options: RequestInit = {},
    includeAuth: boolean = true
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(includeAuth),
          ...options.headers,
        },
      });

      // Handle different response types
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(data?.message || data || `HTTP error! status: ${response.status}`);
      }

      return data as T;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get<T>(url: string, includeAuth: boolean = true): Promise<T> {
    return this.request<T>(url, { method: 'GET' }, includeAuth);
  }

  async post<T>(url: string, data?: any, includeAuth: boolean = true): Promise<T> {
    return this.request<T>(
      url,
      {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      },
      includeAuth
    );
  }

  async put<T>(url: string, data?: any, includeAuth: boolean = true): Promise<T> {
    return this.request<T>(
      url,
      {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      },
      includeAuth
    );
  }

  async delete<T>(url: string, includeAuth: boolean = true): Promise<T> {
    return this.request<T>(url, { method: 'DELETE' }, includeAuth);
  }

  async patch<T>(url: string, data?: any, includeAuth: boolean = true): Promise<T> {
    return this.request<T>(
      url,
      {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
      },
      includeAuth
    );
  }
}

export const apiClient = new ApiClient();

// Export specific API services
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post<string>(
      API_ENDPOINTS.LOGIN,
      { email, password },
      false // Don't include auth token for login
    );
    return response;
  },

  register: async (email: string, password: string, fullName: string, role: string) => {
    const response = await apiClient.post<string>(
      API_ENDPOINTS.REGISTER,
      { 
        email, 
        password, 
        fullName,
        role: role.toUpperCase()
      },
      false // Don't include auth token for register
    );
    return response;
  },
};

export const userApi = {
  getDashboard: async () => {
    return apiClient.get(API_ENDPOINTS.USER_DASHBOARD);
  },
  
  getProfile: async (userId: string) => {
    return apiClient.get(`${API_ENDPOINTS.USERS}/${userId}`);
  },
  
  updateProfile: async (userId: string, data: any) => {
    return apiClient.put(`${API_ENDPOINTS.USERS}/${userId}`, data);
  },
};

export const practitionerApi = {
  getAll: async () => {
    return apiClient.get(API_ENDPOINTS.PRACTITIONERS, false);
  },
  
  getById: async (id: string) => {
    return apiClient.get(`${API_ENDPOINTS.PRACTITIONERS}/${id}`, false);
  },
};

export const therapyApi = {
  getAll: async () => {
    return apiClient.get(API_ENDPOINTS.THERAPIES);
  },
  
  getById: async (id: string) => {
    return apiClient.get(`${API_ENDPOINTS.THERAPIES}/${id}`);
  },
  
  getSessions: async () => {
    return apiClient.get(API_ENDPOINTS.THERAPY_SESSIONS);
  },
  
  bookSession: async (data: any) => {
    return apiClient.post(API_ENDPOINTS.THERAPY_SESSIONS, data);
  },
};

export const productApi = {
  getAll: async () => {
    return apiClient.get(API_ENDPOINTS.PRODUCTS, false);
  },
  
  getById: async (id: string) => {
    return apiClient.get(`${API_ENDPOINTS.PRODUCTS}/${id}`, false);
  },
  
  getCart: async () => {
    return apiClient.get(API_ENDPOINTS.CART);
  },
  
  addToCart: async (productId: string, quantity: number) => {
    return apiClient.post(API_ENDPOINTS.CART, { productId, quantity });
  },
  
  removeFromCart: async (cartItemId: string) => {
    return apiClient.delete(`${API_ENDPOINTS.CART}/${cartItemId}`);
  },
};

export const notificationApi = {
  getAll: async () => {
    return apiClient.get(API_ENDPOINTS.NOTIFICATIONS);
  },
  
  markAsRead: async (id: string) => {
    return apiClient.patch(`${API_ENDPOINTS.NOTIFICATIONS}/${id}/read`);
  },
};
