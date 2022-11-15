import { API_URL } from '../../../constants/api';

type UserCreate = {
  name?: string;
  login: string;
  password: string;
};

export const createUser = async (user: UserCreate) => {
  console.log(user);
  const url = `${API_URL}/signup`;
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const json = await data.json();

  return json;
};

export const logInUser = async (user: UserCreate) => {
  console.log(user);
  const url = `${API_URL}/signin`;
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const json = await data.json();

  return json.token;
};