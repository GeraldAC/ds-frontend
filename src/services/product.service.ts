import api from "@/lib/axios";
import { z } from "zod";
import {
  type Product,
  type CreateProductDto,
  type UpdateProductDto,
  productSchema,
  type CreateProductResponse,
  createProductResponseSchema,
} from "@/schemas/product.schema";

// Obtener todos los productos
export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return z.array(productSchema).parse(response.data);
};

// Obtener un producto por ID
export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return productSchema.parse(response.data);
};

// Crear un producto
export const createProduct = async (
  data: CreateProductDto,
): Promise<CreateProductResponse> => {
  const response = await api.post("/products", data);
  return createProductResponseSchema.parse(response.data);
};

// Actualizar producto
export const updateProduct = async (
  id: number,
  data: UpdateProductDto,
): Promise<Product> => {
  const response = await api.put(`/products/${id}`, data);
  return productSchema.parse(response.data);
};

// Eliminar producto
export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
