import { BASE_URL, handleResponse } from "./handleResponse";

export const getStores = () => {
  return fetch(`${BASE_URL}stores/using-by-user/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(res => handleResponse(res))
}