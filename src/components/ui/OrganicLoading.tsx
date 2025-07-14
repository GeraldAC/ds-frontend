// src/components/ui/OrganicLoading.tsx
import { 
  Box, 
  VStack, 
  Text, 
  Spinner, 
  HStack,
  Icon
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { Leaf, Sprout } from "lucide-react";

// Animación para los iconos
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

interface OrganicLoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export const OrganicLoading = ({ 
  message = "Cargando...", 
  size = "md" 
}: OrganicLoadingProps) => {
  const sizeConfig = {
    sm: { spinner: "md", icon: 4, text: "sm" },
    md: { spinner: "xl", icon: 6, text: "md" },
    lg: { spinner: "2xl", icon: 8, text: "lg" }
  };

  const config = sizeConfig[size];

  return (
    <Box textAlign="center" py={8}>
      <VStack spacing={6}>
        {/* Iconos flotantes */}
        <HStack spacing={8}>
          <Icon 
            as={Leaf} 
            boxSize={config.icon} 
            color="green.400"
            animation={`${float} 3s ease-in-out infinite`}
          />
          <Icon 
            as={Sprout} 
            boxSize={config.icon} 
            color="green.600"
            animation={`${float} 3s ease-in-out infinite 0.5s`}
          />
          <Icon 
            as={Leaf} 
            boxSize={config.icon} 
            color="green.400"
            animation={`${float} 3s ease-in-out infinite 1s`}
          />
        </HStack>

        {/* Spinner principal */}
        <Spinner 
          size={config.spinner}
          color="green.500" 
          thickness="4px"
          animation={`${pulse} 2s ease-in-out infinite`}
        />
        
        {/* Mensaje */}
        <VStack spacing={2}>
          <Text 
            fontSize={config.text} 
            color="green.600" 
            fontWeight="medium"
          >
            {message}
          </Text>
          <Text fontSize="xs" color="gray.500">
            Cusco Orgánico
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default OrganicLoading;