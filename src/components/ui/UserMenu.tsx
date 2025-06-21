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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth } from "@/hooks/useAuth";

const UserMenu = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded="lg"
        variant="ghost"
        cursor="pointer"
        minW={0}
        rightIcon={<ChevronDownIcon />}
      >
        <Avatar
          size="sm"
          name={user.name}
          src={user.avatar_url ?? undefined}
          bg="teal.500"
          color="white"
        />
      </MenuButton>
      <MenuList>
        <Box px={4} py={2}>
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold">{user.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {user.email}
            </Text>
          </VStack>
        </Box>
        <MenuDivider />
        <MenuItem onClick={logout} color="red.500">
          Cerrar sesión
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
