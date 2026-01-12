// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  
  // User endpoints
  USERS: `${API_BASE_URL}/api/users`,
  USER_DASHBOARD: `${API_BASE_URL}/api/dashboard`,
  
  // Practitioner endpoints
  PRACTITIONERS: `${API_BASE_URL}/api/practitioners`,
  
  // Therapy endpoints
  THERAPIES: `${API_BASE_URL}/api/therapies`,
  THERAPY_SESSIONS: `${API_BASE_URL}/api/sessions`,
  
  // Product endpoints
  PRODUCTS: `${API_BASE_URL}/api/products`,
  CART: `${API_BASE_URL}/api/cart`,
  ORDERS: `${API_BASE_URL}/api/orders`,
  
  // Forum endpoints
  QUESTIONS: `${API_BASE_URL}/api/questions`,
  ANSWERS: `${API_BASE_URL}/api/answers`,
  
  // Notification endpoints
  NOTIFICATIONS: `${API_BASE_URL}/api/notifications`,
  
  // Recommendation endpoints
  RECOMMENDATIONS: `${API_BASE_URL}/api/recommendations`,
};

export default API_BASE_URL;
