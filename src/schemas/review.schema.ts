import { z } from "zod";

// --- Tipos base ---
export const reviewSchema = z.object({
  id: z.number(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  created_at: z.string(),
  product_id: z.number(),
  product_name: z.string(),
  user_id: z.number(),
  user_name: z.string(),
});

// --- Para creación (POST) ---
export const createReviewSchema = reviewSchema.omit({
  id: true,
  created_at: true,
  product_name: true,
  user_name: true,
});
export type CreateReviewDto = z.infer<typeof createReviewSchema>;

// --- Para actualización (PUT) ---
export const updateReviewSchema = createReviewSchema.partial();
export type UpdateReviewDto = z.infer<typeof updateReviewSchema>;

// --- Respuesta ---
export type Review = z.infer<typeof reviewSchema>;
