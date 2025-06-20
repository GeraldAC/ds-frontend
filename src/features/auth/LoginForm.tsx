import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import type { AxiosError } from "axios";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { useAuth } from "@/hooks/useAuth";
import { useLoginMutation } from "@/hooks/useLoginMutation";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const mutation = useLoginMutation();

  const onSubmit = async (data: LoginFormData) => {
    setServerError("");

    try {
      const { user, token } = await mutation.mutateAsync(data);
      login(user, token);
      navigate("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      if (axiosError.response?.data?.message) {
        setServerError(axiosError.response.data.message);
      } else {
        setServerError("Ocurrió un error inesperado. Intenta de nuevo.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        {serverError && (
          <Alert status="error">
            <AlertIcon />
            {serverError}
          </Alert>
        )}

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Correo electrónico</FormLabel>
          <Input type="email" {...register("email")} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Contraseña</FormLabel>
          <Input type="password" {...register("password")} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="teal" isLoading={mutation.isPending}>
          Iniciar sesión
        </Button>
      </VStack>
    </form>
  );
};
