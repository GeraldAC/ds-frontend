import { z } from "zod";

// --- Tipos base ---
export const ventureSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  image_url: z.string().url().optional(),
  created_at: z.string(),
  producer_id: z.number().int().positive(),
  producer_name: z.string(),
});

// --- Para creación (POST) ---
export const createVentureSchema = ventureSchema.omit({
  id: true,
  created_at: true,
  producer_name: true,
});
export type CreateVentureDto = z.infer<typeof createVentureSchema>;

// --- Para actualización (PUT) ---
export const updateVentureSchema = createVentureSchema.partial();
export type UpdateVentureDto = z.infer<typeof updateVentureSchema>;

// --- Respuesta ---
export type Venture = z.infer<typeof ventureSchema>;
