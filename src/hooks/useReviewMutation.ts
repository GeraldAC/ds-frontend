import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  getUserReviews,
} from "@/services/review.service";
import type { ReviewFormData } from "@/schemas/review.schema";

export const useMyReviewsQuery = (userId?: number) => {
  return useQuery({
    queryKey: ["my-reviews", userId],
    queryFn: () => getUserReviews(userId!),
    enabled: !!userId,
  });
};

export const useAllReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getAllReviews,
  });
};

export const useReviewById = (id: number) => {
  return useQuery({
    queryKey: ["review", id],
    queryFn: () => getReviewById(id),
    enabled: !!id,
  });
};

export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ReviewFormData }) =>
      updateReview(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};
