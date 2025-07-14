// src/layouts/MainLayout.tsx
import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <Box 
      minH="100vh" 
      display="flex" 
      flexDirection="column"
      bg="gray.50"
    >
      <Header />

      <Box
        as="main"
        flex="1"
        w="100%"
        position="relative"
        // Patrón sutil de fondo para darle textura orgánica
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(76, 175, 80, 0.03) 0%, transparent 25%),
            radial-gradient(circle at 75% 75%, rgba(139, 69, 19, 0.02) 0%, transparent 25%),
            radial-gradient(circle at 75% 25%, rgba(255, 99, 71, 0.02) 0%, transparent 25%)
          `,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Container 
          maxW="full" 
          px={{ base: 4, md: 8 }} 
          py={6}
          position="relative"
          zIndex={1}
        >
          <Outlet />
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default MainLayout;