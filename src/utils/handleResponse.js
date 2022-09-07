export const BASE_URL = 'https://pricehub.idatica.com/api/v1/';

export const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

