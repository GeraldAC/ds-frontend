import { z } from "zod";

// --- Tipos base ---
export const userSchema = z.object({
  id: z
    .number({
      required_error: "El ID del usuario es obligatorio",
      invalid_type_error: "El ID debe ser un número",
    })
    .int()
    .positive(),
  name: z
    .string({
      required_error: "El nombre es obligatorio",
      invalid_type_error: "El nombre debe ser una cadena de texto",
    })
    .min(1)
    .max(100),
  email: z
    .string({
      required_error: "El correo es obligatorio",
      invalid_type_error: "El correo debe ser una cadena de texto",
    })
    .email()
    .max(100),
  is_producer: z
    .boolean({
      required_error: "El campo 'is_producer' es obligatorio",
      invalid_type_error: "El campo 'is_producer' debe ser un booleano",
    })
    .optional()
    .default(false),
  avatar_url: z
    .string({ invalid_type_error: "El avatar debe ser una URL o nulo" })
    .url()
    .optional()
    .nullable(),
  created_at: z.string(),
});

// --- Para creación (POST) ---
export const createUserSchema = userSchema
  .omit({
    id: true,
    created_at: true,
  })
  .extend({ password: z.string().min(6).max(100) });

export type CreateUserDto = z.infer<typeof createUserSchema>;

// --- Para actualización (PUT) ---
export const updateUserSchema = createUserSchema.partial();
export type UpdateUserDto = z.infer<typeof updateUserSchema>;

// --- Respuesta ---
export type User = z.infer<typeof userSchema>;
