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

export const getAllProducts = () => {
  return fetch(`${BASE_URL}products/`, {
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
/*
export const setDefaultGroup = (groupId, token) => {
  return fetch(`${BASE_URL}groups/${groupId}/set-default/`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res))
}*/