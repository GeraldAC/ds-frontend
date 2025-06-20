import api from "@/lib/axios";
import { z } from "zod";
import {
  reviewSchema,
  type CreateReviewDto,
  type Review,
  type UpdateReviewDto,
} from "@/schemas/review.schema";

// Obtener todas las reseñas
export const getAllReviews = async (): Promise<Review[]> => {
  const response = await api.get("/reviews");
  return z.array(reviewSchema).parse(response.data);
};

// Obtener una reseña por ID
export const getReviewById = async (id: number): Promise<Review> => {
  const response = await api.get(`/reviews/${id}`);
  return reviewSchema.parse(response.data);
};

// Crear una nueva reseña
export const createReview = async (data: CreateReviewDto): Promise<Review> => {
  const response = await api.post("/reviews", data);
  return reviewSchema.parse(response.data);
};

// Actualizar reseña
export const updateReview = async (
  id: number,
  data: UpdateReviewDto,
): Promise<Review> => {
  const response = await api.put(`/reviews/${id}`, data);
  return reviewSchema.parse(response.data);
};

// Eliminar reseña
export const deleteReview = async (id: number): Promise<void> => {
  await api.delete(`/reviews/${id}`);
};
