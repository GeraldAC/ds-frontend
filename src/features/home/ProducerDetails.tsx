import type { ProducerInfoDetail, UserDetail } from "@/types";
import {
  Avatar,
  Box,
  Flex,
  Text,
  Icon,
  Stack,
  Divider,
  Badge,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { Mail, MapPin, Phone, ContactRound } from "lucide-react";

interface ProducerDetailsProps {
  user: UserDetail;
  producer: ProducerInfoDetail;
}

export const ProducerDetails = ({ user, producer }: ProducerDetailsProps) => {
  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.600");
  const hoverShadow = useColorModeValue("xl", "dark-lg");

  return (
    <Box
      bg={bg}
      borderWidth="1px"
      borderColor={border}
      borderRadius="2xl"
      p={6}
      shadow="lg"
      mt={6}
      borderTop="6px solid"
      borderTopColor="brown.500"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: hoverShadow,
      }}
    >
      <Flex align="center" gap={5} mb={5}>
        <Avatar
          size="xl"
          src={user.avatar_url || undefined}
          name={user.name}
          border="2px solid"
          borderColor="brown.400"
        />
        <Box>
          <Flex align="center" gap={2} mb={1}>
            <Icon as={ContactRound} color="brown.500" boxSize={5} />
            <Badge
              colorScheme="brown"
              rounded="full"
              px={2}
              py={1}
              fontSize="0.8em"
            >
              Productor verificado
            </Badge>
          </Flex>
          <Heading size="md" color={`brown.700`} mb={2}>
            {user.name}
          </Heading>
          <Stack spacing={1} mt={2}>
            <Flex align="center" gap={2}>
              <Icon as={Mail} boxSize={4} />
              <Text fontSize="sm" color="gray.600">
                {user.email}
              </Text>
            </Flex>
            {producer.location && (
              <Flex align="center" gap={2}>
                <Icon as={MapPin} boxSize={4} />
                <Text fontSize="sm" color="gray.600">
                  {producer.location}
                </Text>
              </Flex>
            )}
            {producer.phone && (
              <Flex align="center" gap={2}>
                <Icon as={Phone} boxSize={4} />
                <Text fontSize="sm" color="gray.600">
                  {producer.phone}
                </Text>
              </Flex>
            )}
          </Stack>
        </Box>
      </Flex>

      {producer.bio && (
        <>
          <Divider my={4} />
          <Box>
            <Text fontWeight="semibold" mb={2}>
              Acerca del productor:
            </Text>
            <Text fontSize="sm" color="gray.700" whiteSpace="pre-wrap">
              {producer.bio}
            </Text>
          </Box>
        </>
      )}
    </Box>
  );
};
