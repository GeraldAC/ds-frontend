import { Box, Spinner, Text, SimpleGrid, useToast } from "@chakra-ui/react";
import { ProductCardHorizontal } from "./ProductCardHorizontal";
import { useState } from "react";
import { useProductsQuery } from "@/hooks/useProductMutation";
import type { Product } from "@/schemas/product.schema";

export const ProductListView = () => {
  const toast = useToast();
  const { data: products, isLoading, isError } = useProductsQuery();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  void selectedProduct;

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    toast({
      title: "Ver más",
      description: `Producto seleccionado: ${product.name}`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  if (isLoading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={2}>Cargando productos...</Text>
      </Box>
    );
  }

  if (isError || !products) {
    return (
      <Box textAlign="center" mt={10}>
        <Text color="red.500">Error al cargar los productos.</Text>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box textAlign="center" mt={10}>
        <Text color="gray.600">No hay productos disponibles.</Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
      {products.map((product) => {
        const averageRating = Math.random() * 5;
        return (
          <ProductCardHorizontal
            key={product.id}
            product={product}
            averageRating={averageRating}
            onViewDetails={handleViewDetails}
          />
        );
      })}
    </SimpleGrid>
  );
};
