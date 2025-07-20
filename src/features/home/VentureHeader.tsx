import {
  Badge,
  Box,
  Button,
  Heading,
  Icon,
  Image,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ShoppingBag, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface Venture {
  id: number;
  name: string;
  description: string;
  image_url: string;
  producer_id: number;
  created_at: string;
}

interface Props {
  venture: Venture;
}

export const VentureHeader = ({ venture }: Props) => {
  const bg = useColorModeValue("white", "gray.800");
  const hoverShadow = useColorModeValue("xl", "dark-lg");
  const border = useColorModeValue("gray.200", "gray.600");
  const badgeColor = "green";

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ventures/${venture.id}/products`);
  };

  return (
    <Box
      bg={bg}
      p={6}
      rounded="2xl"
      shadow="md"
      mb={6}
      border="1px solid"
      borderColor={border}
      borderTop="6px solid"
      borderTopColor="green.500"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: hoverShadow,
      }}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={5}
        align="center"
      >
        <Box
          p={1}
          bg={`gray.50`}
          borderRadius="xl"
          display="inline-flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src={venture.image_url}
            alt={`Logo de ${venture.name}`}
            boxSize="100px"
            objectFit="cover"
            rounded="lg"
            border="1px solid"
            borderColor={border}
          />
        </Box>

        <Box textAlign={{ base: "center", md: "left" }} flex="1">
          <Stack
            direction="row"
            justify={{ base: "center", md: "flex-start" }}
            align="center"
            spacing={2}
            mb={2}
          >
            <Icon as={Sprout} boxSize={6} color={`${badgeColor}.600`} />
            <Badge
              colorScheme={badgeColor}
              fontSize="0.8em"
              px={2}
              py={1}
              rounded="full"
            >
              Emprendimiento
            </Badge>
            <Spacer />
            <Button
              size="sm"
              leftIcon={<ShoppingBag size={16} />}
              onClick={handleClick}
            >
              Ver productos
            </Button>
          </Stack>

          <Heading size="lg" color={`${badgeColor}.700`} mb={2}>
            {venture.name}
          </Heading>

          <Text fontSize="sm" color="gray.600">
            {venture.description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};
