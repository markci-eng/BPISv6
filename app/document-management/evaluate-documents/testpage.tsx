"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Field,
  Checkbox,
  Stack,
  IconButton,
  Separator,
  Button,
} from "@chakra-ui/react";
import { LuEye, LuEyeOff, LuArrowRight } from "react-icons/lu";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // connect to backend later
  };

  return (
    <Flex minH="100vh">
      {/* Left branding panel */}
      <Flex
        display={{ base: "none", lg: "flex" }}
        w={{ lg: "50%" }}
        direction="column"
        justify="space-between"
        bg="gray.900"
        color="white"
        p={12}
      >
        <Flex align="center" gap={2}>
          <Box h="32px" w="32px" rounded="lg" bg="blue.500" />
          <Text fontSize="lg" fontWeight="semibold">
            Acme
          </Text>
        </Flex>

        <Box maxW="md">
          <Heading size="xl" mb={4}>
            Start your journey with us.
          </Heading>
          <Text opacity={0.8}>
            Join thousands of people who trust our platform to manage their
            work and grow their business.
          </Text>
        </Box>

        <Text fontSize="sm" opacity={0.7}>
          © 2026 Acme Inc. All rights reserved.
        </Text>
      </Flex>

      {/* Right form panel */}
      <Flex w={{ base: "100%", lg: "50%" }} align="center" justify="center" p={{ base: 6, sm: 12 }}>
        <Box w="full" maxW="sm">
          {/* Mobile logo */}
          <Flex mb={8} align="center" gap={2} display={{ lg: "none" }}>
            <Box h="32px" w="32px" rounded="lg" bg="blue.500" />
            <Text fontSize="lg" fontWeight="semibold">
              Acme
            </Text>
          </Flex>

          <Box mb={8}>
            <Heading size="lg" mb={2}>
              {isSignUp ? "Create an account" : "Welcome back"}
            </Heading>
            <Text color="fg.muted" fontSize="sm">
              {isSignUp
                ? "Enter your details to get started."
                : "Enter your credentials to access your account."}
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack gap={4}>
              {isSignUp && (
                <Field.Root>
                  <Field.Label>Full name</Field.Label>
                  <Input
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    size="lg"
                  />
                </Field.Root>
              )}

              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                />
              </Field.Root>

              <Field.Root>
                <Flex justify="space-between" align="center">
                  <Field.Label>Password</Field.Label>
                  {!isSignUp && (
                    <Button variant="ghost" size="xs">
                      Forgot password?
                    </Button>
                  )}
                </Flex>

                <Flex position="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="lg"
                    pr="10"
                  />
                  <IconButton
                    aria-label="toggle password"
                    size="sm"
                    variant="ghost"
                    position="absolute"
                    right="2"
                    top="50%"
                    transform="translateY(-50%)"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <LuEyeOff /> : <LuEye />}
                  </IconButton>
                </Flex>
              </Field.Root>

              {!isSignUp && (
                <Checkbox.Root>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Remember me</Checkbox.Label>
                </Checkbox.Root>
              )}

              <Button type="submit" size="lg" w="full" gap={2}>
                {isSignUp ? "Create account" : "Sign in"}
                <LuArrowRight />
              </Button>
            </Stack>
          </form>

          <Box my={6}>
            <Separator />
            <Text textAlign="center" fontSize="xs" color="fg.muted" mt={-3} bg="bg" w="fit-content" mx="auto" px={2}>
              or
            </Text>
          </Box>

          <Button variant="outline" size="lg" w="full">
            Continue with Google
          </Button>

          <Text mt={6} textAlign="center" fontSize="sm" color="fg.muted">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </Button>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
