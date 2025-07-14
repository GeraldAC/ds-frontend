import { Box, Button, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/ui/Logo";
import UserMenu from "@/components/ui/UserMenu";
import { Leaf } from "lucide-react";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      as="header"
      bg="white"
      boxShadow="md"
      borderBottom="3px solid"
      borderBottomColor="green.500"
      px={6}
      py={4}
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex align="center">
        {/* Logo y nombre de la plataforma */}
        <Flex align="center" gap={3}>
          <Logo />
          <Box display={{ base: "none", sm: "block" }}>
            <Flex align="center" gap={1}>
              <Leaf size={14} color="#4CAF50" />
              <Text fontSize="sm" color="green.500" fontWeight="medium">
                Productos naturales del Cusco 
              </Text>
            </Flex>
          </Box>
        </Flex>

        <Spacer />

        <HStack spacing={4}>
          <Button
            variant="ghost"
            colorScheme="green"
            onClick={() => navigate("/about")}
            size="sm"
            display={{ base: "none", md: "flex" }}
          >
            Sobre nosotros
          </Button>

          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <Button
                as={RouterLink}
                to="/login"
                variant="outline"
                colorScheme="green"
                size="sm"
              >
                Iniciar sesión
              </Button>
              <Button 
                as={RouterLink} 
                to="/register" 
                variant="organic"
                size="sm"
              >
                Registrarse
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;