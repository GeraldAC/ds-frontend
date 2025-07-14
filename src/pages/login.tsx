import { LoginForm } from "@/features/auth/LoginForm";
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
  VStack,
} from "@chakra-ui/react";
import { Leaf, Sprout, Users } from "lucide-react";

export const LoginPage = () => {
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
                  Cusco Orgánico
                </Heading>
                <Sprout size={32} color="#4CAF50" />
              </HStack>
              
              <Text fontSize="lg" color="gray.600" lineHeight="1.8">
                Bienvenido a la plataforma que conecta productores locales 
                con clientes que valoran productos orgánicos y sostenibles.
              </Text>
              
              <Stack spacing={4} w="full">
                <HStack>
                  <Icon as={Leaf} color="green.500" boxSize={5} />
                  <Text fontSize="sm" color="gray.600">
                    Productos 100% orgánicos del valle sagrado
                  </Text>
                </HStack>
                <HStack>
                  <Icon as={Users} color="brown.500" boxSize={5} />
                  <Text fontSize="sm" color="gray.600">
                    Comercio directo sin intermediarios
                  </Text>
                </HStack>
                <HStack>
                  <Icon as={Sprout} color="orange.500" boxSize={5} />
                  <Text fontSize="sm" color="gray.600">
                    Apoyamos el desarrollo rural sostenible
                  </Text>
                </HStack>
              </Stack>
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
                    Iniciar Sesión
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Accede a tu cuenta de productor o cliente
                  </Text>
                </Box>
                <Divider borderColor="green.100" />
              </Stack>

              <LoginForm />
              
              <Divider my={6} borderColor="green.100" />
              
              <Text textAlign="center" fontSize="sm" color="gray.500">
                ¿No tienes cuenta?{" "}
                <Box 
                  as="span" 
                  color="green.600" 
                  fontWeight="medium"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => window.location.href = "/register"}
                >
                  Regístrate aquí
                </Box>
              </Text>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};