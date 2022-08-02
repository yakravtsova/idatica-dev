export const BASE_URL = 'https://pricehub.idatica.com/api/v1/';

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export function register(registerData) {
  return fetch("https://pricehub.idatica.com/api/v1/users/registration/step1/", {
    //mode: "no-cors",
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(registerData)
    })
    .then(res => {
      console.log(res);
    //  handleResponse(res)
})
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => handleResponse(res))
  .then(data => {
    if (data){
      localStorage.setItem('token', data.token);
      return data;
    }
  })
}

export function getContent(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => handleResponse(res))
}