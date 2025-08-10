// src/services/api.js

const API_BASE_URL = import.meta.env.VITE_API_URL

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Something went wrong with the API call.');
  }
  return response.json();
};

export const getDashboardData = async (timeframe = '30d', region = 'global') => {
  try {
    const metricsResponse = await fetch(`${API_BASE_URL}/dashboard/`);
    const metricsData = await handleResponse(metricsResponse);
    
    // The charts data is now handled as a static placeholder in the frontend
    // because the backend endpoint for it does not exist.
    return metricsData;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    throw error;
  }
};

export const getProductsData = async (page = 1, limit = 10, category = '', search = '', sortBy = 'name') => {
  try {
    let url = `${API_BASE_URL}/products`;
    if (category) url += `&category=${category}`;
    if (search) url += `&search=${search}`;
    
    // The 'options' variable has been removed.
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Failed to create product:', error);
    throw error;
  }
};

export const getTrendsData = async (region = '', category = '') => {
  try {
    let url = `${API_BASE_URL}/trends`;
    if (region) url += `?region=${region}`;
    if (category) url += `&category=${category}`;
    
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch market trends:', error);
    throw error;
  }
};

export const getAiSuggestions = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai-suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Failed to get AI suggestions:', error);
    throw error;
  }
};

export const getCompetitorsData = async (category = '') => {
  try {
    let url = `${API_BASE_URL}/competitors`;
    if (category) url += `?category=${category}`;
    
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch competitors:', error);
    throw error;
  }
};