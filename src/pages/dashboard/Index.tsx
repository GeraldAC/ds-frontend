import {
  Box,
  Text,
  Heading,
  Avatar,
  SimpleGrid,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
  Card,
  CardBody,
  HStack,
  Icon,
  Badge,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import { useVenturesByProducerQuery } from "@/hooks/useVentureMutation";
import { useMyReviewsQuery } from "@/hooks/useReviewMutation";
import { useProductsByVentures } from "@/hooks/useProductMutation";
import { UserStatsChart } from "@/features/home/UserStatsChart";
import { ReviewBreakdownChart } from "@/features/home/ReviewBreakdownChart";
import { Sprout, Package, Star, Users, Sun, Leaf, Heart } from "lucide-react";
import { unknown } from "zod";

const Home = () => {
  const { user } = useAuth();
  const bg = useColorModeValue("gray.50", "gray.800");

  const {
    data: ventures,
    isLoading: loadingVentures,
    isError: errorVentures,
  } = useVenturesByProducerQuery({ enabled: user?.is_producer });

  const {
    data: reviews,
    isLoading: loadingReviews,
    isError: errorReviews,
  } = useMyReviewsQuery(user?.id);

  // Obtener productos por venture (si aplica)
  const productsPerVenture = useProductsByVentures(
    ventures,
    !!user?.is_producer,
  );

  const isLoading =
    loadingVentures ||
    loadingReviews ||
    productsPerVenture.some((q) => q.isLoading);

  const isError =
    errorVentures || errorReviews || productsPerVenture.some((q) => q.isError);

  const totalProducts = productsPerVenture.reduce((acc, q) => {
    return acc + (q.data?.length || 0);
  }, 0);

  // Obtener saludo según la hora
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const getGreetingIcon = () => {
    const hour = new Date().getHours();
    if (hour < 12) return Sun;
    if (hour < 18) return Leaf;
    return Star;
  };

  // Función para obtener el año de registro de forma segura
  const getMemberSince = () => {
    try {
      // Usar any para evitar errores de TypeScript si la propiedad no existe en el tipo
      const userWithDate = { ...user, created_at: unknown };

      if (userWithDate?.created_at) {
        // Si created_at es una string
        if (typeof userWithDate.created_at === "string") {
          return new Date(userWithDate.created_at).getFullYear();
        }
        // Si created_at es un objeto Date
        if (userWithDate.created_at instanceof Date) {
          return userWithDate.created_at.getFullYear();
        }
      }
      // Fallback al año actual si no hay fecha
      return new Date().getFullYear();
    } catch (error) {
      console.warn("Error parsing created_at date:", error);
      return new Date().getFullYear();
    }
  };

  if (isLoading) {
    return (
      <Box p={8} textAlign="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="green.500" thickness="4px" />
          <Text color="gray.600">Cargando tu panel...</Text>
        </VStack>
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert status="error" borderRadius="lg">
        <AlertIcon />
        Error al cargar los datos de tu panel.
      </Alert>
    );
  }

  return (
    <Box p={8} bg={bg} minH="80vh">
      {/* Header con saludo personalizado */}
      <Card variant="organic" mb={8}>
        <CardBody>
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "center", md: "flex-start" }}
            gap={6}
          >
            <Avatar
              name={user?.name}
              src={user?.avatar_url || undefined}
              size="xl"
              border="4px solid"
              borderColor="green.100"
            />
            <Box flex="1" textAlign={{ base: "center", md: "left" }}>
              <HStack justify={{ base: "center", md: "flex-start" }} mb={2}>
                <Icon as={getGreetingIcon()} color="green.500" boxSize={6} />
                <Heading size="lg" color="green.600">
                  {getGreeting()}, {user?.name}!
                </Heading>
              </HStack>

              <Text fontSize="md" color="gray.600" mb={3}>
                {user?.is_producer
                  ? "Aquí tienes el resumen de tu actividad como productor orgánico"
                  : "Bienvenido a tu panel de usuario de Cusco Orgánico"}
              </Text>

              <HStack
                justify={{ base: "center", md: "flex-start" }}
                spacing={3}
                wrap="wrap"
              >
                {user?.is_producer && (
                  <Badge variant="organic" px={3} py={1} borderRadius="full">
                    <HStack spacing={1}>
                      <Sprout size={12} />
                      <Text fontSize="xs">Productor Verificado</Text>
                    </HStack>
                  </Badge>
                )}
                <Badge variant="earth" px={3} py={1} borderRadius="full">
                  <HStack spacing={1}>
                    <Heart size={12} />
                    <Text fontSize="xs">Miembro desde {getMemberSince()}</Text>
                  </HStack>
                </Badge>
              </HStack>
            </Box>
          </Flex>
        </CardBody>
      </Card>

      {/* Grid de estadísticas */}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: user?.is_producer ? 3 : 2 }}
        spacing={6}
        mb={8}
      >
        {user?.is_producer && (
          <SummaryCard
            title="Emprendimientos"
            value={ventures?.length || 0}
            icon={Sprout}
            color="green"
            description="Proyectos activos"
          />
        )}

        {user?.is_producer && (
          <SummaryCard
            title="Productos"
            value={totalProducts}
            icon={Package}
            color="brown"
            description="En catálogo"
          />
        )}

        <SummaryCard
          title="Reseñas"
          value={reviews?.length || 0}
          icon={Star}
          color="orange"
          description={user?.is_producer ? "Recibidas" : "Realizadas"}
        />

        {!user?.is_producer && (
          <SummaryCard
            title="Interacciones"
            value={reviews?.length || 0}
            icon={Users}
            color="green"
            description="Con productores"
          />
        )}
      </SimpleGrid>

      {/* Gráficos y estadísticas */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <UserStatsChart
          venturesCount={ventures?.length || 0}
          productsCount={totalProducts}
          reviewsCount={reviews?.length || 0}
          isProducer={user!.is_producer}
        />

        <ReviewBreakdownChart reviews={reviews || []} />
      </SimpleGrid>
    </Box>
  );
};

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: "green" | "brown" | "orange";
  description: string;
}

const SummaryCard = ({
  title,
  value,
  icon,
  color,
  description,
}: SummaryCardProps) => {
  const colorScheme =
    color === "brown" ? "brown" : color === "orange" ? "orange" : "green";

  return (
    <Card
      variant={
        color === "brown" ? "earth" : color === "orange" ? "accent" : "organic"
      }
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
      }}
      transition="all 0.3s ease"
    >
      <CardBody>
        <HStack spacing={4}>
          <Box
            p={3}
            bg={`${colorScheme}.100`}
            borderRadius="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={icon} boxSize={6} color={`${colorScheme}.600`} />
          </Box>

          <Box flex="1">
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
              {title}
            </Text>
            <Heading size="xl" color={`${colorScheme}.600`} lineHeight="1">
              {value}
            </Heading>
            <Text fontSize="xs" color="gray.500">
              {description}
            </Text>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default Home;
