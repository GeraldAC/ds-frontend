import api from "@/lib/axios";
import {
  type Producer,
  type CreateProducerDto,
  type UpdateProducerDto,
  producerSchema,
} from "@/schemas/producer.schema";
import { z } from "zod";

// Obtener todos los productores
export const getAllProducers = async (): Promise<Producer[]> => {
  const response = await api.get("/producers");
  return z.array(producerSchema).parse(response.data);
};

// Obtener un productor por ID
export const getProducerById = async (id: number): Promise<Producer> => {
  const response = await api.get(`/producers/${id}`);
  return producerSchema.parse(response.data);
};

// Crear perfil de productor
export const createProducer = async (
  data: CreateProducerDto,
): Promise<Producer> => {
  const response = await api.post("/producers", data);
  return producerSchema.parse(response.data);
};

// Actualizar perfil del productor
export const updateProducer = async (
  id: number,
  data: UpdateProducerDto,
): Promise<Producer> => {
  const response = await api.put(`/producers/${id}`, data);
  return producerSchema.parse(response.data);
};

// Eliminar perfil de productor
export const deleteProducer = async (id: number): Promise<void> => {
  await api.delete(`/producers/${id}`);
};
