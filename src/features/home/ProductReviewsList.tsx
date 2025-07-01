import {
  Button,
  Divider,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReviewCard } from "./ReviewCard";
import type { ReviewDetail } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { ReviewDetailForm } from "./ReviewDetailForm";

interface ProductReviewsListProps {
  reviews: ReviewDetail[];
  productId: number;
}

export const ProductReviewsList = ({
  reviews,
  productId,
}: ProductReviewsListProps) => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  if (!user) return null;

  const userReview = reviews.find((r) => r.user_id === user.id);
  const otherReviews = reviews.filter((r) => r.user_id !== user.id);

  const hasUserReview = !!userReview;
  const hasOtherReviews = otherReviews.length > 0;

  return (
    <VStack align="stretch" spacing={4} mt={6}>
      <Heading size="md" mb={4}>
        Reseñas del producto
      </Heading>
      <Divider />

      {/* Sección de reseña del usuario */}
      {hasUserReview ? (
        <>
          <ReviewCard review={userReview} />
          <Button size="sm" onClick={() => setEditing((e) => !e)}>
            {editing ? "Cancelar edición" : "Editar reseña"}
          </Button>
          {editing && (
            <ReviewDetailForm
              productId={productId}
              initialData={userReview}
              onSuccess={() => setEditing(false)}
            />
          )}
        </>
      ) : (
        <ReviewDetailForm productId={productId} onSuccess={() => null} />
      )}

      {/* Sección de otras reseñas */}
      <Divider />

      {hasOtherReviews ? (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {otherReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </SimpleGrid>
      ) : hasUserReview ? (
        <Text color="gray.500">
          Aún no hay reseñas de otros usuarios para este producto.
        </Text>
      ) : (
        <Text color="gray.500">
          Este producto aún no tiene ninguna reseña. Sé el primero en opinar.
        </Text>
      )}
    </VStack>
  );
};
