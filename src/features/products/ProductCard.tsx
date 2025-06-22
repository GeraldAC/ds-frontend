import {
  Box,
  Image,
  Text,
  Stack,
  Heading,
  HStack,
  Icon,
  Button,
  Flex,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { type FC } from "react";
import type { Product } from "@/schemas/product.schema";

interface ProductCardProps {
  product: Product;
  averageRating: number; // de 1 a 5
  onViewDetails?: (product: Product) => void; // Opcional: función que abrirá el modal
}

export const ProductCard: FC<ProductCardProps> = ({
  product,
  averageRating,
  onViewDetails,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: "xl" }}
      bg="white"
      maxW="sm"
      w="100%"
      h="100%" // Para que todas tengan la misma altura en una grid
      display="flex"
      flexDirection="column"
    >
      {product.image_url && (
        <Image
          src={product.image_url}
          alt={product.name}
          objectFit="cover"
          w="100%"
          h="200px"
        />
      )}

      <Flex direction="column" flex="1" p={4} justify="space-between">
        <Stack spacing={3} flex="1">
          <Heading
            size="md"
            noOfLines={2}
            minH="3.5rem" // Aproximadamente 2 líneas en tamaño md
          >
            {product.name}
          </Heading>

          {product.description && (
            <Text
              fontSize="sm"
              color="gray.600"
              noOfLines={3}
              minH="4.5rem" // Aproximadamente 3 líneas en tamaño sm
            >
              {product.description}
            </Text>
          )}

          <Text fontWeight="bold" fontSize="lg" color="green.500">
            S/ {product.price.toFixed(2)}
          </Text>

          <HStack spacing={1}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon
                key={i}
                as={StarIcon}
                color={
                  i < Math.round(averageRating) ? "yellow.400" : "gray.300"
                }
              />
            ))}
            <Text fontSize="sm" color="gray.500">
              ({averageRating.toFixed(1)})
            </Text>
          </HStack>
        </Stack>

        <Box mt={4}>
          <Button
            colorScheme="blue"
            size="sm"
            w="full"
            onClick={() => onViewDetails?.(product)}
          >
            Ver más
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
