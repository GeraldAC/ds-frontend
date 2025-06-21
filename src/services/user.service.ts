import api from "@/lib/axios";
import {
  type User,
  type CreateUserDto,
  type UpdateUserDto,
  userSchema,
} from "@/schemas/user.schema";
import { z } from "zod";

// Obtener todos los usuarios
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return z.array(userSchema).parse(response.data);
};

// Obtener un usuario por ID
export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return userSchema.parse(response.data);
};

// Crear nuevo usuario (registro)
export const createUser = async (data: CreateUserDto): Promise<User> => {
  const response = await api.post("/users", data);
  return userSchema.parse(response.data);
};

// Actualizar usuario
export const updateUser = async (
  id: number,
  data: UpdateUserDto,
): Promise<User> => {
  const response = await api.put(`/users/${id}`, data);
  return userSchema.parse(response.data);
};

// Eliminar usuario
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
