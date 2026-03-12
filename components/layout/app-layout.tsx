"use client";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./app-sidebar";
import AppHeader from "./app-header";
import { ReactNode, useEffect, useState } from "react";
import { Notifications } from "./data/notifications";
import { SideBarItemsBranch, SideBarItemsEKolekta } from "./data/sidebar-items";

export function AppLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    if (!isSidebarOpen && window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  return (
    /* OUTER: sidebar + right area */
    <Flex h="100vh" fontFamily="'Open Sans', sans-serif" bg={"white"}>
      {/* LEFT: Sidebar (full height) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        navItems={SideBarItemsBranch}
        appName={"BPISv6"}
      />

      {/* RIGHT: Navbar + content */}
      <Flex flex="1" direction="column" minW={0}>
        {/* Top Navbar */}
        <AppHeader
          onToggleSidebar={toggleSidebar}
          notifications={Notifications}
        />

        {/* Page content */}
        <Box flex="1" minW={0} p={4} overflow="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
