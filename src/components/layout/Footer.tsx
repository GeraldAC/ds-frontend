// src/components/Footer.tsx
import { Box, Text, Flex, Link, Stack, Divider, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Leaf, MapPin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <Box 
      bg="green.600" 
      color="white" 
      py={8} 
      px={8} 
      mt="auto"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "center", md: "flex-start" }}
        gap={6}
        maxW="6xl"
        mx="auto"
      >
        {/* Sección izquierda - Nombre y descripción */}
        <Box textAlign={{ base: "center", md: "left" }} maxW="md">
          <HStack justify={{ base: "center", md: "flex-start" }} mb={2}>
            <Leaf size={24} />
            <Text fontWeight="bold" fontSize="xl">
              Cusco Orgánico
            </Text>
          </HStack>
          <Text fontSize="sm" opacity={0.9} mb={3}>
            Conectando productores locales con clientes a través de productos 
            orgánicos y naturales del valle sagrado.
          </Text>
          <HStack justify={{ base: "center", md: "flex-start" }}>
            <MapPin size={16} />
            <Text fontSize="xs" opacity={0.8}>
              Cusco, Perú
            </Text>
          </HStack>
        </Box>

        {/* Sección centro - Enlaces */}
        <Box textAlign={{ base: "center", md: "left" }}>
          <Text fontWeight="semibold" mb={3} fontSize="sm">
            Navegación
          </Text>
          <Stack spacing={2}>
            <Link 
              as={RouterLink} 
              to="/" 
              fontSize="sm"
              _hover={{ textDecoration: "underline", opacity: 0.8 }}
            >
              Productos
            </Link>
            <Link 
              as={RouterLink} 
              to="/about" 
              fontSize="sm"
              _hover={{ textDecoration: "underline", opacity: 0.8 }}
            >
              Sobre nosotros
            </Link>
            <Link 
              as={RouterLink} 
              to="/login" 
              fontSize="sm"
              _hover={{ textDecoration: "underline", opacity: 0.8 }}
            >
              Productores
            </Link>
          </Stack>
        </Box>

        {/* Sección derecha - Información */}
        <Box textAlign={{ base: "center", md: "right" }}>
          <Text fontWeight="semibold" mb={3} fontSize="sm">
            Plataforma
          </Text>
          <Text fontSize="xs" opacity={0.8} mb={1}>
            Gratuita y accesible
          </Text>
          <Text fontSize="xs" opacity={0.8} mb={1}>
            Para pequeños productores
          </Text>
          <Text fontSize="xs" opacity={0.8}>
            Comercio justo y sostenible
          </Text>
        </Box>
      </Flex>

      <Divider my={6} borderColor="green.400" />

      {/* Pie de página */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        gap={2}
        maxW="6xl"
        mx="auto"
      >
        <Text fontSize="xs" opacity={0.8} textAlign={{ base: "center", md: "left" }}>
          © {new Date().getFullYear()} Cusco Orgánico. Impulsando la economía local.
        </Text>
        
        <HStack spacing={1} fontSize="xs">
          <Text opacity={0.8}>Hecho con</Text>
          <Heart size={12} fill="currentColor" />
          <Text opacity={0.8}>para nuestros productores</Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;