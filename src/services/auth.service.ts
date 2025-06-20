import api from "@/lib/axios";
import {
  loginResponseSchema,
  type LoginFormData,
  type LoginResponse,
  type RegisterFormData,
} from "@/schemas/auth.schema";
import { userSchema, type User } from "@/schemas/user.schema";

export const register = async (data: RegisterFormData): Promise<User> => {
  const response = await api.post("/auth/register", data);
  return userSchema.parse(response.data);
};

export const login = async (data: LoginFormData): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);
  return loginResponseSchema.parse(response.data);
};
