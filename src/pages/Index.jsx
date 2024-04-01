import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const API_BASE_URL = "https://backengine-pl1p.fly.dev";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast({
          title: "Signup Successful",
          description: "You can now log in",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Signup Failed",
          description: "An error occurred during signup",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <Heading mb={8}>Welcome to the App</Heading>
      {!isLoggedIn ? (
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Stack direction="row" spacing={4}>
            <Button leftIcon={<FaSignInAlt />} onClick={handleLogin}>
              Login
            </Button>
            <Button leftIcon={<FaUserPlus />} onClick={handleSignup}>
              Signup
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Box>
          <Heading size="md" mb={4}>
            You are logged in!
          </Heading>
          <Button onClick={handleLogout}>Logout</Button>
        </Box>
      )}
    </Box>
  );
};

export default Index;
