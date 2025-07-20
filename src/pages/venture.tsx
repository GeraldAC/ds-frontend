import { ProductGrid } from "@/features/products/ProductGrid";
import { useProductsByVenture } from "@/hooks/useProductMutation";
import { useVentureQuery } from "@/hooks/useVentureMutation";
import {
  Box,
  Heading,
  Spinner,
  Text,
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
  useColorModeValue,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Apple, ArrowLeft, CalendarDays, Leaf, UserRound } from "lucide-react";

const VenturePage = () => {
  const { ventureId } = useParams<{ ventureId: string }>();
  const bg = useColorModeValue("white", "gray.900");
  const border = useColorModeValue("gray.200", "gray.700");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.400");

  const accent = "orange.500";
  const accentLight = "orange.50";

  const {
    isLoading: isLoadingVenture,
    data: venture,
    isError: isVentureError,
  } = useVentureQuery(Number(ventureId));

  const {
    isLoading: isLoadingProducts,
    data: products,
    isError: isProductsError,
  } = useProductsByVenture(Number(ventureId));

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
    <Container maxW="6xl" py={1}>
      <VStack spacing={8} align="stretch">
        {/* Breadcrumb */}
        <Breadcrumb fontSize="sm" color="gray.600">
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/products">
              <HStack spacing={1}>
                <ArrowLeft size={16} />
                <Text>Tienda</Text>
              </HStack>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="green.600" fontWeight="medium">
              {venture.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Card
          bg={bg}
          border="1px solid"
          borderColor={border}
          borderTop="6px solid"
          borderTopColor={accent}
          borderRadius="2xl"
          boxShadow="md"
          transition="all 0.25s ease"
          _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
          p={6}
        >
          <CardHeader p={0}>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={6}
              align={{ base: "center", md: "flex-start" }}
            >
              {/* Imagen */}
              {venture.image_url && (
                <Image
                  src={venture.image_url}
                  alt={`Imagen del emprendimiento ${venture.name}`}
                  boxSize="220px"
                  objectFit="cover"
                  borderRadius="xl"
                  border="2px solid"
                  borderColor="orange.100"
                  shadow="sm"
                  flexShrink={0}
                />
              )}

              {/* Contenido */}
              <Box flex="1" w="full">
                <HStack spacing={2} align="center" mb={3}>
                  <Icon as={Leaf} boxSize={5} color={"orange"} />
                  <Badge
                    bg="orange.50"
                    color="orange.700"
                    px={3}
                    py="1"
                    fontSize="xs"
                    borderRadius="full"
                  >
                    Emprendimiento Orgánico
                  </Badge>
                </HStack>

                <Heading
                  size="lg"
                  color={titleColor}
                  mb={3}
                  fontWeight="semibold"
                >
                  {venture.name}
                </Heading>

                {venture.description && (
                  <Text fontSize="sm" color={textColor} mb={4} lineHeight="1.7">
                    {venture.description}
                  </Text>
                )}

                {/* Información destacada */}
                <VStack spacing={3} align="start">
                  <HStack
                    spacing={3}
                    bg={accentLight}
                    borderLeft="4px solid"
                    borderColor={accent}
                    borderRadius="md"
                    px={4}
                    py={2}
                    w="full"
                  >
                    <Icon as={UserRound} boxSize={5} color={accent} />
                    <Text fontSize="sm" color={textColor}>
                      <Text as="span" fontWeight="medium" color="gray.700">
                        Productor:
                      </Text>{" "}
                      {venture.producer_name}
                    </Text>
                  </HStack>

                  <HStack
                    spacing={3}
                    bg={accentLight}
                    borderLeft="4px solid"
                    borderColor={accent}
                    borderRadius="md"
                    px={4}
                    py={2}
                    w="full"
                  >
                    <Icon as={CalendarDays} boxSize={5} color={accent} />
                    <Text fontSize="sm" color={textColor}>
                      <Text as="span" fontWeight="medium" color="gray.700">
                        Fecha de creación:
                      </Text>{" "}
                      {new Date(venture.created_at).toLocaleDateString(
                        "es-PE",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </Stack>
          </CardHeader>
        </Card>

        {/* Grid de productos */}
        <Box>
          {products && products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <Card>
              <CardBody textAlign="center" py={12}>
                <VStack spacing={4}>
                  <Icon as={Apple} boxSize={16} color="gray.400" />
                  <Heading size="md" color="gray.600">
                    No hay productos aún
                  </Heading>
                </VStack>
              </CardBody>
            </Card>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default VenturePage;
