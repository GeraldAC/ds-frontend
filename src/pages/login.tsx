import { LoginForm } from "@/features/auth/LoginForm";
import { Box, Heading } from "@chakra-ui/react";

export default function LoginPage() {
  return (
    <Box maxW="md" mx="auto" mt={10}>
      <Heading mb={6}>Iniciar sesión</Heading>
      <LoginForm />
    </Box>
  );
}
