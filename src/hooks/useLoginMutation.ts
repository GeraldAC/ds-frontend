import { useMutation } from "@tanstack/react-query";
import type { LoginFormData, RegisterFormData } from "@/schemas/auth.schema";
import { login, register } from "@/services/auth.service";

export const useRegisterMutation = () => {
  useMutation({
    mutationFn: (data: RegisterFormData) => register(data),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginFormData) => login(data),
  });
};
