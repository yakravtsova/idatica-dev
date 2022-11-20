import { BASE_URL, handleResponse } from "./handleResponse";

export const getProductsByGroup = (groupId) => {
  return fetch(`${BASE_URL}products/group/${groupId}/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(res => handleResponse(res))
}

export const getAllProducts = (params) => {
  const queryString = (new URLSearchParams(params)).toString();
  const request = queryString ? `?${queryString}` : '';
  return fetch(`${BASE_URL}products/${request}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(res => handleResponse(res))
}

export const createProduct = (data) => {
  return fetch(`${BASE_URL}products/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  })
  .then(res => handleResponse(res))
}

export const updateProduct = (productId, data) => {
  return fetch(`${BASE_URL}products/${productId}/`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  })
  .then(res => handleResponse(res))
}

export const deleteProduct = (productId) => {
  return fetch(`${BASE_URL}products/${productId}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(res => handleResponse(res))
}

export const deleteProducts = (arrOfId) => {
  return fetch(`${BASE_URL}products/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(arrOfId),
  })
  .then(res => handleResponse(res))
}