import { z } from "zod";

/**
 * Registro de nuevo usuario
 */
export const registerSchema = z
  .object({
    name: z.string().min(2, "El nombre es muy corto"),
    email: z.string().email("Correo inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

/**
 * Login de usuario
 */
export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

/**
 * Usuario autenticado (desde backend)
 */
export const userSchema = z.object({
  id: z.number({
    required_error: "El ID del usuario es obligatorio",
    invalid_type_error: "El ID debe ser un número",
  }),
  name: z.string({
    required_error: "El nombre es obligatorio",
    invalid_type_error: "El nombre debe ser una cadena de texto",
  }),
  email: z
    .string({
      required_error: "El correo es obligatorio",
      invalid_type_error: "El correo debe ser una cadena de texto",
    })
    .email("El correo no tiene un formato válido"),
  is_producer: z.boolean({
    required_error: "El campo 'is_producer' es obligatorio",
    invalid_type_error: "El campo 'is_producer' debe ser un booleano",
  }),
  avatar_url: z
    .string({ invalid_type_error: "El avatar debe ser una URL o nulo" })
    .nullable()
    .optional(),
});

/**
 * Respuesta del login
 */
export const loginResponseSchema = z.object({
  message: z.string({
    required_error: "El mensaje de respuesta es obligatorio",
    invalid_type_error: "El mensaje debe ser una cadena de texto",
  }),
  token: z.string({
    required_error: "El token es obligatorio",
    invalid_type_error: "El token debe ser una cadena de texto",
  }),
  user: userSchema,
});

/**
 * Tipos inferidos
 */
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type AuthenticatedUser = z.infer<typeof userSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
