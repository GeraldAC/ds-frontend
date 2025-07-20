// src/pages/index.tsx
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Icon,
  SimpleGrid,
  Card,
  CardBody,
} from "@chakra-ui/react";
import {
  Leaf,
  Sprout,
  Heart,
  MapPin,
  Users,
  Star,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgGradient="linear(to-br, green.50, white, orange.50)"
        py={{ base: 12, md: 20 }}
        position="relative"
        overflow="hidden"
      >
        {/* Elementos decorativos de fondo */}
        <Box
          position="absolute"
          top="10%"
          left="10%"
          opacity={0.1}
          transform="rotate(-15deg)"
        >
          <Icon as={Leaf} boxSize={20} color="green.400" />
        </Box>
        <Box
          position="absolute"
          bottom="10%"
          right="15%"
          opacity={0.1}
          transform="rotate(25deg)"
        >
          <Icon as={Sprout} boxSize={16} color="brown.400" />
        </Box>

        <Container maxW="6xl" position="relative" zIndex={1}>
          <VStack spacing={8} textAlign="center">
            {/* Título principal */}
            <VStack spacing={4}>
              <HStack spacing={3} justify="center">
                <Icon as={Leaf} boxSize={8} color="green.500" />
                <Heading
                  size="2xl"
                  bgGradient="linear(to-r, green.600, green.400)"
                  bgClip="text"
                  fontWeight="bold"
                  py={3}
                >
                  Cusco Orgánico
                </Heading>
                <Icon as={Sprout} boxSize={8} color="green.500" />
              </HStack>

              <Text fontSize="xl" color="gray.600" maxW="3xl" lineHeight="1.8">
                Descubre productos <strong>orgánicos</strong> y{" "}
                <strong>sostenibles</strong> directamente de productores locales
                del valle sagrado de Cusco
              </Text>
            </VStack>

            {/* Estadísticas */}
            <SimpleGrid
              columns={{ base: 2, md: 4 }}
              spacing={6}
              w="full"
              maxW="2xl"
            >
              {[
                { icon: Users, label: "Productores", value: "50+" },
                { icon: Sprout, label: "Productos", value: "200+" },
                { icon: Star, label: "Reseñas", value: "1K+" },
                { icon: Heart, label: "Clientes", value: "500+" },
              ].map((stat, index) => (
                <VStack key={index} spacing={2}>
                  <Icon as={stat.icon} boxSize={6} color="green.500" />
                  <Text fontSize="lg" fontWeight="bold" color="green.600">
                    {stat.value}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {stat.label}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>

            {/* Call to action */}
            <HStack spacing={4} wrap="wrap" justify="center">
              <Button
                variant="organic"
                size="lg"
                leftIcon={<ShoppingCart size={20} />}
                onClick={() => {
                  navigate("/products");
                }}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "xl",
                }}
              >
                Explorar Productos
              </Button>
              <Button
                variant="outline"
                colorScheme="green"
                size="lg"
                rightIcon={<ArrowRight size={20} />}
                onClick={() => navigate("/about")}
              >
                Conocer más
              </Button>
            </HStack>

            {/* Ubicación */}
            <HStack spacing={2} color="gray.500">
              <Icon as={MapPin} boxSize={4} />
              <Text fontSize="sm">Valle Sagrado, Cusco - Perú</Text>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Sección de valores */}
      <Box py={12} bg="white">
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {[
              {
                icon: Leaf,
                title: "100% Orgánico",
                description:
                  "Productos cultivados sin químicos, respetando la naturaleza",
                color: "green",
              },
              {
                icon: Heart,
                title: "Comercio Justo",
                description:
                  "Precios justos directamente del productor al consumidor",
                color: "orange",
              },
              {
                icon: Users,
                title: "Comunidad Local",
                description:
                  "Apoyamos a familias productoras del valle sagrado",
                color: "brown",
              },
            ].map((value, index) => (
              <Card
                key={index}
                variant={
                  value.color === "brown"
                    ? "earth"
                    : value.color === "orange"
                      ? "accent"
                      : "organic"
                }
                textAlign="center"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "xl",
                }}
                transition="all 0.3s ease"
              >
                <CardBody py={8}>
                  <VStack spacing={4}>
                    <Box
                      p={4}
                      bg={`${value.color}.100`}
                      borderRadius="xl"
                      display="inline-flex"
                    >
                      <Icon
                        as={value.icon}
                        boxSize={8}
                        color={`${value.color}.600`}
                      />
                    </Box>
                    <Heading size="md" color={`${value.color}.600`}>
                      {value.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.600" lineHeight="1.6">
                      {value.description}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Lista de productos */}
    </Box>
  );
};

export default IndexPage;
