import api from "@/lib/axios";
import {
  loginResponseSchema,
  userSchema,
  type AuthenticatedUser,
  type LoginFormData,
  type RegisterFormData,
} from "@/schemas/auth.schema";

export const register = async (
  data: RegisterFormData,
): Promise<AuthenticatedUser> => {
  const response = await api.post("/auth/register", data);
  return userSchema.parse(response.data);
};

export const login = async (
  data: LoginFormData,
): Promise<{ user: AuthenticatedUser; token: string }> => {
  const response = await api.post("/auth/login", data);
  console.log({ info: response.data });
  const infoParse = loginResponseSchema.parse(response.data);
  console.log({ infoParse });
  return loginResponseSchema.parse(response.data);
};
