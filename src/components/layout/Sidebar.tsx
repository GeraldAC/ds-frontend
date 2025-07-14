import {
  Box,
  IconButton,
  VStack,
  Text,
  useColorModeValue,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, Sprout } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
import { SidebarNavItems } from "./SidebarNavItems";
import { SIDEBAR_WIDTH } from "@/layouts/DashboardLayout";

export const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const bgColor = useColorModeValue("green.700", "green.800");
  const bgGradient = useColorModeValue(
    "linear(to-b, green.700, green.800)",
    "linear(to-b, green.800, green.900)"
  );

  return (
    <Box
      as="aside"
      role="navigation"
      position="fixed"
      left="0"
      top="0"
      h="100vh"
      w={isCollapsed ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded}
      bgGradient={bgGradient}
      color="white"
      p={3}
      transition="width 0.3s ease"
      zIndex="100"
      overflowX="hidden"
      borderRight="3px solid"
      borderRightColor="green.500"
    >
      <VStack align="stretch" spacing={4} h="full">
        {/* Header del sidebar */}
        <Box
          display="flex"
          justifyContent={isCollapsed ? "center" : "space-between"}
          alignItems="center"
          py={2}
        >
          {!isCollapsed && (
            <Flex align="center" gap={2}>
              <Box
                p={2}
                bg="green.600"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Sprout size={20} />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="bold" lineHeight="1.2">
                  Panel Agrícola
                </Text>
                <Text fontSize="xs" opacity={0.8} lineHeight="1.2">
                  Gestión Orgánica
                </Text>
              </Box>
            </Flex>
          )}
          
          <IconButton
            aria-label={
              isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"
            }
            icon={isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            onClick={toggleSidebar}
            variant="ghost"
            colorScheme="whiteAlpha"
            size="sm"
            _hover={{
              bg: "green.600",
            }}
          />
        </Box>

        {/* Divider decorativo */}
        <Divider borderColor="green.500" opacity={0.6} />

        {/* Panel de control title (solo cuando expandido) */}
        {!isCollapsed && (
          <Box px={2}>
            <Text 
              fontSize="xs" 
              fontWeight="semibold" 
              textTransform="uppercase" 
              letterSpacing="wider"
              opacity={0.8}
              mb={2}
            >
              Navegación
            </Text>
          </Box>
        )}

        {/* Items de navegación */}
        <SidebarNavItems isCollapsed={isCollapsed} />

        {/* Footer del sidebar (cuando expandido) */}
        {!isCollapsed && (
          <Box mt="auto" px={2} py={3}>
            <Divider borderColor="green.500" opacity={0.6} mb={3} />
            <Box
              bg="green.600"
              borderRadius="lg"
              p={3}
              textAlign="center"
            >
              <Text fontSize="xs" fontWeight="semibold" mb={1}>
                Cusco Orgánico
              </Text>
              <Text fontSize="xs" opacity={0.8} lineHeight="1.3">
                Conectando productores con la comunidad
              </Text>
            </Box>
          </Box>
        )}
      </VStack>
    </Box>
  );
};