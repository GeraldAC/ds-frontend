import {
  Box,
  Heading,
  useDisclosure,
  useToast,
  Spinner,
  Text,
  Card,
  CardBody,
  CardHeader,
  VStack,
  HStack,
  Icon,
  Container,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { ReviewList } from "@/features/reviews/ReviewList";
import { ReviewFormModal } from "@/features/reviews/ReviewFormModal";
import {
  useDeleteReviewMutation,
  useMyReviewsQuery,
  useUpdateReviewMutation,
} from "@/hooks/useReviewMutation";
import type { ReviewFormData, UserReview } from "@/schemas/review.schema";
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  BarChart3,
  Award,
  Heart
} from "lucide-react";

const Reviews = () => {
  const { user } = useAuth();
  const toast = useToast();

  const { data: reviews, isLoading, isError } = useMyReviewsQuery(user?.id);
  const { mutateAsync: updateReview } = useUpdateReviewMutation();
  const { mutateAsync: deleteReview } = useDeleteReviewMutation();

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  const [selectedReview, setSelectedReview] = useState<UserReview | null>(null);

  const handleEdit = (review: UserReview) => {
    setSelectedReview(review);
    openModal();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteReview(id);
      toast({
        title: "Reseña eliminada",
        description: "Tu reseña se ha eliminado exitosamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error al eliminar",
        description: "No se pudo eliminar la reseña. Inténtalo nuevamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmitReview = async (data: ReviewFormData) => {
    if (!selectedReview) return;
    try {
      const dataReview = {
        ...data,
      };
      await updateReview({ id: selectedReview.id, data: dataReview });
      toast({
        title: "Reseña actualizada",
        description: "Tu reseña se ha actualizado exitosamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      closeModal();
      setSelectedReview(null);
    } catch (err) {
      console.log(err);
      toast({
        title: "Error al actualizar",
        description: "No se pudo actualizar la reseña. Inténtalo nuevamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Calcular estadísticas de reseñas
  const getReviewStats = () => {
    if (!reviews || reviews.length === 0) {
      return { averageRating: 0, totalReviews: 0, ratingDistribution: {} };
    }

    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    
    const ratingDistribution = reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return { averageRating, totalReviews, ratingDistribution };
  };

  const { averageRating, totalReviews, ratingDistribution } = getReviewStats();

  if (isLoading) {
    return (
      <Container maxW="6xl" py={8}>
        <VStack spacing={4}>
          <Spinner size="xl" color="green.500" thickness="4px" />
          <Text color="gray.600">Cargando tus reseñas...</Text>
        </VStack>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxW="6xl" py={8}>
        <Text color="red.500">Ocurrió un error al cargar las reseñas.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Card variant="organic">
          <CardHeader>
            <HStack spacing={4}>
              <Box
                p={3}
                bg="green.100"
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={Star} boxSize={8} color="green.600" />
              </Box>
              
              <Box>
                <Heading size="xl" color="green.600" mb={1}>
                  Mis Reseñas
                </Heading>
                <Text color="gray.600" fontSize="md">
                  {user?.is_producer 
                    ? "Reseñas que has recibido de tus clientes"
                    : "Reseñas que has dejado sobre productos y emprendimientos"
                  }
                </Text>
              </Box>
            </HStack>
          </CardHeader>
        </Card>

        {/* Estadísticas */}
        {reviews && reviews.length > 0 && (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <Card variant="accent">
              <CardBody textAlign="center">
                <HStack justify="center" mb={2}>
                  <Icon as={MessageSquare} boxSize={5} color="orange.600" />
                  <Text fontWeight="semibold" color="orange.600">
                    Total
                  </Text>
                </HStack>
                <Heading size="lg" color="orange.600">
                  {totalReviews}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Reseñas realizadas
                </Text>
              </CardBody>
            </Card>

            <Card variant="organic">
              <CardBody textAlign="center">
                <HStack justify="center" mb={2}>
                  <Icon as={Star} boxSize={5} color="green.600" />
                  <Text fontWeight="semibold" color="green.600">
                    Promedio
                  </Text>
                </HStack>
                <Heading size="lg" color="green.600">
                  {averageRating.toFixed(1)}
                </Heading>
                <HStack justify="center" mt={1}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      key={star}
                      as={Star}
                      boxSize={3}
                      color={star <= averageRating ? "green.400" : "gray.300"}
                      fill={star <= averageRating ? "currentColor" : "none"}
                    />
                  ))}
                </HStack>
              </CardBody>
            </Card>

            <Card variant="earth">
              <CardBody textAlign="center">
                <HStack justify="center" mb={2}>
                  <Icon as={ThumbsUp} boxSize={5} color="brown.600" />
                  <Text fontWeight="semibold" color="brown.600">
                    Positivas
                  </Text>
                </HStack>
                <Heading size="lg" color="brown.600">
                  {reviews.filter(r => r.rating >= 4).length}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  4+ estrellas
                </Text>
              </CardBody>
            </Card>

            <Card variant="accent">
              <CardBody textAlign="center">
                <HStack justify="center" mb={2}>
                  <Icon as={Award} boxSize={5} color="orange.600" />
                  <Text fontWeight="semibold" color="orange.600">
                    Calidad
                  </Text>
                </HStack>
                <Heading size="lg" color="orange.600">
                  {Math.round((reviews.filter(r => r.rating >= 4).length / totalReviews) * 100)}%
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Satisfacción
                </Text>
              </CardBody>
            </Card>
          </SimpleGrid>
        )}

        {/* Distribución de calificaciones */}
        {reviews && reviews.length > 0 && (
          <Card>
            <CardHeader>
              <HStack spacing={3}>
                <Icon as={BarChart3} boxSize={5} color="gray.600" />
                <Heading size="md" color="gray.700">
                  Distribución de Calificaciones
                </Heading>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={3}>
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingDistribution[rating] || 0;
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  
                  return (
                    <HStack key={rating} w="full" spacing={4}>
                      <HStack minW="60px">
                        <Text fontSize="sm" fontWeight="medium">
                          {rating}
                        </Text>
                        <Icon as={Star} boxSize={4} color="orange.400" />
                      </HStack>
                      
                      <Box flex="1" bg="gray.200" borderRadius="full" h="8px">
                        <Box
                          bg={rating >= 4 ? "green.400" : rating >= 3 ? "orange.400" : "red.400"}
                          borderRadius="full"
                          h="full"
                          width={`${percentage}%`}
                          transition="width 0.3s ease"
                        />
                      </Box>
                      
                      <Text fontSize="sm" color="gray.600" minW="40px">
                        {count}
                      </Text>
                    </HStack>
                  );
                })}
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Lista de reseñas */}
        <Card>
          <CardHeader>
            <HStack spacing={3}>
              <Icon as={Heart} boxSize={5} color="green.600" />
              <Heading size="md" color="green.600">
                {user?.is_producer ? "Reseñas Recibidas" : "Mis Reseñas"}
              </Heading>
            </HStack>
          </CardHeader>
          <CardBody>
            {reviews && reviews.length > 0 ? (
              <ReviewList
                reviews={reviews}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : (
              <VStack spacing={4} py={8}>
                <Icon as={Star} boxSize={16} color="gray.400" />
                <Heading size="md" color="gray.600">
                  No hay reseñas aún
                </Heading>
                <Text color="gray.500" textAlign="center" maxW="md">
                  {user?.is_producer 
                    ? "Cuando los clientes dejen reseñas sobre tus productos, aparecerán aquí."
                    : "Cuando dejes reseñas sobre productos o emprendimientos, aparecerán aquí."
                  }
                </Text>
                <Badge variant="organic" px={3} py={1} borderRadius="full">
                  <HStack spacing={1}>
                    <Star size={12} />
                    <Text fontSize="xs">
                      {user?.is_producer ? "Mejora tu servicio" : "Comparte tu experiencia"}
                    </Text>
                  </HStack>
                </Badge>
              </VStack>
            )}
          </CardBody>
        </Card>
      </VStack>

      {/* Modal para editar reseña */}
      {selectedReview && (
        <ReviewFormModal
          isOpen={isModalOpen}
          onClose={() => {
            closeModal();
            setSelectedReview(null);
          }}
          isEditing
          defaultValues={{
            rating: selectedReview.rating,
            comment: selectedReview.comment ?? "",
          }}
          onSubmitReview={handleSubmitReview}
        />
      )}
    </Container>
  );
};

export default Reviews;