// src/components/ui/Member.tsx
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  VStack,
  HStack,
  Icon,
  Card,
  CardBody,
  Badge,
} from "@chakra-ui/react";
import { Github, Mail, ExternalLink } from "lucide-react";
import logoInfo from "@/assets/logo-info.png";

type MemberProps = {
  member: {
    name: string;
    role: string;
    img: string | null;
    email: string;
    github: string;
  };
};

const Member = ({ member }: MemberProps) => {
  const { name, role, img, email, github } = member;

  return (
    <Center>
      <Card
        maxW="320px"
        w="full"
        variant="organic"
        overflow="hidden"
        _hover={{
          transform: "translateY(-8px)",
          boxShadow: "2xl",
        }}
        transition="all 0.3s ease"
      >
        {/* Header decorativo */}
        <Box
          h="120px"
          w="full"
          bgGradient="linear(to-r, green.400, green.600)"
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            h="95px"
            w="auto"
            src={logoInfo}
            objectFit="contain"
            opacity={0.9}
            rounded={"lg"}
          />
        </Box>

        <CardBody position="relative" pt={0}>
          {/* Avatar posicionado sobre el header */}
          <Flex justify="center" mt={-12} mb={4}>
            <Avatar
              size="2xl"
              name={name}
              src={img ?? undefined}
              border="4px solid white"
              bg="green.500"
              color="white"
              boxShadow="lg"
            />
          </Flex>

          {/* Información del miembro */}
          <VStack spacing={4} textAlign="center">
            <Box>
              <Heading fontSize="xl" fontWeight="bold" color="green.600" mb={1}>
                {name}
              </Heading>
              <Badge
                variant="organic"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
              >
                {role}
              </Badge>
            </Box>

            {/* Información de contacto */}
            <VStack spacing={3} w="full">
              <HStack spacing={2} color="gray.600">
                <Icon as={Mail} boxSize={4} />
                <Text fontSize="sm" fontWeight="medium">
                  {email}
                </Text>
              </HStack>

              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                _hover={{ textDecoration: "none" }}
              >
                <HStack
                  spacing={2}
                  color="gray.600"
                  _hover={{ color: "green.600" }}
                  transition="color 0.2s"
                >
                  <Icon as={Github} boxSize={4} />
                  <Text fontSize="sm" fontWeight="medium">
                    Ver perfil
                  </Text>
                  <Icon as={ExternalLink} boxSize={3} />
                </HStack>
              </Link>
            </VStack>

            {/* Botón de acción */}
            <Button
              as={Link}
              href={github}
              target="_blank"
              w="full"
              variant="organic"
              leftIcon={<Github size={16} />}
              _hover={{
                textDecoration: "none",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              transition="all 0.2s ease"
            >
              Seguir en GitHub
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Center>
  );
};

export default Member;
