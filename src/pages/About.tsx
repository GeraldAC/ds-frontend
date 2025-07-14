import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Badge,
  Flex,
  Icon,
} from "@chakra-ui/react";
import Member from "@/components/ui/Member";
import { members } from "@/services/team.service";
import { 
  Leaf, 
  Target, 
  Users, 
  Heart,
  Sprout,
  Globe,
  Handshake,
  Recycle
} from "lucide-react";

const AboutPage = () => {
  return (
    <Box py={12} bg="gray.50">
      <Container maxW="7xl">
        <VStack spacing={16}>
          {/* Hero Section */}
          <Box textAlign="center" mb={8}>
            <HStack justify="center" mb={4}>
              <Leaf size={32} color="#4CAF50" />
              <Heading 
                size="2xl" 
                fontWeight="bold" 
                bgGradient="linear(to-r, green.600, green.400)"
                bgClip="text"
              >
                Cusco Orgánico
              </Heading>
              <Sprout size={32} color="#4CAF50" />
            </HStack>
            <Text 
              fontSize="xl" 
              color="gray.600" 
              maxW="4xl" 
              mx="auto"
              lineHeight="1.8"
            >
              Conectamos a productores locales con clientes a través de una plataforma 
              digital <strong>gratuita</strong>, <strong>accesible</strong> y diseñada 
              para impulsar el <strong>desarrollo rural sostenible</strong>.
            </Text>
          </Box>

          {/* Valores principales */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="full">
            {[
              {
                icon: Globe,
                title: "Sostenible",
                description: "Productos orgánicos que respetan el medio ambiente",
                color: "green"
              },
              {
                icon: Handshake,
                title: "Comercio Justo",
                description: "Precios justos directamente del productor",
                color: "brown"
              },
              {
                icon: Heart,
                title: "Comunidad",
                description: "Fortalecemos vínculos entre productores y clientes",
                color: "orange"
              },
              {
                icon: Recycle,
                title: "Local",
                description: "Promovemos la economía circular del valle sagrado",
                color: "green"
              }
            ].map((value, index) => (
              <Card 
                key={index}
                variant={value.color === "brown" ? "earth" : value.color === "orange" ? "accent" : "organic"}
                textAlign="center"
                p={4}
                _hover={{
                  transform: "translateY(-8px)",
                  boxShadow: "2xl",
                }}
                transition="all 0.3s ease"
              >
                <CardBody>
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
                    <Text fontSize="sm" color="gray.600">
                      {value.description}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {/* Nuestra Misión */}
          <Card
            variant="organic"
            rounded="2xl"
            shadow="xl"
            p={8}
            w="full"
            bg="white"
            borderTop="6px solid"
            borderTopColor="green.500"
          >
            <CardHeader textAlign="center">
              <HStack justify="center" mb={4}>
                <Target size={24} color="#4CAF50" />
                <Heading size="xl" variant="organic">
                  Nuestra Misión
                </Heading>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={6}>
                <Text 
                  fontSize="lg" 
                  textAlign="center" 
                  maxW="5xl" 
                  mx="auto"
                  lineHeight="1.8"
                  color="gray.700"
                >
                  Impulsar la <strong>economía agronómica local</strong> del valle sagrado 
                  de Cusco, conectando directamente a emprendedores rurales con potenciales 
                  clientes mediante una plataforma digital intuitiva y completamente gratuita.
                </Text>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full" mt={8}>
                  <Box>
                    <Heading size="md" color="green.600" mb={3}>
                      🌱 Lo que buscamos
                    </Heading>
                    <VStack align="start" spacing={2}>
                      <Text fontSize="sm">• Digitalizar pequeños productores</Text>
                      <Text fontSize="sm">• Facilitar difusión de productos orgánicos</Text>
                      <Text fontSize="sm">• Fomentar confianza del consumidor</Text>
                      <Text fontSize="sm">• Construir redes de comercio sostenible</Text>
                    </VStack>
                  </Box>
                  
                  <Box>
                    <Heading size="md" color="brown.600" mb={3}>
                      🎯 Nuestro impacto
                    </Heading>
                    <VStack align="start" spacing={2}>
                      <Text fontSize="sm">• Acceso directo a mercados locales</Text>
                      <Text fontSize="sm">• Eliminación de intermediarios</Text>
                      <Text fontSize="sm">• Fortalecimiento de la economía rural</Text>
                      <Text fontSize="sm">• Preservación de tradiciones agrícolas</Text>
                    </VStack>
                  </Box>
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>

          {/* Equipo Section */}
          <Box w="full">
            <VStack spacing={8}>
              <Box textAlign="center">
                <HStack justify="center" mb={4}>
                  <Users size={24} color="#4CAF50" />
                  <Heading
                    size="xl"
                    variant="organic"
                  >
                    Nuestro Equipo
                  </Heading>
                </HStack>
                <Text color="gray.600" maxW="2xl" mx="auto">
                  Un grupo comprometido con el desarrollo sostenible y la tecnología 
                  al servicio de nuestras comunidades rurales.
                </Text>
              </Box>
              
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
                {members.map((member, index) => (
                  <Member key={index} member={member} />
                ))}
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Call to Action */}
          <Card
            variant="accent"
            rounded="2xl"
            shadow="xl"
            p={8}
            w="full"
            textAlign="center"
            bg="orange.50"
            borderTop="6px solid"
            borderTopColor="orange.500"
          >
            <CardBody>
              <VStack spacing={4}>
                <Heading size="lg" color="orange.600">
                  ¿Eres productor del valle sagrado?
                </Heading>
                <Text fontSize="md" color="gray.700" maxW="2xl">
                  Únete a nuestra plataforma completamente gratuita y comienza 
                  a conectar con clientes que valoran productos orgánicos y de calidad.
                </Text>
                <HStack spacing={4} wrap="wrap" justify="center">
                  <Badge variant="accent" px={3} py={1} borderRadius="full">
                    Registro gratuito
                  </Badge>
                  <Badge variant="organic" px={3} py={1} borderRadius="full">
                    Sin comisiones
                  </Badge>
                  <Badge variant="earth" px={3} py={1} borderRadius="full">
                    Soporte local
                  </Badge>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutPage;