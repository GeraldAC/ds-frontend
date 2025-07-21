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
  Button,
} from "@chakra-ui/react";
import { Mail, MapPin, Phone, ContactRound, MessageCircle } from "lucide-react";

interface ProducerDetailsProps {
  user: UserDetail;
  producer: ProducerInfoDetail;
}

// Principio de Responsabilidad Única (SRP): Clase dedicada solo a manejar WhatsApp
class WhatsAppService {
  private static formatPhoneNumber(phone: string): string {
    return phone.replace(/[^0-9+]/g, '');
  }

  private static createWhatsAppUrl(phone: string, message: string): string {
    const cleanPhone = this.formatPhoneNumber(phone);
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }

  public static openWhatsAppChat(phone: string, message: string = 'Hola, estoy interesado en tus productos'): void {
    const url = this.createWhatsAppUrl(phone, message);
    window.open(url, '_blank');
  }
}

// Principio de Responsabilidad Única (SRP): Componente dedicado solo al botón de WhatsApp
interface WhatsAppButtonProps {
  phone: string;
  onContactClick?: () => void; // Principio de Inversión de Dependencias (DIP)
}

const WhatsAppButton = ({ phone, onContactClick }: WhatsAppButtonProps) => {
  const handleClick = () => {
    WhatsAppService.openWhatsAppChat(phone);
    onContactClick?.(); // Callback opcional para analytics u otras acciones
  };

  return (
    <Button
      colorScheme="green"
      size="md"
      leftIcon={<Icon as={MessageCircle} />}
      onClick={handleClick}
      borderRadius="full"
      px={6}
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "lg",
      }}
      transition="all 0.2s ease"
    >
      Contactar por WhatsApp
    </Button>
  );
};

// Principio de Responsabilidad Única (SRP): Componente para mostrar información de contacto
interface ContactInfoProps {
  user: UserDetail;
  producer: ProducerInfoDetail;
}

const ContactInfo = ({ user, producer }: ContactInfoProps) => (
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
);

// Principio de Responsabilidad Única (SRP): Componente para el header del productor
interface ProducerHeaderProps {
  user: UserDetail;
  producer: ProducerInfoDetail;
  onContactClick?: () => void;
}

const ProducerHeader = ({ user, producer, onContactClick }: ProducerHeaderProps) => (
  <Flex align="center" gap={5} mb={5}>
    <Avatar
      size="xl"
      src={user.avatar_url || undefined}
      name={user.name}
      border="2px solid"
      borderColor="brown.400"
    />
    <Box flex={1}>
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
      <ContactInfo user={user} producer={producer} />
    </Box>
    
    {/* Principio Abierto/Cerrado (OCP): Fácil agregar nuevos botones de contacto */}
    {producer.phone && (
      <WhatsAppButton phone={producer.phone} onContactClick={onContactClick} />
    )}
  </Flex>
);

// Principio de Responsabilidad Única (SRP): Componente para la biografía
interface ProducerBioProps {
  bio: string;
}

const ProducerBio = ({ bio }: ProducerBioProps) => (
  <>
    <Divider my={4} />
    <Box>
      <Text fontWeight="semibold" mb={2}>
        Acerca del productor:
      </Text>
      <Text fontSize="sm" color="gray.700" whiteSpace="pre-wrap">
        {bio}
      </Text>
    </Box>
  </>
);

// Principio de Responsabilidad Única (SRP): Componente principal que orquesta los demás
export const ProducerDetails = ({ user, producer }: ProducerDetailsProps) => {
  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.600");
  const hoverShadow = useColorModeValue("xl", "dark-lg");

  // Principio de Inversión de Dependencias (DIP): Callback para manejar eventos de contacto
  const handleContactClick = () => {
    // Aquí se podría agregar analytics, logging, etc.
    console.log(`Usuario contactó al productor: ${user.name}`);
  };

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
      {/* Principio de Composición: Usar componentes más pequeños y especializados */}
      <ProducerHeader 
        user={user} 
        producer={producer} 
        onContactClick={handleContactClick}
      />

      {/* Principio Abierto/Cerrado (OCP): Fácil agregar nuevas secciones */}
      {producer.bio && <ProducerBio bio={producer.bio} />}
    </Box>
  );
};
