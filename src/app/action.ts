import axios from "axios";

interface user {
  email: String;
  phone: String;
  password: String;
}
const BASE_URL = "https://url-sorten-backend.vercel.app/v1";
export const generateURL = async (url: String, access_token: String | null) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${access_token}`,
  };
  const response = await axios.post(`${BASE_URL}/urls/insert`, {
    full_url: url,
  });
  return response;
};

export const userLogin = async ({ email, password, phone }: user) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response;
};
export const userRegister = async ({ email, phone, password }: user) => {
  const response = await axios.post(`${BASE_URL}/auth/sign-up`, {
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
  const response = await axios.get(`${BASE_URL}/urls/get-urls`);
  return response;
};
