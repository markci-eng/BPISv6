"use client";

import React, { useState } from "react";
import {
  Flex,
  IconButton,
  Input,
  Box,
  Avatar,
  Dialog,
  Text,
  VStack,
  Badge,
  Popover,
  Portal,
  InputGroup,
  Separator,
} from "@chakra-ui/react";
import {
  LuMenu,
  LuSearch,
  LuBell,
  LuX,
  LuUser,
  LuSettings,
  LuLogOut,
} from "react-icons/lu";
import { ColorModeButton } from "@/components/ui/color-mode";
import { NotificationDataProps } from "./app-layout.type";
import { Tooltip } from "../ui/tooltip";

export default function AppHeader({
  onToggleSidebar,
  notifications,
}: {
  onToggleSidebar: () => void;
  notifications: NotificationDataProps[];
}) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <Flex
      h="58px"
      px={4}
      align="center"
      justify="space-between"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      fontFamily="'Open Sans', sans-serif"
    >
      {/* Left side */}
      <Flex align="center" gap={2}>
        {/* Sidebar toggle */}
        <IconButton
          aria-label="Toggle sidebar"
          size="sm"
          variant="ghost"
          onClick={onToggleSidebar}
        >
          <LuMenu />
        </IconButton>

        {/* Desktop search */}
        <InputGroup
          flex="1"
          display={{ base: "none", md: "flex" }}
          startElement={<LuSearch />}
          endElement={
            <Box
              py={1}
              px={2}
              bg={"gray.100"}
              borderRadius={"md"}
              cursor={"pointer"}
              _hover={{ bg: "gray.200" }}
            >
              ⌘K
            </Box>
          }
        >
          <Input
            placeholder="Search . . ."
            borderRadius={"md"}
            boxShadow={"sm"}
          />
        </InputGroup>

        {/* Mobile search trigger */}
        <Dialog.Root size="full" motionPreset="slide-in-bottom">
          <Dialog.Trigger asChild>
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Search"
              size="sm"
              variant="ghost"
            >
              <LuSearch />
            </IconButton>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <InputGroup
                    flex="1"
                    startElement={<LuSearch />}
                    endElement={
                      <Dialog.CloseTrigger>
                        <Box
                          py={1}
                          px={2}
                          bg={"gray.100"}
                          borderRadius={"md"}
                          cursor={"pointer"}
                          _hover={{ bg: "gray.200" }}
                        >
                          Cancel
                        </Box>
                      </Dialog.CloseTrigger>
                    }
                  >
                    <Input placeholder="Search . . ." />
                  </InputGroup>
                </Dialog.Header>
                <Dialog.Body>
                  <Text textAlign={"center"} py={5}>
                    No recent searches
                  </Text>
                </Dialog.Body>
                <Dialog.Footer></Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Flex>

      {/* Right side */}
      <Flex align="center" gap={2}>
        <ColorModeButton />

        {/* Notifications */}
        <Popover.Root
          lazyMount
          unmountOnExit
          open={notifOpen}
          onOpenChange={(e) => setNotifOpen(e.open)}
        >
          <Popover.Trigger asChild>
            <Box position="relative">
              <IconButton
                aria-label="Notifications"
                size="sm"
                variant="ghost"
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <LuBell />
              </IconButton>

              {notifications.length > 0 && (
                <Badge
                  colorPalette="red"
                  color="red"
                  borderRadius="full"
                  fontSize="0.6rem"
                  position="absolute"
                  top="0"
                  right="0"
                  minW="4"
                  h="4"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {notifications.length}
                </Badge>
              )}
            </Box>
          </Popover.Trigger>

          <Portal>
            <Popover.Positioner>
              <Popover.Content w="280px" p={0} borderRadius="md" shadow="md">
                <Popover.Arrow />
                <Popover.Body maxH="300px" overflowY="auto" p={1}>
                  <VStack
                    gap={1}
                    align="stretch"
                    fontFamily="'calibri'"
                    font-size="normal"
                    fontWeight="semibold"
                  >
                    {notifications.length > 0 ? (
                      notifications.map((n, idx) => (
                        <React.Fragment key={n.id}>
                          <Box
                            p={2} // decreased padding
                            borderRadius="md"
                            _hover={{
                              bg: "var(--chakra-colors-primary-disabled)/30",
                              cursor: "pointer",
                            }}
                          >
                            <Text fontWeight="semibold" fontSize="sm">
                              {n.title}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              {n.description}
                            </Text>
                          </Box>

                          {idx !== notifications.length - 1 && <Separator />}
                        </React.Fragment>
                      ))
                    ) : (
                      <Text fontSize="sm" color="gray.400" textAlign="center">
                        No notifications
                      </Text>
                    )}
                  </VStack>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>

        {/* User menu */}
        <Popover.Root lazyMount unmountOnExit>
          <Popover.Trigger asChild>
            <Box cursor="pointer">
              <Tooltip ids={{ trigger: "1" }} content="Mark Cristian Ibe" contentProps={{css:{"bg": "white"}}}>
                <Avatar.Root size={"sm"} ids={{ root: "1" }}>
                  <Avatar.Fallback name="Mark Cristian Ibe" />
                  {/* <Avatar.Image src="https://lh3.googleusercontent.com/a/ACg8ocJb6Q7Tm0nXfaF1A0tcdFs3JrTHqyaXyo5UauoS4SnjyYuIQTbi=s317-c-no" /> */}
                </Avatar.Root>
              </Tooltip>
            </Box>
          </Popover.Trigger>

          <Portal>
            <Popover.Positioner>
              <Popover.Content w="180px" p={1} borderRadius="md" shadow="md">
                <Popover.Arrow />
                <Popover.Body p={1}>
                  <VStack
                    align="stretch"
                    gap={1}
                    fontFamily="'Open Sans'"
                    font-size="normal"
                    fontWeight="semibold"
                  >
                    <Flex
                      align="center"
                      gap={1}
                      p={1} // decreased padding
                      borderRadius="md"
                      _hover={{ bg: "gray.100", cursor: "pointer" }}
                    >
                      <LuUser size={14} />
                      <Text>Profile</Text>
                    </Flex>
                    <Flex
                      align="center"
                      gap={1}
                      p={1} // decreased padding
                      borderRadius="md"
                      _hover={{ bg: "gray.100", cursor: "pointer" }}
                    >
                      <LuSettings size={14} />
                      <Text>Settings</Text>
                    </Flex>
                    <Flex
                      align="center"
                      gap={1}
                      p={1} // decreased padding
                      borderRadius="md"
                      _hover={{ bg: "gray.100", cursor: "pointer" }}
                      onClick={() => {
                        localStorage.removeItem("user");
                        window.location.reload();
                      }}
                    >
                      <LuLogOut size={14} color="red.700" />
                      <Text>Logout</Text>
                    </Flex>
                  </VStack>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </Flex>
    </Flex>
  );
}
