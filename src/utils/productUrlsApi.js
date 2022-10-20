import { BASE_URL, handleResponse } from "./handleResponse";

export const createProductUrl = (data) => {
  return fetch(`${BASE_URL}product-urls/`, {
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

export const updateProductUrl = (urlId, data) => {
  return fetch(`${BASE_URL}product-urls/${urlId}/`, {
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

export const deleteProductUrl = (urlId) => {
  return fetch(`${BASE_URL}product-urls/${urlId}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(res => handleResponse(res))
}