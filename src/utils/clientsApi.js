import { BASE_URL, handleResponse } from "./handleResponse";

export const getClients = () => {
  return fetch(`${BASE_URL}users/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(res => handleResponse(res))
}