import axios, { AxiosInstance } from 'axios';
import { getSession, signOut } from 'next-auth/react';


const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 50000, // request timeout in milliseconds
  
});

// TODO: implement for refresh token

// Add an interceptor to include the session token in all requests
instance.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});
export default instance;

