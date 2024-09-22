import axios from 'axios';

const API_URL = '/api';

export const getRecentRootBeers = () => {
  return axios.get(`${API_URL}/drinks?offset=0&length=5&sort=createdAt&desc=true`);
};

export const getRootBeerDetails = (id) => {
  return axios.get(`${API_URL}/drinks/${id}`);
};

export const addRootBeer = (rootBeer) => {
  return axios.post(`${API_URL}/drinks`, rootBeer);
};

export const getRootBeerReviews = (id, page, pageSize) => {
  const length = pageSize || 5;
  const offset = (page || 0) * length;
  return axios.get(`${API_URL}/drinks/${id}/reviews?offset=${offset}&length=${length}`);
};

export const addRootBeerReview = (id, review) => {
  return axios.post(`${API_URL}/drinks/${id}/reviews`, review);
};

export const searchRootBeer = (searchParams) => {
  const { name, description, minRating, maxRating, page, pageSize } = searchParams;

  // Construct query parameters dynamically
  const queryParams = new URLSearchParams();

  if (name) queryParams.append('name', name);
  if (description) queryParams.append('description', description);
  if (minRating) queryParams.append('minRating', minRating);
  if (maxRating) queryParams.append('maxRating', maxRating);
  queryParams.append('offset', (page || 0) * (pageSize || 5));
  queryParams.append('length', pageSize || 5);

  return axios.get(`${API_URL}/drinks?${queryParams.toString()}`);
};

export const uploadRootBeerImage = (id, formData) => {
  return axios.post(`${API_URL}/drinks/${id}/pictures`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
