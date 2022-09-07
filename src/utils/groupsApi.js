import { BASE_URL, handleResponse } from "./handleResponse";

export const getGroups = (token) => {
  return fetch(`${BASE_URL}groups/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res))
}

export const createGroup = (data, token) => {
  return fetch(`${BASE_URL}groups/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  .then(res => handleResponse(res))
}

export const updateGroup = (groupId, data, token) => {
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