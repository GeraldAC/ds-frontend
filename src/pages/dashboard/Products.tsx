import { ProductFormModal } from "@/features/products/ProductFormModal";
import { ProductGrid } from "@/features/products/ProductGrid";
import {
  useDeleteProductMutation,
  useProductsByVenture,
} from "@/hooks/useProductMutation";
import { useVentureQuery } from "@/hooks/useVentureMutation";
import type { Product } from "@/schemas/product.schema";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  Card,
  CardBody,
  CardHeader,
  VStack,
  HStack,
  Icon,
  Badge,
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Apple, Plus, Package, ArrowLeft, Leaf, BarChart3 } from "lucide-react";

const Products = () => {
  const { ventureId } = useParams<{ ventureId: string }>();
  const toast = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    isLoading: isLoadingVenture,
    data: venture,
    isError: isVentureError,
  } = useVentureQuery(Number(ventureId));

  const {
    isLoading: isLoadingProducts,
    data: products,
    refetch: refetchProducts,
    isError: isProductsError,
  } = useProductsByVenture(Number(ventureId));

  const {
    isOpen: isFormOpen,
    onOpen: openForm,
    onClose: closeForm,
  } = useDisclosure();

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    openForm();
  };

  const handleNewProduct = () => {
    setSelectedProduct(null);
    openForm();
  };

  const { mutateAsync } = useDeleteProductMutation();

  const handleDeleteProduct = async (id: number) => {
    try {
      await mutateAsync(id);
      toast({
        title: "Producto eliminado",
        description: "El producto se ha eliminado exitosamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      await refetchProducts();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error al eliminar",
        description: "No se pudo eliminar el producto. Inténtalo nuevamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoadingVenture || isLoadingProducts) {
    return (
      <Container maxW="6xl" py={8}>
        <VStack spacing={4}>
          <Spinner size="xl" color="green.500" thickness="4px" />
          <Text color="gray.600">Cargando productos...</Text>
        </VStack>
      </Container>
    );
  }

  if (isVentureError || isProductsError) {
    return (
      <Container maxW="6xl" py={8}>
        <Text color="red.500">
          Error al cargar los datos del emprendimiento.
        </Text>
      </Container>
    );
  }

  if (!venture) {
    return (
      <Container maxW="6xl" py={8}>
        <Text color="gray.600">Emprendimiento no encontrado.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Breadcrumb */}
        <Breadcrumb fontSize="sm" color="gray.600">
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/dashboard/ventures">
              <HStack spacing={1}>
                <ArrowLeft size={16} />
                <Text>Emprendimientos</Text>
              </HStack>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="green.600" fontWeight="medium">
              {venture.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Header del emprendimiento */}
        <Card variant="organic">
          <CardHeader>
            <HStack spacing={4} align="flex-start">
              <Box
                p={3}
                bg="green.100"
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={Leaf} boxSize={8} color="green.600" />
              </Box>

              <Box flex="1">
                <Heading size="xl" color="green.600" mb={2}>
                  {venture.name}
                </Heading>
                {venture.description && (
                  <Text color="gray.600" fontSize="md" lineHeight="1.6">
                    {venture.description}
                  </Text>
                )}
                <Badge variant="organic" mt={3}>
                  <HStack spacing={1}>
                    <Leaf size={12} />
                    <Text fontSize="xs">Emprendimiento Orgánico</Text>
                  </HStack>
                </Badge>
              </Box>
            </HStack>
          </CardHeader>
        </Card>

        {/* Header de productos */}
        <Card>
          <CardBody>
            <Flex
              justify="space-between"
              align={{ base: "flex-start", md: "center" }}
              direction={{ base: "column", md: "row" }}
              gap={4}
            >
              <Box>
                <HStack spacing={3} mb={2}>
                  <Icon as={Apple} boxSize={6} color="orange.600" />
                  <Heading size="lg" color="orange.600">
                    Productos Orgánicos
                  </Heading>
                </HStack>
                <Text color="gray.600">
                  Gestiona el catálogo de productos de tu emprendimiento
                </Text>
              </Box>

              <Button
                leftIcon={<Plus size={20} />}
                variant="accent"
                onClick={handleNewProduct}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "xl",
                }}
              >
                Agregar Producto
              </Button>
            </Flex>
          </CardBody>
        </Card>

        {/* Estadísticas rápidas */}
        {products && products.length > 0 && (
          <HStack spacing={4} wrap="wrap">
            <Card variant="accent" minW="180px">
              <CardBody textAlign="center">
                <HStack justify="center" mb={2}>
                  <Icon as={Package} boxSize={5} color="orange.600" />
                  <Text fontWeight="semibold" color="orange.600">
                    Total
                  </Text>
                </HStack>
                <Heading size="lg" color="orange.600">
                  {products.length}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Productos activos
                </Text>
              </CardBody>
            </Card>

            <Card variant="earth" minW="180px">
              <CardBody textAlign="center">
                <HStack justify="center" mb={2}>
                  <Icon as={BarChart3} boxSize={5} color="brown.600" />
                  <Text fontWeight="semibold" color="brown.600">
                    Catálogo
                  </Text>
                </HStack>
                <Heading size="lg" color="brown.600">
                  {Math.round((products.length / 10) * 100)}%
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Completado
                </Text>
              </CardBody>
            </Card>
          </HStack>
        )}

        {/* Grid de productos */}
        <Box>
          {products && products.length > 0 ? (
            <ProductGrid
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ) : (
            <Card>
              <CardBody textAlign="center" py={12}>
                <VStack spacing={4}>
                  <Icon as={Apple} boxSize={16} color="gray.400" />
                  <Heading size="md" color="gray.600">
                    No hay productos aún
                  </Heading>
                  <Text color="gray.500" maxW="md">
                    Agrega productos orgánicos a tu emprendimiento para que los
                    clientes puedan conocer y adquirir tus productos.
                  </Text>
                  <Button
                    leftIcon={<Plus size={20} />}
                    variant="accent"
                    onClick={handleNewProduct}
                    mt={4}
                  >
                    Agregar mi primer producto
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          )}
        </Box>
      </VStack>

      {/* Modal de formulario */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={closeForm}
        defaultValues={selectedProduct ?? {}}
        ventureId={venture.id}
        onSuccess={() => {
          closeForm();
          refetchProducts();
        }}
      />
    </Container>
  );
};

export default Products;
