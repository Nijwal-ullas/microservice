
import api from "./api";

export interface User {
  _id?: string;
  name: string;
  email: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  token: string;
  user?: User;
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
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/users/register",
    data
  );

  return response.data;
};

export const loginUser = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/users/login",
    data
  );

  return response.data;
};
