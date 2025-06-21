import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

const PrivateLayout = () => {
  return (
    <Flex>
      <Box flex="1" p={4}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default PrivateLayout;
