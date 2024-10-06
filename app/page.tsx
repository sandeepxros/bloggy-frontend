"use client"
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Heading,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";

const NotionStyledAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      toast({
        title: "Login successful.",
        description: "Welcome back, Admin!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Login failed.",
        description: "Please enter both email and password.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#F5F5F5" // Very light gray background, mimicking Notion
      p={6}
    >
      <Box
        bg="white" // Simple white card background
        p={8}
        rounded="lg" // Soft rounded corners for a clean look
        maxW="md"
        w="full"
        boxShadow="md" // Subtle shadow for depth
        border="1px solid"
        borderColor="gray.200" // Light border for definition
        textAlign="center"
      >
        <VStack spacing={8}>
          <Heading
            as="h1"
            fontSize="xl" // Minimalistic font size
            fontWeight="semibold"
            color="black" // High-contrast black text
          >
            Admin Login
          </Heading>
          <Text fontSize="md" color="gray.600">
            Sign in with your credentials to access the admin dashboard.
          </Text>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl id="email" isRequired>
                <FormLabel fontWeight="medium" color="black">
                  Email Address
                </FormLabel>
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="md"
                  bg="#FAFAFA" // Notion-like light gray input background
                  border="1px solid"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: "black",
                    bg: "white", // White background on focus for clarity
                  }}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel fontWeight="medium" color="black">
                  Password
                </FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="md"
                  bg="#FAFAFA" 
                  border="1px solid"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: "black",
                    bg: "white",
                  }}
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <Checkbox colorScheme="blackAlpha" id="remember">
                  Remember me
                </Checkbox>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blackAlpha"
                size="md"
                width="full"
                borderRadius="md"
                bg="black"
                color="white"
                _hover={{ bg: "#333333" }} 
                _focus={{ boxShadow: "outline" }}
              >
                Login
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};

export default NotionStyledAdminLogin;
