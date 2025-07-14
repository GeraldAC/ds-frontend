import { VentureList } from "@/features/ventures/VentureList";
import VentureModal from "@/features/ventures/VentureModal";
import {
  useDeleteVentureMutation,
  useVenturesByProducerQuery,
} from "@/hooks/useVentureMutation";
import type { VentureByProducer } from "@/schemas/venture.schema";
import {
  Box,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Flex,
  Text,
  Card,
  CardBody,
  VStack,
  HStack,
  Icon,
  Container,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Sprout, Plus, Package, TrendingUp } from "lucide-react";

const Ventures = () => {
  const { data: ventures, isLoading, isError } = useVenturesByProducerQuery();
  const { mutateAsync: deleteVenture } = useDeleteVentureMutation();
  const toast = useToast();

  const {
    isOpen: isAlertOpen,
    onOpen: openAlert,
    onClose: closeAlert,
  } = useDisclosure();
  const cancelRef = useRef(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [selectedVenture, setSelectedVenture] =
    useState<VentureByProducer | null>(null);

  const handleEdit = (venture: VentureByProducer) => {
    setSelectedVenture(venture);
    openModal();
  };

  const handleDelete = (id: number) => {
    setSelectedId(id);
    openAlert();
  };

  const confirmDelete = async () => {
    if (selectedId === null) return;
    try {
      await deleteVenture(selectedId);
      toast({
        title: "Emprendimiento eliminado",
        description: "Se ha eliminado exitosamente tu emprendimiento.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al eliminar",
        description: "No se pudo eliminar el emprendimiento. Inténtalo nuevamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSelectedId(null);
      closeAlert();
    }
  };

  const handleCreate = () => {
    setSelectedVenture(null); // modo creación
    openModal();
  };

  if (isLoading) {
    return (
      <Container maxW="6xl" py={8}>
        <VStack spacing={4}>
          <Spinner size="xl" color="green.500" thickness="4px" />
          <Text color="gray.600">Cargando tus emprendimientos...</Text>
        </VStack>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxW="6xl" py={8}>
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          Error al cargar tus emprendimientos. Por favor, intenta nuevamente.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Card variant="organic">
          <CardBody>
            <Flex 
              justify="space-between" 
              align={{ base: "flex-start", md: "center" }}
              direction={{ base: "column", md: "row" }}
              gap={4}
            >
              <Box>
                <HStack spacing={3} mb={2}>
                  <Icon as={Sprout} boxSize={8} color="green.600" />
                  <Heading size="xl" color="green.600">
                    Mis Emprendimientos
                  </Heading>
                </HStack>
                <Text color="gray.600" fontSize="md">
                  Gestiona tus proyectos agrícolas y conecta con la comunidad
                </Text>
              </Box>
              
              <Button 
                leftIcon={<Plus size={20} />}
                variant="organic"
                onClick={handleCreate}
                size="lg"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "xl",
                }}
              >
                Nuevo Emprendimiento
              </Button>
            </Flex>
          </CardBody>
        </Card>

        {/* Estadísticas rápidas */}
        {ventures && ventures.length > 0 && (
          <HStack spacing={4} wrap="wrap">
            <Card variant="earth" minW="200px">
              <CardBody textAlign="center">
                <HStack justify="center" mb={2}>
                  <Icon as={Package} boxSize={5} color="brown.600" />
                  <Text fontWeight="semibold" color="brown.600">
                    Total
                  </Text>
                </HStack>
                <Heading size="lg" color="brown.600">
                  {ventures.length}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Emprendimientos activos
                </Text>
              </CardBody>
            </Card>

            <Card variant="accent" minW="200px">
              <CardBody textAlign="center">
                <HStack justify="center" mb={2}>
                  <Icon as={TrendingUp} boxSize={5} color="orange.600" />
                  <Text fontWeight="semibold" color="orange.600">
                    Progreso
                  </Text>
                </HStack>
                <Heading size="lg" color="orange.600">
                  {Math.round((ventures.length / 5) * 100)}%
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Hacia tu meta
                </Text>
              </CardBody>
            </Card>
          </HStack>
        )}

        {/* Lista de emprendimientos */}
        <Box>
          {ventures && ventures.length > 0 ? (
            <VentureList
              ventures={ventures}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <Card>
              <CardBody textAlign="center" py={12}>
                <VStack spacing={4}>
                  <Icon as={Sprout} boxSize={16} color="gray.400" />
                  <Heading size="md" color="gray.600">
                    No tienes emprendimientos aún
                  </Heading>
                  <Text color="gray.500" maxW="md">
                    Crea tu primer emprendimiento agrícola y comienza a conectar 
                    con clientes que valoran productos orgánicos y sostenibles.
                  </Text>
                  <Button 
                    leftIcon={<Plus size={20} />}
                    variant="organic"
                    onClick={handleCreate}
                    mt={4}
                  >
                    Crear mi primer emprendimiento
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          )}
        </Box>
      </VStack>

      {/* Modal Crear / Editar */}
      <VentureModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialData={selectedVenture ?? undefined}
      />

      {/* AlertDialog Eliminar */}
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="xl">
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color="red.600">
              <HStack>
                <Icon as={Sprout} boxSize={5} />
                <Text>Eliminar Emprendimiento</Text>
              </HStack>
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Estás seguro de que deseas eliminar este emprendimiento? 
              <br />
              <Text as="span" fontWeight="semibold" color="red.600">
                Esta acción no se puede deshacer.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeAlert} variant="ghost">
                Cancelar
              </Button>
              <Button 
                colorScheme="red" 
                onClick={confirmDelete} 
                ml={3}
                leftIcon={<Icon as={Package} boxSize={4} />}
              >
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default Ventures;