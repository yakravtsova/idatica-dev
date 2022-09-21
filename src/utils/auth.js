import { BASE_URL, handleResponse } from "./handleResponse";

export const register = (registerData) => {
  return fetch(`${BASE_URL}users/register/`, {
    //mode: "no-cors",
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(registerData)
    })
    .then(res => handleResponse(res))
    .then(data => {
      if (data){
        localStorage.setItem('token', data.access_token);
        return data;
      }
    })
}

export const confirmEmail = (confirmData) => {
  return fetch(`${BASE_URL}users/confirm-email/`, {
    //mode: "no-cors",
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(confirmData)
    })
    .then(res => handleResponse(res))
}

export const completeRegister = (registerData) => {
  return fetch(`${BASE_URL}users/finish-registration/`, {
    //mode: "no-cors",
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(registerData)
    })
    .then(res => handleResponse(res))
}

export function authorize(email, password) {
  let urlencoded = new URLSearchParams();
  urlencoded.append("username", email);
  urlencoded.append("password", password);
  return fetch(`${BASE_URL}auth/login/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: urlencoded,
  })
  .then(res => handleResponse(res))
  .then(data => {
    if (data){
      localStorage.setItem('token', data.access_token);
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