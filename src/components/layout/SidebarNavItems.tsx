// src/components/SidebarNavItems.tsx
import { useAuth } from "@/hooks/useAuth";
import {
  VStack,
  Text,
  Icon,
  Link as ChakraLink,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./NavItems";

type Props = {
  isCollapsed: boolean;
};

export const SidebarNavItems = ({ isCollapsed }: Props) => {
  const { user } = useAuth();
  const location = useLocation();
  const isProducer = user?.is_producer ?? false;

  return (
    <VStack as="nav" align="stretch" spacing={2} px={1}>
      {navItems
        .filter((item) => item.isVisible(isProducer))
        .map(({ label, path, icon, exact }) => {
          const isActive = exact
            ? location.pathname === path
            : location.pathname.startsWith(path);

          return (
            <Tooltip
              key={path}
              label={label}
              placement="right"
              isDisabled={!isCollapsed}
              bg="green.600"
              color="white"
              borderRadius="md"
              px={3}
              py={2}
              fontSize="sm"
            >
              <ChakraLink
                as={Link}
                to={path}
                display="flex"
                alignItems="center"
                px={3}
                py={3}
                borderRadius="xl"
                bg={isActive ? "green.600" : "transparent"}
                _hover={{ 
                  bg: isActive ? "green.600" : "green.600",
                  transform: "translateX(4px)",
                  transition: "all 0.2s ease"
                }}
                color="white"
                fontWeight="medium"
                gap={isCollapsed ? 0 : 3}
                justifyContent={isCollapsed ? "center" : "flex-start"}
                whiteSpace="nowrap"
                position="relative"
                overflow="hidden"
                transition="all 0.2s ease"
                border={isActive ? "2px solid" : "2px solid transparent"}
                borderColor={isActive ? "green.400" : "transparent"}
              >
                {/* Indicador activo (barra lateral) */}
                {isActive && (
                  <Box
                    position="absolute"
                    left="0"
                    top="0"
                    bottom="0"
                    width="4px"
                    bg="green.300"
                    borderRadius="0 2px 2px 0"
                  />
                )}
                
                <Icon 
                  as={icon} 
                  boxSize={5} 
                  color={isActive ? "green.100" : "white"}
                />
                
                {!isCollapsed && (
                  <Text 
                    fontSize="sm" 
                    color={isActive ? "green.100" : "white"}
                    fontWeight={isActive ? "semibold" : "medium"}
                  >
                    {label}
                  </Text>
                )}
              </ChakraLink>
            </Tooltip>
          );
        })}
    </VStack>
  );
};