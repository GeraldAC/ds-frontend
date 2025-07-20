import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

type ProductCardProps = {
  title: string;
  description: string;
  producer: string;
  createdAt: string;
  onView: () => void;
};

export default function MyProductCard({
  title,
  description,
  producer,
  createdAt,
  onView,
}: ProductCardProps) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="2xl"
      boxShadow="md"
      p={4}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack spacing={3}>
        <Heading size="md">{title}</Heading>
        <Text>{description}</Text>
        <Stack direction="row" spacing={2} align="center">
          <Badge colorScheme="orange">{producer}</Badge>
          <Text fontSize="sm" color="gray.500">
            Publicado el {createdAt}
          </Text>
        </Stack>
        <Button onClick={onView} colorScheme="orange" size="sm">
          Ver más
        </Button>
      </Stack>
    </Box>
  );
}
