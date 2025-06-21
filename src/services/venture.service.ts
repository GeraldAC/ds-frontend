import api from "@/lib/axios";
import {
  type Venture,
  type CreateVentureDto,
  type UpdateVentureDto,
  ventureSchema,
} from "@/schemas/venture.schema";
import { z } from "zod";

// Obtener todos los ventures
export const getAllVentures = async (): Promise<Venture[]> => {
  const response = await api.get("/ventures");
  return z.array(ventureSchema).parse(response.data);
};

// Obtener un venture por ID
export const getVentureById = async (id: number): Promise<Venture> => {
  const response = await api.get(`/ventures/${id}`);
  return ventureSchema.parse(response.data);
};

// Crear un venture
export const createVenture = async (
  data: CreateVentureDto,
): Promise<Venture> => {
  const response = await api.post("/ventures", data);
  return ventureSchema.parse(response.data);
};

// Actualizar un venture
export const updateVenture = async (
  id: number,
  data: UpdateVentureDto,
): Promise<Venture> => {
  const response = await api.put(`/ventures/${id}`, data);
  return ventureSchema.parse(response.data);
};

// Eliminar un venture
export const deleteVenture = async (id: number): Promise<void> => {
  await api.delete(`/ventures/${id}`);
};
