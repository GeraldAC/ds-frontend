import { useSidebar } from "@/contexts/SidebarContext";
import { Box, Flex, Text, HStack, Badge } from "@chakra-ui/react";
import Logo from "../ui/Logo";
import UserMenu from "../ui/UserMenu";
import { useAuth } from "@/hooks/useAuth";
import { Leaf, Sun } from "lucide-react";

export const Topbar = () => {
  const { isCollapsed } = useSidebar();
  const { user } = useAuth();

  // Determinar saludo según la hora
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      left={isCollapsed ? "60px" : "260px"}
      right="0"
      height="64px"
      bg="white"
      borderBottom="2px solid"
      borderColor="green.100"
      boxShadow="sm"
      zIndex={1000}
      transition="left 0.3s ease"
    >
      <Flex h="100%" align="center" justify="space-between" px={6}>
        {/* Lado izquierdo - Logo y saludo */}
        <Flex align="center" gap={4}>
          <Logo />
          
          <Box display={{ base: "none", md: "block" }}>
            <HStack spacing={2}>
              <Sun size={16} color="#4CAF50" />
              <Text fontSize="sm" color="gray.600">
                {getGreeting()}, {user?.name}
              </Text>
              {user?.is_producer && (
                <Badge 
                  variant="organic" 
                  size="sm"
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  <HStack spacing={1}>
                    <Leaf size={12} />
                    <Text fontSize="xs">Productor</Text>
                  </HStack>
                </Badge>
              )}
            </HStack>
          </Box>
        </Flex>

        {/* Lado derecho - Información y UserMenu */}
        <Flex align="center" gap={4}>
          {/* Información del día (opcional) */}
          <Box 
            display={{ base: "none", lg: "block" }}
            textAlign="right"
            fontSize="xs"
            color="gray.500"
          >
            <Text>
              {new Date().toLocaleDateString('es-PE', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </Box>

          <UserMenu />
        </Flex>
      </Flex>
    </Box>
  );
};
