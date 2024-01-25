import axios from "axios";

interface user {
  email: String;
  phone: String;
  password: String;
}
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const generateURL = async (url: String, access_token: String | null) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${access_token}`,
  };
  const response = await axios.post(`${BASE_URL}/v1/urls/insert`, {
    full_url: url,
  });
  return response;
};

export const userLogin = async ({ email, password, phone }: user) => {
  const response = await axios.post(`${BASE_URL}/v1/auth/login`, {
    email,
    password,
  });
  return response;
};
export const userRegister = async ({ email, phone, password }: user) => {
  const response = await axios.post(`${BASE_URL}/v1/auth/sign-up`, {
    email,
    role: "Customer",
    phone,
    password,
  });
  return response;
};
export const getURLs = async (access_token: String | null) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${access_token}`,
  };
  const response = await axios.get(`${BASE_URL}/v1/urls/get-urls`);
  return response;
};
