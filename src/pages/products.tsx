import { ProductListView } from "@/features/products/ProductListView";
import {
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Sprout } from "lucide-react";

const ProductsPage = () => {
  return (
    <Box py={1} bg="gray.50" id="productos-section">
      <Container maxW="6xl">
        <VStack spacing={2}>
          <VStack spacing={4} textAlign="center">
            <HStack spacing={3}>
              <Icon as={Sprout} boxSize={6} color="green.600" />
              <Heading size="xl" color="green.600">
                Productos Destacados
              </Heading>
            </HStack>
            <Text color="gray.600" maxW="3xl">
              Descubre la variedad de productos orgánicos que nuestros
              productores locales tienen para ofrecerte
            </Text>
          </VStack>

          <ProductListView />
        </VStack>
      </Container>
    </Box>
  );
};

export default ProductsPage;
