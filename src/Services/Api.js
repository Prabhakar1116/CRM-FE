import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

const registerUser = async (data) => {
  const response = await api.post('/auth/signup', data); // Ensure your backend handles sending the email
  return response.data;
};

const loginUser = async (credentials) => {
  const response = await api.post('/auth/signin', credentials);
  return response.data;
};

const fetchCustomers = (token) => api.get('/customers', { headers: { 'x-access-token': token } });
const createCustomer = (data, token) => api.post('/customers', data, { headers: { 'x-access-token': token } });
const updateCustomer = (id, data, token) => api.put(`/customers/${id}`, data, { headers: { 'x-access-token': token } });
const deleteCustomer = (id, token) => api.delete(`/customers/${id}`, { headers: { 'x-access-token': token } });

const getUserProfile = (token) => api.get('/auth/profile', { headers: { 'x-access-token': token } });
const approveUser = async (token) => {
  const response = await api.put(`/auth/approve`, {}, { headers: { 'x-access-token': token } });
  return response.data;
};

export {
  registerUser,
  loginUser,
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getUserProfile,
  approveUser, 
};
