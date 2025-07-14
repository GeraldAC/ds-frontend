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
  const menuTarget = isInDashboard ? "/" : "/dashboard";
  const menuLabel = isInDashboard ? "Ver tienda" : "Panel de control";
  const menuIcon = isInDashboard ? (
    <Store size={16} />
  ) : (
    <LayoutDashboard size={16} />
  );

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded="xl"
        variant="ghost"
        cursor="pointer"
        minW={0}
        rightIcon={<ChevronDownIcon />}
        aria-label="Opciones de usuario"
        _hover={{
          bg: "green.50",
          transform: "translateY(-1px)",
        }}
        transition="all 0.2s ease"
      >
        <HStack spacing={3}>
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
            display={{ base: "none", md: "block" }}
            color="gray.700"
          >
            {user.name.split(' ')[0]}
          </Text>
        </HStack>
      </MenuButton>

      <MenuList
        borderColor="green.100"
        borderWidth="2px"
        borderRadius="xl"
        py={2}
        minW="240px"
      >
        {/* Header del menu */}
        <Box px={4} py={3}>
          <VStack align="start" spacing={1}>
            <HStack spacing={2}>
              <Text fontWeight="bold" color="gray.800">
                {user.name}
              </Text>
              {user.is_producer && (
                <Badge size="sm" variant="organic">
                  <HStack spacing={1}>
                    <Leaf size={10} />
                    <Text fontSize="xs">Productor</Text>
                  </HStack>
                </Badge>
              )}
            </HStack>
            <Text fontSize="sm" color="gray.500">
              {user.email}
            </Text>
          </VStack>
        </Box>

        <MenuDivider borderColor="green.100" />

        {/* Opciones principales */}
        <MenuItem
          icon={<User size={16} />}
          onClick={() => navigate("/dashboard/profile")}
          color="gray.700"
          _hover={{ bg: "green.50", color: "green.700" }}
          py={3}
        >
          Mi perfil
        </MenuItem>

        <MenuItem
          icon={menuIcon}
          onClick={() => navigate(menuTarget)}
          color="green.600"
          _hover={{ bg: "green.50", color: "green.700" }}
          py={3}
          fontWeight="medium"
        >
          {menuLabel}
        </MenuItem>

        <MenuDivider borderColor="green.100" />

        {/* Logout */}
        <MenuItem 
          icon={<LogOut size={16} />} 
          onClick={logout} 
          color="red.500"
          _hover={{ bg: "red.50", color: "red.600" }}
          py={3}
        >
          Cerrar sesión
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;