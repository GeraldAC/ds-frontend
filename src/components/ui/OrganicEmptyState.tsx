// src/components/ui/OrganicEmptyState.tsx
import {
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  Card,
  CardBody,
  Box,
} from "@chakra-ui/react";
import { type LucideIcon } from "lucide-react";

interface OrganicEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: "green" | "brown" | "orange";
}

export const OrganicEmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = "green"
}: OrganicEmptyStateProps) => {
  const colorConfig = {
    green: {
      iconColor: "green.400",
      titleColor: "green.600",
      buttonVariant: "organic" as const,
    },
    brown: {
      iconColor: "brown.400", 
      titleColor: "brown.600",
      buttonVariant: "earth" as const,
    },
    orange: {
      iconColor: "orange.400",
      titleColor: "orange.600", 
      buttonVariant: "accent" as const,
    }
  };

  const config = colorConfig[variant];

  return (
    <Card>
      <CardBody>
        <VStack spacing={6} py={8} textAlign="center">
          {/* Icono con efecto de fondo */}
          <Box position="relative">
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="80px"
              h="80px"
              bg={`${variant}.50`}
              borderRadius="full"
              opacity={0.6}
            />
            <Icon 
              as={icon} 
              boxSize={16} 
              color={config.iconColor}
              position="relative"
              zIndex={1}
            />
          </Box>
          
          {/* Contenido */}
          <VStack spacing={3}>
            <Heading 
              size="md" 
              color={config.titleColor}
              fontWeight="semibold"
            >
              {title}
            </Heading>
            <Text 
              color="gray.500" 
              maxW="md" 
              lineHeight="1.6"
              fontSize="sm"
            >
              {description}
            </Text>
          </VStack>

          {/* Botón de acción */}
          {actionLabel && onAction && (
            <Button 
              variant={config.buttonVariant}
              onClick={onAction}
              size="md"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              {actionLabel}
            </Button>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default OrganicEmptyState;