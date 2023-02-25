import { BASE_URL, handleResponse } from "./handleResponse";

export const getGroups = () => {
  return fetch(`${BASE_URL}groups/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(res => handleResponse(res))
}

export const createGroup = (data) => {
  return fetch(`${BASE_URL}groups/`, {
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

export const updateGroup = (groupId, data) => {
  return fetch(`${BASE_URL}groups/${groupId}/`, {
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

export const deleteGroup = (groupId) => {
  return fetch(`${BASE_URL}groups/${groupId}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(res => handleResponse(res))
}

export const setDefaultGroup = (groupId) => {
  return fetch(`${BASE_URL}groups/${groupId}/set-default/`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(res => handleResponse(res))
}

export const activateGroup = (groupId) => {
  return fetch(`${BASE_URL}groups/${groupId}/activate/`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(res => handleResponse(res))
}

export const deactivateGroup = (groupId) => {
  return fetch(`${BASE_URL}groups/${groupId}/deactivate/`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(res => handleResponse(res))
}