import { BASE_URL, handleResponse } from "./handleResponse";

export const getProducts = (groupId) => {
  return fetch(`${BASE_URL}products/${groupId}/`, {
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

/*export const updateGroup = (groupId, data, token) => {
  return fetch(`${BASE_URL}groups/${groupId}/`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  .then(res => handleResponse(res))
}

export const deleteGroup = (groupId, token) => {
  return fetch(`${BASE_URL}groups/${groupId}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res))
}

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