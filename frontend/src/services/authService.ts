
import api from "./api";

export interface User {
  _id?: string;
  name: string;
  email: string;
}

interface RegisterResponse {
  message: string;
  user: User;
}

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    "/users/register",
    data
  );

  return response.data;
};

export const loginUser = async (
  data: LoginData
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/users/login",
    data
  );

  return response.data;
};
