import { Outlet } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";

export const PublicLayout = () => {
  return (
    <Box>
      <Container maxW="6xl" py={6}>
        <Outlet />
      </Container>
    </Box>
  );
};
