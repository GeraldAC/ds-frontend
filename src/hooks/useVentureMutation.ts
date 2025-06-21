import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllVentures,
  getVentureById,
  createVenture,
  updateVenture,
  deleteVenture,
} from "@/services/venture.service";
import { type UpdateVentureDto } from "@/schemas/venture.schema";

// Obtener todos los ventures
export const useVenturesQuery = () => {
  return useQuery({
    queryKey: ["ventures"],
    queryFn: getAllVentures,
  });
};

// Obtener un venture por ID
export const useVentureQuery = (id: number) => {
  return useQuery({
    queryKey: ["ventures", id],
    queryFn: () => getVentureById(id),
    enabled: !!id,
  });
};

// Crear venture
export const useCreateVentureMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVenture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventures"] });
    },
  });
};

// Actualizar venture
export const useUpdateVentureMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateVentureDto }) =>
      updateVenture(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["ventures", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["ventures"] });
    },
  });
};

// Eliminar venture
export const useDeleteVentureMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVenture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventures"] });
    },
  });
};
