// app/404.tsx
import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

const Custom404 = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      p={6}
    >
      <Heading as="h1" size="4xl" mb={4}>
        404
      </Heading>
      <Text fontSize="2xl" mb={4}>
        Oops! Page not found.
      </Text>
      <NextLink href="/" passHref>
        <Button colorScheme="blue" size="lg">
          Go back to Home
        </Button>
      </NextLink>
    </Box>
  );
};

export default Custom404;
