import { SimpleGrid, Spinner, Center, Text, Box } from "@chakra-ui/react";
import { useProductsQuery } from "@/hooks/useProductMutation";
import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const { data: products, isLoading, isError } = useProductsQuery();

  if (isLoading) {
    return (
      <Center minH="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isError || !products) {
    console.log({ isError, products });
    return (
      <Center minH="50vh">
        <Text color="red.500">Error al cargar los productos</Text>
      </Center>
    );
  }

  if (products.length === 0) {
    return (
      <Center minH="50vh">
        <Text color="gray.500">No hay productos disponibles</Text>
      </Center>
    );
  }

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            averageRating={3} // Aquí asumimos que tienes este campo
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
