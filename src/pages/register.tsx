import { RegisterForm } from "@/features/auth/RegisterForm";
import {
  Box,
  Heading,
  Flex,
  useColorModeValue,
  Stack,
  Divider,
  Text,
  HStack,
  Icon,
  Container,
  Badge,
  VStack,
} from "@chakra-ui/react";
import { Leaf, Sprout, Heart, Globe } from "lucide-react";

export const RegisterPage = () => {
  const bgGradient = useColorModeValue(
    "linear(to-br, green.50, gray.50, orange.50)",
    "linear(to-br, green.900, gray.900, orange.900)"
  );

  return (
    <Box 
      minH="80vh" 
      bgGradient={bgGradient}
      py={12}
    >
      <Container maxW="6xl">
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="center"
          gap={12}
        >
          {/* Lado izquierdo - Información */}
          <Box 
            flex="1" 
            maxW="md"
            textAlign={{ base: "center", lg: "left" }}
          >
            <VStack spacing={6} align={{ base: "center", lg: "flex-start" }}>
              <HStack spacing={3}>
                <Leaf size={32} color="#4CAF50" />
                <Heading 
                  size="xl" 
                  bgGradient="linear(to-r, green.600, green.400)"
                  bgClip="text"
                >
                  Únete a Cusco Orgánico
                </Heading>
              </HStack>
              
              <Text fontSize="lg" color="gray.600" lineHeight="1.8">
                Forma parte de la comunidad que impulsa el desarrollo 
                sostenible y el comercio justo en el valle sagrado.
              </Text>
              
              <Box w="full">
                <Heading size="sm" color="green.600" mb={3}>
                  ¿Qué obtienes al registrarte?
                </Heading>
                <Stack spacing={3}>
                  <HStack>
                    <Icon as={Leaf} color="green.500" boxSize={5} />
                    <Text fontSize="sm" color="gray.600">
                      Acceso a productos orgánicos locales
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={Heart} color="orange.500" boxSize={5} />
                    <Text fontSize="sm" color="gray.600">
                      Apoyas directamente a productores rurales
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={Globe} color="brown.500" boxSize={5} />
                    <Text fontSize="sm" color="gray.600">
                      Contribuyes al comercio sostenible
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={Sprout} color="green.500" boxSize={5} />
                    <Text fontSize="sm" color="gray.600">
                      Plataforma 100% gratuita y sin comisiones
                    </Text>
                  </HStack>
                </Stack>
              </Box>

              <HStack spacing={2} wrap="wrap" justify={{ base: "center", lg: "flex-start" }}>
                <Badge variant="organic" px={3} py={1} borderRadius="full">
                  Gratuito
                </Badge>
                <Badge variant="earth" px={3} py={1} borderRadius="full">
                  Comercio justo
                </Badge>
                <Badge variant="accent" px={3} py={1} borderRadius="full">
                  Sostenible
                </Badge>
              </HStack>
            </VStack>
          </Box>

          {/* Lado derecho - Formulario */}
          <Box flex="1" maxW="md" w="full">
            <Box
              bg={useColorModeValue("white", "gray.800")}
              boxShadow="2xl"
              rounded="2xl"
              p={8}
              border="1px solid"
              borderColor="green.100"
            >
              <Stack spacing={6} mb={6} textAlign="center">
                <Box>
                  <Heading size="lg" color="green.600" mb={2}>
                    Crear Cuenta
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Únete a nuestra comunidad orgánica
                  </Text>
                </Box>
                <Divider borderColor="green.100" />
              </Stack>

              <RegisterForm />
              
              <Divider my={6} borderColor="green.100" />
              
              <Text textAlign="center" fontSize="sm" color="gray.500">
                ¿Ya tienes cuenta?{" "}
                <Box 
                  as="span" 
                  color="green.600" 
                  fontWeight="medium"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => window.location.href = "/login"}
                >
                  Inicia sesión aquí
                </Box>
              </Text>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};