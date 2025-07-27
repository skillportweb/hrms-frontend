import axios from 'axios';
import { API_URL } from './constant/envVariavles';

/**
 * Create an Axios instance
 */
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*', 
    'Content-Type': 'application/json',
  }
});

/**
 * Request Interceptor
 */
api.interceptors.request.use(
  (config) => {
    // Add tokens or custom headers here if needed
    // Example: config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log(error)
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);




// second method
/**
 * API Methods
 */



async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers, // Merge custom headers
  };

  const config = {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: 'include', // Ensures cookies are included in requests
  };

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw errorData || { message: response.statusText, status: response.status };
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

function get(endpoint, headers = {}) {
  return request(endpoint, { method: 'GET', headers });
}

function post(endpoint, body, headers = {}) {
  return request(endpoint, { method: 'POST', body, headers });
}

/**
 * PUT method
 * @param {string} endpoint - The API endpoint to request
 * @param {object} body - Request payload
 * @param {object} [headers] - Additional headers for the request
 */
function put(endpoint, body, headers = {}) {
  return request(endpoint, { method: 'PUT', body, headers });
}

/**
 * DELETE method
 * @param {string} endpoint - The API endpoint to request
 * @param {object} [headers] - Additional headers for the request
 */
function del(endpoint, headers = {}) {
  return request(endpoint, { method: 'DELETE', headers });
}

// export const api = {
//   get,
//   post,
//   put,
//   delete: del,
// };