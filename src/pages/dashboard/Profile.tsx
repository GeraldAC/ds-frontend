import {
  Box,
  Button,
  Heading,
  Text,
  Avatar,
  useToast,
  Spinner,
  Flex,
  Badge,
  Grid,
  GridItem,
  HStack,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Icon,
  Container,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useAuth } from "@/hooks/useAuth";
import { useDeleteUserMutation, useUserQuery } from "@/hooks/useUserMutation";
import { useNavigate } from "react-router-dom";
import { BecomeProducerModal } from "@/features/producers/BecomeProducerModal";
import { useProducerQuery } from "@/hooks/useProducerMutation";
import { EditProfileModal } from "@/features/producers/EditProfileModal";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Phone,
  FileText,
  Sprout,
  Trash2,
  Shield,
} from "lucide-react";

const DashboardProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  if (!user) throw new Error("Usuario no autenticado");
  const { data: userData, isPending, isError } = useUserQuery(user.id);

  const {
    data: producerData,
    isPending: isPendingProducer,
    isError: isErrorProducer,
  } = useProducerQuery(user.id, userData?.is_producer);

  const deleteMutation = useDeleteUserMutation();

  const handleDeleteAccount = () => {
    if (!user?.id) return;
    deleteMutation.mutate(user.id, {
      onSuccess: () => {
        toast({
          title: "Cuenta eliminada",
          description: "Tu cuenta ha sido eliminada exitosamente.",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
        logout();
        navigate("/");
      },
      onError: () => {
        toast({
          title: "Error",
          description: "No se pudo eliminar la cuenta.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      },
    });
  };

  if (isPending) {
    return (
      <Box p={8} textAlign="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="green.500" thickness="4px" />
          <Text color="gray.600">Cargando tu perfil...</Text>
        </VStack>
      </Box>
    );
  }

  if (isError || !userData) {
    return (
      <Box p={8}>
        <Text color="red.500">
          Ocurrió un error al cargar los datos del usuario.
        </Text>
      </Box>
    );
  }

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header del perfil */}
        <Card variant="organic">
          <CardBody>
            <Flex
              direction={{ base: "column", md: "row" }}
              alignItems={{ base: "center", md: "flex-start" }}
              gap={6}
            >
              <Box position="relative">
                <Avatar
                  size="2xl"
                  src={userData.avatar_url ?? undefined}
                  name={userData.name}
                  border="4px solid"
                  borderColor="green.100"
                />
                <Box
                  position="absolute"
                  bottom="0"
                  right="0"
                  bg={userData.is_producer ? "green.500" : "gray.400"}
                  p={2}
                  borderRadius="full"
                  border="3px solid white"
                >
                  <Icon
                    as={userData.is_producer ? Sprout : User}
                    boxSize={4}
                    color="white"
                  />
                </Box>
              </Box>

              <Box flex="1" textAlign={{ base: "center", md: "left" }}>
                <HStack
                  justify={{ base: "center", md: "flex-start" }}
                  mb={2}
                  wrap="wrap"
                >
                  <Heading size="lg" color="green.600">
                    {userData.name}
                  </Heading>
                  <Badge
                    variant={userData.is_producer ? "organic" : "earth"}
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    <HStack spacing={1}>
                      <Icon
                        as={userData.is_producer ? Sprout : User}
                        boxSize={3}
                      />
                      <Text fontSize="xs">
                        {userData.is_producer
                          ? "Productor Verificado"
                          : "Usuario"}
                      </Text>
                    </HStack>
                  </Badge>
                </HStack>

                <HStack justify={{ base: "center", md: "flex-start" }} mb={3}>
                  <Icon as={Mail} boxSize={4} color="gray.500" />
                  <Text fontSize="md" color="gray.600">
                    {userData.email}
                  </Text>
                </HStack>

                <HStack
                  justify={{ base: "center", md: "flex-start" }}
                  spacing={4}
                  wrap="wrap"
                >
                  <HStack>
                    <Icon as={Calendar} boxSize={4} color="gray.500" />
                    <Text fontSize="sm" color="gray.500">
                      Miembro desde{" "}
                      {dayjs(userData.created_at).format("MMMM YYYY")}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={Shield} boxSize={4} color="gray.500" />
                    <Text fontSize="sm" color="gray.500">
                      ID: {userData.id}
                    </Text>
                  </HStack>
                </HStack>
              </Box>
            </Flex>
          </CardBody>
        </Card>

        {/* Información del productor */}
        {userData.is_producer && (
          <Card variant="earth">
            <CardHeader>
              <HStack spacing={3}>
                <Icon as={Sprout} boxSize={6} color="brown.600" />
                <Heading size="md" color="brown.600">
                  Información de Productor
                </Heading>
              </HStack>
            </CardHeader>
            <CardBody>
              {isPendingProducer && (
                <HStack justify="center">
                  <Spinner color="brown.500" />
                  <Text color="gray.600">
                    Cargando información del productor...
                  </Text>
                </HStack>
              )}

              {isErrorProducer && (
                <Text color="red.500">
                  Error al cargar información del productor.
                </Text>
              )}

              {producerData && (
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                  {/* Bio - ocupa ambas columnas */}
                  <GridItem colSpan={{ base: 1, md: 2 }}>
                    <VStack align="start" spacing={2}>
                      <HStack>
                        <Icon as={FileText} boxSize={4} color="brown.500" />
                        <Text fontWeight="semibold" color="brown.600">
                          Descripción:
                        </Text>
                      </HStack>
                      <Text
                        whiteSpace="pre-wrap"
                        color="gray.700"
                        bg="brown.50"
                        p={4}
                        borderRadius="lg"
                        w="full"
                      >
                        {producerData.bio || "No hay descripción disponible"}
                      </Text>
                    </VStack>
                  </GridItem>

                  {/* Ubicación */}
                  <GridItem>
                    <VStack align="start" spacing={2}>
                      <HStack>
                        <Icon as={MapPin} boxSize={4} color="brown.500" />
                        <Text fontWeight="semibold" color="brown.600">
                          Ubicación:
                        </Text>
                      </HStack>
                      <Text color="gray.700">
                        {producerData.location || "No especificado"}
                      </Text>
                    </VStack>
                  </GridItem>

                  {/* Teléfono */}
                  <GridItem>
                    <VStack align="start" spacing={2}>
                      <HStack>
                        <Icon as={Phone} boxSize={4} color="brown.500" />
                        <Text fontWeight="semibold" color="brown.600">
                          Teléfono:
                        </Text>
                      </HStack>
                      <Text color="gray.700">
                        {producerData.phone || "No especificado"}
                      </Text>
                    </VStack>
                  </GridItem>
                </Grid>
              )}
            </CardBody>
          </Card>
        )}

        {/* Acciones */}
        <Card>
          <CardBody>
            <Heading size="md" mb={4} color="gray.700">
              Acciones de Cuenta
            </Heading>

            <HStack justify="space-between" wrap="wrap" gap={4}>
              <HStack spacing={4} wrap="wrap">
                <EditProfileModal
                  defaultUserData={{
                    name: userData.name,
                    email: userData.email,
                    avatar_url: userData.avatar_url ?? "",
                  }}
                  defaultProducerData={
                    userData.is_producer && producerData
                      ? {
                          bio: producerData.bio ?? "",
                          location: producerData.location ?? "",
                          phone: producerData.phone ?? "",
                        }
                      : undefined
                  }
                  producerId={producerData?.id}
                />

                {!userData.is_producer && <BecomeProducerModal />}
              </HStack>

              <Button
                variant="outline"
                colorScheme="red"
                leftIcon={<Trash2 size={16} />}
                onClick={handleDeleteAccount}
                isLoading={deleteMutation.isPending}
                size="sm"
              >
                Eliminar cuenta
              </Button>
            </HStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default DashboardProfile;
