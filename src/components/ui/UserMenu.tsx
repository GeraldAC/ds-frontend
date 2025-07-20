import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, LayoutDashboard, Store, Leaf, User } from "lucide-react";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const isInDashboard = location.pathname.startsWith("/dashboard");
  const menuTarget = isInDashboard ? "/products" : "/dashboard";
  const menuLabel = isInDashboard ? "Ver tienda" : "Panel de control";
  const menuIcon = isInDashboard ? (
    <Store size={18} />
  ) : (
    <LayoutDashboard size={18} />
  );

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded="2xl"
        variant="ghost"
        cursor="pointer"
        minW={0}
        rightIcon={<ChevronDownIcon />}
        aria-label="Opciones de usuario"
        px={3}
        py={2}
        _hover={{
          bg: "green.50",
          transform: "translateY(-1px)",
        }}
        transition="all 0.2s ease"
      >
        <HStack spacing={2}>
          <Avatar
            size="sm"
            name={user.name}
            src={user.avatar_url ?? undefined}
            bg="green.500"
            color="white"
            border="2px solid"
            borderColor="green.100"
          />
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="gray.700"
            display={{ base: "none", md: "block" }}
          >
            {user.name.split(" ")[0]}
          </Text>
        </HStack>
      </MenuButton>

      <MenuList
        border="2px solid"
        borderColor="green.100"
        borderRadius="xl"
        boxShadow="lg"
        py={2}
        px={1}
        minW="260px"
        bg="white"
      >
        {/* Header del menú */}
        <Box px={4} py={3}>
          <VStack align="start" spacing={1}>
            <HStack spacing={12}>
              <Text fontWeight="bold" color="gray.800" fontSize="sm">
                {user.name}
              </Text>
              {user.is_producer && (
                <Badge variant="subtle" colorScheme="orange" rounded="md">
                  <HStack spacing={1}>
                    <Leaf size={12} />
                    <Text fontSize="xs">Productor</Text>
                  </HStack>
                </Badge>
              )}
            </HStack>
            <Text fontSize="xs" color="gray.500">
              {user.email}
            </Text>
          </VStack>
        </Box>

        <MenuDivider borderColor="green.100" />

        {/* Opciones principales */}
        <MenuItem
          icon={<User size={18} />}
          onClick={() => navigate("/dashboard/profile")}
          py={2.5}
          px={4}
          fontSize="sm"
          color="gray.700"
          _hover={{ bg: "green.50", color: "green.700" }}
        >
          Mi perfil
        </MenuItem>

        <MenuItem
          icon={menuIcon}
          onClick={() => navigate(menuTarget)}
          py={2.5}
          px={4}
          fontSize="sm"
          color="green.600"
          fontWeight="medium"
          _hover={{ bg: "green.50", color: "green.700" }}
        >
          {menuLabel}
        </MenuItem>

        <MenuDivider borderColor="green.100" />

        {/* Logout */}
        <MenuItem
          icon={<LogOut size={18} />}
          onClick={logout}
          py={2.5}
          px={4}
          fontSize="sm"
          color="red.500"
          _hover={{ bg: "red.50", color: "red.600" }}
        >
          Cerrar sesión
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
