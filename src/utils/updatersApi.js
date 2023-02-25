import { BASE_URL, handleResponse } from "./handleResponse";

export const getUpdaters = () => {
  return fetch(`${BASE_URL}updaters/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(res => handleResponse(res))
}

export const createUpdater = (data) => {
  return fetch(`${BASE_URL}updaters/`, {
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

export const deleteUpdater = (updaterId) => {
  return fetch(`${BASE_URL}updaters/${updaterId}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(res => handleResponse(res))
}